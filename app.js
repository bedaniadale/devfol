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
    { value: 6,  suffix: '',  label: 'live client sites' },
    { static: true, text: '2015', label: 'coding since' },
    { static: true, text: '24h', label: 'reply time' }
  ];

  // Real, live client sites — surfaced in the hero as clickable proof.
  var HERO_PROOF = [
    { title: 'Kayantabe',  site: 'kayantabe.com' },
    { title: 'Umbra',      site: 'umbra-app.com' },
    { title: 'HAU IDMO',   site: 'hau-oie-idmo.com' },
    { title: 'The Zepatide', site: 'thezepatide.com' },
    { title: 'IMMFI',      site: 'immfi.org' }
  ];

  // Rendered as a numbered ledger, the same idiom as CERTS and SERVICES — so
  // the mono index carries the enumeration and the emoji that used to prefix
  // each line are gone. Two decorative marks per row was one too many.
  var AWARDS = [
    'Most Outstanding Graduating Student (per program)',
    'Most Outstanding On-the-Job Trainee (per program)',
    'Dean’s Lister (2022–2024)',
    'President’s Lister',
    'HAFRD Academic Scholarship recipient',
    'Code Geeks’ President (A.Y. 2023–2024)'
  ];

  /* About's meter. The scroll conductor scrubs the readout from the first year
     to the last, and lights the beat whose year the readout has reached — so a
     decade of context costs the height of a single caption. Keep these sorted
     ascending; registerAbout takes the first and last as the range. */
  var ABOUT_BEATS = [
    { y: 2015, t: 'First line of code at 13. Self-taught, one broken page at a time.' },
    { y: 2019, t: 'First paid build — someone else’s business running on my code.' },
    { y: 2022, t: 'Dean’s Lister, and elected president of Code Geeks.' },
    { y: 2025, t: 'Top IT Graduate, Holy Angel University.' },
    { y: 2026, t: 'Ten products live for real clients. Still building every day.' }
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

  /* `kind` classifies an entry that already exists — it is a label for the
     data, never a new claim about it. `origin` marks the terminus of the rail. */
  var EXPERIENCE = [
    { role: 'Graphic Designer', org: 'CompleteVitalityLife', year: 'Jan 2026 – May 2026', kind: 'Design' },
    { role: 'Full Stack Web Developer', org: 'Pina Realty Management', year: 'Contract-based', kind: 'Development' },
    { role: 'Full Stack Web Developer', org: 'Direct Client · Australia', year: 'Project-based', kind: 'Development' },
    { role: 'Graduated BSIT — Web Development', org: 'Holy Angel University', year: 'Apr 2025', kind: 'Milestone' },
    { role: 'Full Stack Web Developer (Internship)', org: 'Holy Angel University', year: 'Jun 2024 – Nov 2024', kind: 'Development' },
    { role: 'Graphic Designer (Freelance)', org: 'NILEliteGears & CompleteVitalityLife', year: 'Apr 2024 – Jul 2024', kind: 'Design' },
    { role: 'Hello World! 👋', org: 'Wrote my first line of code', year: '2015', kind: 'The beginning', origin: true }
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
    { name: 'Diego Reyes', role: 'CompleteVitalityLife', initials: 'DR',
      body: 'One of the most reliable collaborators I’ve worked with. He communicates clearly, hits his deadlines, and is open to feedback without ever getting defensive. A true professional and a great teammate.' },
    { name: 'Regine Kelee', role: 'Direct Client · Australia', initials: 'RK',
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
    'tailwind css':'logos:tailwindcss-icon','mysql':'logos:mysql-icon','wordpress':'logos:wordpress-icon',
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
      var num = s.static
        ? '<span class="stat-num">' + esc(s.text) + '</span>'
        : '<span class="stat-num" data-count="' + s.value + '" data-suffix="' + s.suffix + '">0</span>';
      return '<li>' + num + '<span class="stat-label">' + esc(s.label) + '</span></li>';
    }).join('');
  }

  function renderHeroProof() {
    var box = el('heroProof'); if (!box) return;
    box.innerHTML = HERO_PROOF.map(function (p, i) {
      return '<li style="--i:' + i + '"><a href="' + siteHref(p.site) + '" target="_blank" rel="noopener noreferrer" ' +
        'class="proof-card" data-tilt aria-label="Visit ' + esc(p.title) + ' (opens in new tab)">' +
        '<span class="proof-dots"><span></span><span></span><span></span></span>' +
        '<span class="proof-name">' + esc(p.title) + '</span>' +
        '<span class="proof-host">' + esc(siteLabel(p.site)) + '</span>' +
        '<i class="iconify proof-go" data-icon="mdi:arrow-top-right"></i>' +
      '</a></li>';
    }).join('');
  }

  function renderMarquee() {
    var words = ['Full-Stack Development','UX / UI Design','System Architecture','Mobile Apps','API Integration','Business Automation','Database Design','Cloud Deployment'];
    var html = words.map(function (w) { return '<span class="marquee-item">' + w + '</span>'; }).join('');
    el('marqueeTrack').innerHTML = html + html;
  }

  /* Both cells are explicit spans: .award-list li is a 26px/1fr grid, and a bare
     text node would land in an anonymous item that no rule can reach. */
  function renderAwards() {
    el('awardList').innerHTML = AWARDS.map(function (a, i) {
      return '<li style="--i:' + Math.min(i, 5) + '">' +
        '<span class="award-n">' + pad(i + 1) + '</span>' +
        '<span class="award-t">' + esc(a) + '</span>' +
      '</li>';
    }).join('');
  }

  /* The About meter. Beats are absolutely stacked in one box (only the lit one
     is visible), and each drops a tick on the rail at its own fraction of the
     span — so the rail reads as a real scale, not a decorative bar. */
  function renderAboutBeats() {
    var host = el('abBeats'), rail = el('abRail');
    if (!host) return;
    var y0 = ABOUT_BEATS[0].y, y1 = ABOUT_BEATS[ABOUT_BEATS.length - 1].y;
    var span = Math.max(1, y1 - y0);

    host.innerHTML = ABOUT_BEATS.map(function (b, i) {
      return '<li class="ab-beat' + (i === 0 ? ' is-lit' : '') + '">' +
        '<b>' + b.y + '</b><span>' + esc(b.t) + '</span></li>';
    }).join('');

    if (!rail) return;
    rail.insertAdjacentHTML('beforeend', ABOUT_BEATS.map(function (b, i) {
      return '<i class="ab-tick' + (i === 0 ? ' is-on' : '') +
             '" style="--f:' + ((b.y - y0) / span).toFixed(4) + '"></i>';
    }).join(''));
  }

  /* Services is a capability index. The data is title + one-line desc + icon —
     that is a definition list, not a card. Two columns, hairline rows.

     The number and the title are each wrapped in .ln-i so they can rise out of
     their own clip on reveal — the same one-line lift the hero title, the
     journey's roles and the footer wordmark use. The wrapper is markup, not
     motion: with no CSS and no JS it is an ordinary span around the text. */
  function renderServices() {
    el('servicesGrid').innerHTML = SERVICES.map(function (s, i) {
      return '<li class="svc-row reveal' + (s.featured ? ' is-featured' : '') + '" style="--i:' + Math.min(i, 5) + '">' +
        '<span class="svc-n"><span class="ln-i">' + pad(i + 1) + '</span></span>' +
        '<span class="svc-icon"><i class="iconify" data-icon="' + s.icon + '"></i></span>' +
        '<span class="svc-title"><span class="ln-i">' + esc(s.title) + '</span></span>' +
        '<span class="svc-desc">' + esc(s.desc) + '</span>' +
      '</li>';
    }).join('');
  }

  /* The services reading head lives in registerServices — unlike the toolkit's
     it cannot be an IntersectionObserver band, and that is a geometry fact, not
     a preference. See the comment there. */

  /* The toolkit is an INDEX OF DISCIPLINES, not a pile of logos. Two earlier
     versions — a uniform grid, then four round-robin lanes — both gave all 48
     tools the same visual weight, which destroyed the only structure a client
     actually reads: seven disciplines, and what sits under each. A row that put
     Vue, Swift, Laravel, .NET and Figma side by side told a reader nothing.

     So the category is the heading, set large in the serif, and the tools are
     its detail. Chips are borderless on purpose: the row's hairline and its
     indent already group them, and 48 bordered boxes is exactly the wall this
     replaces. */
  function renderStack() {
    var host = el('stackIndex'), lede = el('stackLede');
    if (!host) return;

    var total = STACK.reduce(function (n, g) { return n + g.items.length; }, 0);
    if (lede) {
      lede.textContent = total + ' tools across ' + STACK.length + ' disciplines.';
    }

    // data-dir alternates so neighbouring rows shear in opposition under the
    // scroll — same-direction rows read as one sliding sheet, opposed ones read
    // as depth. The CSS reads it to flip the sign of a single shared progress.
    host.innerHTML = STACK.map(function (g, gi) {
      var chips = g.items.map(function (it, j) {
        return '<li class="tk-chip" style="--i:' + Math.min(j, 9) + '">' +
          svg(it[1], it[0], it[2]) + '<span>' + esc(it[0]) + '</span></li>';
      }).join('');

      return '<li class="tk-row reveal" data-dir="' + (gi % 2 ? -1 : 1) + '" style="--l:' + gi + '">' +
        '<div class="tk-row-head">' +
          '<span class="tk-row-n">' + pad(gi + 1) + '</span>' +
          '<h3 class="tk-row-name">' + esc(g.label) + '</h3>' +
          '<span class="tk-row-count">' + pad(g.items.length) + '</span>' +
        '</div>' +
        '<ul class="tk-chips">' + chips + '</ul>' +
      '</li>';
    }).join('');
  }

  /* The reading head: whichever discipline is crossing the middle of the screen
     lights up — its name goes emerald and an emerald rule draws under the row.
     The same device as the journey's lit stations, so the page reads as one
     publication. Purely additive: nothing is dimmed, so a failed observer or no
     JS at all still leaves every row at full strength and fully legible. */
  function initToolkit() {
    var host = el('stackIndex');
    if (!host) return;
    var rows = [].slice.call(host.querySelectorAll('.tk-row'));
    if (!rows.length) return;

    // Reduced motion still gets the reading head — it is a colour change, not
    // travel, and it is the cue that makes seven chapters read as seven.
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.target.classList.toggle('is-lit', en.isIntersecting); });
    }, { rootMargin: '-38% 0px -38% 0px', threshold: 0 });
    rows.forEach(function (r) { obs.observe(r); });
  }

  /* Work is an index, not a card wall. Fifteen screenshot cards is a grid you
     scroll past; fifteen typographic rows is a list you read — and the
     screenshot arrives on hover, following the cursor. */
  function renderProjects() {
    el('projectsGrid').innerHTML = PROJECTS.map(function (p, i) {
      var isLive = p.site !== 'In progress';
      var hasCase = !!p.caseStudy;
      return '<li class="work-row reveal" data-index="' + i + '" style="--i:' + Math.min(i, 6) + '">' +
        '<button type="button" class="work-hit js-open-project" data-index="' + i + '" ' +
          'aria-label="' + esc(p.title) + ' — ' + (hasCase ? 'read case study' : 'details') + '">' +
          '<span class="work-n">' + pad(i + 1) + '</span>' +
          /* The thumbnail is markup, not an enhancement: below 1025px the gutter
             preview is display:none, so without this the work section has no
             images in it at all. It is decorative here — the row's own label
             already names the project — so alt is empty and it stays out of the
             accessible name of the button wrapping it. Lazy + async: fifteen
             shots must not compete with the hero for the first paint. */
          '<span class="work-thumb"><img src="' + esc(p.img) + '" alt="" loading="lazy" ' +
            'decoding="async" onload="this.classList.add(\'is-on\')" ' +
            'onerror="this.remove()"></span>' +
          '<span class="work-main">' +
            '<span class="work-title">' + esc(p.title) + '</span>' +
            '<span class="work-desc">' + esc(p.desc) + '</span>' +
          '</span>' +
          '<span class="work-meta">' +
            '<span class="work-stack">' + p.langs.slice(0, 3).map(esc).join(' · ') + '</span>' +
            (isLive
              ? '<span class="work-host"><span class="live-dot"></span>' + esc(siteLabel(p.site)) + '</span>'
              : '<span class="work-host work-host--wip">In progress</span>') +
          '</span>' +
          '<span class="work-go"><i class="iconify" data-icon="mdi:arrow-top-right"></i></span>' +
        '</button>' +
        (isLive
          ? '<a class="work-visit" href="' + siteHref(p.site) + '" target="_blank" rel="noopener noreferrer" ' +
            'aria-label="Visit ' + esc(p.title) + ' (opens in new tab)"><i class="iconify" data-icon="mdi:open-in-new"></i></a>'
          : '') +
      '</li>';
    }).join('');
  }

  /* The preview: a small screenshot in the gutter, held at the centre of the
     screen while the index scrolls past it, showing whichever row is active.
     Active is set by hover on a fine pointer, and otherwise by whichever row is
     level with the card — so it works without a pointer too, and so the emerald
     row and the shot beside it are never two different projects.

     The card used to sit level with its own row, which meant the shot for row 01
     was up under the section head and the shot for row 15 was half off the
     bottom of the screen — the two rows you are most likely to point at were the
     two whose preview you could least see. Holding the centre instead gives
     every project the same full-size slot, and the crossfade becomes the whole
     transition: the image changes, the frame never moves. */
  function initWorkStage() {
    var list = el('projectsGrid'), peek = document.querySelector('.work-peek');
    if (!list || !peek) return;
    var layers = [].slice.call(peek.querySelectorAll('.work-peek-img'));
    var rows = [].slice.call(list.querySelectorAll('.work-row'));
    if (!rows.length || layers.length < 2) return;
    var cur = -1, front = 0, hoverLock = -1, seq = 0;

    function setActive(i) {
      if (i === cur || i < 0 || i >= PROJECTS.length) return;
      cur = i;
      var p = PROJECTS[i], token = ++seq;

      /* Decode first, then swap the layer — a half-loaded image never shows.
         Scrolling fast asks for several shots inside one decode, so only the
         newest request is allowed to land, and the back layer is resolved when
         it lands rather than when it was asked for. Both matter: resolving the
         layer up front lets two in-flight loads target the same element, which
         desyncs `front` from the layer actually on screen and turns the next
         crossfade into a hard cut. */
      var pre = new Image();
      pre.onload = function () {
        if (token !== seq) return;
        var next = layers[1 - front];
        next.src = p.img;
        next.alt = p.title + ' — screenshot';
        peek.classList.remove('is-missing');
        loaded = true; reveal();
        layers[front].classList.remove('is-front');
        next.classList.add('is-front');
        front = 1 - front;
      };
      // an empty card would be worse than none: hide it until a shot loads
      pre.onerror = function () { if (token === seq) peek.classList.add('is-missing'); };
      pre.src = p.img;

      for (var r = 0; r < rows.length; r++) rows[r].classList.toggle('is-active', r === i);
    }

    /* Geometry, cached by the measure pass. `geo` holds each row's centre in
       document space, for the reading-line comparison that picks the active row.
       `minY` / `maxY` are how far the centred card may travel, in the coordinate
       space of .work-peek's containing block (.work-split). Nothing here is
       recomputed while scrolling. */
    var geo = [], splitTop = 0, peekH = 0, minY = 0, maxY = 0;
    var measured = false, loaded = false, revealed = false, lastY = null;
    // the card's own centre, in document space — the line rows are ranked against
    var lineY = 0;

    function topOf(n) { var t = 0; while (n) { t += n.offsetTop; n = n.offsetParent; } return t; }

    window.SE.addMeasure(function () {
      var host = peek.offsetParent;                  // .work-split
      var section = list.closest('.section');
      var head = section ? section.querySelector('.section-head') : null;
      splitTop = topOf(host);
      peekH = peek.offsetHeight;
      geo = [];
      rows.forEach(function (r) { geo.push(topOf(r) + r.offsetHeight / 2); });

      /* The travel limits. Clamping the card inside .work-split looks tidy and is
         wrong: a 313px card centred on a 114px row has to hang ~100px past the
         first and last row to sit level with them, so a card penned inside the
         list stops the reading line short and projects 01 and 15 can never become
         active by scrolling — the emphasis just refuses to reach the ends.

         So the limits are "as far as it takes to line up with the first and last
         row, but no further than this section's own free space": up to the bottom
         of the section head above, and the section's bottom padding below. The
         card overhangs the list at the two ends and still never touches the head
         copy or the section after it. */
      var splitH = host ? host.offsetHeight : 0;
      var gapAbove = head ? (topOf(head) + head.offsetHeight) - splitTop : 0;
      var gapBelow = section ? (topOf(section) + section.offsetHeight) - splitTop - peekH
                             : splitH - peekH;
      minY = Math.max(gapAbove, geo[0] - splitTop - peekH / 2);
      maxY = Math.min(gapBelow, geo[geo.length - 1] - splitTop - peekH / 2);
      if (maxY < minY) minY = maxY = (splitH - peekH) / 2;   // card taller than the list

      measured = true;
      placePeek();
      reveal();
    });

    /* Hold the vertical centre of the viewport, within the travel the measure
       pass worked out. Transform, not `top`: this is written every frame the page
       scrolls, and on the compositor that costs no layout — which is also why
       .work-peek carries no transform transition. A 620ms ease on a value that
       changes every frame would drag the card behind the scroll. */
    function placePeek() {
      if (!measured) return;
      var vh = window.SE.vh || window.innerHeight;
      var y = window.SE.y + (vh - peekH) / 2 - splitTop;
      y = Math.round(Math.min(maxY, Math.max(minY, y)) * 10) / 10;
      /* Publish the card's centre back in document space. The reading line that
         picks the active row IS this value, not a fixed fraction of the viewport,
         so the emerald row and the shot are always the same row: at the clamped
         ends of the section the line stops travelling exactly when the card
         does, and the pair stay level instead of drifting apart. */
      lineY = splitTop + y + peekH / 2;
      if (y === lastY) return;
      lastY = y;
      peek.style.setProperty('--peek-y', y + 'px');
    }

    /* The card is only shown once there is both a decoded shot AND measured
       geometry to put it at, so it arrives in place rather than fading up from
       wherever an unmeasured layout left it. */
    function reveal() {
      if (revealed || !loaded || !measured) return;
      revealed = true;
      requestAnimationFrame(function () { peek.classList.add('is-live'); });
    }
    window.SE.addFrame(function () {
      placePeek();
      if (hoverLock > -1 || !geo.length || window.SE.tier < 3) return;
      var best = 0, bd = Infinity;
      for (var i = 0; i < geo.length; i++) {
        var d = Math.abs(geo[i] - lineY);
        if (d < bd) { bd = d; best = i; }
      }
      setActive(best);
    });

    if (fine && !reduced) {
      rows.forEach(function (r, i) {
        r.addEventListener('pointerenter', function () { hoverLock = i; setActive(i); });
      });
      list.addEventListener('pointerleave', function () { hoverLock = -1; });
    }

    setActive(0);
  }


  function renderGraphics() {
    el('graphicsRail').innerHTML = GRAPHICS.map(function (f, i) {
      var src = 'works/graphics/' + f;
      // the only per-poster datum that exists is its position in the set, so
      // that is what gets set at display size — no invented titles
      return '<figure class="g-tile" data-g="' + i + '">' +
        // no loading="lazy": these arrive by transform, not by scrolling into
        // view, so the native heuristic fires late and shows blank cards
        '<img src="' + esc(src) + '" alt="Graphic design work ' + (i + 1) + '" ' +
          'decoding="async" fetchpriority="low">' +
        '<span class="g-num">' + pad(i + 1) + '</span>' +
        '<span class="g-zoom"><i class="iconify" data-icon="mdi:arrow-expand"></i></span>' +
      '</figure>';
    }).join('');
    var count = el('graphicsCount');
    if (count) count.textContent = '01 / ' + pad(GRAPHICS.length);
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* The journey is a rail, not a stack of cards. Each row owns: a node on the
     spine, a hairline that wires the node to the copy, a ghost index that only
     surfaces for the row being read, and a masked role line that rises once.
     The role sits in a .ln-i inner span so the mask is a clip on the parent —
     the same one-line lift the hero and footer wordmarks use. */
  function renderExperience() {
    var list = el('journey'); if (!list) return;
    var n = EXPERIENCE.length;

    list.innerHTML = EXPERIENCE.map(function (e, i) {
      return '<li class="xp-row reveal' + (e.origin ? ' xp-row--origin' : '') + '"' +
             ' style="--i:' + Math.min(i, 6) + '" data-index="' + i + '">' +
        '<span class="xp-ghost" aria-hidden="true">' + pad(i + 1) + '</span>' +
        '<span class="xp-node" aria-hidden="true"><i></i></span>' +
        '<span class="xp-link" aria-hidden="true"></span>' +
        '<div class="xp-body">' +
          '<p class="xp-meta">' +
            '<span class="xp-term">' + esc(e.year) + '</span>' +
            '<span class="xp-kind">' + esc(e.kind) + '</span>' +
          '</p>' +
          '<h3 class="xp-role"><span class="ln-i">' + esc(e.role) + '</span></h3>' +
          '<p class="xp-org">' + esc(e.org) + '</p>' +
        '</div>' +
      '</li>';
    }).join('');

    // the counter is derived from the data, never typed twice
    var count = el('journeyCount');
    if (count) {
      var first = EXPERIENCE[0].year.match(/\d{4}/);
      var last = EXPERIENCE[n - 1].year.match(/\d{4}/);
      count.textContent = pad(n) + ' entries' + (first && last ? ' · ' + last[0] + '—' + first[0] : '');
    }
  }

  /* Credentials are records: issuer, name, date, tag. Records belong in a
     ledger, not in ten tilting cards. */
  function renderCerts() {
    el('certsGrid').innerHTML = CERTS.map(function (c, i) {
      return '<li class="cert-row reveal' + (c.featured ? ' is-featured' : '') + '" style="--ci:' + c.color + ';--i:' + Math.min(i, 5) + '">' +
        '<span class="cert-dot"></span>' +
        '<span class="cert-issuer">' + esc(c.issuer) + '</span>' +
        '<span class="cert-name">' + esc(c.name) + '</span>' +
        '<span class="cert-tag">' + esc(c.tag) + '</span>' +
        '<span class="cert-date">' + esc(c.date) + '</span>' +
        '<span class="cert-check"><i class="iconify" data-icon="mdi:check-decagram"></i></span>' +
      '</li>';
    }).join('');
  }

  /* Three voices as a spread, not three cards. All three quotes are 190-260
     characters of genuinely useful praise, and the card treatment set them at
     0.96rem inside a border — caption size for the only thing on the page a
     prospective client is actually reading. Here the quote IS the display type
     and the attribution is the caption, which is the correct way round.

     No .t-card, and therefore no [data-tilt]: tilting a borderless quote has
     no edges to catch the light on, so the effect would be invisible work. */
  function renderTestimonials() {
    var host = el('saysList');
    if (!host) return;
    var stars = '<i class="iconify" data-icon="mdi:star"></i>'.repeat(5);

    host.innerHTML = TESTIMONIALS.map(function (t, i) {
      return '<figure class="say reveal" style="--i:' + i + '">' +
        '<div class="say-in">' +
          '<span class="say-mark" aria-hidden="true">&ldquo;</span>' +
          '<blockquote class="say-quote">' + esc(t.body) + '</blockquote>' +
          '<figcaption class="say-by">' +
            '<span class="say-avatar" aria-hidden="true">' + esc(t.initials) + '</span>' +
            '<span class="say-who">' +
              '<span class="say-name">' + esc(t.name) + '</span>' +
              '<span class="say-role">' + esc(t.role) + '</span>' +
            '</span>' +
            '<span class="t-stars" role="img" aria-label="Five out of five">' + stars + '</span>' +
          '</figcaption>' +
        '</div>' +
      '</figure>';
    }).join('');
  }

  /* ───────────────────────────── MODALS ─────────────────────────────────── */

  var lenis = null;
  var lockY = 0;
  /* No CSS overflow lock: `overflow` on either axis makes body a scroll
     container and kills every position:sticky pin on the page. */
  function lockScroll(lock) {
    if (window.SE) window.SE.paused = lock;
    document.body.classList.toggle('modal-open', lock);
    if (lenis) { lock ? lenis.stop() : lenis.start(); return; }
    var s = document.body.style;
    if (lock) {
      lockY = window.scrollY;
      s.position = 'fixed'; s.top = (-lockY) + 'px';
      s.left = '0'; s.right = '0'; s.width = '100%';
    } else {
      s.position = ''; s.top = ''; s.left = ''; s.right = ''; s.width = '';
      window.scrollTo(0, lockY);
    }
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

  var SE = window.SE || { vAbs: 0, tier: 3 };
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
    var nums = document.querySelectorAll('.stat-num[data-count]');
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

  /* The progress bar and .nav--scrolled are driven by the conductor now — see
     engine.js flush(). The bar scales instead of animating width so it stays a
     composite write. */

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
        if (SE.vAbs > 0.55) return;   // gate cuts work, not just visuals
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
        if (SE.vAbs > 0.55) return;
        var r = c.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        c.style.transform = 'perspective(760px) rotateX(' + ((0.5 - py) * 9).toFixed(2) +
          'deg) rotateY(' + ((px - 0.5) * 9).toFixed(2) + 'deg) translateY(-5px)';
        c.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
        c.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
        c.classList.add('tilt-live');
      });
      c.addEventListener('pointerleave', function () {
        c.style.transform = '';
        c.classList.remove('tilt-live');
      });
    });
  }

  /* ── SCROLL TRACKS ──────────────────────────────────────────────────────
     Every scroll-linked effect on the page is registered here and driven by
     the single conductor in engine.js. Nothing below adds a scroll listener.
     Scrubbed motion writes `translate:`/`scale:`/`rotate:` so it composes with
     the `transform:` that initTilt/initMagnetic own. See engine.js contract. */

  var railState = { maxX: 0, live: false, total: 0, shown: -1 };

  /* The colour field. Each layer is a fixed full-viewport plate of ONE colour;
     the drift is a crossfade of opacities, so nothing repaints per frame.
     Overdraw is capped: a layer leaves the tree below 0.003, and the light
     layers leave once the plunge has covered them. */
  function registerField(SE) {
    var field = el('field');
    if (!field) return;
    var layer = {};
    field.querySelectorAll('i[data-f]').forEach(function (n) { layer[n.dataset.f] = n; });

    function fade(node) {
      var shown = false, last = '';
      return function (v) {
        var on = v >= 0.003;
        if (on !== shown) { shown = on; node.style.display = on ? 'block' : 'none'; }
        if (!on) return;
        var o = v.toFixed(3);
        if (o !== last) { node.style.opacity = o; last = o; }
      };
    }

    SE.add(el('about'), 'enter', 'center', { k: 0.08, minTier: 1, fn: fade(layer['1']) });
    SE.add(el('work'),  'enter', 'center', { k: 0.08, minTier: 1, fn: fade(layer['2']) });
    // #stack exit and #graphics cover are the same document offset (adjacent siblings)
    SE.add(el('stack'), 'enter', 'exit',   { k: 0.08, minTier: 1, fn: fade(layer['3']) });

    var plungeFade = fade(layer['4']);
    var endFade = fade(layer['5']);
    var lightsOn = true, dusk = false, lastPlunge = '';
    // Starts only once #contact is genuinely on screen — beginning a viewport
    // earlier just muddies the testimonials instead of reading as a drop.
    // It must also FINISH with scroll to spare: the endcap footer is
    // transparent and shows this plunged field as its own ground, so a plunge
    // still short of 1 at the bottom of the page would leave a seam across the
    // closing panel. 'center-8vh' completes it ~240px before the scroll ends.
    SE.add(el('contact'), 'enter+30vh', 'center-8vh', {
      k: 0.08, minTier: 1, rest: 0,
      fn: function (v) {
        plungeFade(v);
        /* The image rides the same track rather than registering its own, so it
           is guaranteed to finish exactly when the plunge does — the reason that
           range ends with scroll to spare. Lagged, not linear: the dark lands
           first and the room then materialises inside it, which reads as arriving
           somewhere rather than as a picture cross-fading in. */
        endFade(SE.clamp01((v - 0.34) / 0.66));
        var p = v.toFixed(3);
        if (p !== lastPlunge) { document.documentElement.style.setProperty('--plunge', p); lastPlunge = p; }
        // once the plunge is opaque the light plates are invisible — drop them
        var keep = v <= 0.985;
        if (keep !== lightsOn) {
          lightsOn = keep;
          ['1', '2', '3'].forEach(function (k) { layer[k].style.visibility = keep ? '' : 'hidden'; });
        }
        // hysteresis so the class cannot strobe
        if (!dusk && v > 0.55) { dusk = true; document.documentElement.classList.add('se-dusk'); }
        else if (dusk && v < 0.42) { dusk = false; document.documentElement.classList.remove('se-dusk'); }
      }
    });
  }

  /* Hero title line mask. One of exactly three split-text moments on the page,
     and the only one that splits the h1 — line level, never per-character. */
  var heroLineEls = [], heroLineLast = [];

  /* Anchored at script parse, NOT inside splitHeroTitle. The opening's beats are
     CSS animation delays measured from first paint; splitHeroTitle runs after
     boot's whole render pass, so timing the headline's beat from there would
     drift it later by however long rendering took. This runs before any of it. */
  var T0 = Date.now();

  function splitHeroTitle() {
    var h1 = document.querySelector('.hero-title');
    if (!h1) return;
    h1.setAttribute('aria-label', h1.textContent.replace(/\s+/g, ' ').trim());
    h1.querySelectorAll('.line').forEach(function (line, i) {
      var inner = document.createElement('span');
      inner.className = 'ln-i';
      inner.setAttribute('aria-hidden', 'true');
      // move the nodes rather than re-serialising, so em.ink-accent survives
      while (line.firstChild) inner.appendChild(line.firstChild);
      line.appendChild(inner);
      line.setAttribute('aria-hidden', 'true');
      inner.style.setProperty('--i', i);
      heroLineEls.push(inner);
      heroLineLast.push('');
    });

    var accent = h1.querySelector('.ink-accent');

    /* Gated on `reduced` ALONE, not on tier. The mask used to require tier 3 —
       1025px wide AND 720px tall AND a fine pointer — so on any laptop that
       missed one of those the headline simply appeared while every other hero
       element animated around it, which read as the h1 being left out of the
       opening. It is the headline; it is the last thing that should sit still.
       The tier gate still governs the scrubbed EXIT (heroLines), which is a
       per-frame effect and genuinely does belong to cinema tier. */
    if (reduced) {
      // resolved end state written directly: same markup, same aria contract,
      // text visible from first paint
      heroLineEls.forEach(function (n) { n.style.setProperty('--ly', '0'); n.style.setProperty('--lr', '0deg'); n.style.opacity = '1'; });
      if (accent) accent.style.setProperty('--u', '1');
      return;
    }

    heroLineEls.forEach(function (n) {
      n.style.setProperty('--ly', '112%');
      n.style.setProperty('--lr', '2deg');
      n.style.opacity = '0';
    });

    var released = false;
    function release() {
      if (released) return;
      released = true;
      h1.classList.add('entering');
      requestAnimationFrame(function () {
        heroLineEls.forEach(function (n) {
          n.style.setProperty('--ly', '0'); n.style.setProperty('--lr', '0deg'); n.style.opacity = '1';
        });
      });
      setTimeout(function () { if (accent) accent.style.setProperty('--u', '1'); }, 980);
      setTimeout(function () { h1.classList.remove('entering'); }, 1600);
    }
    /* The headline has a BEAT in the opening — 340ms, after the portrait rises
       at 150 and before the right-hand copy arrives at 470 (see html.is-intro
       in scene.css). Two things have to be true at once for it to hit that beat:

         - it must not go EARLY. document.fonts.ready resolves in ~40ms on a
           repeat visit with the fonts already cached, which released the title
           before the choreography was visibly under way — the h1 was simply
           in place while everything else moved, which is precisely "the title
           isn't part of the animation".
         - it must not go LATE. A cold font load must never withhold the
           headline, so 620ms is the hard cap regardless of fonts.

       Hence: whichever of the two fires first only SCHEDULES the release, and
       the floor is measured from boot rather than from that moment. Releasing
       on fonts.ready remains the preferred path — the lines then travel in
       their final metrics and the type cannot reflow mid-animation. */
    var scheduled = false;
    function schedule() {
      if (scheduled) return;
      scheduled = true;
      setTimeout(release, Math.max(0, 340 - (Date.now() - T0)));
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
    setTimeout(schedule, 620);
  }

  var HERO_VARS = ['--pd', '--fade'];

  /* Scrubbed exit, per line, staggered so line 3 leaves well after line 1.
     Starts at pd 0.5 — half a viewport of scroll — because before that the
     title is still sitting in the middle of the frame, and a headline that
     masks itself away while you are reading it is the same defect as a hero
     that fades out while it is still on screen. */
  function heroLines(pd) {
    for (var i = 0; i < heroLineEls.length; i++) {
      var li = window.SE.clamp01((pd - 0.50 - i * 0.05) / 0.26);
      var y = (li * -118).toFixed(2) + '%';
      if (y === heroLineLast[i]) continue;
      heroLineLast[i] = y;
      heroLineEls[i].style.setProperty('--ly', y);
      heroLineEls[i].style.setProperty('--lo', (1 - li).toFixed(3));
    }
  }

  /* The travelling ring: one anchor table resolved from cached document
     geometry at measure time, blended by scroll position. One write per frame. */
  function registerRing(SE) {
    var ring = el('ring');
    if (!ring) return;
    var stops = [], cur = { x: 0, y: 0, s: 1, o: 0 }, last = '';

    function anchorOf(sel) {
      var n = document.querySelector(sel);
      if (!n) return null;
      var t = 0, e = n;
      while (e) { t += e.offsetTop; e = e.offsetParent; }
      var l = 0; e = n;
      while (e) { l += e.offsetLeft; e = e.offsetParent; }
      return { x: l + n.offsetWidth / 2, y: t + n.offsetHeight / 2 };
    }
    function topOf(sel) {
      var n = document.querySelector(sel);
      if (!n) return null;
      var t = 0; while (n) { t += n.offsetTop; n = n.offsetParent; }
      return t;
    }

    SE.addMeasure(function ringMeasure() {
      var vh = innerHeight, vw = innerWidth;
      var about = anchorOf('.edu-card'), cta = anchorOf('.cta'), foot = anchorOf('.footer-name');
      var workTop = topOf('#work'), gfx = el('graphics');
      var gfxTop = topOf('#graphics'), gfxH = gfx ? gfx.offsetHeight : vh;

      // There is no hero handoff any more. It existed to catch #heroRing mid-pin
      // at a 4.2x bloom and carry that pose into the field; unpinned, #heroRing
      // simply scrolls away with the hero it belongs to, which is both simpler
      // and impossible to pop. The travelling ring's journey now begins at About.
      //
      // The lead-in stop is load-bearing, not decoration: ringFrame clamps to
      // stops[0] for any scroll before it, so without a stop that reads
      // opacity 0 the ring would sit visible over the hero from the first paint.
      var aboutY = about ? about.y : 0;
      var lead = Math.max(1, aboutY - vh * 1.35);

      // [scrollY at which this pose is reached, x, y (document space), scale, opacity]
      stops = [
        [lead,                           vw * 0.5,  lead + vh * 0.45,                0.62, 0.00],
        [about ? about.y - vh * 0.5 : 0, about ? about.x : vw * 0.5, about ? about.y : 0, 0.42, 0.26],
        [workTop,                        vw * 0.62, workTop + vh * 0.5,              0.42, 0.00],
        [gfxTop + gfxH - vh,             vw * 0.86, gfxTop + gfxH - vh * 0.2,        0.15, 0.50],
        [cta ? cta.y - vh * 0.5 : 0,     cta ? cta.x : vw * 0.5, cta ? cta.y : 0,    1.80, 0.40],
        [foot ? foot.y - vh * 0.5 : 0,   foot ? foot.x : vw * 0.5, foot ? foot.y : 0, 0.55, 0.20]
      ].filter(function (s) { return s[0] > 0; }).sort(function (a, b) { return a[0] - b[0]; });
    });

    function smoothstep(t) { return t * t * (3 - 2 * t); }

    SE.addFrame(function ringFrame() {
      if (SE.tier < 2 || !stops.length) return;
      var y = SE.y, a = stops[0], b = stops[0], i;
      for (i = 0; i < stops.length - 1; i++) {
        if (y >= stops[i][0] && y <= stops[i + 1][0]) { a = stops[i]; b = stops[i + 1]; break; }
      }
      if (y <= stops[0][0]) { a = b = stops[0]; }
      else if (y >= stops[stops.length - 1][0]) { a = b = stops[stops.length - 1]; }
      var t = b[0] === a[0] ? 0 : smoothstep(SE.clamp01((y - a[0]) / (b[0] - a[0])));
      var tx = a[1] + (b[1] - a[1]) * t;
      var ty = a[2] + (b[2] - a[2]) * t - SE.y;   // document space -> viewport
      var ts = a[3] + (b[3] - a[3]) * t;
      var to = a[4] + (b[4] - a[4]) * t;

      var k = 0.085;
      cur.x += (tx - cur.x) * k; cur.y += (ty - cur.y) * k;
      cur.s += (ts - cur.s) * k; cur.o += (to - cur.o) * k;
      // snap, so a settled ring stops producing writes entirely
      if (Math.abs(tx - cur.x) < 0.05) cur.x = tx;
      if (Math.abs(ty - cur.y) < 0.05) cur.y = ty;
      if (Math.abs(ts - cur.s) < 4e-4) cur.s = ts;
      if (Math.abs(to - cur.o) < 4e-4) cur.o = to;

      var str = cur.x.toFixed(1) + ',' + cur.y.toFixed(1) + ',' + cur.s.toFixed(3) + ',' + cur.o.toFixed(3);
      if (str === last) return;
      last = str;
      ring.style.translate = 'calc(' + cur.x.toFixed(1) + 'px - 50%) calc(' + cur.y.toFixed(1) + 'px - 50%)';
      ring.style.scale = cur.s.toFixed(3);
      ring.style.opacity = cur.o.toFixed(3);
    });
  }

  /* One drawn rule per section head, whose scaleX IS that section's reading
     progress. #certs is a deliberate rest bar and gets none. */
  function registerSectionRules(SE) {
    ['about', 'services', 'work', 'stack', 'experience'].forEach(function (id) {
      var sec = el(id); if (!sec) return;
      var head = sec.querySelector('.section-head'); if (!head) return;
      SE.add(sec, 'cover-20vh', 'exit-60vh', {
        prop: '--hp', k: 0.13, minTier: 2, rest: 1, target: head
      });
    });
  }

  /* JOURNEY — the career rail.
     Three layers, all composited:
       1. the spine draws itself           --tp on .xp        (scrub, tier 2+)
       2. a comet rides the drawn edge     --tp * --xh        (scrub, tier 2+)
       3. each row wires itself off it     .lit               (observer, all tiers)
     The rail is trimmed to the first and last NODE rather than the list box, so
     the spine starts and ends exactly on a station instead of trailing past
     them. That geometry is read in the measure pass — the only place layout may
     be touched — and republished as plain px custom properties.
     The observers are deliberately NOT unobserved — scenography is reversible. */
  function registerJourney(SE) {
    var list = el('journey'); if (!list) return;
    var xp = list.closest('.xp') || list.parentNode;
    var rows = [].slice.call(list.querySelectorAll('.xp-row'));
    if (!rows.length) return;

    SE.addMeasure(function () {
      var a = rows[0].querySelector('.xp-node');
      var b = rows[rows.length - 1].querySelector('.xp-node');
      if (!a || !b) return;
      var top = rows[0].offsetTop + a.offsetTop + a.offsetHeight / 2;
      var end = rows[rows.length - 1].offsetTop + b.offsetTop + b.offsetHeight / 2;
      xp.style.setProperty('--xt', top + 'px');
      xp.style.setProperty('--xh', Math.max(1, end - top) + 'px');
    });

    // the spine finishes drawing a little before the section leaves, so the
    // comet parks on the origin node instead of being scrolled off mid-travel
    SE.add(xp, 'enter+26vh', 'exit-64vh', { prop: '--tp', k: 0.12, minTier: 2, rest: 1 });

    if (reduced) { rows.forEach(function (r) { r.classList.add('lit'); }); return; }

    /* the reading band: a row is "being read" while its box overlaps the
       middle ~16% of the viewport, which is where the comet is too */
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.target.classList.toggle('lit', en.isIntersecting); });
    }, { rootMargin: '-46% 0px -38% 0px', threshold: 0 });
    rows.forEach(function (r) { obs.observe(r); });

    /* the ghost index drifts against the copy as its row passes — the same
       depth-of-field trick the rail masthead uses, at a tenth of the travel */
    rows.forEach(function (r) {
      SE.add(r, 'enter', 'exit', { prop: '--rp', k: 0.12, minTier: 3, rest: 0.5, pad: 0.15 });
    });
  }

  /* ── ABOUT ────────────────────────────────────────────────────────────────
     The section assembles itself over five scrubs. All of them are gated at
     minTier 1, not 3 — between them they cost one text write, two class
     toggles and six custom-property writes per frame, which a phone can carry,
     and About is the section a client actually reads. Only the photograph's
     internal parallax is tier 3, because that one is pure depth.

     Every track sets rest: 1 (the finished state) so prefers-reduced-motion
     resolves statically to a complete, fully-inked section. */

  /* One span per word, each carrying its own static position through the
     paragraph. Splitting on the whitespace-capturing regex keeps the original
     spacing intact, so the copy still wraps exactly as authored. */
  function splitAboutWords() {
    var out = [];
    document.querySelectorAll('.about-story > p').forEach(function (p) {
      if (p.children.length) return;          // never re-split, never eat markup
      var parts = p.textContent.split(/(\s+)/);
      var total = 0;
      parts.forEach(function (w) { if (w.trim()) total++; });
      if (total < 2) return;

      var frag = document.createDocumentFragment(), k = 0;
      parts.forEach(function (w) {
        if (!w.trim()) { if (w) frag.appendChild(document.createTextNode(w)); return; }
        var s = document.createElement('span');
        s.className = 'ab-w';
        s.style.setProperty('--w', (k / (total - 1)).toFixed(4));
        s.textContent = w;
        frag.appendChild(s);
        k++;
      });
      p.textContent = '';
      p.appendChild(frag);
      out.push(p);
    });
    return out;
  }

  function registerAbout(SE) {
    /* 1. The meter — the readout counts, the rail fills, the beat swaps. */
    var meter = el('abMeter');
    if (meter && ABOUT_BEATS.length) {
      var yearEl = el('abYear');
      var beats = [].slice.call(meter.querySelectorAll('.ab-beat'));
      var ticks = [].slice.call(meter.querySelectorAll('.ab-tick'));
      var y0 = ABOUT_BEATS[0].y, y1 = ABOUT_BEATS[ABOUT_BEATS.length - 1].y;
      var lastYear = -1, lastLit = 0, lastYp = '';

      /* The window is anchored to the meter's OWN top edge, not to `enter`/
         `center` alone, because this is the one track whose whole payload is
         read rather than felt: 2015 → 2026 has to tick where the eye already
         is. `enter+22vh` starts the count with the block sitting at 78% of the
         viewport — fully on screen, never below the fold — and `cover-18vh`
         lands 2026 with it at 18% from the top, still comfortably above the
         reading line. That is 0.60vh of travel whatever the element's height,
         so the beats change at a legible pace on a laptop and a phone alike.

         The previous 'enter-16vh' → 'center-6vh' began the scrub 16vh BELOW
         the fold and finished it while the block was still in the bottom half,
         so a reader met the meter already pinned at 2026 and never saw a
         single intermediate beat. */
      SE.add(meter, 'enter+22vh', 'cover-18vh', {
        k: 0.11, minTier: 1, rest: 1,
        fn: function (p) {
          var v = p.toFixed(4);
          if (v !== lastYp) { meter.style.setProperty('--yp', v); lastYp = v; }

          // integer readout: dedupe here, or this is a DOM write every frame
          var yr = Math.round(y0 + (y1 - y0) * p);
          if (yr !== lastYear) {
            lastYear = yr;
            if (yearEl) yearEl.textContent = yr;

            var idx = 0;
            for (var i = 0; i < ABOUT_BEATS.length; i++) if (yr >= ABOUT_BEATS[i].y) idx = i;
            if (idx !== lastLit) {
              if (beats[lastLit]) beats[lastLit].classList.remove('is-lit');
              if (beats[idx]) beats[idx].classList.add('is-lit');
              for (var j = 0; j < ticks.length; j++) ticks[j].classList.toggle('is-on', j <= idx);
              lastLit = idx;
            }
          }
        }
      });
    }

    /* 2. The story — one number per paragraph inks every word in it. */
    splitAboutWords().forEach(function (p) {
      SE.add(p, 'enter-2vh', 'center-12vh', { prop: '--tp', k: 0.12, minTier: 1, rest: 1 });
    });

    /* 3. The pull-quote's rule draws down the margin. */
    var q = document.querySelector('.about-quote');
    if (q) SE.add(q, 'enter-6vh', 'center-2vh', { prop: '--qp', k: 0.14, minTier: 1, rest: 1 });

    /* 4. The photograph develops left to right, then its subject drifts. */
    var photo = el('eduPhoto');
    if (photo) {
      SE.add(photo, 'enter-4vh', 'center-14vh', { prop: '--wp', k: 0.10, minTier: 1, rest: 1 });
      SE.add(photo, 'enter', 'exit', { prop: '--pp', k: 0.12, minTier: 3, rest: 0.5, pad: 0.15 });
    }

    /* 5. The ledger rules itself in. */
    var ledger = document.querySelector('.ab-ledger');
    if (ledger) SE.add(ledger, 'enter-8vh', 'center+8vh', { prop: '--lp', k: 0.13, minTier: 1, rest: 1 });
  }

  /* ── TOOLKIT ──────────────────────────────────────────────────────────────
     Seven discipline rows, shearing against each other. The whole effect is ONE
     custom property per frame: --tk is the section's reading progress, every
     row inherits it, and each row's CSS flips the sign from its data-dir.

     It is deliberately NOT the marquee's mechanic. The marquee integrates
     scroll VELOCITY and never stops; these lanes map scroll POSITION over a
     bounded range, so they stand still the instant you do and one pass of the
     section shows every tile. That difference is also what keeps the section
     from stealing the pinned graphics rail's entrance two sections later —
     this drifts, that one takes over the screen. */
  function registerToolkit(SE) {
    var host = el('stackIndex');
    if (!host) return;

    /* ONE property for the whole section. Every row inherits --tk and flips its
       sign from data-dir, so seven chip strips shear against each other on a
       single write per frame — no per-row tracks, no measure pass, no geometry.

       The shear is a fixed ±22px PARALLAX, not a reveal. That distinction is
       what makes grouping survive: the disciplines hold 4 to 10 tools, so a
       reveal-style drift would leave the four-tool rows motionless beside the
       ten-tool ones. A fixed offset moves every row by the same amount whatever
       its length, and nothing is ever carried off-screen — every tool stays
       readable for the whole scroll. */
    SE.add(host, 'enter+15vh', 'exit-15vh', { prop: '--tk', k: 0.11, minTier: 2, rest: 0.5 });
  }

  /* ── SERVICES ──────────────────────────────────────────────────────────────
     One track per row, each scrubbed across its own entry-to-exit range, so
     every row carries its own reading progress — that is what lets the number,
     the icon tile and the copy inside a single row pass the reading band at
     three different rates instead of nine identical hairlines sliding past as
     one slab. Nine tracks is nothing; the work index already runs one per row.

     rest 0.5 is the identity value: (--svp - 0.5) is zero, so tier 0 and any
     tier under the gate park every row exactly where the static CSS puts it.
     minTier 3 because this is pure depth — it adds nothing a phone needs, and
     a phone is where the frame budget is thinnest. */
  function registerServices(SE) {
    var host = el('servicesGrid');
    if (!host) return;
    var rows = [].slice.call(host.querySelectorAll('.svc-row'));
    if (!rows.length) return;

    rows.forEach(function (r) {
      SE.add(r, 'enter', 'exit', { prop: '--svp', k: 0.13, minTier: 3, rest: 0.5, pad: 0.12 });
    });

    /* The reading head. The toolkit's IntersectionObserver band was the obvious
       build and it is wrong here, for a reason that is geometry and not taste:
       a service row is ~78px tall, so any band wide enough to be reliable is
       taller than a row and TWO rows light at once — which reads as a hover
       bug, because the page has trained the reader that one lit row means one
       active row.

       So the head is chosen, not detected: the single row the reading line is
       inside. Off the geometry the measure pass already caches, so it costs no
       layout read, and one class write per change. */
    var tops = [], hs = [];
    SE.addMeasure(function () {
      tops.length = 0; hs.length = 0;
      for (var i = 0; i < rows.length; i++) {
        var n = rows[i], t = 0;
        while (n) { t += n.offsetTop; n = n.offsetParent; }
        tops.push(t); hs.push(rows[i].offsetHeight);
      }
    });

    var lit = -1;
    SE.addFrame(function () {
      var line = SE.y + SE.vh * 0.5, idx = -1;
      for (var i = 0; i < tops.length; i++) {
        if (line >= tops[i] && line < tops[i] + hs[i]) { idx = i; break; }
      }
      if (idx === lit) return;
      if (rows[lit]) rows[lit].classList.remove('is-lit');
      if (rows[idx]) rows[idx].classList.add('is-lit');
      lit = idx;
    });
  }

  /* ── TESTIMONIALS ─────────────────────────────────────────────────────────
     One track per quote, each scrubbed across its OWN entry-to-exit range, so
     the three blocks travel at different rates and settle into a depth field
     rather than moving as one slab. Amplitude and sign alternate in the CSS.

     Per-quote rather than one shared section progress on purpose: a shared
     value would make all three read as a single element breathing, which is
     the flat look this replaces. Three tracks is nothing — the page already
     runs one per work row.

     rest 0.5 is the identity value: at 0.5 every derived offset is zero, so a
     tier below the gate parks every quote exactly where the static CSS puts
     it. */
  function registerSays(SE) {
    document.querySelectorAll('.say').forEach(function (n) {
      SE.add(n, 'enter', 'exit', { prop: '--ep', k: 0.12, minTier: 2, rest: 0.5, pad: 0.2 });
    });
  }

  /* Marquee: an integrator, not a track — it accumulates position rather than
     mapping it, so scroll velocity and direction steer a band that never stops. */
  function registerMarquee(SE) {
    var track = el('marqueeTrack'); if (!track) return;
    var half = 0, mx = 0, last = '';
    SE.addMeasure(function () { half = track.scrollWidth / 2; });
    SE.addFrame(function (dt) {
      if (SE.tier < 2 || !half) return;
      mx -= (44 + SE.vAbs * 180) * SE.dir * (SE.dtLast / 1000);
      if (mx <= -half) mx += half;
      if (mx > 0) mx -= half;
      var v = 'translate3d(' + mx.toFixed(1) + 'px,0,0)';
      if (v === last) return;
      last = v;
      track.style.transform = v;
    });
  }

  /* Nav: scroll-spy off the cached section tops, plus an auto-hide that is
     suppressed while a modal is open, while focus is inside the nav, and for
     900ms after a programmatic scroll (otherwise clicking a nav link fires a
     huge synthetic velocity and the bar tucks away mid-jump). */
  function registerNav(SE) {
    var nav = el('nav'); if (!nav) return;
    var links = [].slice.call(nav.querySelectorAll('.nav-links a[href^="#"]'));
    var secs = [], activeIdx = -1;

    SE.addMeasure(function () {
      secs = links.map(function (a) {
        var n = document.querySelector(a.getAttribute('href'));
        if (!n) return null;
        var t = 0; while (n) { t += n.offsetTop; n = n.offsetParent; }
        return t;
      });
    });

    var hidden = false, fastSince = 0;
    SE.addFrame(function () {
      // scroll-spy
      var best = -1;
      for (var i = 0; i < secs.length; i++) {
        if (secs[i] != null && secs[i] - 0.34 * SE.vh <= SE.y) best = i;
      }
      if (best !== activeIdx) {
        if (links[activeIdx]) links[activeIdx].classList.remove('is-active');
        if (links[best]) links[best].classList.add('is-active');
        activeIdx = best;
      }

      /* Auto-hide runs from tier 1 up. It used to be cinema-only, which had it
         backwards: the bar is 60px of a 844px phone screen and there is no
         hover to reveal it with, so tucking it away on the way down is worth
         MORE there than on a 1440px desktop. Only tier 0 (reduced motion) opts
         out, because that is a request not to move things. */
      if (SE.tier < 1 || reduced) return;
      // auto-hide
      var suppressed = document.querySelector('.modal.open') ||
                       document.documentElement.classList.contains('se-menu') ||
                       nav.contains(document.activeElement) ||
                       (window.__seJumpUntil || 0) > SE.now;
      if (suppressed) { fastSince = 0; if (hidden) { hidden = false; document.documentElement.classList.remove('se-navhide'); } return; }
      if (SE.sv < -0.05) { fastSince = 0; if (hidden) { hidden = false; document.documentElement.classList.remove('se-navhide'); } return; }
      if (SE.sv > 0.35 && SE.y > 1.2 * SE.vh) {
        fastSince += SE.dtLast;
        if (fastSince >= 260 && !hidden) { hidden = true; document.documentElement.classList.add('se-navhide'); }
      } else fastSince = 0;
    });
  }

  function registerTracks() {
    var SE = window.SE;

    registerField(SE);
    splitHeroTitle();
    registerRing(SE);
    registerSectionRules(SE);
    registerJourney(SE);
    registerAbout(SE);
    registerServices(SE);
    registerToolkit(SE);
    registerSays(SE);
    registerMarquee(SE);
    registerNav(SE);

    /* Project inner parallax. .project-card is the only card family that is
       NOT [data-tilt], so its motion channel is completely uncontested. */
    document.querySelectorAll('.work-row').forEach(function (card) {
      SE.add(card, 'enter', 'exit', {
        prop: '--ip', k: 0.12, minTier: 3, rest: 0.5, pad: 0.1,
        fn: (function (c) {
          var last = '';
          return function (p) {
            var ip = Math.max(-13, Math.min(13, (p - 0.5) * -26));
            var v = ip.toFixed(2);
            if (v === last) return;
            last = v;
            c.style.setProperty('--ip', v);
          };
        })(card)
      });
    });

    /* Footer landing: three depth planes, 44/26/12px.
       The end range must be REACHABLE. 'cover+30vh' resolves to footerTop +
       30vh, but the last element's top plus a fraction of a viewport is past
       the document's maximum scroll — --fp topped out at 0.25 and the wordmark
       sat 33px low at 40% opacity for good. 'contain' is the one range that
       resolves to exactly maxScroll for the last block on the page, so
       'contain-8vh' lands the reveal just before the scroll runs out. */
    var footer = document.querySelector('.footer');
    if (footer) {
      SE.add(footer, 'enter+10vh', 'contain-8vh', { prop: '--fp', k: 0.11, minTier: 2, rest: 1 });
      var name = document.querySelector('.footer-name');
      if (name && !reduced) {
        var inner = document.createElement('span');
        inner.className = 'ln-i';
        while (name.firstChild) inner.appendChild(name.firstChild);
        name.appendChild(inner);
        inner.style.setProperty('--ly', '100%');
        /* minTier 1, and the gate is the whole point of the fix. The wordmark is
           pushed 100% down inside `.footer-name { overflow: clip }` the moment it
           is split, and only this trigger brings it back — so a `minTier: 2` on
           it did not "skip an animation" at tier 1, it left DALE BEDANIA clipped
           out of the footer on every phone, permanently. Nothing here is
           per-frame: it is one threshold and one class, which is exactly what
           addOnce defaults to tier 1 for. */
        SE.addOnce(footer, 'enter+18vh', { minTier: 1, cls: 'se-in',
          cb: function () { name.classList.add('se-in'); inner.style.setProperty('--ly', '0'); } });
      }
    }

    /* Hero exit. The hero is unpinned, so this range is the hero's own departure
       rather than a pin's travel: 'cover' → 'exit', i.e. pd 0 at rest and 1 once
       the hero's bottom edge has passed the top of the viewport. There is no
       stage progress to invent — the scroll already moves the hero, and --pd
       just says how far through that move we are.

       'exit' is the correct end, not 'exit-Nvh': the tall elements here (the
       116vh portrait) are on screen right up until the hero clears the frame,
       and an earlier end would have --fade reach 1 while they were still
       visible. That was the bug, in its second form.

       k is higher than the page's other tracks because this one has no pin to
       hide latency behind: the hero is moving with the wheel, so a laggy scrub
       reads as the decoration sliding loose from the thing it decorates. */
    var heroStage = el('heroStage');
    if (heroStage) {
      var hs = heroStage.style, hlast = ['', ''];
      SE.add(heroStage, 'cover', 'exit', {
        prop: '--pd', k: 0.22, minTier: 3, rest: 0, willChange: 'transform',
        fn: function (pd) {
          // opacity is held back until the copy has left the top of the frame,
          // then eased in — see the channel split in scene.css
          var f = SE.clamp01((pd - 0.55) / 0.45);
          var v = [pd.toFixed(4), (f * f).toFixed(4)];
          for (var i = 0; i < 2; i++) {
            if (v[i] !== hlast[i]) { hs.setProperty(HERO_VARS[i], v[i]); hlast[i] = v[i]; }
          }
          heroLines(pd);
        }
      });
    }

    /* Pinned horizontal graphics rail. Vertical distance maps to horizontal
       travel; the stage height is measured, never assumed. */
    var stage = el('graphics'), viewport = el('graphicsViewport'),
        track = el('graphicsRail'), prog = el('graphicsProgress'), count = el('graphicsCount');

    if (stage && viewport && track) {
      railState.total = track.querySelectorAll('.g-tile').length;

      SE.addMeasure(function railMeasure() {
        railState.live = SE.tier >= 3;
        stage.classList.toggle('rail-stage--live', railState.live);
        if (!railState.live) {
          stage.style.height = '';
          track.style.transform = '';
          if (prog) prog.style.setProperty('--rp', '0');
          railState.maxX = 0;
          return;
        }
        track.style.transform = '';
        railState.maxX = Math.max(0, track.scrollWidth - viewport.clientWidth);
        // 24 tiles at 1:1 would cost ~7 viewports of scrolling — cap the
        // vertical distance and let the track travel faster instead.
        stage.style.height = (innerHeight + Math.min(railState.maxX, innerHeight * 2.4)) + 'px';
      });

      // tile geometry cached once — per-tile depth is then pure arithmetic
      var tiles = [], tileW = 0, padLeft = 0, GAP = 18, dLast = [];
      SE.addMeasure(function () {
        tiles = [].slice.call(track.querySelectorAll('.g-tile'));
        tileW = tiles.length ? tiles[0].offsetWidth : 0;
        padLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
        dLast = tiles.map(function () { return ''; });
      });

      var sticky = el('graphicsSticky'), hintOn = false;

      SE.add(stage, 'cover', 'exit-100vh', {
        k: 0.14, minTier: 3, rest: 0, willChange: 'transform',
        fn: function railFrame(p) {
          // rubber-band: the track overshoots with scroll velocity and settles.
          // Hard clamp — trackpad flings produce enormous instantaneous values.
          var band = Math.max(-38, Math.min(38, SE.sv * 38));
          var x = -(p * railState.maxX) + band;
          track.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)';

          if (prog) prog.style.setProperty('--rp', p.toFixed(4));
          if (sticky) sticky.style.setProperty('--rp', p.toFixed(4));

          for (var i = 0; i < tiles.length; i++) {
            var cx = padLeft + i * (tileW + GAP) + tileW / 2 + x;
            var d = (cx - SE.vw / 2) / SE.vw;
            if (d < -1.3) d = -1.3; else if (d > 1.3) d = 1.3;
            var out = Math.abs(d) >= 1.15;
            var v = out ? '' : d.toFixed(3);
            if (v === dLast[i]) continue;
            dLast[i] = v;
            if (out) tiles[i].style.removeProperty('--d');
            else tiles[i].style.setProperty('--d', v);
          }

          if (count) {
            var n = Math.min(railState.total, Math.floor(p * (railState.total - 1)) + 1);
            if (n !== railState.shown) { railState.shown = n; count.textContent = pad(n) + ' / ' + pad(railState.total); }
          }
          var wantHint = p > 0.93;
          if (wantHint !== hintOn) {
            hintOn = wantHint;
            var h = document.querySelector('.rail-hint-scroll');
            if (h) h.textContent = wantHint ? 'Release ↓' : 'Keep scrolling ↓';
          }
        }
      });

      // a missing file is the only thing that can change the track width
      track.querySelectorAll('img').forEach(function (img) {
        img.addEventListener('error', function () {
          var tile = img.closest('.g-tile');
          if (tile) tile.remove();
          railState.total = track.querySelectorAll('.g-tile').length;
          SE.invalidate();
        });
      });

      /* Fallback tier: native horizontal scrolling drives the bar AND the count.
         The count used to be written only inside railFrame, which is tier 3 —
         so on a phone, the one tier where the rail IS a swipeable carousel and
         the readout is the only thing telling you how far along it you are, it
         sat frozen at "01 / 24" through all twenty-four plates. */
      viewport.addEventListener('scroll', function () {
        if (railState.live) return;
        var m = viewport.scrollWidth - viewport.clientWidth;
        var p = m > 0 ? viewport.scrollLeft / m : 0;
        if (prog) prog.style.setProperty('--rp', p.toFixed(4));
        if (count && railState.total) {
          // rounded, not floored: the tiles snap to CENTRE here, so "current" is
          // the plate in the middle of the screen — flooring named the one it had
          // just left for most of the swipe
          var n = Math.min(railState.total, Math.round(p * (railState.total - 1)) + 1);
          if (n !== railState.shown) { railState.shown = n; count.textContent = pad(n) + ' / ' + pad(railState.total); }
        }
      }, { passive: true });
    }
  }

  /* Cursor image trail across the CTA block. */
  function initTrail() {
    var host = el('ctaTrail'), layer = el('trailLayer');
    if (!host || !layer || !fine || reduced) return;
    var shots = PROJECTS.map(function (p) { return p.img; });
    var last = null, n = 0, live = [];
    host.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      if (SE.vAbs > 0.55) return;
      var r = layer.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      if (last && Math.hypot(x - last.x, y - last.y) < 64) return;
      last = { x: x, y: y };
      var rot = (Math.random() * 14 - 7).toFixed(1);
      var card = document.createElement('div');
      card.className = 'trail-card';
      card.style.left = x + 'px';
      card.style.top = y + 'px';
      card.style.backgroundImage = 'url("' + shots[n++ % shots.length] + '")';
      card.style.transform = 'translate(-50%,-50%) scale(.55) rotate(' + rot + 'deg)';
      // hard cap on concurrent 178x116 composite layers with large shadows
      while (layer.childElementCount > 14) layer.firstElementChild.remove();
      layer.appendChild(card);
      live.push(card);
      requestAnimationFrame(function () {
        card.style.opacity = '0.88';
        card.style.transform = 'translate(-50%,-50%) scale(1) rotate(' + rot + 'deg)';
      });
      setTimeout(function () {
        card.style.opacity = '0';
        card.style.transform = 'translate(-50%,-50%) scale(.86) rotate(' + rot + 'deg)';
      }, 540);
      setTimeout(function () {
        card.remove();
        var k = live.indexOf(card); if (k > -1) live.splice(k, 1);
      }, 950);
    });
    host.addEventListener('pointerleave', function () {
      last = null;
      // clear everything in flight, not just the spawn anchor
      live.forEach(function (c) { c.remove(); });
      live.length = 0;
    });
  }

  /* ── The phone menu ─────────────────────────────────────────────────────────
     Below 1024px .nav-links is display:none and nothing replaced it, so the
     entire page had no way to reach a section except scrolling to it. A sheet
     rather than a dropdown: at phone size a menu that takes the screen is what
     every app does, and it gives six destinations room to be typography.

     Registered BEFORE initSmoothScroll, and its closers are bound to the links
     THEMSELVES rather than delegated off the sheet. Both details are load-order
     dependent and neither is cosmetic: lockScroll pins the body with
     `position: fixed`, and a document in that state cannot be scrolled by the
     anchor handler. Same-element listeners fire in registration order, so
     closing (which unpins the body) has to be the listener that runs first —
     a delegated handler on the sheet would only see the click on the way back
     up, after the jump had already been measured against a pinned document. */
  function initMobileNav() {
    var burger = el('navBurger'), sheet = el('navSheet');
    if (!burger || !sheet) return;
    var root = document.documentElement;
    var open = false;

    function set(next) {
      if (next === open) return;
      open = next;
      root.classList.toggle('se-menu', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      sheet.setAttribute('aria-hidden', open ? 'false' : 'true');
      lockScroll(open);
      // registerNav suppresses its auto-hide while focus is inside the bar, so a
      // burger left focused after the sheet closes would pin the bar on screen
      if (!open) burger.blur();
    }

    burger.addEventListener('click', function () { set(!open); });
    sheet.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { set(false); });
    });
    // a tap on the sheet's own ground, not on a link
    sheet.addEventListener('click', function (e) { if (e.target === sheet) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    // a rotation or a resize into the desktop layout must not leave a
    // full-screen sheet latched over a composition that has its links back
    addEventListener('resize', function () { if (open && innerWidth > 900) set(false); });
  }

  /* The FAB is a shortcut to the CTA, and while the hero is on screen the hero
     is already showing that CTA at full size — so on the one screen where the
     shortcut is redundant it was also covering the secondary links beside the
     button it duplicates. It waits for the hero to leave. Observer, not a track:
     this is a threshold, and the engine's per-frame scrubs are off at tier 1
     anyway. */
  function initFabGate() {
    var fab = document.querySelector('.fab'), hero = el('hero');
    if (!fab || !hero || !('IntersectionObserver' in window)) return;
    var root = document.documentElement;
    root.classList.add('se-athero');
    new IntersectionObserver(function (entries) {
      root.classList.toggle('se-athero', entries[0].intersectionRatio > 0.28);
    }, { threshold: [0, 0.28, 0.6] }).observe(hero);
  }

  function initSmoothScroll() {
    // Only on the cinematic tier — native momentum beats faked momentum on
    // touch. The conductor owns the rAF tick, so no loop is started here.
    var cinematic = window.SE ? window.SE.tierOf() >= 3 : false;
    if (cinematic && !reduced && typeof Lenis !== 'undefined') {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      window.__lenis = lenis;
    }
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href'); if (id === '#' || id.length < 2) return;
        var target = document.querySelector(id); if (!target) return;
        e.preventDefault();
        // a programmatic jump produces a huge synthetic velocity — suppress the
        // nav auto-hide through it, or the bar tucks away mid-jump
        window.__seJumpUntil = (window.SE ? SE.now : 0) + 900;
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
    // with no CSS overflow lock, keyboard scrolling has to be blocked explicitly
    var SCROLL_KEYS = { ' ': 1, Spacebar: 1, PageUp: 1, PageDown: 1, Home: 1, End: 1,
                        ArrowUp: 1, ArrowDown: 1, ArrowLeft: 1, ArrowRight: 1 };
    document.addEventListener('keydown', function (e) {
      if (!SCROLL_KEYS[e.key] || !document.body.classList.contains('modal-open')) return;
      var t = e.target;
      if (t && t.closest && t.closest('[data-lenis-prevent]')) return;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      e.preventDefault();
    }, { passive: false });
  }

  /* ── THE OPENING ──────────────────────────────────────────────────────────
     The choreography itself is entirely CSS (scene.css, html.is-intro). All
     this does is decide when it is over, because the class has to come off:
     while it is on, the opening's animations outrank the hero's scroll-scrubbed
     opacity, and the engine cannot fade the hero out.

     Three ways it ends, whichever comes first:
       - the sequence finishes on its own (~1.75s, the last delay plus its run)
       - the visitor scrolls, which answers the hero more decisively than any
         animation can. Handing the frame straight to the engine is the correct
         response to input, not an interruption of it.
       - a reload part-way down the page, where there is no opening to play at
         all — the hero is not even on screen.
     The inline script in <head> holds a 4s backstop over all of it in case
     this never runs. */
  function initOpening() {
    var root = document.documentElement;
    if (!root.classList.contains('is-intro')) return;

    function end() { root.classList.remove('is-intro'); }

    if ((window.pageYOffset || root.scrollTop || 0) > 40) { end(); return; }

    setTimeout(end, 1750);
    addEventListener('wheel', end, { once: true, passive: true });
    addEventListener('touchstart', end, { once: true, passive: true });
    addEventListener('keydown', end, { once: true });
  }

  /* ───────────────────────────── BOOT ───────────────────────────────────── */

  function boot() {
    // First, and deliberately above the `!window.SE` bail below: if the engine
    // fails to load, the opening must still resolve on its own timer rather
    // than waiting out the inline script's 4s backstop.
    initOpening();

    renderHeroStats(); renderHeroProof(); renderMarquee(); renderAboutBeats(); renderAwards(); renderServices(); renderStack();
    renderProjects(); renderGraphics(); renderExperience(); renderCerts(); renderTestimonials();
    var y = el('year'); if (y) y.textContent = new Date().getFullYear();

    if (window.Iconify) Iconify.scan();

    if (!window.SE) { console.warn('engine.js did not load — scroll motion is off'); return; }

    // Lenis must exist before SE.start() so the conductor can adopt its tick;
    // tracks must be registered before start() measures geometry.
    // initMobileNav is first so its close-the-sheet listener is registered on
    // each menu link ahead of the anchor handler — see the note on the function.
    initMobileNav();
    initSmoothScroll();
    registerTracks();
    window.SE.start();

    initReveal(); initCounters(); initSpotlight(); initFabGate();
    initMagnetic(); initTilt(); initTrail(); initWorkStage(); initToolkit();
    bindEvents();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
