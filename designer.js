/* =====================================================
   designer.js — Dale Bedania · Studio portfolio (light)
   Standalone vanilla JS. Requires Lenis + techstacks.js.
   Data mirrors the classic view (projects.js) so the two
   stay in sync: full case studies, certifications, tech.
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
    'vercel':         'logos:vercel-icon',
    'pdf generation': 'mdi:file-pdf-box',
  };

  function techIcon(name) {
    const icon = TECH_ICON_MAP[name.toLowerCase()];
    if (!icon) return '';
    return `<span class="iconify" data-icon="${icon}" style="font-size:14px;flex-shrink:0;"></span>`;
  }

  /* ===================================================
     DATA — single source of truth, mirrors classic view
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

  // ---------- Dev projects (mirrors projects.js, incl. case studies) ----------
  const PROJECTS = [
    {
      title: 'Holy Angel University IDMO Employee Portal',
      desc: 'Employee Portal for Holy Angel University, streamlining HR processes and data management.',
      img: 'works/hauoieidmo.png', site: 'hau-oie-idmo.com',
      role: ['Full-Stack Developer', 'UX/UI Designer'],
      langs: ['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger'],
      caseStudy: {
        problem: 'The IDMO managed employee records and HR requests through manual, document-heavy processes that were slow to search, easy to duplicate, and hard to keep consistent.',
        approach: [
          'Built a centralized Laravel portal with role-based access for HR staff and employees.',
          'Designed clean, intuitive UX/UI flows so non-technical staff could manage records without training.',
          'Modeled an optimized MySQL schema for fast, reliable lookups across employee data.',
          'Deployed and configured production hosting on Hostinger with SSL.',
        ],
        outcome: [
          'Replaced scattered manual tracking with a single source of truth for employee data.',
          'Gave HR and employees fast self-service access to records and requests.',
          'Cut down repetitive paperwork and made employee information searchable in seconds.',
        ],
      },
    },
    {
      title: 'Kayantabe',
      desc: 'A dynamic volunteerism web platform designed to connect passionate individuals with local community initiatives.',
      img: 'works/kayantabe.png', site: 'kayantabe.com',
      role: ['Full-Stack Developer', 'Project Lead'],
      langs: ['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger'],
      caseStudy: {
        problem: 'Local community initiatives struggled to reach and coordinate volunteers, relying on fragmented social-media posts with no central place to discover, sign up for, or manage activities.',
        approach: [
          'Led the project end-to-end and built the platform on Laravel.',
          'Created flows for organizations to post initiatives and for volunteers to discover and join them.',
          'Designed a responsive, mobile-first UI to make sign-up frictionless.',
          'Structured the data model so organizers could track participation per initiative.',
        ],
        outcome: [
          'Gave volunteers and organizers one platform to connect, replacing scattered social posts.',
          'Made it simple for organizations to launch initiatives and grow their volunteer base.',
          'Streamlined sign-ups so more people could get involved with far less friction.',
        ],
      },
    },
    {
      title: 'Umbra',
      desc: 'A web application that connects students and parents with nearby tutors. It offers a seamless platform for finding, booking, and managing tutoring sessions — designed to make learning more accessible and personalized.',
      img: 'works/umbra.png', site: 'umbra-app.com',
      role: ['Full-Stack Developer', 'UX/UI Designer'],
      langs: ['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger'],
    },
    {
      title: 'Pina Management CRM',
      desc: 'A custom CRM portal tailored for a real estate company — property listings, client records, and transactions. Focused on streamlining workflows and a user-friendly interface.',
      img: 'works/pina.png', site: 'Client-based project',
      role: ['Database Administrator', 'Full-Stack Developer'],
      langs: ['React', 'Supabase', 'Vercel'],
      caseStudy: {
        problem: 'A real estate company tracked property listings, client records, and transactions across spreadsheets and disconnected tools, making day-to-day operations slow and error-prone.',
        approach: [
          'Built a custom CRM with React and Supabase tailored to their real-estate workflow.',
          'Structured the database for listings, clients, and transactions with data integrity in mind.',
          "Focused the interface on the team's daily tasks to reduce friction and training time.",
        ],
        outcome: [
          'Centralizes listings, clients, and transactions into one operational portal.',
          'Replaces error-prone spreadsheets with a single, reliable source of truth.',
          "Speeds up daily operations with workflows built around the team's real tasks.",
        ],
      },
    },
    {
      title: 'SPUR Landing Page',
      desc: 'Responsive landing page showcasing the SPUR mobile app. Modern, engaging layout aligned with the brand to drive interest and downloads.',
      img: 'works/joinspur.png', site: 'joinspurapp.com',
      role: ['UX/UI Designer', 'Full-Stack Developer'],
      langs: ['React', 'Supabase', 'Vercel'],
    },
    {
      title: 'SPUR Mobile App',
      desc: 'Location-based app connecting you with people who share your passion for sports and fitness. Match by skill, find local events, build your squad.',
      img: 'works/spurapp.png', site: 'Client-based project',
      role: ['Mobile Developer', 'UX/UI Designer'],
      langs: ['React Native', 'Javascript', 'Firebase'],
    },
    {
      title: 'The Zepatide',
      desc: 'Professional website establishing a strong brand identity for medical-grade products. Clean, trustworthy design that communicates quality.',
      img: 'works/zepatide.png', site: 'thezepatide.com',
      role: ['UX/UI Designer', 'Front-end Developer'],
      langs: ['React', 'Supabase', 'Vercel'],
    },
    {
      title: 'IMMFI',
      desc: 'Modern, user-friendly layout using updated design principles and front-end technologies. Enhanced UX while maintaining brand identity.',
      img: 'works/immfi.png', site: 'immfi.org',
      role: ['UX/UI Designer', 'Front-end Developer'],
      langs: ['Wordpress', 'Elementor'],
    },
    {
      title: 'Connect4 by Dale',
      desc: 'A browser-based Connect Four game with two-player drop logic, win detection, and a clean responsive layout — vanilla JavaScript.',
      img: 'works/connect4.png', site: 'bedaniadale.github.io/daleconnect4',
      role: ['Full-Stack Developer'],
      langs: ['HTML', 'CSS', 'Javascript'],
    },
    {
      title: 'GitHub DevFinder',
      desc: 'Frontend challenge app that searches GitHub users and displays profile details from the GitHub API — accessible layout, loading states, and API handling.',
      img: 'works/devfinder.png', site: 'bedaniadale.github.io/devfinder',
      role: ['Full-Stack Developer'],
      langs: ['HTML', 'CSS', 'Javascript'],
    },
    {
      title: 'ResumeForge',
      desc: 'Fill in your details once — ResumeForge generates a polished, ATS-friendly resume PDF styled after the iconic Harvard format.',
      img: 'works/resumeforge.png', site: 'Client-based project',
      role: ['Full-Stack Developer', 'UX/UI Designer'],
      langs: ['React', 'Node.js', 'Tailwind CSS', 'PDF Generation'],
    },
    {
      title: 'ZoneBridge',
      desc: 'Drop a pin on any city or GPS coordinate and instantly see the exact time gap between it and anywhere else in the world.',
      img: 'works/zonebridge.png', site: 'Client-based project',
      role: ['Full-Stack Developer', 'UX/UI Designer'],
      langs: ['React', 'Tailwind CSS', 'Mapbox GL', 'Javascript'],
    },
  ];

  // ---------- Experience roadmap ----------
  const EXPERIENCE = [
    { year: 'Jan 2026 – May 2026', title: 'Graphic Designer', where: 'CompleteVitalityLife' },
    { year: 'Jul 2025', title: 'Full Stack Web Developer', where: 'Pina Realty Management' },
    { year: 'Jul 2025', title: 'Full Stack Web Developer', where: 'Direct Client (Australia-based)' },
    { year: 'Apr 2025', title: 'Graduated BSIT — Web Development', where: 'Holy Angel University' },
    { year: 'Jun 2024 – Nov 2024', title: 'Full Stack Web Developer (Intern)', where: 'Holy Angel University' },
    { year: 'Apr 2024 – Jul 2024', title: 'Graphic Designer (Freelance)', where: 'NILEliteGears & CompleteVitalityLife' },
    { year: '2015', title: 'Hello World! 👋', where: 'Wrote my first line of code' },
  ];

  // ---------- Services (client-benefit copy, mirrors classic) ----------
  const SERVICES = [
    { num: '01', h: 'Full-stack Web Development', p: 'End-to-end web applications built with clean code, scalable architecture, and high performance.', preview: 'dalefuture.png' },
    { num: '02', h: 'System Design & Architecture', p: 'Scalable, modular system blueprints designed to handle high traffic and ensure maximum uptime.', preview: 'flowg.png' },
    { num: '03', h: 'Database Management', p: 'Optimized databases with fast queries, clean schemas, and robust data integrity.', preview: 'artboard-1-100-1.webp' },
    { num: '04', h: 'UX / UI Designing', p: 'Intuitive, high-converting user interfaces designed for premium digital experiences.', preview: 'meetourteam-2.webp' },
    { num: '05', h: 'Mobile Development', p: 'Cross-platform iOS and Android applications delivering native performance and speed.', preview: 'dp2022.webp' },
    { num: '06', h: 'API Development & Integration', p: 'Custom RESTful APIs, secure third-party integrations, and scalable microservices.', preview: 'welcomeback2.webp' },
    { num: '07', h: 'Hosting & Domains', p: 'End-to-end cloud deployments, domain management, and secure SSL configuration.', preview: 'finalmem.png' },
    { num: '08', h: 'Workflow & Business Automation', p: 'Custom scripts, Zapier integrations, and automated pipelines to optimize business operations.', preview: 'bday_dale2-1.png' },
    { num: '09', h: 'Graphics Design', p: 'High-impact marketing collateral, digital brand assets, and scroll-stopping visuals.', preview: 'dalefuture.png' },
  ];

  // ---------- Academic honours ----------
  const AWARDS = [
    { icon: '🎖️', text: 'Most Outstanding Graduating Student per Program' },
    { icon: '🎖️', text: 'Most Outstanding On-the-Job Trainee per Program' },
    { icon: '🎖️', text: "Dean's Lister (2022–2024)" },
    { icon: '🎖️', text: "President's Lister" },
    { icon: '🏆', text: 'HAFRD — Academic Scholarship Recipient' },
    { icon: '🎯', text: "Code Geeks' President (A.Y 2023–2024)" },
  ];

  // ---------- Professional certifications (mirrors classic view) ----------
  const CERTS = [
    { name: 'Red Hat Certified System Administrator', acronym: 'RHCSA', issuer: 'Red Hat', color: '#EE0000', icon: 'red-hat', date: 'Nov 2021', tag: 'Industry Standard', featured: true, adapt: false },
    { name: 'CCNA Cyber Ops', issuer: 'Cisco', color: '#1BA0D7', icon: 'cisco', date: 'Nov 2023', tag: 'Networking', adapt: true },
    { name: 'JavaScript Essentials 1', issuer: 'Cisco', color: '#1BA0D7', icon: 'cisco', date: 'Sept 2024', tag: 'Development', adapt: true },
    { name: 'Google Analytics Certification', issuer: 'Google', color: '#4285F4', icon: 'google', date: 'Oct 2023', tag: 'Analytics', adapt: false },
    { name: 'Use Google Analytics for Your Business', issuer: 'Google', color: '#4285F4', icon: 'google', date: 'Oct 2023', tag: 'Analytics', adapt: false },
    { name: 'Get Started using Google Analytics', issuer: 'Google', color: '#4285F4', icon: 'google', date: 'Oct 2023', tag: 'Analytics', adapt: false },
    { name: 'SEO Certification', issuer: 'HubSpot Academy', color: '#FF7A59', icon: 'hubspot', date: 'Oct 2023', tag: 'Marketing', adapt: false },
    { name: 'SEO II Certification', issuer: 'HubSpot Academy', color: '#FF7A59', icon: 'hubspot', date: 'Oct 2023', tag: 'Marketing', adapt: false },
    { name: 'Introduction to Cybersecurity', issuer: 'Cisco', color: '#1BA0D7', icon: 'cisco', date: 'Nov 2021', tag: 'Security', adapt: true },
    { name: 'Introduction to IoT', issuer: 'Cisco', color: '#1BA0D7', icon: 'cisco', date: 'Nov 2021', tag: 'Networking', adapt: true },
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
        progress += Math.random() * 10 + 4;
        if (progress > 100) progress = 100;
        if (num) num.textContent = String(Math.floor(progress));
        if (bar) bar.style.transform = `scaleX(${progress / 100})`;
        if (progress < 100) {
          setTimeout(tick, 78);
        } else {
          setTimeout(() => {
            loader.classList.add('is-done');
            document.body.classList.remove('loading');
            resolve();
          }, 320);
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
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    window.__lenis = lenis;
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
        lenis.scrollTo(target, { offset: -70, duration: 1.4 });
      });
    });
  }

  /* ===================================================
     Scroll progress + nav state
     =================================================== */
  function initScrollChrome() {
    const prog = document.getElementById('scrollProgress');
    const nav = document.getElementById('nav');
    let lastY = window.scrollY;
    function onScroll() {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const height = (h.scrollHeight - h.clientHeight) || 1;
      if (prog) prog.style.transform = `scaleX(${scrolled / height})`;

      const y = window.scrollY;
      if (nav) {
        nav.classList.toggle('is-scrolled', y > 40);
        if (y > 160 && y > lastY) nav.classList.add('hidden');
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
     Custom cursor + magnetic
     =================================================== */
  function initCursor() {
    if (isCoarsePointer) return;
    const cursor = document.getElementById('customCursor');
    const label = document.getElementById('cursorLabel');
    if (!cursor) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    function render() {
      cx += (tx - cx) * 0.3;
      cy += (ty - cy) * 0.3;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(render);
    }
    render();

    const hoverSelectors = 'a, button, .chip, .bento-item, .feature-card, .service, .work-card, .timeline-item, .stack-chip, .cert-card, [data-cursor], [data-magnetic]';
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
      const strength = 0.28;
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
    const nodes = document.querySelectorAll('[data-count]');
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
        const duration = 1500;
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
    }, { threshold: 0.5 });
    nodes.forEach((n) => io.observe(n));
  }

  /* ===================================================
     Awards, Roadmap, Services, Certs
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
      `<li class="timeline-item reveal" style="--rd:${i * 50}ms">
        <span class="timeline-dot" aria-hidden="true"></span>
        <span class="timeline-year">${esc(e.year)}</span>
        <div class="timeline-body">
          <h3 class="timeline-title">${esc(e.title)}</h3>
          <p class="timeline-where">${esc(e.where)}</p>
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
          <h3 class="service-name">${esc(s.h)}</h3>
          <p class="service-desc">${esc(s.p)}</p>
        </div>
        <span class="service-arrow"><i class="fa-solid fa-arrow-up-right"></i></span>
        <div class="service-preview" aria-hidden="true"><img src="${GRAPHICS_BASE}${esc(s.preview)}" alt="" /></div>
      </li>`
    ).join('');
  }

  function renderCerts() {
    const wrap = document.getElementById('certGrid');
    if (!wrap) return;
    wrap.innerHTML = CERTS.map((c) => {
      const adaptClass = c.adapt ? ' icon-theme-adapt' : '';
      const acronym = c.acronym ? ` <span class="cert-acronym">(${esc(c.acronym)})</span>` : '';
      return `
        <article class="cert-card${c.featured ? ' cert-card--featured' : ''} reveal" style="--ci:${c.color}">
          <div class="cert-head">
            <span class="cert-icon"><img src="https://thesvg.org/icons/${c.icon}/default.svg" width="22" height="22" alt="${esc(c.issuer)}" loading="lazy" class="cert-icon-img${adaptClass}" /></span>
            <span class="cert-issuer">${esc(c.issuer)}</span>
            <span class="cert-pill"><i class="fa-solid fa-circle-check"></i> Certified</span>
          </div>
          <p class="cert-name">${esc(c.name)}${acronym}</p>
          <div class="cert-foot">
            <span class="cert-date"><i class="fa-regular fa-calendar"></i> ${esc(c.date)}</span>
            <span class="cert-tag">${esc(c.tag)}</span>
          </div>
        </article>`;
    }).join('');
  }

  /* ===================================================
     Projects grid
     =================================================== */
  function projectSiteLabel(site) {
    if (site === 'Client-based project') return 'Client-based project';
    let s = String(site).replace(/^https?:\/\//i, '').trim();
    if (s.length > 42) return s.slice(0, 39) + '…';
    return s;
  }
  function projectLink(site) {
    return site === 'Client-based project' ? '#contact' : 'https://' + site;
  }
  function projectTarget(site) {
    return site === 'Client-based project' ? '' : '_blank';
  }
  function rolesHtml(p) {
    return p.role.map((r) => `<span class="tag tag--role">${esc(r)}</span>`).join('');
  }
  function langsHtml(p) {
    return p.langs.map((l) => `<span class="tag tag--lang">${techIcon(l)}${esc(l)}</span>`).join('');
  }

  function buildCaseStudy(cs) {
    if (!cs) return '';
    const steps = [];
    if (cs.problem) {
      steps.push(`
        <div class="cs-step cs-step--problem">
          <div class="cs-node"><i class="fa-solid fa-circle-exclamation"></i></div>
          <div class="cs-content">
            <h5 class="cs-label">The problem</h5>
            <p class="cs-text">${esc(cs.problem)}</p>
          </div>
        </div>`);
    }
    if (cs.approach && cs.approach.length) {
      const items = cs.approach.map((p) => `<li>${esc(p)}</li>`).join('');
      steps.push(`
        <div class="cs-step cs-step--approach">
          <div class="cs-node"><i class="fa-solid fa-screwdriver-wrench"></i></div>
          <div class="cs-content">
            <h5 class="cs-label">What I did</h5>
            <ul class="cs-list">${items}</ul>
          </div>
        </div>`);
    }
    if (cs.outcome && cs.outcome.length) {
      const cards = cs.outcome.map((p) =>
        `<div class="cs-outcome"><i class="fa-solid fa-circle-check"></i><span>${esc(p)}</span></div>`
      ).join('');
      steps.push(`
        <div class="cs-step cs-step--outcome">
          <div class="cs-node"><i class="fa-solid fa-trophy"></i></div>
          <div class="cs-content">
            <h5 class="cs-label">The outcome</h5>
            <div class="cs-outcomes">${cards}</div>
          </div>
        </div>`);
    }
    if (!steps.length) return '';
    return `
      <div class="case-study">
        <span class="cs-eyebrow"><i class="fa-solid fa-star"></i> Case study</span>
        <div class="cs-timeline">${steps.join('')}</div>
      </div>`;
  }

  function browserMockup(p, large) {
    return `
      <div class="browser${large ? ' browser--lg' : ''}">
        <div class="browser-bar" aria-hidden="true">
          <span class="browser-dots"><span></span><span></span><span></span></span>
          <span class="browser-url">${esc(projectSiteLabel(p.site))}</span>
        </div>
        <div class="browser-view">
          <img src="${esc(p.img)}" alt="${esc(p.title)}"${large ? '' : ' loading="lazy" decoding="async"'} />
        </div>
      </div>`;
  }

  function renderProjects() {
    const wrap = document.getElementById('projectsGrid');
    if (!wrap) return;
    wrap.innerHTML = PROJECTS.map((p, i) => {
      const hasCase = !!p.caseStudy;
      const detailsLabel = hasCase ? 'Read case study' : 'View details';
      const caseBadge = hasCase
        ? `<span class="work-badge"><i class="fa-solid fa-file-lines"></i> Case study</span>`
        : '';
      return `
        <article class="work-card reveal" data-project-index="${i}" data-cursor="open">
          <div class="work-media">
            ${browserMockup(p, false)}
            ${caseBadge}
          </div>
          <div class="work-body">
            <div class="work-top">
              <span class="work-index">${String(i + 1).padStart(2, '0')}</span>
              <h3 class="work-title">${esc(p.title)}</h3>
            </div>
            <p class="work-desc">${esc(p.desc)}</p>
            <div class="work-tags">${rolesHtml(p)}${langsHtml(p)}</div>
            <div class="work-actions">
              <button type="button" class="btn btn--ghost btn--sm work-details" data-project-index="${i}" data-magnetic>
                ${detailsLabel}
              </button>
              <a href="${esc(projectLink(p.site))}" target="${esc(projectTarget(p.site))}" rel="noopener noreferrer"
                 class="btn btn--primary btn--sm" data-magnetic data-cursor="visit">
                <span>${p.site === 'Client-based project' ? 'Private to client' : 'Visit'}</span>
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
      body.innerHTML = `
        <div class="pm-hero">${browserMockup(p, true)}</div>
        <p class="pm-eyebrow"><i class="fa-solid fa-globe"></i> ${esc(projectSiteLabel(p.site))}</p>
        <h4 class="pm-title">${esc(p.title)}</h4>
        <p class="pm-desc">${esc(p.desc)}</p>
        ${buildCaseStudy(p.caseStudy)}
        <div class="work-tags pm-tags">${rolesHtml(p)}${langsHtml(p)}</div>
        <a href="${esc(projectLink(p.site))}" target="${esc(projectTarget(p.site))}" rel="noopener noreferrer"
           class="btn btn--primary" data-magnetic>
          <span>${p.site === 'Client-based project' ? 'Private to client' : 'Visit site'}</span>
          <i class="fa-solid fa-arrow-up-right"></i>
        </a>`;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      if (body.parentElement) body.parentElement.scrollTop = 0;
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
      if (e.target.closest('a')) return; // let the Visit link work
      open(Number(trigger.getAttribute('data-project-index')));
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
        const mx = (e.clientX - (r.left + r.width / 2)) * 0.35;
        const my = (e.clientY - (r.top + r.height / 2)) * 0.25;
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
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navLightbox(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navLightbox(1));
    box.addEventListener('click', (e) => { if (e.target === box) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') navLightbox(1);
      else if (e.key === 'ArrowLeft') navLightbox(-1);
    });
  }

  /* ===================================================
     Hero parallax (portrait + headline drift)
     =================================================== */
  function initHeroParallax() {
    if (prefersReducedMotion) return;
    const portrait = document.querySelector('[data-parallax="portrait"]');
    const marks = document.querySelectorAll('[data-parallax="mark"]');
    if (!portrait && !marks.length) return;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return;
      if (portrait) portrait.style.transform = `translateY(${y * 0.06}px)`;
      marks.forEach((m, i) => {
        m.style.transform = `translateY(${y * (0.1 + i * 0.04)}px)`;
      });
    }, { passive: true });
  }

  /* ===================================================
     Boot
     =================================================== */
  function boot() {
    renderAwards();
    renderRoadmap();
    renderServices();
    renderProjects();
    renderCerts();

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
