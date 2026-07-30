/* ============================================================================
   engine.js — the scroll conductor
   ----------------------------------------------------------------------------
   One rAF loop drives every scroll-linked effect on the page. Nothing else may
   add a scroll listener; nothing may read layout inside the loop.

   Contract
   --------
   • ONE LOOP        rAF -> lenis.raf(ts) -> read(dt) -> flush().
   • ZERO LAYOUT     no getBoundingClientRect / offsetTop / scrollHeight /
                     getComputedStyle inside read() or flush(). All geometry is
                     cached in measure(), the only place layout is touched.
   • READ/WRITE      read() mutates plain objects only. flush() only calls
                     style.setProperty and classList.
   • CHANNELS        pointer effects own `transform:`; scroll owns the
                     independent `translate:` / `scale:` / `rotate:` properties,
                     so the two compose without wrappers or transition hacks.
   • DAMPING         every scrubbed value is lerped, then snapped, then deduped.

   Tiers (single authority for "is this device cinematic?")
     t0  prefers-reduced-motion   -> resolve once, statically, never animate
     t1  small / coarse           -> root vars only
     t2  >= 768 wide              -> root vars only
     t3  >= 1025 x 720 + fine ptr -> full cinema (html.se-cinema)
   ========================================================================== */
(function () {
  'use strict';

  var doc = document, root = doc.documentElement;
  var mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  var mqFine = matchMedia('(hover:hover) and (pointer:fine)');

  var SE = {
    y: 0, dy: 0, sp: 0, sv: 0, vAbs: 0, dir: 1, dtLast: 16.7, now: 0,
    vh: 0, vw: 0, docH: 1, tier: 1, paused: false, ready: false
  };
  window.SE = SE;

  var tracks = [];
  var measurers = [];      // fn() run inside the measure pass, before geometry
  var frameHooks = [];     // fn(dt) run each frame after tracks, may write
  var L = null;            // Lenis instance, when one exists
  var running = false, lastTs = 0, yPrev = 0;

  /* ── helpers ───────────────────────────────────────────────────────────── */

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  // frame-rate independent lerp factor
  function fk(k, dt) { return 1 - Math.pow(1 - k, dt / 16.667); }

  // document-space top without touching getBoundingClientRect
  function topOf(n) { var t = 0; while (n) { t += n.offsetTop; n = n.offsetParent; } return t; }

  function tierOf() {
    if (mqReduce.matches) return 0;
    if (innerWidth >= 1025 && innerHeight >= 720 && mqFine.matches) return 3;
    if (innerWidth >= 768) return 2;
    return 1;
  }

  /* ── range DSL ─────────────────────────────────────────────────────────
     'cover', 'enter', 'center', 'contain', 'exit', each optionally followed by
     a signed offset: '+40vh', '-100vh', '+25%', '-80px'.
     %  is a percentage of the element's own height.                        */

  var RANGE_RE = /^(enter|cover|center|contain|exit)\s*([+-]\s*[\d.]+)\s*(vh|vw|%|px)?$/;

  function resolve(g, key) {
    if (typeof key === 'number') return key;
    var m = String(key).trim().match(RANGE_RE);
    var name = m ? m[1] : String(key).trim();
    var base;
    switch (name) {
      case 'enter':   base = g.top - SE.vh; break;
      case 'cover':   base = g.top; break;
      case 'center':  base = g.top + g.h / 2 - SE.vh / 2; break;
      case 'contain': base = g.top + g.h - SE.vh; break;
      case 'exit':    base = g.top + g.h; break;
      default:        base = g.top; break;
    }
    if (!m || !m[2]) return base;
    var n = parseFloat(m[2].replace(/\s+/g, ''));
    var unit = m[3] || 'px';
    if (unit === 'vh') return base + n * SE.vh / 100;
    if (unit === 'vw') return base + n * SE.vw / 100;
    if (unit === '%')  return base + n * g.h / 100;
    return base + n;
  }

  /* ── registry ──────────────────────────────────────────────────────────── */

  /* SE.add(el, from, to, opts)
       prop     CSS custom property to write         (default '--pd')
       k        damping constant                     (default 0.12)
       minTier  gate                                 (default 3)
       pad      cull padding in viewports            (default 0.35)
       rest     value used by resolveStatic at t0    (default 0)
       ease     optional fn(p) applied before damping
       fn       custom writer fn(value, track) instead of setProperty     */
  function add(el, from, to, opts) {
    if (!el) return null;
    opts = opts || {};
    var t = {
      el: el, from: from, to: to,
      prop: opts.prop || '--pd',
      k: opts.k == null ? 0.12 : opts.k,
      minTier: opts.minTier == null ? 3 : opts.minTier,
      pad: opts.pad == null ? 0.35 : opts.pad,
      rest: opts.rest == null ? 0 : opts.rest,
      ease: opts.ease || null,
      fn: opts.fn || null,
      target: opts.target || el,
      wc: opts.willChange || null,
      p: 0, pd: 0, live: false, last: '', g: null, a: 0, b: 1
    };
    tracks.push(t);
    return t;
  }

  /* SE.addOnce(el, at, opts) — one-shot trigger, never re-hides.
       cls  class added when the threshold is crossed (default 'se-in')   */
  function addOnce(el, at, opts) {
    if (!el) return null;
    opts = opts || {};
    var t = {
      el: el, once: true, from: at, cls: opts.cls || 'se-in',
      minTier: opts.minTier == null ? 1 : opts.minTier,
      fired: false, g: null, a: 0, cb: opts.cb || null
    };
    tracks.push(t);
    return t;
  }

  function addMeasure(fn) { measurers.push(fn); }
  function addFrame(fn) { frameHooks.push(fn); }

  /* ── measure — the ONLY place layout is read ───────────────────────────── */

  var lastDocH = -1, measureQueued = false;

  function measure() {
    measureQueued = false;

    // 1. let owners write any layout-affecting inline sizes first
    for (var i = 0; i < measurers.length; i++) {
      try { measurers[i](); } catch (e) { /* one bad measurer must not stop the rest */ }
    }

    // 2-3. viewport + document metrics
    SE.vh = innerHeight; SE.vw = innerWidth;
    SE.docH = Math.max(1, root.scrollHeight - root.clientHeight);
    lastDocH = root.scrollHeight;

    // 4. per-track geometry
    for (var j = 0; j < tracks.length; j++) {
      var t = tracks[j];
      if (!t.el.isConnected) { t.g = null; continue; }
      t.g = { top: topOf(t.el), h: t.el.offsetHeight };
      if (t.once) { t.a = resolve(t.g, t.from); }
      else {
        t.a = resolve(t.g, t.from);
        t.b = resolve(t.g, t.to);
        if (t.b === t.a) t.b = t.a + 1;
      }
    }
    SE.ready = true;
  }

  function invalidate() {
    if (measureQueued) return;
    measureQueued = true;
    requestAnimationFrame(measure);
  }

  /* ── read / flush ──────────────────────────────────────────────────────── */

  var pending = [];
  var rootLast = { sp: '', sv: '', sva: '', sd: '' };
  var navEl = null, navOn = false;
  var fastOn = false, fastSince = 0, dirHold = 0;

  function read(dt) {
    var kMul = L ? 1 : 1.7;   // native scroll is already a frame stale
    SE.dtLast = dt;

    var y = L ? L.animatedScroll : (window.pageYOffset || root.scrollTop || 0);
    SE.dy = y - SE.y;
    SE.y = y;
    SE.sp = clamp01(y / SE.docH);

    // velocity, damped, hard-zeroed at rest
    var raw = L ? L.velocity : (SE.y - yPrev) * (16.667 / dt);
    yPrev = SE.y;
    var vT = clamp(raw / 55, -1, 1);
    SE.sv += (vT - SE.sv) * fk(0.10 * kMul, dt);
    if (Math.abs(SE.sv) < 0.0015) SE.sv = 0;
    SE.vAbs = Math.abs(SE.sv);

    // direction flips only after 240ms of a consistent sign, so it cannot
    // flutter at rest and reverse the marquee on every micro-jitter
    var want = SE.sv < -0.02 ? -1 : (SE.sv > 0.02 ? 1 : SE.dir);
    if (want !== SE.dir) { dirHold += dt; if (dirHold >= 240) { SE.dir = want; dirHold = 0; } }
    else dirHold = 0;

    if (SE.vAbs > 0.55) { fastOn = true; fastSince = 0; }
    else if (fastOn && SE.vAbs < 0.40) { fastSince += dt; if (fastSince > 220) fastOn = false; }

    if (!SE.ready) return;

    pending.length = 0;
    for (var i = 0; i < tracks.length; i++) {
      var t = tracks[i];
      if (SE.tier < t.minTier || !t.g) continue;

      if (t.once) {
        if (!t.fired && SE.y >= t.a) { t.fired = true; pending.push(t); }
        continue;
      }

      // arithmetic cull — no layout
      var vTop = t.g.top - SE.y;
      if (vTop > SE.vh * (1 + t.pad) || vTop + t.g.h < -SE.vh * t.pad) {
        if (t.live) { t.live = false; pending.push(t); }
        continue;
      }
      if (!t.live) { t.live = true; pending.push(t); }

      var p = clamp01((SE.y - t.a) / (t.b - t.a));
      if (t.ease) p = t.ease(p);
      t.p = p;
      var prev = t.pd;
      t.pd += (p - t.pd) * fk(t.k * kMul, dt);
      if (Math.abs(p - t.pd) < 4e-4) t.pd = p;
      if (t.pd !== prev && pending.indexOf(t) === -1) pending.push(t);
    }
  }

  function flush() {
    // root bus
    var sp = SE.sp.toFixed(4);
    if (sp !== rootLast.sp) { root.style.setProperty('--sp', sp); rootLast.sp = sp; }
    var sv = SE.sv.toFixed(3);
    if (sv !== rootLast.sv) { root.style.setProperty('--sv', sv); rootLast.sv = sv; }
    var sva = SE.vAbs.toFixed(3);
    if (sva !== rootLast.sva) { root.style.setProperty('--sva', sva); rootLast.sva = sva; }

    if (navEl) {
      var on = SE.y > 24;
      if (on !== navOn) { navOn = on; navEl.classList.toggle('nav--scrolled', on); }
    }
    if (fastOn !== root.classList.contains('se-fast')) root.classList.toggle('se-fast', fastOn);

    for (var i = 0; i < pending.length; i++) {
      var t = pending[i];
      if (t.once) { t.el.classList.add(t.cls); if (t.cb) t.cb(t); continue; }

      if (t.wc) t.target.style.willChange = t.live ? t.wc : '';

      if (t.fn) { t.fn(t.pd, t); continue; }
      var v = t.pd.toFixed(4);
      if (v !== t.last) { t.target.style.setProperty(t.prop, v); t.last = v; }
    }
    pending.length = 0;

    for (var j = 0; j < frameHooks.length; j++) frameHooks[j](SE.dtLast);
  }

  /* ── static resolve (reduced motion) ───────────────────────────────────── */

  function resolveStatic() {
    for (var i = 0; i < tracks.length; i++) {
      var t = tracks[i];
      if (t.once) { t.el.classList.add(t.cls); t.fired = true; if (t.cb) t.cb(t); continue; }
      t.p = t.pd = t.rest;
      if (t.fn) t.fn(t.rest, t);
      else t.target.style.setProperty(t.prop, String(t.rest));
    }
    root.style.setProperty('--sv', '0');
    root.style.setProperty('--sva', '0');

    // progress bar + nav state are wayfinding, not decoration — keep them alive
    var tick = false;
    addEventListener('scroll', function () {
      if (tick) return;
      tick = true;
      setTimeout(function () {
        tick = false;
        SE.y = window.pageYOffset || root.scrollTop || 0;
        SE.docH = Math.max(1, root.scrollHeight - root.clientHeight);
        SE.sp = clamp01(SE.y / SE.docH);
        root.style.setProperty('--sp', SE.sp.toFixed(4));
        if (navEl) navEl.classList.toggle('nav--scrolled', SE.y > 24);
      }, 150);
    }, { passive: true });
  }

  /* ── lifecycle ─────────────────────────────────────────────────────────── */

  function applyTier() {
    var t = tierOf();
    var changed = t !== SE.tier;
    SE.tier = t;
    root.classList.toggle('se-t0', t === 0);
    root.classList.toggle('se-t1', t === 1);
    root.classList.toggle('se-t2', t === 2);
    root.classList.toggle('se-t3', t === 3);
    root.classList.toggle('se-cinema', t === 3);
    return changed;
  }

  function frame(ts) {
    requestAnimationFrame(frame);
    var dt = lastTs ? Math.min(64, ts - lastTs) : 16.7;
    lastTs = ts;
    SE.now = ts;
    if (L) L.raf(ts);
    read(dt);
    if (!SE.paused) flush();
  }

  function start() {
    if (running) return;
    running = true;
    navEl = doc.getElementById('nav');
    L = window.__lenis || null;
    applyTier();

    if (SE.tier === 0) { measure(); resolveStatic(); return; }

    measure();
    requestAnimationFrame(frame);

    addEventListener('load', invalidate);
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(invalidate);
    addEventListener('orientationchange', invalidate);

    var rt = 0;
    if (window.ResizeObserver) {
      new ResizeObserver(function () {
        clearTimeout(rt);
        rt = setTimeout(function () { if (applyTier()) { /* tier flip */ } invalidate(); }, 120);
      }).observe(doc.body);
    } else {
      addEventListener('resize', function () {
        clearTimeout(rt);
        rt = setTimeout(function () { applyTier(); invalidate(); }, 120);
      });
    }
    [mqReduce, mqFine].forEach(function (mq) {
      var h = function () { applyTier(); invalidate(); };
      if (mq.addEventListener) mq.addEventListener('change', h); else mq.addListener(h);
    });

    // Lazy images and late icon swaps shift section tops after boot. Only
    // re-measure at rest — a measure pass is a forced layout, and doing it
    // mid-scroll is exactly the jank this cache exists to avoid.
    setInterval(function () {
      if (SE.vAbs > 0.02) return;
      if (Math.abs(root.scrollHeight - lastDocH) > 24) invalidate();
    }, 1000);
  }

  SE.add = add;
  SE.addOnce = addOnce;
  SE.addMeasure = addMeasure;
  SE.addFrame = addFrame;
  SE.invalidate = invalidate;
  SE.start = start;
  SE.clamp01 = clamp01;
  SE.tierOf = tierOf;
})();
