/* =====================================================
   designer.js — Full portfolio, designer-style render
   Standalone, vanilla JS. Requires Lenis + techstacks.js.
   ===================================================== */
(function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer =
    window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  function esc(v) {
    return String(v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const TECH_ICON_MAP = {
    'react':          'logos:react',
    'react native':   'logos:react',
    'supabase':       'logos:supabase-icon',
    'laravel':        'logos:laravel',
    'tailwind css':   'logos:tailwindcss-icon',
    'tailwind':       'logos:tailwindcss-icon',
    'mysql':          'logos:mysql-icon',
    'firebase':       'logos:firebase',
    'wordpress':      'logos:wordpress-icon',
    'elementor':      'simple-icons:elementor',
    'javascript':     'logos:javascript',
    'html':           'logos:html-5',
    'css':            'logos:css-3',
    'node.js':        'logos:nodejs-icon',
    'mapbox gl':      'simple-icons:mapbox',
    'hostinger':      'simple-icons:hostinger',
    'pdf generation': 'mdi:file-pdf-box',
  };

  function techIcon(name) {
    const icon = TECH_ICON_MAP[name.toLowerCase()];
    if (!icon) return '';
    return `<span class="iconify" data-icon="${icon}" style="font-size:13px;flex-shrink:0;"></span>`;
  }

  /* ===================================================
     DATA
     =================================================== */

  // ---------- Graphics works (bento + featured rail) ----------
  const GRAPHICS_BASE = 'works/graphics/';
  const WORKS = [
    { f: 'dalefuture.png', title: 'Future Self', tag: 'poster', featured: true },
    { f: 'flowg.png', title: 'Flow', tag: 'editorial', featured: true },
    { f: 'finalmem.png', title: 'Final Memory', tag: 'poster', featured: true },
    { f: 'welcomeback2.webp', title: 'Welcome Back', tag: 'social', featured: true },
    { f: 'meetourteam-2.webp', title: 'Meet Our Team', tag: 'social', featured: true },
    { f: 'bday_dale2-1.png', title: 'Birthday Campaign', tag: 'social', featured: true },
    { f: 'dp2022.webp', title: 'DP 2022', tag: 'brand', featured: true },
    { f: 'artboard-1-100-1.webp', title: 'Artboard 01', tag: 'brand', featured: false },
    { f: 'artboard-4-100.webp', title: 'Artboard 04', tag: 'brand', featured: false },
    { f: 'artboard-5-100.webp', title: 'Artboard 05', tag: 'brand', featured: false },
    { f: 'artboard-6-100.webp', title: 'Artboard 06', tag: 'brand', featured: false },
    { f: 'artboard-7-100.webp', title: 'Artboard 07', tag: 'brand', featured: false },
    { f: '1.webp', title: 'Study 01', tag: 'editorial', featured: false },
    { f: 'efef475b-ec17-4a13-a5f2-e7ae1156aadc.jpg', title: 'Composition I', tag: 'editorial', featured: false },
    { f: '0ad9042b-41b8-4ee9-9d65-26750ee28ef1.jpg', title: 'Composition II', tag: 'editorial', featured: false },
    { f: '3e157134-d079-4d2f-8b8c-c27f78568f34.jpg', title: 'Composition III', tag: 'editorial', featured: false },
    { f: '1dfa30eb-1346-44e0-bfa1-c30dee95e6ea.jpg', title: 'Composition IV', tag: 'editorial', featured: false },
    { f: '12563e67-865d-4b29-9acc-3b61e809185d.jpg', title: 'Poster V', tag: 'poster', featured: false },
    { f: '42ef1801-b6a4-4aa4-9f7e-82db6b1bd601.jpg', title: 'Poster VI', tag: 'poster', featured: false },
    { f: 'ddba4cc9-8b30-4c7a-ac56-6956d3c9cbc8.jpg', title: 'Social VII', tag: 'social', featured: false },
    { f: 'ad0ea7ce-fc3c-425b-8ce0-f2fc74a1a9f0.jpg', title: 'Social VIII', tag: 'social', featured: false },
    { f: '6e6deef8-be3e-44d6-8bb6-2b4c061dfad1.jpg', title: 'Layout IX', tag: 'editorial', featured: false },
    { f: '8a8780cf-2862-4c52-992d-1f24f2c2f7f6.jpg', title: 'Layout X', tag: 'editorial', featured: false },
    { f: 'f4d3219f-d45b-4d1c-9b16-89f0fce7bc8b.jpg', title: 'Layout XI', tag: 'editorial', featured: false },
  ].map((w) => Object.assign({}, w, { src: GRAPHICS_BASE + w.f }));

  // ---------- Dev projects ----------
  const PROJECTS = [
    {
      title: 'Holy Angel University IDMO Employee Portal', desc: 'Employee Portal for Holy Angel University, streamlining HR processes and data management.',
      img: 'works/hauoieidmo.png', site: 'hau-oie-idmo.com', role: ['Full-Stack Developer', 'UX/UI Designer'], langs: ['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger']
    },
    {
      title: 'Kayantabe', desc: 'A dynamic volunteerism web platform designed to connect passionate individuals with local community initiatives.',
      img: 'works/kayantabe.png', site: 'kayantabe.com', role: ['Full-Stack Developer', 'Project Lead'], langs: ['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger']
    },
    {
      title: 'Umbra', desc: 'A web application that connects students and parents with nearby tutors. It offers a seamless platform for finding, booking, and managing tutoring sessions.',
      img: 'works/umbra.png', site: 'umbra-app.com', role: ['Full-Stack Developer', 'UX/UI Designer'], langs: ['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger']
    },
    {
      title: 'Pina Management CMS', desc: 'Custom CMS portal for a real estate company — property listings, client records, and transactions. Focused on streamlining workflows and a user-friendly interface.',
      img: 'works/pina.png', site: 'In progress', role: ['Database Administrator', 'Full-Stack Developer'], langs: ['React', 'Supabase']
    },
    {
      title: 'SPUR Landing Page', desc: 'Responsive landing page showcasing the SPUR mobile app. Modern, engaging layout aligned with the brand to drive interest and downloads.',
      img: 'works/joinspur.png', site: 'joinspurapp.com', role: ['UX/UI Designer', 'Full-Stack Developer'], langs: ['React', 'Supabase']
    },
    {
      title: 'SPUR Mobile App', desc: 'Location-based app connecting you with people who share your passion for sports and fitness. Match by skill, find local events, build your squad.',
      img: 'works/spurapp.png', site: 'In progress', role: ['Mobile Developer', 'UX/UI Designer'], langs: ['React Native', 'Javascript', 'Firebase']
    },
    {
      title: 'The Zepatide', desc: 'Professional website establishing a strong brand identity for medical-grade products. Clean, trustworthy design that communicates quality.',
      img: 'works/zepatide.png', site: 'thezepatide.com', role: ['UX/UI Designer', 'Front-end Developer'], langs: ['React', 'Supabase']
    },
    {
      title: 'IMMFI', desc: 'Modern, user-friendly layout using updated design principles and front-end technologies. Enhanced UX while maintaining brand identity.',
      img: 'works/immfi.png', site: 'immfi.org', role: ['UX/UI Designer', 'Front-end Developer'], langs: ['Wordpress', 'Elementor']
    },
    {
      title: 'Connect4 by Dale', desc: 'A browser-based Connect Four game with two-player drop logic, win detection, and a clean responsive layout — vanilla JavaScript.',
      img: 'works/connect4.png', site: 'bedaniadale.github.io/daleconnect4', role: ['Full-Stack Developer'], langs: ['HTML', 'CSS', 'Javascript']
    },
    {
      title: 'GitHub DevFinder', desc: 'Frontend challenge app that searches GitHub users and displays profile details from the GitHub API — accessible layout, loading states, and API handling.',
      img: 'works/devfinder.png', site: 'bedaniadale.github.io/devfinder', role: ['Full-Stack Developer'], langs: ['HTML', 'CSS', 'Javascript']
    },
    {
      title: 'ResumeForge', desc: 'Fill in your details once — ResumeForge generates a polished, ATS-friendly resume PDF styled after the iconic Harvard format.',
      img: 'works/resumeforge.png', site: 'In progress', role: ['Full-Stack Developer', 'UX/UI Designer'], langs: ['React', 'Node.js', 'Tailwind CSS', 'PDF Generation']
    },
    {
      title: 'ZoneBridge', desc: 'Drop a pin on any city or GPS coordinate and instantly see the exact time gap between it and anywhere else in the world.',
      img: 'works/zonebridge.png', site: 'In progress', role: ['Full-Stack Developer', 'UX/UI Designer'], langs: ['React', 'Tailwind CSS', 'Mapbox GL', 'Javascript']
    },
  ];

  // ---------- Experience roadmap ----------
  const EXPERIENCE = [
    { year: 'Jan 2026 - May 2026', title: 'Graphic Designer', where: 'CompleteVitalityLife' },
    { year: 'Jul 2025', title: 'Full Stack Web Developer', where: 'Pina Realty Management' },
    { year: 'Jul 2025', title: 'Full Stack Web Developer', where: 'Direct Client (Australia-based)' },
    { year: 'Apr 2025', title: 'Graduated BSIT Web Development', where: 'Holy Angel University' },
    { year: 'Jun 2024 – Nov 2024', title: 'Full Stack Web Developer (Intern)', where: 'Holy Angel University' },
    { year: 'Apr 2024 – Jul 2024', title: 'Graphic Designer (Freelance)', where: 'NILEliteGears & CompleteVitalityLife' },
    { year: '2015', title: 'Hello World! 👋', where: 'Wrote my first line of code' },
  ];

  // ---------- Services (all 9 from main) ----------
  const SERVICES = [
    { num: '01', h: 'Full-stack Web Development', p: 'Your idea, fully built — front to back. Clean code, scalable architecture, and a product your users will love from day one.', preview: 'dalefuture.png' },
    { num: '02', h: 'System Design & Architecture', p: 'Blueprints that scale — modular, clean, and built to handle real traffic.', preview: 'flowg.png' },
    { num: '03', h: 'Database Management', p: 'Fast queries, clean schemas, zero data loss.', preview: 'artboard-1-100-1.webp' },
    { num: '04', h: 'UX / UI Design', p: 'Interfaces users enjoy — intuitive, beautiful, and built to convert.', preview: 'meetourteam-2.webp' },
    { num: '05', h: 'Mobile Development', p: 'iOS & Android from one codebase — native-feeling, shipped faster.', preview: 'dp2022.webp' },
    { num: '06', h: 'API Development & Integration', p: 'RESTful APIs, third-party services, webhooks, microservices — wired up cleanly so your stack just works.', preview: 'welcomeback2.webp' },
    { num: '07', h: 'Hosting & Domains', p: 'Live, fast, and secure. Domains, SSL, and deployment handled end-to-end.', preview: 'finalmem.png' },
    { num: '08', h: 'Workflow & Business Automation', p: 'Custom scripts, Zapier flows, and integrated pipelines that give your team hours back every week.', preview: 'bday_dale2-1.png' },
    { num: '09', h: 'Graphic Design', p: 'Visuals that stop the scroll — brand assets, social media, and marketing materials.', preview: 'dalefuture.png' },
  ];

  // ---------- Awards ----------
  const AWARDS = [
    { icon: '🎖️', text: 'Most Outstanding Graduating Student per Program' },
    { icon: '🎖️', text: 'Most Outstanding On-the-Job Trainee per Program' },
    { icon: '🎖️', text: "Dean's Lister (2022–2024)" },
    { icon: '🎖️', text: "President's Lister" },
    { icon: '🏆', text: 'HAFRD — Academic Scholarship Recipient' },
    { icon: '🎯', text: "Code Geeks' President (A.Y 2023–2024)" },
  ];

  /* ===================================================
     Loader
     =================================================== */
  function runLoader() {
    const loader = document.getElementById('loader');
    const num = document.getElementById('loaderNum');
    const bar = document.getElementById('loaderBar');
    if (!loader) return Promise.resolve();
    document.body.classList.add('loading');

    return new Promise((resolve) => {
      let progress = 0;
      const tick = () => {
        progress += Math.random() * 9 + 3;
        if (progress > 100) progress = 100;
        if (num) num.textContent = String(Math.floor(progress));
        if (bar) bar.style.width = progress + '%';
        if (progress < 100) {
          setTimeout(tick, 85);
        } else {
          setTimeout(() => {
            loader.classList.add('is-done');
            document.body.classList.remove('loading');
            resolve();
          }, 360);
        }
      };
      tick();
    });
  }

  /* ===================================================
     Smooth scroll (Lenis)
     =================================================== */
  let lenis = null;
  function initLenis() {
    if (prefersReducedMotion) return;
    if (typeof Lenis !== 'function') return;
    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -40, duration: 1.4 });
      });
    });
  }

  /* ===================================================
     Scroll progress + nav hide on scroll-down
     =================================================== */
  function initScrollChrome() {
    const prog = document.getElementById('scrollProgress');
    const nav = document.getElementById('nav');
    let lastY = window.scrollY;
    function onScroll() {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const height = (h.scrollHeight - h.clientHeight) || 1;
      if (prog) prog.style.width = (scrolled / height) * 100 + '%';

      const y = window.scrollY;
      if (nav) {
        if (y > 120 && y > lastY) nav.classList.add('hidden');
        else nav.classList.remove('hidden');
      }
      lastY = y;
    }
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ===================================================
     Live Manila clock
     =================================================== */
  function initClock() {
    const el = document.getElementById('liveClock');
    if (!el) return;
    function tick() {
      try {
        const now = new Date();
        el.textContent = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: false,
        });
      } catch (_) {
        const d = new Date();
        el.textContent = d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
      }
    }
    tick();
    setInterval(tick, 30 * 1000);
  }

  /* ===================================================
     Custom cursor + magnetic + cursor labels
     =================================================== */
  function initCursor() {
    if (isCoarsePointer) return;
    const cursor = document.getElementById('customCursor');
    const label = document.getElementById('cursorLabel');
    if (!cursor) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    function render() {
      cx += (tx - cx) * 0.28;
      cy += (ty - cy) * 0.28;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(render);
    }
    render();

    const hoverSelectors = 'a, button, .chip, .bento-item, .feature-card, .service, .project-card, .roadmap-item, .stack-chip, [data-cursor], [data-magnetic]';
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest(hoverSelectors);
      if (!t) return;
      cursor.classList.add('is-hover');
      const lbl = t.getAttribute('data-cursor');
      if (lbl) {
        if (label) label.textContent = lbl;
        cursor.classList.add('has-label');
      }
    });
    document.addEventListener('mouseout', (e) => {
      const t = e.target.closest(hoverSelectors);
      if (!t) return;
      cursor.classList.remove('is-hover');
      cursor.classList.remove('has-label');
    });
    document.addEventListener('mousedown', () => cursor.classList.add('is-active'));
    document.addEventListener('mouseup', () => cursor.classList.remove('is-active'));
  }

  function initMagnetic() {
    if (isCoarsePointer || prefersReducedMotion) return;
    const targets = document.querySelectorAll('[data-magnetic]');
    targets.forEach((el) => {
      const strength = 0.3;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ===================================================
     Reveal on scroll
     =================================================== */
  function initReveals() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            ent.target.classList.add('in');
            io.unobserve(ent.target);
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
    );
    items.forEach((el, i) => {
      el.style.setProperty('--rd', (i % 6) * 60 + 'ms');
      io.observe(el);
    });
  }

  /* ===================================================
     Count-up stats
     =================================================== */
  function initCountUps() {
    const nodes = document.querySelectorAll('.about-stats b[data-count]');
    if (!nodes.length) return;
    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      nodes.forEach((n) => { n.textContent = n.getAttribute('data-count'); });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((ent) => {
        if (!ent.isIntersecting) return;
        const n = ent.target;
        const target = parseFloat(n.getAttribute('data-count')) || 0;
        const duration = 1400;
        const start = performance.now();
        function step(now) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          n.textContent = String(Math.round(target * eased));
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(n);
      });
    }, { threshold: 0.4 });
    nodes.forEach((n) => io.observe(n));
  }

  /* ===================================================
     Awards, Roadmap, Services
     =================================================== */
  function renderAwards() {
    const wrap = document.getElementById('awardsList');
    if (!wrap) return;
    wrap.innerHTML = AWARDS.map((a) =>
      `<div class="award-row">
        <span class="award-icon">${a.icon}</span>
        <span class="award-text">${esc(a.text)}</span>
      </div>`
    ).join('');
  }

  function renderRoadmap() {
    const wrap = document.getElementById('roadmap');
    if (!wrap) return;
    wrap.innerHTML = EXPERIENCE.map((e, i) =>
      `<li class="roadmap-item reveal" style="--rd:${i * 60}ms">
        <span class="roadmap-year">${esc(e.year)}</span>
        <span class="roadmap-dot" aria-hidden="true"></span>
        <div class="roadmap-body">
          <h3 class="roadmap-title">${esc(e.title)}</h3>
          <p class="roadmap-where">${esc(e.where)}</p>
        </div>
      </li>`
    ).join('');
  }

  function renderServices() {
    const wrap = document.getElementById('serviceList');
    if (!wrap) return;
    wrap.innerHTML = SERVICES.map((s) =>
      `<li class="service reveal" data-cursor="view">
        <span class="service-num">${s.num}</span>
        <div class="service-body">
          <h3>${esc(s.h)}</h3>
          <p>${esc(s.p)}</p>
        </div>
        <span class="service-arrow"><i class="fa-solid fa-arrow-up-right"></i></span>
        <div class="service-preview" aria-hidden="true"><img src="${GRAPHICS_BASE}${esc(s.preview)}" alt="" /></div>
      </li>`
    ).join('');
  }

  /* ===================================================
     Projects grid (designer-styled dev cards)
     =================================================== */
  function projectSiteLabel(site) {
    if (site === 'In progress') return 'Preview';
    let s = String(site).replace(/^https?:\/\//i, '').trim();
    if (s.length > 42) return s.slice(0, 39) + '…';
    return s;
  }
  function projectLink(site) {
    return site === 'In progress' ? '#home' : 'https://' + site;
  }
  function projectTarget(site) {
    return site === 'In progress' ? '' : '_blank';
  }

  function renderProjects() {
    const wrap = document.getElementById('projectsGrid');
    if (!wrap) return;
    wrap.innerHTML = PROJECTS.map((p, i) => {
      const roles = p.role.map((r) => `<span class="tag tag--role">${esc(r)}</span>`).join('');
      const langs = p.langs.map((l) => `<span class="tag tag--lang" style="display:inline-flex;align-items:center;gap:4px;">${techIcon(l)}${esc(l)}</span>`).join('');
      return `
        <article class="project-card reveal" data-project-index="${i}" data-cursor="open">
          <div class="project-browser">
            <div class="project-chrome" aria-hidden="true">
              <span class="project-dots">
                <span class="project-dot project-dot--r"></span>
                <span class="project-dot project-dot--y"></span>
                <span class="project-dot project-dot--g"></span>
              </span>
              <span class="project-url">${esc(projectSiteLabel(p.site))}</span>
            </div>
            <div class="project-viewport">
              <img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy" decoding="async" />
            </div>
          </div>

          <div class="project-body">
            <div class="project-index">${String(i + 1).padStart(2, '0')}</div>
            <h3 class="project-title">${esc(p.title)}</h3>
            <p class="project-desc">${esc(p.desc)}</p>
            <div class="project-tags">${roles}${langs}</div>
            <div class="project-actions">
              <button type="button" class="btn btn--ghost btn--sm project-details-btn" data-project-index="${i}" data-magnetic>
                View details
              </button>
              <a href="${esc(projectLink(p.site))}" target="${esc(projectTarget(p.site))}" rel="noopener noreferrer"
                 class="btn btn--primary btn--sm" data-magnetic data-cursor="visit">
                <span>${p.site === 'In progress' ? 'Coming soon' : 'Visit'}</span>
                <i class="fa-solid fa-arrow-up-right"></i>
              </a>
            </div>
          </div>
        </article>`;
    }).join('');

    bindProjectModal();
    if (typeof Iconify !== 'undefined') Iconify.scan(wrap);
  }

  function bindProjectModal() {
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('projectModalBody');
    const grid = document.getElementById('projectsGrid');
    const closeBtn = document.getElementById('closeProjectModal');
    const backdrop = document.querySelector('[data-close-project]');
    if (!modal || !body || !grid) return;

    function open(i) {
      const p = PROJECTS[i];
      if (!p) return;
      const roles = p.role.map((r) => `<span class="tag tag--role">${esc(r)}</span>`).join('');
      const langs = p.langs.map((l) => `<span class="tag tag--lang" style="display:inline-flex;align-items:center;gap:4px;">${techIcon(l)}${esc(l)}</span>`).join('');
      body.innerHTML = `
        <div class="project-browser project-browser--lg">
          <div class="project-chrome" aria-hidden="true">
            <span class="project-dots">
              <span class="project-dot project-dot--r"></span>
              <span class="project-dot project-dot--y"></span>
              <span class="project-dot project-dot--g"></span>
            </span>
            <span class="project-url">${esc(projectSiteLabel(p.site))}</span>
          </div>
          <div class="project-viewport project-viewport--lg">
            <img src="${esc(p.img)}" alt="${esc(p.title)}" />
          </div>
        </div>
        <h4 class="project-modal-title">${esc(p.title)}</h4>
        <p class="project-modal-desc">${esc(p.desc)}</p>
        <div class="project-tags">${roles}${langs}</div>
        <a href="${esc(projectLink(p.site))}" target="${esc(projectTarget(p.site))}" rel="noopener noreferrer"
           class="btn btn--primary" data-magnetic>
          <span>${p.site === 'In progress' ? 'Coming soon' : 'Visit site'}</span>
          <i class="fa-solid fa-arrow-up-right"></i>
        </a>`;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      if (typeof Iconify !== 'undefined') Iconify.scan(body);
      if (lenis) lenis.stop();
    }

    function close() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      if (lenis) lenis.start();
    }

    grid.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-project-index]');
      if (!trigger) return;
      // if clicking the Visit link, don't open modal
      if (e.target.closest('a')) return;
      const idx = Number(trigger.getAttribute('data-project-index'));
      open(idx);
    });
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
  }

  /* ===================================================
     CV Modal
     =================================================== */
  function bindCvModal() {
    const modal = document.getElementById('cvModal');
    const openBtn = document.getElementById('openCvModal');
    const closeBtn = document.getElementById('closeCvModal');
    const backdrop = document.querySelector('[data-close-cv]');
    if (!modal) return;
    function open() {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      if (lenis) lenis.stop();
    }
    function close() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      if (lenis) lenis.start();
    }
    if (openBtn) openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
  }

  /* ===================================================
     Featured graphics rail
     =================================================== */
  function buildFeaturedRail() {
    const rail = document.getElementById('featureRail');
    if (!rail) return;
    rail.innerHTML = WORKS.filter((w) => w.featured).map((w) => `
      <article class="feature-card" data-src="${esc(w.src)}" data-title="${esc(w.title)}">
        <div class="feature-media">
          <img src="${esc(w.src)}" alt="${esc(w.title)}" loading="lazy" decoding="async" />
        </div>
        <div class="feature-body">
          <h3 class="feature-title">${esc(w.title)}</h3>
          <span class="feature-tag">${esc(w.tag)}</span>
        </div>
      </article>`).join('');

    // reveal on enter
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const cards = rail.querySelectorAll('.feature-card');
      const io = new IntersectionObserver(
        (entries) => entries.forEach((ent) => {
          if (ent.isIntersecting) { ent.target.classList.add('in'); io.unobserve(ent.target); }
        }),
        { rootMargin: '0px 0px -80px 0px', threshold: 0.05 }
      );
      cards.forEach((c) => io.observe(c));
    } else {
      rail.querySelectorAll('.feature-card').forEach((c) => c.classList.add('in'));
    }

    // drag-to-scroll
    let isDown = false, startX = 0, scrollLeft = 0, moved = 0;
    rail.addEventListener('mousedown', (e) => {
      isDown = true; moved = 0;
      startX = e.pageX - rail.offsetLeft;
      scrollLeft = rail.scrollLeft;
      rail.classList.add('is-dragging');
    });
    window.addEventListener('mouseup', () => { isDown = false; rail.classList.remove('is-dragging'); });
    rail.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - rail.offsetLeft;
      const walk = (x - startX) * 1.4;
      moved = Math.abs(walk);
      rail.scrollLeft = scrollLeft - walk;
    });
    rail.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        rail.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, { passive: false });

    rail.addEventListener('click', (e) => {
      if (moved > 6) return;
      const card = e.target.closest('.feature-card');
      if (!card) return;
      openLightbox(card.getAttribute('data-src'), card.getAttribute('data-title'));
    });
  }

  /* ===================================================
     Bento grid (aspect-aware)
     =================================================== */
  function shapeFromRatio(r) {
    if (!Number.isFinite(r) || r <= 0) return 'wide';
    if (r < 0.52) return 'tall-xl';
    if (r < 0.98) return 'tall';
    if (r >= 0.98 && r <= 1.06) return 'feature';
    if (r > 1.06 && r <= 1.48) return 'wide';
    if (r > 1.48 && r <= 2.35) return 'wide-lg';
    return 'ultrawide';
  }
  function loadMeta(src) {
    return new Promise((resolve) => {
      const im = new Image();
      im.onload = () => resolve({ w: im.naturalWidth, h: im.naturalHeight });
      im.onerror = () => resolve({ w: 4, h: 3 });
      im.src = src;
    });
  }
  function buildBento() {
    const wrap = document.getElementById('bento');
    if (!wrap) return Promise.resolve();
    return Promise.all(WORKS.map((w) => loadMeta(w.src))).then((metas) => {
      wrap.innerHTML = WORKS.map((w, i) => {
        const m = metas[i];
        const r = m.h > 0 ? m.w / m.h : 1;
        const shape = shapeFromRatio(r);
        return `
          <button type="button" class="bento-item" data-shape="${shape}" data-tag="${esc(w.tag)}" data-src="${esc(w.src)}" data-title="${esc(w.title)}" aria-label="Open ${esc(w.title)}">
            <img src="${esc(w.src)}" alt="${esc(w.title)}" loading="lazy" decoding="async" />
            <span class="bento-cap">
              <span class="bento-cap-title">${esc(w.title)}</span>
              <span class="bento-cap-tag">${esc(w.tag)}</span>
            </span>
          </button>`;
      }).join('');

      if ('IntersectionObserver' in window && !prefersReducedMotion) {
        const items = wrap.querySelectorAll('.bento-item');
        const io = new IntersectionObserver(
          (entries) => entries.forEach((ent) => {
            if (ent.isIntersecting) {
              const idx = Array.from(wrap.children).indexOf(ent.target);
              setTimeout(() => ent.target.classList.add('in'), (idx % 8) * 50);
              io.unobserve(ent.target);
            }
          }),
          { rootMargin: '0px 0px -40px 0px', threshold: 0.05 }
        );
        items.forEach((it) => io.observe(it));
      } else {
        wrap.querySelectorAll('.bento-item').forEach((it) => it.classList.add('in'));
      }

      wrap.addEventListener('click', (e) => {
        const it = e.target.closest('.bento-item');
        if (!it) return;
        openLightbox(it.getAttribute('data-src'), it.getAttribute('data-title'));
      });
    });
  }

  /* ===================================================
     Filters
     =================================================== */
  function initFilters() {
    const bar = document.getElementById('filters');
    const grid = document.getElementById('bento');
    if (!bar || !grid) return;
    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      bar.querySelectorAll('.chip').forEach((c) => c.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.getAttribute('data-filter');
      grid.querySelectorAll('.bento-item').forEach((it) => {
        const tag = it.getAttribute('data-tag');
        if (filter === 'all' || tag === filter) it.classList.remove('is-hidden');
        else it.classList.add('is-hidden');
      });
    });
  }

  /* ===================================================
     Services — cursor-follow preview
     =================================================== */
  function initServicesFollow() {
    if (isCoarsePointer) return;
    document.querySelectorAll('.service').forEach((li) => {
      li.addEventListener('mousemove', (e) => {
        const r = li.getBoundingClientRect();
        const mx = (e.clientX - (r.left + r.width / 2)) * 0.4;
        const my = (e.clientY - (r.top + r.height / 2)) * 0.3;
        li.style.setProperty('--mx', mx + 'px');
        li.style.setProperty('--my', my + 'px');
      });
      li.addEventListener('mouseleave', () => {
        li.style.setProperty('--mx', '0px');
        li.style.setProperty('--my', '0px');
      });
    });
  }

  /* ===================================================
     Lightbox (graphics)
     =================================================== */
  let lbCurrentIndex = -1;
  let lbList = [];
  function openLightbox(src, title) {
    const box = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCap');
    if (!box || !img) return;
    lbList = WORKS.slice();
    const idx = lbList.findIndex((w) => w.src === src);
    lbCurrentIndex = idx >= 0 ? idx : 0;
    img.src = src;
    img.alt = title || '';
    if (cap) cap.textContent = title || '';
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    if (lenis) lenis.stop();
  }
  function closeLightbox() {
    const box = document.getElementById('lightbox');
    if (!box) return;
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lenis) lenis.start();
  }
  function navLightbox(dir) {
    if (!lbList.length) return;
    lbCurrentIndex = (lbCurrentIndex + dir + lbList.length) % lbList.length;
    const item = lbList[lbCurrentIndex];
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCap');
    if (img) {
      img.style.opacity = 0;
      setTimeout(() => {
        img.src = item.src;
        img.alt = item.title || '';
        if (cap) cap.textContent = item.title || '';
        img.style.opacity = 1;
      }, 160);
    }
  }
  function initLightboxControls() {
    const box = document.getElementById('lightbox');
    if (!box) return;
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', () => navLightbox(-1));
    document.getElementById('lightboxNext').addEventListener('click', () => navLightbox(1));
    box.addEventListener('click', (e) => { if (e.target === box) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') navLightbox(1);
      else if (e.key === 'ArrowLeft') navLightbox(-1);
    });
  }

  /* ===================================================
     Hero title parallax
     =================================================== */
  function initHeroParallax() {
    if (prefersReducedMotion) return;
    const title = document.querySelector('.hero-title');
    if (!title) return;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > window.innerHeight) return;
      title.style.transform = `translateY(${y * 0.15}px)`;
      title.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.9)));
    }, { passive: true });
  }

  /* ===================================================
     Boot
     =================================================== */
  function boot() {
    // data-driven renders (must come before reveal init)
    renderAwards();
    renderRoadmap();
    renderServices();
    renderProjects();

    initClock();
    initCursor();
    initMagnetic();
    initScrollChrome();
    initReveals();
    initCountUps();
    initLenis();
    initHeroParallax();
    buildFeaturedRail();
    buildBento().then(() => { initFilters(); });
    initServicesFollow();
    initLightboxControls();
    bindCvModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { runLoader(); boot(); });
  } else {
    runLoader();
    boot();
  }
})();
