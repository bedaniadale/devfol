/* ============================================================================
   RESTYLE INTERACTIONS — "Engineered in Ink"
   Progressive enhancements layered on top of the existing site. Everything is
   additive and guarded by reduced-motion / pointer checks, so nothing breaks if
   this file fails to load.
   ============================================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {

    /* ── 1. Scroll-progress meter ─────────────────────────────────────────── */
    var progress = document.createElement('div');
    progress.className = 'fx-progress';
    progress.innerHTML = '<span></span>';
    document.body.appendChild(progress);
    var progressBar = progress.firstChild;

    /* ── 2. Cursor spotlight (fine-pointer + motion-OK only) ──────────────── */
    var spotlight = null;
    if (finePointer && !reduced) {
      spotlight = document.createElement('div');
      spotlight.className = 'fx-spotlight';
      spotlight.setAttribute('aria-hidden', 'true');
      document.body.appendChild(spotlight);

      var sx = 50, sy = 30, tx = 50, ty = 30, raf = 0;
      function loop() {
        sx += (tx - sx) * 0.12;
        sy += (ty - sy) * 0.12;
        spotlight.style.setProperty('--mx', sx.toFixed(2) + '%');
        spotlight.style.setProperty('--my', sy.toFixed(2) + '%');
        raf = (Math.abs(tx - sx) > 0.1 || Math.abs(ty - sy) > 0.1)
          ? requestAnimationFrame(loop) : 0;
      }
      window.addEventListener('pointermove', function (e) {
        tx = (e.clientX / window.innerWidth) * 100;
        ty = (e.clientY / window.innerHeight) * 100;
        spotlight.classList.add('is-live');
        if (!raf) raf = requestAnimationFrame(loop);
      }, { passive: true });
    }

    /* ── 3. Scroll handler for progress meter ─────────────────────────────── */
    var ticking = false;
    function onScroll() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop || window.scrollY) / max * 100 : 0;
      progressBar.style.width = Math.max(0, Math.min(100, pct)) + '%';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();

    /* ── 4. Section index numbers ( // 01, // 02 … ) ──────────────────────── */
    var heads = document.querySelectorAll('.section-shell .section-title');
    var n = 0;
    heads.forEach(function (title) {
      // skip duplicate titles inside nested heads (e.g. graphics)
      if (title.closest('.section-head') &&
          title.closest('.section-head').querySelector('.fx-index')) return;
      n += 1;
      var idx = document.createElement('span');
      idx.className = 'fx-index';
      idx.textContent = (n < 10 ? '0' : '') + n;
      var head = title.closest('.section-head') || title.parentNode;
      head.insertBefore(idx, head.firstChild);
    });

    /* ── 5. Kinetic marquee after the hero ────────────────────────────────── */
    var hero = document.querySelector('.hero-shell');
    if (hero && !document.querySelector('.fx-marquee')) {
      var words = [
        'Full-Stack Development', 'UX / UI Design', 'System Architecture',
        'Mobile Apps', 'API Integration', 'Business Automation',
        'Database Design', 'Cloud Deployment'
      ];
      var marquee = document.createElement('div');
      marquee.className = 'fx-marquee';
      marquee.setAttribute('aria-hidden', 'true');
      var track = document.createElement('div');
      track.className = 'fx-marquee__track';
      // duplicate the set so the -50% loop is seamless
      var html = words.map(function (w) {
        return '<span class="fx-marquee__item">' + w + '</span>';
      }).join('');
      track.innerHTML = html + html;
      marquee.appendChild(track);
      hero.parentNode.insertBefore(marquee, hero.nextSibling);
    }

    /* ── 6. Magnetic buttons + CTA links ──────────────────────────────────── */
    if (finePointer && !reduced) {
      var magnets = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-btn');
      magnets.forEach(function (el) {
        var strength = 16;
        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          var mx = (e.clientX - r.left - r.width / 2) / r.width;
          var my = (e.clientY - r.top - r.height / 2) / r.height;
          el.style.transform = 'translate(' + (mx * strength).toFixed(1) + 'px,' +
                               (my * strength - 2).toFixed(1) + 'px)';
        });
        el.addEventListener('pointerleave', function () {
          el.style.transform = '';
        });
      });
    }

    /* ── 7. 3D tilt on cards ──────────────────────────────────────────────── */
    if (finePointer && !reduced) {
      var tilters = document.querySelectorAll(
        '.service-item, .cert-card, .testimonial-card, .stat-card--h'
      );
      tilters.forEach(function (card) {
        var max = 7;
        card.addEventListener('pointermove', function (e) {
          var r = card.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform =
            'perspective(900px) rotateX(' + (-py * max).toFixed(2) + 'deg) rotateY(' +
            (px * max).toFixed(2) + 'deg) translateY(-4px)';
        });
        card.addEventListener('pointerleave', function () {
          card.style.transform = '';
        });
      });
    }

    /* ── 8. Hero name: subtle decode flicker on first reveal ──────────────── */
    if (!reduced) {
      var name = document.querySelector('.hero-name');
      if (name) {
        var glyphs = '#$%&*<>/{}[]=+';
        var final = name.textContent;
        var frame = 0;
        var total = final.length;
        var timer = setInterval(function () {
          frame++;
          var locked = Math.floor(frame / 2);
          name.textContent = final.split('').map(function (ch, i) {
            if (ch === ' ') return ' ';
            if (i < locked) return final[i];
            return glyphs[(i + frame) % glyphs.length];
          }).join('');
          if (locked >= total) { name.textContent = final; clearInterval(timer); }
        }, 45);
      }
    }
  });
})();
