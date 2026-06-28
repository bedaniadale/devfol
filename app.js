/* ============================================================================
   Dale Bedania — Portfolio app (rebuilt from scratch)
   Single, self-contained data + render + interaction layer.
   Palette: Soft White + Emerald. Plain HTML/CSS/JS, GitHub-Pages ready.
   ============================================================================ */
(function () {
  'use strict';

  /* ───────────────────────────── CONTENT DATA ───────────────────────────── */

  var STATS = [
    { value: 10, suffix: '+', label: 'apps shipped' },
    { value: 9,  suffix: '+', label: 'years coding' },
    { value: 100, suffix: '%', label: 'client focus' },
    { value: 5,  suffix: '.0', label: 'avg rating' }
  ];

  var ROTATE_WORDS = ['web products', 'mobile apps', 'CMS platforms', 'design systems'];

  var AWARDS = [
    '🎖️ Most Outstanding Graduating Student (per program)',
    '🎖️ Most Outstanding On-the-Job Trainee (per program)',
    '🎖️ Dean’s Lister (2022–2024)',
    '🎖️ President’s Lister',
    '🏆 HAFRD Academic Scholarship recipient',
    '🎯 Code Geeks’ President (A.Y. 2023–2024)'
  ];

  var SERVICES = [
    { icon: 'mdi:layers-triple-outline', title: 'Full-stack Web Development', desc: 'End-to-end web apps with clean code, scalable architecture, and high performance.', featured: true },
    { icon: 'mdi:sitemap-outline', title: 'System Design & Architecture', desc: 'Modular blueprints built to handle traffic and keep maximum uptime.' },
    { icon: 'mdi:database-cog-outline', title: 'Database Management', desc: 'Optimized databases — fast queries, clean schemas, solid data integrity.' },
    { icon: 'mdi:palette-outline', title: 'UX / UI Design', desc: 'Intuitive, high-converting interfaces for premium digital experiences.' },
    { icon: 'mdi:cellphone-cog', title: 'Mobile Development', desc: 'Cross-platform iOS & Android apps with native performance.' },
    { icon: 'mdi:api', title: 'API Development & Integration', desc: 'Custom REST APIs, secure third-party integrations, scalable microservices.', featured: true },
    { icon: 'mdi:cloud-cog-outline', title: 'Hosting & Domains', desc: 'Cloud deployments, domain management, and secure SSL configuration.' },
    { icon: 'mdi:robot-happy-outline', title: 'Workflow Automation', desc: 'Custom scripts, Zapier / n8n pipelines, and automated business operations.' },
    { icon: 'mdi:image-edit-outline', title: 'Graphic Design', desc: 'High-impact marketing collateral, brand assets, and scroll-stopping visuals.' }
  ];

  var STACK = [
    { label: 'AI & Dev Tools', items: [['Cursor','cursor',1],['ChatGPT','openai-chatgpt'],['Claude','claude'],['Gemini','google-gemini']] },
    { label: 'Frontend', items: [['JavaScript','javascript'],['TypeScript','typescript'],['React','react'],['Next.js','nextdotjs'],['Vue','vue'],['Angular','angular'],['Tailwind','tailwind-css'],['Bootstrap','bootstrap'],['Material UI','mui']] },
    { label: 'Mobile', items: [['React Native','react'],['Flutter','flutter'],['Dart','dart'],['Swift','swift']] },
    { label: 'Backend', items: [['Node.js','nodedotjs'],['Express','express'],['PHP','php'],['Laravel','laravel'],['Python','python'],['Django','django'],['Java','java'],['.NET','dotnet'],['Socket.io','socketdotio']] },
    { label: 'Database & Cloud', items: [['MySQL','mysql',1],['PostgreSQL','postgresql'],['MongoDB','mongodb'],['Supabase','supabase'],['Firebase','firebase'],['AWS','aws'],['Azure','microsoft-azure'],['Vercel','vercel',1],['Netlify','netlify'],['Hostinger','hostinger']] },
    { label: 'Design', items: [['Figma','figma'],['Canva','canva'],['Photoshop','photoshop'],['Illustrator','illustrator'],['Premiere','premiere']] },
    { label: 'Platforms & Automation', items: [['WordPress','wordpress'],['Shopify','shopify'],['Postman','postman'],['Jira','jira'],['Zapier','zapier'],['Stripe','stripe'],['Twilio','twilio']] }
  ];

  var PROJECTS = [
    {
      title: 'Holy Angel University IDMO Employee Portal',
      desc: 'Employee portal for Holy Angel University, streamlining HR processes and data management.',
      img: 'works/hauoieidmo.png', site: 'hau-oie-idmo.com',
      role: ['Full-Stack Developer', 'UX/UI Designer'], langs: ['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger'],
      caseStudy: {
        problem: 'The IDMO managed employee records and HR requests through manual, document-heavy processes that were slow to search, easy to duplicate, and hard to keep consistent.',
        approach: ['Built a centralized Laravel portal with role-based access for HR staff and employees.', 'Designed clean UX/UI flows so non-technical staff could manage records without training.', 'Modeled an optimized MySQL schema for fast, reliable lookups.', 'Deployed and configured production hosting on Hostinger with SSL.'],
        outcome: ['Replaced scattered manual tracking with a single source of truth.', 'Gave HR and employees fast self-service access to records.', 'Made employee information searchable in seconds.']
      }
    },
    {
      title: 'Kayantabe',
      desc: 'A dynamic volunteerism platform connecting passionate individuals with local community initiatives.',
      img: 'works/kayantabe.png', site: 'kayantabe.com',
      role: ['Full-Stack Developer', 'Project Lead'], langs: ['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger'],
      caseStudy: {
        problem: 'Local initiatives struggled to reach and coordinate volunteers, relying on fragmented social posts with no central place to discover or manage activities.',
        approach: ['Led the project end-to-end and built it on Laravel.', 'Created flows for organizations to post initiatives and for volunteers to join.', 'Designed a responsive, mobile-first UI to make sign-up frictionless.', 'Structured the data model so organizers could track participation.'],
        outcome: ['Gave volunteers and organizers one platform, replacing scattered posts.', 'Made it simple for organizations to launch initiatives.', 'Streamlined sign-ups with far less friction.']
      }
    },
    {
      title: 'Umbra',
      desc: 'A web app connecting students and parents with nearby tutors — find, book, and manage tutoring sessions with ease.',
      img: 'works/umbra.png', site: 'umbra-app.com',
      role: ['Full-Stack Developer', 'UX/UI Designer'], langs: ['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger']
    },
    {
      title: 'Pina Management CMS',
      desc: 'A custom CMS for a real estate company — manage property listings, client records, and transactions in one place.',
      img: 'works/pina.png', site: 'In progress',
      role: ['Database Administrator', 'Full-Stack Developer'], langs: ['React', 'Supabase', 'Vercel'],
      caseStudy: {
        problem: 'A real estate company tracked listings, clients, and transactions across spreadsheets and disconnected tools — slow and error-prone.',
        approach: ['Built a custom CMS with React and Supabase tailored to their workflow.', 'Structured the database for listings, clients, and transactions with integrity in mind.', 'Focused the interface on the team’s daily tasks to reduce friction.'],
        outcome: ['Centralizes listings, clients, and transactions in one portal.', 'Replaces error-prone spreadsheets with a reliable source of truth.', 'Speeds up daily operations around the team’s real tasks.']
      }
    },
    {
      title: 'Veloce Goods',
      desc: 'A premium headless B2C storefront for a luxury direct-to-consumer fashion & lifestyle brand — cinematic UI, instant search, and near-perfect web vitals.',
      img: 'works/veloce.png', site: 'In progress',
      role: ['Full-Stack Developer', 'UX/UI Designer'], langs: ['Next.js', 'React', 'Tailwind CSS', 'Stripe'],
      caseStudy: {
        problem: 'Traditional e-commerce templates suffer from slow loading speeds and generic layouts, which hurt a brand’s premium perception and lower conversion rates.',
        approach: ['Designed a cinematic UI/UX with fluid page transitions, responsive micro-interactions, and a distraction-free, multi-step checkout flow.', 'Built zero-latency catalog filtering with smart auto-suggest fuzzy search for an effortless browsing experience.', 'Engineered the storefront from the ground up to hit a near-perfect performance score on mobile and desktop web vitals.'],
        outcome: ['Accelerated page-load times across the catalog and product pages.', 'Optimized the checkout funnel to directly lower cart-abandonment rates.', 'Boosted conversion metrics through a faster, more premium browsing experience.']
      }
    },
    {
      title: 'Vanguard Operations',
      desc: 'A secure, centralized internal management portal for an enterprise operations & corporate asset firm — granular RBAC, an automated queueing engine, and a live operations dashboard.',
      img: 'works/vanguard.png', site: 'In progress',
      role: ['Full-Stack Developer', 'Database Administrator'], langs: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
      caseStudy: {
        problem: 'Fragmented workflows, reliance on disparate spreadsheets, manual document routing, and a lack of clear user-permission boundaries.',
        approach: ['Implemented granular role-based access control with strict privilege separation across Super Admin, Manager, and standard staff tiers.', 'Built an automated queueing engine for high-volume document generation, invoice distribution, and email alerts.', 'Created a live operations dashboard with interactive charts and progress trackers for resource allocation and team velocity.'],
        outcome: ['Centralized scattered company data into a single source of truth.', 'Heavily reduced operational turnaround times.', 'Completely eliminated human data-entry errors through automation.']
      }
    },
    {
      title: 'Kinetix Health',
      desc: 'A high-fidelity, cross-platform mobile app (MVP) for an elite boutique fitness-coaching brand — real-time sync, offline-first stability, and polished gesture navigation.',
      img: 'works/kinetix.png', site: 'In progress',
      role: ['Mobile Developer', 'UX/UI Designer'], langs: ['React Native', 'Firebase', 'Javascript'],
      caseStudy: {
        problem: 'The client needed a dedicated mobile footprint to retain clients, but required a solution that felt genuinely native and highly responsive without a massive development timeline.',
        approach: ['Built real-time data syncing for 1-on-1 coach-to-client messaging and dynamic workout status updates across devices.', 'Added a deep offline-first caching layer so the app stays fully responsive and usable without an active connection.', 'Designed intuitive gesture navigation paired with smooth, beautifully animated fitness progress charts.'],
        outcome: ['Delivered a premium digital product with an accelerated time-to-market.', 'Gave clients an engaging, high-end mobile experience.', 'Improved client retention for the coaching brand.']
      }
    },
    {
      title: 'Veritas Layouts',
      desc: 'An automated micro-SaaS document engine for an executive & legal productivity startup — a live side-by-side preview, strict layout parsing, and one-click cloud export.',
      img: 'works/veritas.png', site: 'In progress',
      role: ['Full-Stack Developer', 'UX/UI Designer'], langs: ['React', 'Node.js', 'Tailwind CSS', 'PDF Generation'],
      caseStudy: {
        problem: 'Professional industries waste thousands of hours manually typesetting rigid document layouts (corporate templates, academic formats), frequently leading to formatting errors.',
        approach: ['Built a multi-step form wizard with a pixel-perfect live preview that updates in real time as the user types.', 'Engineered a strict layout-parsing engine that respects rigid text boundaries and typography rules without breaking alignments or overflowing pages.', 'Added one-click high-fidelity PDF export, cloud-storage archiving, and template version-history tracking.'],
        outcome: ['Productized a tedious manual task into a scalable micro-service.', 'Completely wiped out formatting errors.', 'Cut document-creation time down to seconds.']
      }
    },
    {
      title: 'OmniReserve',
      desc: 'A multi-tenant B2B/B2C booking & resource marketplace for high-value asset rentals and multi-vendor scheduling — a bulletproof availability engine and automated split payouts.',
      img: 'works/omnireserve.png', site: 'In progress',
      role: ['Full-Stack Developer', 'Database Administrator'], langs: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      caseStudy: {
        problem: 'Off-the-shelf booking tools break under complex multi-merchant logic, automated revenue splitting, and timezone-dependent booking overlaps.',
        approach: ['Built an advanced scheduling backend that prevents overlapping reservations down to the exact minute across changing timezones.', 'Architected an automated split-payout pipeline that securely collects a platform service fee while routing vendor earnings to their accounts.', 'Designed a dual-dashboard experience: a minimal customer reservation flow paired with an in-depth vendor analytics portal.'],
        outcome: ['Created a self-sustaining marketplace framework.', 'Automated vendor onboarding and booking reconciliation.', 'Enabled operations to scale hands-free.']
      }
    },
    {
      title: 'SPUR Landing Page',
      desc: 'A responsive landing page showcasing the SPUR mobile app — highlighting features and driving downloads.',
      img: 'works/joinspur.png', site: 'joinspurapp.com',
      role: ['UX/UI Designer', 'Full-Stack Developer'], langs: ['React', 'Supabase', 'Vercel']
    },
    {
      title: 'SPUR Mobile App',
      desc: 'Find your next game, running partner, or tennis match. A location-based app connecting people who share a passion for sports & fitness.',
      img: 'works/spurapp.png', site: 'In progress',
      role: ['Mobile Developer', 'UX/UI Designer'], langs: ['React Native', 'Javascript', 'Firebase']
    },
    {
      title: 'The Zepatide',
      desc: 'A professional brand site for medical-grade products — clean, trustworthy design that communicates quality and credibility.',
      img: 'works/zepatide.png', site: 'thezepatide.com',
      role: ['UX/UI Designer', 'Front-end Developer'], langs: ['React', 'Supabase', 'Vercel']
    },
    {
      title: 'IMMFI',
      desc: 'A modern, user-friendly layout using updated design principles — enhancing UX while keeping brand identity across pages.',
      img: 'works/immfi.png', site: 'immfi.org',
      role: ['UX/UI Designer', 'Front-end Developer'], langs: ['Wordpress', 'Elementor']
    },
    {
      title: 'ResumeForge',
      desc: 'Fill in your details once — ResumeForge instantly generates a polished, ATS-friendly resume PDF in the iconic Harvard format.',
      img: 'works/resumeforge.png', site: 'In progress',
      role: ['Full-Stack Developer', 'UX/UI Designer'], langs: ['React', 'Node.js', 'Tailwind CSS', 'PDF Generation']
    },
    {
      title: 'ZoneBridge',
      desc: 'Drop a pin on any city or GPS coordinate and instantly see the exact time gap between it and anywhere in the world.',
      img: 'works/zonebridge.png', site: 'In progress',
      role: ['Full-Stack Developer', 'UX/UI Designer'], langs: ['React', 'Tailwind CSS', 'Mapbox GL', 'Javascript']
    }
  ];

  var GRAPHICS = ['dalefuture.png','flowg.png','artboard-1-100-1.webp','welcomeback2.webp','finalmem.png','meetourteam-2.webp','dp2022.webp','bday_dale2-1.png','artboard-4-100.webp','artboard-5-100.webp','artboard-6-100.webp','artboard-7-100.webp','1.webp','efef475b-ec17-4a13-a5f2-e7ae1156aadc.jpg','0ad9042b-41b8-4ee9-9d65-26750ee28ef1.jpg','3e157134-d079-4d2f-8b8c-c27f78568f34.jpg','1dfa30eb-1346-44e0-bfa1-c30dee95e6ea.jpg','12563e67-865d-4b29-9acc-3b61e809185d.jpg','42ef1801-b6a4-4aa4-9f7e-82db6b1bd601.jpg','ddba4cc9-8b30-4c7a-ac56-6956d3c9cbc8.jpg','ad0ea7ce-fc3c-425b-8ce0-f2fc74a1a9f0.jpg','6e6deef8-be3e-44d6-8bb6-2b4c061dfad1.jpg','8a8780cf-2862-4c52-992d-1f24f2c2f7f6.jpg','f4d3219f-d45b-4d1c-9b16-89f0fce7bc8b.jpg'];

  var EXPERIENCE = [
    { role: 'Graphic Designer', org: 'CompleteVitalityLife', year: 'Jan 2026 – May 2026' },
    { role: 'Full Stack Web Developer', org: 'Pina Realty Management', year: 'Contract-based' },
    { role: 'Full Stack Web Developer', org: 'Direct Client · Australia', year: 'Project-based' },
    { role: 'Graduated BSIT — Web Development', org: 'Holy Angel University', year: 'Apr 2025' },
    { role: 'Full Stack Web Developer (Internship)', org: 'Holy Angel University', year: 'Jun 2024 – Nov 2024' },
    { role: 'Graphic Designer (Freelance)', org: 'NILEliteGears & CompleteVitalityLife', year: 'Apr 2024 – Jul 2024' },
    { role: 'Hello World! 👋', org: 'Wrote my first line of code', year: '2015' }
  ];

  var CERTS = [
    { name: 'Red Hat Certified System Administrator (RHCSA)', issuer: 'Red Hat', tag: 'Industry Standard', date: 'Nov 2021', color: '#EE0000', featured: true },
    { name: 'CCNA Cyber Ops', issuer: 'Cisco', tag: 'Networking', date: 'Nov 2023', color: '#1BA0D7' },
    { name: 'JavaScript Essentials 1', issuer: 'Cisco', tag: 'Development', date: 'Sept 2024', color: '#1BA0D7' },
    { name: 'Google Analytics Certification', issuer: 'Google', tag: 'Analytics', date: 'Oct 2023', color: '#4285F4' },
    { name: 'Use Google Analytics for Your Business', issuer: 'Google', tag: 'Analytics', date: 'Oct 2023', color: '#4285F4' },
    { name: 'Get Started using Google Analytics', issuer: 'Google', tag: 'Analytics', date: 'Oct 2023', color: '#4285F4' },
    { name: 'SEO Certification', issuer: 'HubSpot Academy', tag: 'Marketing', date: 'Oct 2023', color: '#FF7A59' },
    { name: 'SEO II Certification', issuer: 'HubSpot Academy', tag: 'Marketing', date: 'Oct 2023', color: '#FF7A59' },
    { name: 'Introduction to Cybersecurity', issuer: 'Cisco', tag: 'Security', date: 'Nov 2021', color: '#1BA0D7' },
    { name: 'Introduction to IoT', issuer: 'Cisco', tag: 'Networking', date: 'Nov 2021', color: '#1BA0D7' }
  ];

  var TESTIMONIALS = [
    { name: 'Gabriela Pina', role: 'Pina Realty Management', initials: 'GP',
      body: 'Working with Dale was genuinely a joy. He took the time to understand exactly what our business needed, explained the technical side in a way I could follow, and kept me in the loop at every step. Organized, patient, and easy to collaborate with.' },
    { name: 'Diego Reyes', role: 'Direct Client · Australia', initials: 'DR',
      body: 'One of the most reliable collaborators I’ve worked with. He communicates clearly, hits his deadlines, and is open to feedback without ever getting defensive. A true professional and a great teammate.' },
    { name: 'Regine Kelee', role: 'Project Collaborator', initials: 'RK',
      body: 'I can’t recommend Dale enough. Talented, dependable, and so pleasant to work with. He delivered exactly what we agreed on and then went the extra mile to make it better. I’d choose to work with him every single time.' }
  ];

  /* ───────────────────────────── HELPERS ────────────────────────────────── */

  function esc(v) {
    return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function el(id) { return document.getElementById(id); }
  function svg(slug, alt, adapt) {
    return '<img src="https://thesvg.org/icons/' + slug + '/default.svg" width="22" height="22" alt="' + esc(alt) + '" loading="lazy"' + (adapt ? ' class="adapt"' : '') + '>';
  }
  var TECH_ICON = {
    'react':'logos:react','react native':'logos:react','supabase':'logos:supabase-icon','laravel':'logos:laravel',
    'tailwind css':'logos:tailwindcss-icon','mysql':'logos:mysql-icon','firebase':'logos:firebase','wordpress':'logos:wordpress-icon',
    'elementor':'simple-icons:elementor','javascript':'logos:javascript','html':'logos:html-5','css':'logos:css-3',
    'node.js':'logos:nodejs-icon','mapbox gl':'simple-icons:mapbox','hostinger':'simple-icons:hostinger','vercel':'logos:vercel-icon','firebase':'logos:firebase-icon','pdf generation':'mdi:file-pdf-box'
  };
  function techChip(name) {
    var ic = TECH_ICON[name.toLowerCase()];
    var icon = ic ? '<span class="iconify" data-icon="' + ic + '"></span>' : '';
    return '<span class="chip chip-tech">' + icon + esc(name) + '</span>';
  }
  function roleChip(name) { return '<span class="chip chip-role">' + esc(name) + '</span>'; }
  function siteLabel(site) {
    if (site === 'In progress') return 'Preview';
    return String(site).replace(/^https?:\/\//i, '');
  }
  function siteHref(site) { return site === 'In progress' ? '#contact' : 'https://' + site; }

  // Resilient image fallback: retry a couple of times (transient dev-server
  // hiccups / aborted lazy loads) before showing the "coming soon" placeholder.
  window.__projImgFail = function (img) {
    var tries = +(img.dataset.tries || 0);
    if (tries < 2) {
      img.dataset.tries = tries + 1;
      var base = img.getAttribute('src').split('?')[0];
      img.src = base + '?retry=' + (tries + 1);
    } else {
      img.parentElement.classList.add('noimg');
    }
  };

  /* ───────────────────────────── RENDER ─────────────────────────────────── */

  function renderHeroStats() {
    el('heroStats').innerHTML = STATS.map(function (s) {
      return '<li><span class="stat-num" data-count="' + s.value + '" data-suffix="' + s.suffix + '">0</span>' +
             '<span class="stat-label">' + esc(s.label) + '</span></li>';
    }).join('');
  }

  function renderMarquee() {
    var words = ['Full-Stack Development','UX / UI Design','System Architecture','Mobile Apps','API Integration','Business Automation','Database Design','Cloud Deployment'];
    var html = words.map(function (w) { return '<span class="marquee-item">' + w + '</span>'; }).join('');
    el('marqueeTrack').innerHTML = html + html;
  }

  function renderAwards() {
    el('awardList').innerHTML = AWARDS.map(function (a) { return '<li>' + a + '</li>'; }).join('');
  }

  function renderServices() {
    el('servicesGrid').innerHTML = SERVICES.map(function (s) {
      return '<article class="service-card reveal' + (s.featured ? ' service-card--featured' : '') + '" data-tilt>' +
        '<span class="service-icon"><i class="iconify" data-icon="' + s.icon + '"></i></span>' +
        '<h3>' + esc(s.title) + '</h3>' +
        '<p>' + esc(s.desc) + '</p>' +
        '<span class="service-arrow"><i class="iconify" data-icon="mdi:arrow-top-right"></i></span>' +
      '</article>';
    }).join('');
  }

  function renderStack() {
    el('stackGroups').innerHTML = STACK.map(function (g) {
      var items = g.items.map(function (it) {
        return '<span class="stack-item">' + svg(it[1], it[0], it[2]) + '<span>' + esc(it[0]) + '</span></span>';
      }).join('');
      return '<div class="stack-group reveal"><h3 class="stack-label">' + esc(g.label) + '</h3>' +
             '<div class="stack-items">' + items + '</div></div>';
    }).join('');
  }

  function renderProjects() {
    el('projectsGrid').innerHTML = PROJECTS.map(function (p, i) {
      var hasCase = !!p.caseStudy;
      var badge = hasCase ? '<span class="project-badge"><i class="iconify" data-icon="mdi:file-document-outline"></i> Case study</span>' : '';
      var isLive = p.site !== 'In progress';
      var liveBadge = isLive ? '<span class="project-live"><span class="live-dot"></span>Live</span>' : '';
      var cta = p.site === 'In progress' ? 'Unavailable' : 'Visit site';
      var linkHtml = isLive
        ? '<a href="' + siteHref(p.site) + '" target="_blank" rel="noopener noreferrer" class="project-link">' + esc(cta) + ' <i class="iconify" data-icon="mdi:arrow-top-right"></i></a>'
        : '<span class="project-link project-link--off">' + esc(cta) + '</span>';
      return '<article class="project-card reveal" data-index="' + i + '">' +
        '<div class="project-shot">' +
          '<div class="browser-bar"><span></span><span></span><span></span><em>' + esc(siteLabel(p.site)) + '</em></div>' +
          '<div class="project-img-wrap">' +
            '<img src="' + esc(p.img) + '" alt="' + esc(p.title) + '" loading="lazy" onerror="window.__projImgFail(this)">' +
            '<span class="project-img-fallback">Screenshot coming soon</span>' +
          '</div>' +
          badge +
          liveBadge +
        '</div>' +
        '<div class="project-info">' +
          '<h3>' + esc(p.title) + '</h3>' +
          '<p>' + esc(p.desc) + '</p>' +
          '<div class="project-chips">' + p.role.map(roleChip).join('') + p.langs.map(techChip).join('') + '</div>' +
          '<div class="project-actions">' +
            '<button type="button" class="btn btn-ghost btn-sm js-open-project" data-index="' + i + '">' + (hasCase ? 'Read case study' : 'Details') + '</button>' +
            linkHtml +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  function renderGraphics() {
    el('graphicsMasonry').innerHTML = GRAPHICS.map(function (f, i) {
      var src = 'works/graphics/' + f;
      return '<figure class="g-tile reveal" data-g="' + i + '" style="--d:' + (i % 8 * 40) + 'ms">' +
        '<img src="' + esc(src) + '" alt="Graphic design work ' + (i + 1) + '" loading="lazy" decoding="async">' +
        '<span class="g-zoom"><i class="iconify" data-icon="mdi:arrow-expand"></i></span>' +
      '</figure>';
    }).join('');
  }

  function renderExperience() {
    el('timeline').innerHTML = EXPERIENCE.map(function (e) {
      return '<li class="tl-item reveal">' +
        '<span class="tl-dot"></span>' +
        '<div class="tl-card">' +
          '<span class="tl-year">' + esc(e.year) + '</span>' +
          '<h3>' + esc(e.role) + '</h3>' +
          '<p>' + esc(e.org) + '</p>' +
        '</div>' +
      '</li>';
    }).join('');
  }

  function renderCerts() {
    el('certsGrid').innerHTML = CERTS.map(function (c) {
      return '<article class="cert-card reveal' + (c.featured ? ' cert-card--featured' : '') + '" style="--ci:' + c.color + '" data-tilt>' +
        '<div class="cert-top"><span class="cert-issuer" style="color:' + c.color + '">' + esc(c.issuer) + '</span>' +
        '<span class="cert-verified"><i class="iconify" data-icon="mdi:check-decagram"></i> Certified</span></div>' +
        '<p class="cert-name">' + esc(c.name) + '</p>' +
        '<div class="cert-foot"><span><i class="iconify" data-icon="mdi:calendar-blank-outline"></i> ' + esc(c.date) + '</span>' +
        '<span class="cert-tag">' + esc(c.tag) + '</span></div>' +
      '</article>';
    }).join('');
  }

  function renderTestimonials() {
    el('testimonialsGrid').innerHTML = TESTIMONIALS.map(function (t) {
      return '<figure class="t-card reveal" data-tilt>' +
        '<div class="t-stars">' + '<i class="iconify" data-icon="mdi:star"></i>'.repeat(5) + '</div>' +
        '<blockquote>' + esc(t.body) + '</blockquote>' +
        '<figcaption><span class="t-avatar">' + esc(t.initials) + '</span>' +
        '<span class="t-meta"><span class="t-name">' + esc(t.name) + '</span><span class="t-role">' + esc(t.role) + '</span></span></figcaption>' +
      '</figure>';
    }).join('');
  }

  /* ───────────────────────────── MODALS ─────────────────────────────────── */

  var lenis = null;
  function lockScroll(lock) {
    document.body.classList.toggle('modal-open', lock);
    if (lenis) { lock ? lenis.stop() : lenis.start(); }
  }
  function openModal(modal) { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); lockScroll(true); }
  function closeModal(modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); lockScroll(false); }

  function caseStudyHtml(cs) {
    if (!cs) return '';
    var blocks = '';
    if (cs.problem) blocks += '<div class="cs-step"><span class="cs-icon"><i class="iconify" data-icon="mdi:alert-circle-outline"></i></span><div><h5>The problem</h5><p>' + esc(cs.problem) + '</p></div></div>';
    if (cs.approach) blocks += '<div class="cs-step"><span class="cs-icon"><i class="iconify" data-icon="mdi:tools"></i></span><div><h5>What I did</h5><ul>' + cs.approach.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul></div></div>';
    if (cs.outcome) blocks += '<div class="cs-step"><span class="cs-icon"><i class="iconify" data-icon="mdi:trophy-outline"></i></span><div><h5>Outcome</h5><div class="cs-outcomes">' + cs.outcome.map(function (o) { return '<span><i class="iconify" data-icon="mdi:check-circle"></i>' + esc(o) + '</span>'; }).join('') + '</div></div></div>';
    return '<div class="case-study"><span class="cs-eyebrow"><i class="iconify" data-icon="mdi:star-four-points-outline"></i> Case study</span>' + blocks + '</div>';
  }

  function openProject(i) {
    var p = PROJECTS[i]; if (!p) return;
    var cta = p.site === 'In progress' ? 'Unavailable' : 'Visit site';
    el('projectModalBody').innerHTML =
      '<div class="pm-shot"><div class="browser-bar"><span></span><span></span><span></span><em>' + esc(siteLabel(p.site)) + '</em></div>' +
      '<div class="project-img-wrap"><img src="' + esc(p.img) + '" alt="' + esc(p.title) + '" onerror="window.__projImgFail(this)"><span class="project-img-fallback">Screenshot coming soon</span></div></div>' +
      '<h3 class="pm-title">' + esc(p.title) + '</h3>' +
      '<p class="pm-desc">' + esc(p.desc) + '</p>' +
      caseStudyHtml(p.caseStudy) +
      '<div class="project-chips">' + p.role.map(roleChip).join('') + p.langs.map(techChip).join('') + '</div>' +
      (p.site === 'In progress'
        ? '<span class="btn pm-cta pm-cta--off">' + esc(cta) + '</span>'
        : '<a href="' + siteHref(p.site) + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary pm-cta">' + esc(cta) + ' <i class="iconify" data-icon="mdi:arrow-top-right"></i></a>');
    var body = el('projectModalBody'); body.scrollTop = 0;
    openModal(el('projectModal'));
    if (window.Iconify) Iconify.scan(body);
  }

  function openDesign(i) {
    var src = 'works/graphics/' + GRAPHICS[i];
    el('designModalBody').innerHTML = '<img src="' + esc(src) + '" alt="Graphic design work ' + (i + 1) + '">';
    openModal(el('designModal'));
  }

  /* ───────────────────────────── INTERACTIONS ───────────────────────────── */

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (reduced) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (e) { obs.observe(e); });
  }

  function initCounters() {
    var nums = document.querySelectorAll('.stat-num');
    if (reduced) { nums.forEach(function (n) { n.textContent = n.dataset.count + (n.dataset.suffix || ''); }); return; }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var n = en.target, target = +n.dataset.count, suf = n.dataset.suffix || '', start = null;
        function tick(ts) {
          if (!start) start = ts;
          var t = Math.min(1, (ts - start) / 1100), eased = 1 - Math.pow(1 - t, 3);
          n.textContent = Math.round(target * eased) + (t === 1 ? suf : '');
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick); obs.unobserve(n);
      });
    }, { threshold: 0.4 });
    nums.forEach(function (n) { obs.observe(n); });
  }

  function initRotator() {
    var node = document.querySelector('[data-rotate]'); if (!node || reduced) return;
    var i = 0;
    setInterval(function () {
      i = (i + 1) % ROTATE_WORDS.length;
      node.style.opacity = '0'; node.style.transform = 'translateY(-8px)';
      setTimeout(function () { node.textContent = ROTATE_WORDS[i]; node.style.opacity = '1'; node.style.transform = 'none'; }, 260);
    }, 2600);
  }

  function initScrollFx() {
    var bar = document.querySelector('.scroll-progress > span');
    var nav = el('nav');
    var ticking = false;
    function run() {
      var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
      var y = window.scrollY || h.scrollTop;
      if (bar) bar.style.width = (max > 0 ? y / max * 100 : 0) + '%';
      if (nav) nav.classList.toggle('nav--scrolled', y > 24);
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(run); ticking = true; } }, { passive: true });
    run();
  }

  function initSpotlight() {
    if (!fine || reduced) return;
    var sp = document.querySelector('.spotlight'); if (!sp) return;
    window.addEventListener('pointermove', function (e) {
      sp.style.setProperty('--x', e.clientX + 'px');
      sp.style.setProperty('--y', e.clientY + 'px');
      sp.classList.add('live');
    }, { passive: true });
  }

  function initMagnetic() {
    if (!fine || reduced) return;
    document.querySelectorAll('.magnetic').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.2).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.3 - 1).toFixed(1) + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }

  function initTilt() {
    if (!fine || reduced) return;
    document.querySelectorAll('[data-tilt]').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = 'perspective(800px) rotateX(' + (-py * 5).toFixed(2) + 'deg) rotateY(' + (px * 5).toFixed(2) + 'deg) translateY(-4px)';
      });
      c.addEventListener('pointerleave', function () { c.style.transform = ''; });
    });
  }

  function initHeroParallax() {
    if (!fine || reduced) return;
    var photo = el('heroPhoto'); if (!photo) return;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < 900) photo.style.transform = 'translateY(' + (y * 0.06).toFixed(1) + 'px)';
    }, { passive: true });
  }

  function initSmoothScroll() {
    if (!reduced && typeof Lenis !== 'undefined') {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      window.__lenis = lenis;
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
    }
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href'); if (id === '#' || id.length < 2) return;
        var target = document.querySelector(id); if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { offset: -70 });
        else target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function bindEvents() {
    // project details
    document.addEventListener('click', function (e) {
      var openBtn = e.target.closest('.js-open-project');
      if (openBtn) { openProject(+openBtn.dataset.index); return; }
      var gtile = e.target.closest('.g-tile');
      if (gtile) { openDesign(+gtile.dataset.g); return; }
    });
    // CV
    var cvBtn = el('openCv');
    if (cvBtn) cvBtn.addEventListener('click', function () { openModal(el('cvModal')); });
    // closers
    document.querySelectorAll('[data-close-modal]').forEach(function (n) { n.addEventListener('click', function () { closeModal(el('projectModal')); }); });
    document.querySelectorAll('[data-close-design]').forEach(function (n) { n.addEventListener('click', function () { closeModal(el('designModal')); }); });
    document.querySelectorAll('[data-close-cv]').forEach(function (n) { n.addEventListener('click', function () { closeModal(el('cvModal')); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      ['projectModal', 'designModal', 'cvModal'].forEach(function (id) { var m = el(id); if (m && m.classList.contains('open')) closeModal(m); });
    });
  }

  /* ───────────────────────────── BOOT ───────────────────────────────────── */

  function boot() {
    renderHeroStats(); renderMarquee(); renderAwards(); renderServices(); renderStack();
    renderProjects(); renderGraphics(); renderExperience(); renderCerts(); renderTestimonials();
    var y = el('year'); if (y) y.textContent = new Date().getFullYear();

    if (window.Iconify) Iconify.scan();

    initReveal(); initCounters(); initRotator(); initScrollFx(); initSpotlight();
    initMagnetic(); initTilt(); initHeroParallax(); initSmoothScroll(); bindEvents();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
