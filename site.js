/* ============================================================================
   Dale Bedania — portfolio
   Content data + rendering for the minimal site. No dependencies.
   Static copy (hero, services, about, quotes, contact) lives in index.html;
   this file renders the lists that are driven by data. After editing the data
   below, run `node prerender.js` to bake the lists into index.html.
   ============================================================================ */
(function () {
  'use strict';

  var CLIENT_ONLY = 'client';

  /* `featured` projects get the full case-study row; the rest go to the card
     grid. Order within each group is the order shown. */
  var PROJECTS = [
    {"featured":true,"badge":"University HR portal","title":"Holy Angel University — IDMO employee portal","desc":"Employee portal for Holy Angel University, streamlining HR processes and data management.","img":"works/hauoieidmo.png","site":"hau-oie-idmo.com","role":["Full-Stack Developer","UX/UI Designer"],"langs":["Laravel","Tailwind CSS","MySQL","Hostinger"],"caseStudy":{"problem":"The IDMO managed employee records and HR requests through manual, document-heavy processes that were slow to search, easy to duplicate, and hard to keep consistent.","approach":["Built a centralized Laravel portal with role-based access for HR staff and employees.","Designed clean UX/UI flows so non-technical staff could manage records without training.","Modeled an optimized MySQL schema for fast, reliable lookups.","Deployed and configured production hosting on Hostinger with SSL."],"outcome":["Replaced scattered manual tracking with a single source of truth.","Gave HR and employees fast self-service access to records.","Made employee information searchable in seconds."]},"short":"HAU IDMO Portal"},
    {"featured":true,"badge":"Real-estate CRM","title":"Pina Management CRM — one portal for a real-estate team","desc":"A custom CRM for a real estate company — manage property listings, client records, and transactions in one place.","img":"works/pina.png","site":CLIENT_ONLY,"role":["Database Administrator","Full-Stack Developer"],"langs":["React","Supabase","Vercel"],"caseStudy":{"problem":"A real estate company tracked listings, clients, and transactions across spreadsheets and disconnected tools — slow and error-prone.","approach":["Built a custom CRM with React and Supabase tailored to their workflow.","Structured the database for listings, clients, and transactions with integrity in mind.","Focused the interface on the team’s daily tasks to reduce friction."],"outcome":["Centralizes listings, clients, and transactions in one portal.","Replaces error-prone spreadsheets with a reliable source of truth.","Speeds up daily operations around the team’s real tasks."]},"short":"Pina CRM"},
    {"featured":true,"badge":"AI agents","title":"PinaAi — AI agents for a real-estate CRM","desc":"An AI layer built on top of the Pina Management CRM — ask about bids, leads, deals and mail in plain language, get a daily brief, run estimates, and let agents act on the CRM behind an approval gate.","img":"works/pinaai.png","site":"pina-ai.netlify.app","role":["Full-Stack Developer","AI Engineer"],"langs":["React","Supabase","Gemini AI","Netlify"],"caseStudy":{"problem":"The CRM held every listing, client and deal, but getting an answer out of it still meant clicking through screens and reading records one by one. The team wanted to ask the system questions, have it summarise the day, and hand off repetitive follow-ups — without an AI that could quietly change live data.","approach":["Built PinaAi as a separate React app on the same Supabase project as the CRM, so it reads the real listings, leads, deals and mail rather than a copy.","Wired Gemini to the CRM data through a conversation workspace — Ask anything, a Daily brief, an Estimating tool and a Comp Playbook — with every reply showing “what it did” and its cost.","Split agents into Automations and Assistants and put doing behind an Approvals queue: reading is free, any action on CRM data waits for a human to approve it.","Added Usage & cost and Activity views so the office can see exactly what the AI touched and what it spent."],"outcome":["The team asks the CRM questions in plain language instead of digging through screens.","Repetitive follow-ups run as agents, with a human approving every write.","Every answer is traceable — what was read, what was done, and what it cost."]},"short":"PinaAi"},
    {"featured":true,"badge":"Brand site","title":"The Zepatide — a brand site built on trust","desc":"A professional brand site for medical-grade products — clean, trustworthy design that communicates quality and credibility.","img":"works/zepatide.png","site":"thezepatide.com","role":["Full-Stack Developer","UX/UI Designer"],"langs":["React","Supabase","Hostinger","Cloudflare Pages"],"short":"The Zepatide"},
    {"title":"Kayantabe","desc":"A dynamic volunteerism platform connecting passionate individuals with local community initiatives.","img":"works/kayantabe.png","site":CLIENT_ONLY,"role":["Full-Stack Developer","Project Lead"],"langs":["Laravel","Tailwind CSS","MySQL","Hostinger"],"caseStudy":{"problem":"Local initiatives struggled to reach and coordinate volunteers, relying on fragmented social posts with no central place to discover or manage activities.","approach":["Led the project end-to-end and built it on Laravel.","Created flows for organizations to post initiatives and for volunteers to join.","Designed a responsive, mobile-first UI to make sign-up frictionless.","Structured the data model so organizers could track participation."],"outcome":["Gave volunteers and organizers one platform, replacing scattered posts.","Made it simple for organizations to launch initiatives.","Streamlined sign-ups with far less friction."]}},
    {"title":"IMMFI","desc":"A modern, user-friendly layout using updated design principles — enhancing UX while keeping brand identity across pages.","img":"works/immfi.png","site":"immfi.org","role":["UX/UI Designer","Front-end Developer"],"langs":["Wordpress","Elementor"]},
    {"featured":true,"badge":"Tutoring platform","title":"Umbra","desc":"A web app connecting students and parents with nearby tutors — find, book, and manage tutoring sessions with ease.","img":"works/umbra.png","site":"umbra-app.com","role":["Full-Stack Developer","UX/UI Designer"],"langs":["Laravel","Tailwind CSS","MySQL","Hostinger"]},
    {"title":"SPUR Landing Page","desc":"A responsive landing page showcasing the SPUR mobile app — highlighting features and driving downloads.","img":"works/joinspur.png","site":CLIENT_ONLY,"role":["UX/UI Designer","Full-Stack Developer"],"langs":["React","Supabase","Vercel"]},
    {"title":"SPUR Mobile App","desc":"Find your next game, running partner, or tennis match. A location-based app connecting people who share a passion for sports & fitness.","img":"works/spurapp.png","site":CLIENT_ONLY,"role":["Mobile Developer","UX/UI Designer"],"langs":["React Native","Javascript","Firebase"]},
    {"title":"CVL Content Generator","short":"CVL Content Generator","desc":"A browser-only carousel studio for Complete Vitality Life, a health & longevity brand — one Excel upload becomes a month of on-brand Instagram slides, exported as pixel-exact 1080×1440 PNGs and shared as a live link.","img":"works/contentgenerator.png","site":CLIENT_ONLY,"role":["Sole Designer & Engineer"],"langs":["React","Vite","Supabase","PostgreSQL","xlsx","html-to-image","JSZip","Vercel"],"caseStudy":{"problem":"The client publishes educational health content as Instagram carousels — a cover, five to seven body slides, and a call-to-action carrying a required medical disclaimer. The copy was already written in bulk, one post per row in a spreadsheet; everything after that was manual. Slides were laid out by hand in Canva one at a time, type resized per slide because a 12-word slide and a 60-word slide do not fill the same box at the same size, and a 30-post batch meant roughly 200 individual exports, hand-named and hand-foldered into a posting schedule. The bottleneck was never the writing — it was the mechanical distance between a finished spreadsheet and a folder of upload-ready images.","approach":["Stored a slide as copy plus a template id and rendered it in React at view time, so a 35-carousel project is a few KB of JSON and the PNG only exists at export — produced in the browser, with no render service, queue, or bill that scales with output.","Built one Slide component that always draws at true 1080×1440 and scales down with a CSS transform, serving the editor, the thumbnails, the 91-template gallery, the public share view and the hidden export layer — so the export matches the preview by construction rather than by diligence.","Made type fit its box automatically: a binary search for the largest size that still fits, eased back off that ceiling so slides do not read as uniformly shouty, with the leftover slack shared out between paragraph gaps instead of one wall of text.","Detected workbook shape from the header row rather than asking the user, and wrote the parser on the assumption that real spreadsheets are messy — blank cells, the placeholder markers people actually type, and failures that name the sheet and list the headers it found.","Worked around Postgres dropping TOASTed jsonb from the replication payload by bumping a small version integer server-side and treating the realtime event as a doorbell, so an already-open share link updates without a refresh.","Downscaled attached images to slide width and moved them to Storage instead of inlining base64, choosing JPEG or PNG by inspecting the alpha channel rather than trusting the file extension."],"outcome":["A batch that was one-at-a-time manual layout is now upload, pick, export.","Brand consistency is enforced by the tool rather than remembered by a person.","Export produces the posting schedule directly — correctly named, foldered by day and zero-padded, every PNG exactly 1080×1440.","Review became a link that renders the carousel inside Instagram’s own chrome and updates live.","Runs on one static deploy plus a free-tier database, because the browser is the render service."]}},
    {"title":"Solstice","desc":"Multi-array solar and battery quoting tool with an auditable calculation trail and five generated PDF documents.","img":"works/solstice.png","site":CLIENT_ONLY,"role":["Frontend Engineer","UX/UI Designer"],"langs":["React","TypeScript","Tailwind CSS","decimal.js","@react-pdf/renderer","Vitest"],"caseStudy":{"problem":"Solar installers quote from spreadsheets nobody fully trusts. Money rounds differently in a browser than it does in Excel, material quantities get estimated rather than derived from real stock lengths, and when a manager discounts a job there is no record of who approved what or why.","approach":["Built the pricing engine as a pure TypeScript module with no React or DOM imports, so the same code runs in the browser and under test against the spreadsheet.","Implemented Excel’s ROUND, CEILING and FLOOR semantics on decimal.js — half away from zero, with a real significance argument for 4.2 m rail stock and half-day crew bookings.","Made every derived figure return its own formula, inputs and rounding note, which gives the on-screen trace panel and the Calculation Trace Sheet PDF for free.","Designed an override flow where a discount stays unapplied until a manager approves it, with the approver and timestamp recorded on the document."],"outcome":["Every figure on screen expands to show the exact formula and inputs that produced it — 106 traced figures in the default state.","27 engine tests pin the Excel rounding rules, equipment-discount isolation and the full override-and-approval lifecycle.","Five audience-specific PDFs generate from a single record: customer quote, materials pick list, internal margin sheet, install job pack and calculation trace sheet."]}},
    {"title":"Rosetta","desc":"Client-side workbench that turns an Excel workbook into a working React form — then proves the numbers still match, to the cent.","img":"works/rosetta.png","site":CLIENT_ONLY,"role":["Frontend Engineer"],"langs":["React","TypeScript","Tailwind CSS","SheetJS","HyperFormula","decimal.js","Zod","Vitest"],"caseStudy":{"problem":"Migrating a business off a spreadsheet is easy to do badly. Anyone can render cells as a form; the hard part is proving the new app returns the same numbers as the file it replaced. Silent failures are the real danger — a #DIV/0! collapsing to a $0 line total looks fine on screen and quietly corrupts the migration.","approach":["Parsed workbooks with SheetJS and classified every cell as input, derived, output or static from its dependency edges, then laid the graph out so calculation order reads left to right.","Wrote a tokenizer, recursive-descent parser and evaluator covering 14 Excel functions, with anything outside that set flagged for manual review rather than guessed at.","Built a parity harness running two independent engines — HyperFormula over the original sheets, my own engine over the generated fields — across five scenarios including scaled quantities, .005 rounding boundaries and forced divide-by-zero.","Carried errors as values rather than null, so a #DIV/0! propagates through SUM the way Excel does instead of coercing to zero."],"outcome":["Both sample workbooks pass green across all five scenarios — 315 cell comparisons on the three-sheet trade quote alone.","Agreement holds to $0.005 between two separately written engines, so a green result is real evidence rather than a tautology.","Exports a complete mapping spec as JSON and CSV, plus the finished record written back into the original Excel layout with formulas and named ranges intact."]}},
    {"title":"Scriptorium","desc":"One job record renders three document templates for two audiences — real vector PDFs generated entirely in the browser.","img":"works/scriptorium.png","site":CLIENT_ONLY,"role":["Frontend Engineer","UX/UI Designer"],"langs":["React","TypeScript","Tailwind CSS","@react-pdf/renderer","Zustand"],"caseStudy":{"problem":"Quoting systems usually keep the customer document and the internal document as two separate templates. They drift. A price gets corrected on one and not the other — or worse, buy prices, margins and supplier names end up in front of the customer.","approach":["Reduced the customer/internal split to a single FIELD_RULES table; templates ask visible(field, audience) instead of deciding for themselves, so one component renders both copies.","Built three paginating PDF templates with repeating table headers, branded chrome and Page n of m, rendered client-side with @react-pdf/renderer — no server, no headless Chrome.","Implemented an acceptance flow with a signature canvas that regenerates the PDF with a signature block and timestamp, moving the record from Quote to Job Order.","Made every save an immutable snapshot, with a field-level version diff across scalars, customer details, dates and per-line changes to quantity, price, cost, supplier and selection."],"outcome":["The two copies cannot drift — 10 shared fields, 2 customer-only and 14 internal-only, all driven from one rule table and one component.","Conditional narrative sections and their money appear and disappear with line-item selection across all three documents at once.","The PDF chrome was lifted wholesale from the Solstice estimator and generalised to an arbitrary job record — the reuse is real, not a story told afterwards."]}},
    {"title":"Veloce Goods","desc":"A premium headless B2C storefront for a luxury direct-to-consumer fashion & lifestyle brand — cinematic UI, instant search, and near-perfect web vitals.","img":"works/veloce.png","site":CLIENT_ONLY,"role":["Full-Stack Developer","UX/UI Designer"],"langs":["Next.js","React","Tailwind CSS","Stripe"],"caseStudy":{"problem":"Traditional e-commerce templates suffer from slow loading speeds and generic layouts, which hurt a brand’s premium perception and lower conversion rates.","approach":["Designed a cinematic UI/UX with fluid page transitions, responsive micro-interactions, and a distraction-free, multi-step checkout flow.","Built zero-latency catalog filtering with smart auto-suggest fuzzy search for an effortless browsing experience.","Engineered the storefront from the ground up to hit a near-perfect performance score on mobile and desktop web vitals."],"outcome":["Accelerated page-load times across the catalog and product pages.","Optimized the checkout funnel to directly lower cart-abandonment rates.","Boosted conversion metrics through a faster, more premium browsing experience."]}},
    {"title":"Vanguard Operations","desc":"A secure, centralized internal management portal for an enterprise operations & corporate asset firm — granular RBAC, an automated queueing engine, and a live operations dashboard.","img":"works/vanguard.png","site":CLIENT_ONLY,"role":["Full-Stack Developer","Database Administrator"],"langs":["Laravel","PHP","MySQL","Tailwind CSS"],"caseStudy":{"problem":"Fragmented workflows, reliance on disparate spreadsheets, manual document routing, and a lack of clear user-permission boundaries.","approach":["Implemented granular role-based access control with strict privilege separation across Super Admin, Manager, and standard staff tiers.","Built an automated queueing engine for high-volume document generation, invoice distribution, and email alerts.","Created a live operations dashboard with interactive charts and progress trackers for resource allocation and team velocity."],"outcome":["Centralized scattered company data into a single source of truth.","Heavily reduced operational turnaround times.","Completely eliminated human data-entry errors through automation."]}},
    {"title":"Kinetix Health","desc":"A high-fidelity, cross-platform mobile app (MVP) for an elite boutique fitness-coaching brand — real-time sync, offline-first stability, and polished gesture navigation.","img":"works/kinetix.png","site":CLIENT_ONLY,"role":["Mobile Developer","UX/UI Designer"],"langs":["React Native","Firebase","Javascript"],"caseStudy":{"problem":"The client needed a dedicated mobile footprint to retain clients, but required a solution that felt genuinely native and highly responsive without a massive development timeline.","approach":["Built real-time data syncing for 1-on-1 coach-to-client messaging and dynamic workout status updates across devices.","Added a deep offline-first caching layer so the app stays fully responsive and usable without an active connection.","Designed intuitive gesture navigation paired with smooth, beautifully animated fitness progress charts."],"outcome":["Delivered a premium digital product with an accelerated time-to-market.","Gave clients an engaging, high-end mobile experience.","Improved client retention for the coaching brand."]}},
    {"title":"Veritas Layouts","desc":"An automated micro-SaaS document engine for an executive & legal productivity startup — a live side-by-side preview, strict layout parsing, and one-click cloud export.","img":"works/veritas.png","site":CLIENT_ONLY,"role":["Full-Stack Developer","UX/UI Designer"],"langs":["React","Node.js","Tailwind CSS","PDF Generation"],"caseStudy":{"problem":"Professional industries waste thousands of hours manually typesetting rigid document layouts (corporate templates, academic formats), frequently leading to formatting errors.","approach":["Built a multi-step form wizard with a pixel-perfect live preview that updates in real time as the user types.","Engineered a strict layout-parsing engine that respects rigid text boundaries and typography rules without breaking alignments or overflowing pages.","Added one-click high-fidelity PDF export, cloud-storage archiving, and template version-history tracking."],"outcome":["Productized a tedious manual task into a scalable micro-service.","Completely wiped out formatting errors.","Cut document-creation time down to seconds."]}},
    {"title":"OmniReserve","desc":"A multi-tenant B2B/B2C booking & resource marketplace for high-value asset rentals and multi-vendor scheduling — a bulletproof availability engine and automated split payouts.","img":"works/omnireserve.png","site":CLIENT_ONLY,"role":["Full-Stack Developer","Database Administrator"],"langs":["React","Node.js","PostgreSQL","Stripe"],"caseStudy":{"problem":"Off-the-shelf booking tools break under complex multi-merchant logic, automated revenue splitting, and timezone-dependent booking overlaps.","approach":["Built an advanced scheduling backend that prevents overlapping reservations down to the exact minute across changing timezones.","Architected an automated split-payout pipeline that securely collects a platform service fee while routing vendor earnings to their accounts.","Designed a dual-dashboard experience: a minimal customer reservation flow paired with an in-depth vendor analytics portal."],"outcome":["Created a self-sustaining marketplace framework.","Automated vendor onboarding and booking reconciliation.","Enabled operations to scale hands-free."]}},
    {"title":"ResumeForge","desc":"Fill in your details once — ResumeForge instantly generates a polished, ATS-friendly resume PDF in the iconic Harvard format.","img":"works/resumeforge.png","site":CLIENT_ONLY,"role":["Full-Stack Developer","UX/UI Designer"],"langs":["React","Node.js","Tailwind CSS","PDF Generation"]},
    {"title":"ZoneBridge","desc":"Drop a pin on any city or GPS coordinate and instantly see the exact time gap between it and anywhere in the world.","img":"works/zonebridge.png","site":CLIENT_ONLY,"role":["Full-Stack Developer","UX/UI Designer"],"langs":["React","Tailwind CSS","Mapbox GL","Javascript"]}
  ];


  /* [name, thesvg.org slug, adapt, variant]. `variant` picks a non-default
     file (`light` = dark-ink logo for light grounds; the default is white for
     some brands). `adapt` marks a monochrome-dark logo that
     is inverted in dark mode so it stays visible. */
  var STACK = [
    { label: 'Frontend', items: [['JavaScript','javascript'],['TypeScript','typescript'],['React','react'],['Next.js','nextdotjs',1],['Vue','vue'],['Angular','angular'],['Tailwind','tailwind-css'],['Bootstrap','bootstrap'],['Material UI','mui']] },
    { label: 'Backend', items: [['Node.js','nodedotjs'],['Express','express',1],['PHP','php',1,'light'],['Laravel','laravel'],['Python','python'],['Django','django'],['Java','java'],['.NET','dotnet'],['Socket.io','socketdotio',1,'light']] },
    { label: 'Data & cloud', items: [['MySQL','mysql',0,'light'],['PostgreSQL','postgresql'],['MongoDB','mongodb'],['Supabase','supabase'],['Firebase','firebase'],['AWS','aws'],['Azure','microsoft-azure'],['Vercel','vercel',1,'light'],['Railway','railway',1,'light'],['Netlify','netlify'],['Hostinger','hostinger']] },
    { label: 'Mobile', items: [['React Native','react'],['Flutter','flutter'],['Dart','dart'],['Swift','swift']] },
    { label: 'AI & dev tools', items: [['Cursor','cursor',1,'light'],['ChatGPT','openai-chatgpt',1],['Claude','claude'],['Gemini','google-gemini']] },
    { label: 'Platforms', items: [['WordPress','wordpress'],['Shopify','shopify'],['Stripe','stripe'],['Twilio','twilio'],['Zapier','zapier'],['Postman','postman'],['Jira','jira']] },
    { label: 'Design', items: [['Figma','figma'],['Photoshop','photoshop'],['Illustrator','illustrator'],['Canva','canva'],['Premiere','premiere']] }
  ];

  /* Logo lookup for the language badges in the project list: every toolkit
     entry, plus the names projects spell differently or that are not in the
     toolkit. Names without a logo render as a plain badge. */
  var LOGOS = {
    'tailwind css': ['Tailwind', 'tailwind-css'], 'gemini ai': ['Gemini', 'google-gemini'],
    'cloudflare pages': ['Cloudflare', 'cloudflare'], 'mapbox gl': ['Mapbox', 'mapbox'],
    'elementor': ['Elementor', 'elementor'], 'vite': ['Vite', 'vite'],
    'vitest': ['Vitest', 'vitest'], 'zod': ['Zod', 'zod']
  };
  STACK.forEach(function (g) { g.items.forEach(function (t) { LOGOS[t[0].toLowerCase()] = t; }); });

  var GRAPHICS = ['dalefuture.png', 'flowg.png', 'artboard-1-100-1.webp', 'welcomeback2.webp', 'finalmem.png', 'meetourteam-2.webp', 'artboard-4-100.webp', 'artboard-6-100.webp'];

  /* ─────────────────────────────── helpers ─────────────────────────────── */

  function esc(v) {
    return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function $(id) { return document.getElementById(id); }
  function icon(name) { return '<svg class="ic" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }
  function isLive(p) { return p.site !== CLIENT_ONLY; }
  function siteLink(p, cls) {
    return '<a class="' + cls + '" href="https://' + esc(p.site) + '" target="_blank" rel="noopener noreferrer">' +
      esc(p.site) + ' ' + icon('out') + '</a>';
  }
  function pill(p) {
    return isLive(p) ? '<span class="pill pill-live">Live</span>' : '<span class="pill">Client</span>';
  }
  function tags(list) {
    return '<ul class="tags">' + list.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
  }
  /* Every screenshot has a resized WebP twin under a web/ folder (originals
     stay for the cinematic page): works/x.png → works/web/x.webp,
     works/graphics/x → works/graphics/web/x.webp */
  function webp(src) {
    var m = /^(works\/graphics|works|crms)\/(.+)\.\w+$/.exec(src);
    return m ? m[1] + '/web/' + m[2] + '.webp' : src;
  }
  function img(src, alt, w, h) {
    return '<img src="' + esc(webp(src)) + '" alt="' + esc(alt) + '" width="' + w + '" height="' + h + '" loading="lazy" decoding="async">';
  }

  /* ─────────────────────────────── render ──────────────────────────────── */

  /* Card deck: every featured project is a card stacked in one grid cell;
     initDeck() fans them out like a hand of cards around the active one. The
     first card is centred in the markup so the no-JS page shows it. */
  function deckHtml() {
    var n = 0;
    return PROJECTS.map(function (p, i) {
      if (!p.featured) return '';
      var num = String(++n).padStart(2, '0');
      return '<article class="deck-card ' + (n === 1 ? 'is-center' : 'is-back') + '">' +
        '<div class="deck-top"><span><b>' + num + '</b> · ' + esc(p.badge) + '</span>' +
          '<span class="deck-status' + (isLive(p) ? ' is-live' : '') + '">' + (isLive(p) ? 'Live' : 'Client') + '</span></div>' +
        '<div class="deck-id"><h3>' + esc(p.short || p.title) + '</h3>' +
          '<span class="deck-thumb">' + img(p.img, '', 1600, 900) + '</span></div>' +
        '<p class="deck-desc">' + esc(p.desc) + '</p>' +
        '<p class="deck-stack">' + esc(p.langs.slice(0, 4).join(' · ')) + '</p>' +
        '<div class="deck-actions">' +
          '<button type="button" class="deck-btn" data-case="' + i + '">' + (p.caseStudy ? 'Case study' : 'Details') + ' ' + icon('arrow') + '</button>' +
          (isLive(p) ? siteLink(p, 'deck-url') : '') +
        '</div>' +
      '</article>';
    }).join('');
  }

  function projectListHtml() {
    return PROJECTS.map(function (p, i) {
      return '<li><button type="button" class="plist-row" data-case="' + i + '">' +
        '<span class="plist-t">' + esc(p.short || p.title) + '</span>' + pill(p) +
        '<span class="plist-langs">' + p.langs.slice(0, 4).map(function (name) {
          var t = LOGOS[name.toLowerCase()];
          return '<span class="lang">' + (t ? logo(t, 14) : '') + esc(name) + '</span>';
        }).join('') + '</span>' +
      '</button></li>';
    }).join('');
  }

  // t = [name, thesvg.org slug, adapt, variant] (see STACK).
  function logo(t, size) {
    return '<img src="https://thesvg.org/icons/' + esc(t[1]) + '/' + (t[3] || 'default') + '.svg" width="' + size + '" height="' + size + '" alt="" loading="lazy" decoding="async"' +
      (t[2] ? ' class="adapt"' : '') + '>';
  }

  function stackHtml() {
    return STACK.map(function (g) {
      return '<div><dt>' + esc(g.label) + '</dt><dd><ul class="kit-chips">' +
        g.items.map(function (t) { return '<li>' + logo(t, 18) + esc(t[0]) + '</li>'; }).join('') +
        '</ul></dd></div>';
    }).join('');
  }

  function designHtml() {
    return GRAPHICS.map(function (f, i) {
      var src = 'works/graphics/' + f;
      return '<li><a href="' + esc(src) + '" target="_blank" rel="noopener noreferrer" data-lb="' + i + '" aria-label="View design ' + (i + 1) + '">' +
        img(src, '', 600, 600) + '</a></li>';
    }).join('');
  }

  /* ─────────────────────────── case-study dialog ───────────────────────── */

  function caseHtml(p) {
    var cs = p.caseStudy;
    var h = '<figure class="case-media">' + '<img src="' + esc(webp(p.img)) + '" alt="' + esc((p.short || p.title) + ' screenshot') + '"></figure>' +
      '<p class="case-meta">' + esc(p.role.join(' · ')) + '</p>' +
      '<h2 id="caseTitle">' + esc(p.title) + '</h2>' +
      '<p class="case-desc">' + esc(p.desc) + '</p>' +
      tags(p.langs);
    if (cs) {
      h += '<div class="case-sec"><h3>Problem</h3><p>' + esc(cs.problem) + '</p></div>' +
        '<div class="case-sec"><h3>What I built</h3><ul>' + cs.approach.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul></div>' +
        '<div class="case-sec"><h3>Outcome</h3><ul class="case-out">' + cs.outcome.map(function (o) { return '<li>' + esc(o) + '</li>'; }).join('') + '</ul></div>';
    }
    h += '<div class="case-foot">' +
      (isLive(p) ? siteLink(p, 'btn btn-ghost') : '<span class="muted-note">Private client project — happy to demo it on a call.</span>') +
      '<a class="btn btn-primary" href="mailto:dale.bedania10@gmail.com?subject=' + encodeURIComponent('Project inquiry (saw ' + (p.short || p.title) + ')') + '">Start a similar project</a>' +
    '</div>';
    return h;
  }

  function initCaseDialog() {
    var dlg = $('caseDialog');
    if (!dlg || typeof dlg.showModal !== 'function') return;

    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-case]');
      if (!t) return;
      var p = PROJECTS[+t.getAttribute('data-case')];
      if (!p) return;
      $('caseBody').innerHTML = caseHtml(p);
      dlg.showModal();
      syncLock();
      dlg.scrollTop = 0;
    });
    $('caseClose').addEventListener('click', function () { dlg.close(); });
    // Click on the backdrop (the dialog element itself, outside its content) closes.
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', syncLock);
  }

  /* ───────────────────────────── interactions ──────────────────────────── */

  function initDeck() {
    var deck = $('deck');
    var cards = [].slice.call(deck.querySelectorAll('.deck-card'));
    var n = cards.length, active = 0;
    var count = $('deckCount'), seg = $('deckSeg');
    var pad = function (v) { return String(v).padStart(2, '0'); };
    seg.innerHTML = cards.map(function (_, i) {
      return '<button type="button" data-go="' + i + '" aria-label="Project ' + (i + 1) + '"></button>';
    }).join('');
    var segs = [].slice.call(seg.children);

    function show(next) {
      active = (next + n) % n;
      cards.forEach(function (c, i) {
        // Signed distance from the active card, wrapped so the deck is a ring.
        var d = (i - active + n) % n;
        if (d > n / 2) d -= n;
        var ad = Math.abs(d);
        c.className = 'deck-card ' + (d === 0 ? 'is-center' : ad <= 2 ? 'is-side' : 'is-back');
        c.setAttribute('data-ad', ad);
        c.style.setProperty('--d', d);
        c.style.setProperty('--ad', ad);
        // Only the centre card's controls are reachable; the side cards are
        // click targets that bring themselves forward.
        c.setAttribute('aria-hidden', String(d !== 0));
        c.querySelectorAll('a, button').forEach(function (el) { el.tabIndex = d === 0 ? 0 : -1; });
      });
      count.innerHTML = pad(active + 1) + ' <span>/ ' + pad(n) + '</span>';
      segs.forEach(function (b, i) { b.setAttribute('aria-current', String(i === active)); });
    }

    // Capture phase, so a click anywhere on a side card (even on its button)
    // only brings it forward.
    deck.addEventListener('click', function (e) {
      var c = e.target.closest('.deck-card');
      if (!c || c.classList.contains('is-center')) return;
      e.preventDefault();
      e.stopPropagation();
      show(cards.indexOf(c));
    }, true);
    $('deckPrev').addEventListener('click', function () { show(active - 1); });
    $('deckNext').addEventListener('click', function () { show(active + 1); });
    seg.addEventListener('click', function (e) {
      var b = e.target.closest('[data-go]');
      if (b) show(+b.getAttribute('data-go'));
    });
    deck.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(active + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(active - 1); }
    });

    var x0 = null;
    deck.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    deck.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) show(active + (dx < 0 ? 1 : -1));
    });

    show(0);
  }

  /* Design viewer: the grid links open the full image in a dialog with
     prev / next instead of leaving the page. Without JS they still open the
     image in a new tab. */
  function initLightbox() {
    var dlg = $('lightbox');
    if (!dlg || typeof dlg.showModal !== 'function') return;
    var n = GRAPHICS.length, at = 0;

    function show(i) {
      at = (i + n) % n;
      var src = 'works/graphics/' + GRAPHICS[at];
      $('lbImg').src = src;
      $('lbImg').alt = 'Design ' + (at + 1) + ' of ' + n;
      $('lbOpen').href = src;
      $('lbCount').textContent = String(at + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
    }

    $('designList').addEventListener('click', function (e) {
      var a = e.target.closest('[data-lb]');
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      show(+a.getAttribute('data-lb'));
      dlg.showModal();
      syncLock();
    });
    $('lbPrev').addEventListener('click', function () { show(at - 1); });
    $('lbNext').addEventListener('click', function () { show(at + 1); });
    $('lbClose').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(at - 1);
      if (e.key === 'ArrowRight') show(at + 1);
    });
    // Clicking the dimmed area around the image closes.
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.classList.contains('lb-stage')) dlg.close();
    });
    dlg.addEventListener('close', syncLock);
  }

  /* The page stays locked while any modal is open: a case study can sit on
     top of the all-projects list, and closing it must not unlock the page. */
  function syncLock() {
    document.body.classList.toggle('is-locked', !!document.querySelector('dialog[open]'));
  }

  /* "All projects" opens every project in a modal; a row opens its case
     study on top (initCaseDialog's click handler). */
  function initMore() {
    var dlg = $('allProjects');
    if (typeof dlg.showModal !== 'function') return;
    $('allOpen').addEventListener('click', function () {
      dlg.showModal();
      syncLock();
      dlg.scrollTop = 0;
    });
    $('allClose').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', syncLock);
  }

  function initNav() {
    var side = $('side'), btn = $('navToggle');
    function setOpen(open) {
      side.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    btn.addEventListener('click', function () { setOpen(!side.classList.contains('is-open')); });
    side.addEventListener('click', function (e) { if (e.target.closest('.side-menu a')) setOpen(false); });

    // Mark the last section whose top has passed 40% of the viewport; none
    // while the hero is in view.
    var links = [].slice.call(side.querySelectorAll('.side-nav a'));
    var secs = links.map(function (a) { return $(a.getAttribute('href').slice(1)); });
    var queued = false;
    function spy() {
      queued = false;
      var line = window.innerHeight * 0.4, cur = -1;
      secs.forEach(function (sec, i) { if (sec.getBoundingClientRect().top <= line) cur = i; });
      links.forEach(function (a, i) { a.classList.toggle('is-active', i === cur); });
    }
    window.addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(spy); } }, { passive: true });
    spy();
  }

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (n) { io.observe(n); });
  }

  /* Container id → markup. prerender.js writes these into index.html so the
     lists exist without JavaScript (crawlers, link previews); boot() renders
     them again so an edit here shows even before prerender.js is re-run. */
  var LISTS = {
    deck: deckHtml, projectList: projectListHtml, kitList: stackHtml, designList: designHtml
  };

  function boot() {
    Object.keys(LISTS).forEach(function (id) { $(id).innerHTML = LISTS[id](); });
    initDeck(); initCaseDialog(); initLightbox(); initMore(); initNav(); initReveal();
    $('year').textContent = new Date().getFullYear();
  }

  if (typeof module === 'object' && module.exports) { module.exports = LISTS; return; }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
