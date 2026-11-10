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
    {"featured":true,"showcase":"works/showcase/pina-management-showcase.html","badge":"Real-estate CRM","title":"Pina Management CRM — one portal for a real-estate team","desc":"A custom CRM for a real estate company — manage property listings, client records, and transactions in one place.","img":"works/pina.png","site":CLIENT_ONLY,"role":["Database Administrator","Full-Stack Developer"],"langs":["React","Supabase","Vercel"],"caseStudy":{"problem":"A real estate company tracked listings, clients, and transactions across spreadsheets and disconnected tools — slow and error-prone.","approach":["Built a custom CRM with React and Supabase tailored to their workflow.","Structured the database for listings, clients, and transactions with integrity in mind.","Focused the interface on the team’s daily tasks to reduce friction."],"outcome":["Centralizes listings, clients, and transactions in one portal.","Replaces error-prone spreadsheets with a reliable source of truth.","Speeds up daily operations around the team’s real tasks."]},"short":"Pina CRM"},
    {"featured":true,"showcase":"works/showcase/pina-ai-showcase.html","badge":"AI agents","title":"PinaAi — AI agents for a real-estate CRM","desc":"An AI layer built on top of the Pina Management CRM — ask about bids, leads, deals and mail in plain language, get a daily brief, run estimates, and let agents act on the CRM behind an approval gate.","img":"works/pinaai.png","site":"pina-ai.netlify.app","role":["Full-Stack Developer","AI Engineer"],"langs":["React","Supabase","Gemini AI","Netlify"],"caseStudy":{"problem":"The CRM held every listing, client and deal, but getting an answer out of it still meant clicking through screens and reading records one by one. The team wanted to ask the system questions, have it summarise the day, and hand off repetitive follow-ups — without an AI that could quietly change live data.","approach":["Built PinaAi as a separate React app on the same Supabase project as the CRM, so it reads the real listings, leads, deals and mail rather than a copy.","Wired Gemini to the CRM data through a conversation workspace — Ask anything, a Daily brief, an Estimating tool and a Comp Playbook — with every reply showing “what it did” and its cost.","Split agents into Automations and Assistants and put doing behind an Approvals queue: reading is free, any action on CRM data waits for a human to approve it.","Added Usage & cost and Activity views so the office can see exactly what the AI touched and what it spent."],"outcome":["The team asks the CRM questions in plain language instead of digging through screens.","Repetitive follow-ups run as agents, with a human approving every write.","Every answer is traceable — what was read, what was done, and what it cost."]},"short":"PinaAi"},
    {"featured": true, "badge": "Field tools", "short": "Pina Apps", "status": "Client", "showcase": "works/showcase/pina-apps-showcase.html", "title": "Pina Apps — field tools for a real-estate CRM", "desc": "Phone-first tools for the people who aren't at a desk — bid a stucco job on the walk, bill a milestone from the truck, log a lead from a business card. Every save lands in the CRM.", "img": "works/pinaapps.png", "site": "client", "role": ["Product Designer", "Full-Stack Developer"], "langs": ["React", "TypeScript", "Supabase", "PWA"], "caseStudy": {"problem": "Pina's CRM runs the office — leads, deals, bids, crews and payroll — but estimators walk job sites, crews start at 6 am, and agents meet sellers at the kitchen table. None of them want a full CRM on a phone, and anything written in the field was retyped back at the office.", "approach": ["Built an installable web app catalog on the same login as the CRM, with access granted per app so people only see the tools they were given.", "Made the flagship AP Plastering Field & Bid app turn a typed walk-through (“14 windows, 2 columns, 800 sf stucco”) into priced scope items across 16 categories, reading English and Spanish trade terms.", "Derived labor, man-days and a standard five-milestone payment schedule from the same entry, with a scope-of-work PDF that shares the CRM's proposal numbers.", "Tracked bids as Waiting, Won or Lost, billed won jobs one milestone at a time, and put crews from the HR roster on a shared schedule.", "Added realty tools — MLS Analyzer, Floor Plans, Quick Lead, Texts, My Day and Lead Lookup — with 44 px minimum touch targets for gloves and sunlight."], "outcome": ["Seven apps in the catalog, one login shared with the CRM.", "Zero retyping: bids, invoices and leads write straight to CRM records.", "The office sees field work as it happens instead of at the end of the day."]}},
    {"featured": true, "badge": "AI content studio", "short": "MyContent Studios", "status": "Client", "showcase": "works/showcase/mycontent-studios-showcase.html", "title": "MyContent Studios — one studio, six content pipelines", "desc": "A local web app that turns six Claude Code content automations into one calm desk — pick a pipeline, say how many, and review the carousels and reels as they land.", "img": "works/mycontent.png", "site": "", "role": ["Designer", "Full-Stack Developer"], "langs": ["Node.js", "JavaScript", "Claude Code"], "caseStudy": {"problem": "A health creator and their company run their content on six Claude Code playbooks — carousels, talking reels, website reels, topic reels, DM notices and brand carousels. It worked, but every day meant a terminal per pipeline, typing commands from memory, scrolling raw tool output to guess progress, and feedback lost in chat.", "approach": ["Built one launcher on localhost with a month calendar that shows what shipped per pipeline, and a session per browser tab so several pipelines run at once.", "Replaced hand-typed prompts with a guided form that writes the exact command, shows the folder it runs in and the Outputs path it delivers to.", "Ran headless Claude Code in each pipeline’s own folder, turning every tool call into a readable live log matched to the pipeline’s named steps.", "Made review precise: notes pin to a slide, a marked area, the caption or a moment in a reel, then go back to Claude in one job — with Undo from a snapshot.", "Added a Rules tab that writes standing instructions into the playbook, shows the diff, and can put it back."], "outcome": ["Six pipelines, one launcher — 47 sessions opened in its first days.", "A 2-post, 20-slide run finished in 18m 12s with zero questions asked mid-run.", "The day’s Outputs folder holds only deliverables and goes to Google Drive as it is."]}},
    {"featured": true, "badge": "AI video studio", "short": "Usisero Studio", "status": "Product", "showcase": "works/showcase/usisero-studio-showcase.html", "title": "Usisero Studio — pick a day, press Make, get a finished video", "desc": "A week planner for a one-person Pinoy Facebook page. Each Make starts a headless Claude Code run that researches the topic, writes the Taglish script, builds a 3D world, animates host Juan and hands back a post ready to paste.", "img": "works/usisero.png", "site": "", "role": ["Product Designer", "Full-Stack Developer"], "langs": ["Node.js", "JavaScript", "Claude Code", "Remotion", "three.js"], "caseStudy": {"problem": "Usisero posts short, true, relatable Pinoy videos in natural Taglish. Behind every 30-second reel sits research, a script, a storyboard, a 3D world, music, a render, QA and the Facebook copy — a production crew's work, done by one person every day.", "approach": ["Built a small Node server and a plain-DOM week planner: seven day tiles with thumbnails, a posted tick and one status chip each.", "Made one button start the whole pipeline — pick 1, 2 or 3 videos, a segment or Auto, an optional topic idea, and each gets its own headless Claude Code run in parallel.", "Turned each run's stream-json output into a live terminal in plain words, with host Juan's face showing the run state and runs that can be continued or recovered.", "Drove the project's own engine: a spec per video, a Remotion + three.js world built in code, generated music normalised to −14 LUFS, then render, stills QA and fix rounds.", "Made the video card the posting checklist — upload, copy title, copy caption, mark as posted — plus “Ask for a change” to re-render just that video."], "outcome": ["One click from an empty day to a finished, checked video.", "Up to three videos made at once, each in its own live terminal.", "Every delivery lands as video, thumbnail and caption, tracked through to posted."]}},
    {"featured": true, "badge": "3D web app", "short": "Konsepto", "status": "Product", "showcase": "works/showcase/konsepto-showcase.html", "title": "Konsepto — dress your motorcycle in 3D", "desc": "A 3D garage for Philippine scooters — riders paint the bike panel by panel and fit real aftermarket parts before they spend a peso.", "img": "works/konsepto.png", "site": "", "role": ["Designer", "Full-Stack Developer"], "langs": ["React", "three.js", "React Three Fiber", "TypeScript", "Vite"], "caseStudy": {"problem": "Scooter riders in the Philippines plan their builds for months from saved Facebook photos and shop quotes, trying to picture a Brembo caliper or a Mutarru CVT cover on their own bike. Nothing shows the whole build at once, in their colour, at the right size.", "approach": ["Rebuilt the Honda Click 125 V3 and Yamaha Aerox 155 V2 to the millimetre from real photos and spec sheets — side photos straightened into 1 px = 1 mm elevations, checked against ground clearance and overall length.", "Shipped the official PH factory paints, plus per-panel custom colour with hue, saturation and brightness sliders and matte, gloss or metallic finishes.", "Grouped 130+ real aftermarket parts across 26 slots the way riders talk about the bike; opening a slot glides the camera to it and moves anything in the way.", "Added five camera views, a turntable with auto-spin, undo/redo on every paint change, on-device saved builds and image export.", "Turned the side panels into pull-up sheets on phones so the bike stays centred and Save stays under the thumb."], "outcome": ["Riders see the whole build on their own bike, in their colour, before buying a part.", "Measured accuracy to about 1 mm against the factory spec sheet.", "Builds are saved on the device and exported as a picture to share with friends and the shop doing the work."]}},
    {"featured": true, "badge": "2D + 3D home design", "short": "Housewright", "status": "Product", "showcase": "works/showcase/housewright-showcase.html", "title": "Housewright — draw the plan, walk the house", "desc": "A free web app for designing a home — draw the floor plan in 2D, walk it in 3D. Change either and the other follows.", "img": "works/housewright.png", "site": "", "role": ["Product Designer", "Full-Stack Developer"], "langs": ["React", "TypeScript", "three.js", "React Three Fiber", "Tailwind CSS", "three-gpu-pathtracer"], "caseStudy": {"problem": "A homeowner with an idea has two bad options: a paper sketch that drifts off scale and never looks like a house, or professional CAD that takes weeks to learn. A floor plan also can't show light, height, or how rooms open onto each other.", "approach": ["Made the floor plan and the 3D model one house: edit walls, rooms and doors in Plan, 3D or Split view and the other updates.", "Opened New design on five editable modern starter houses, or a blank lot, with real room sizes shown in both views.", "Built a 220+ piece furniture library in 32 groups, plus five cameras from Edit and Dollhouse to Orbit, Walk and Tour.", "Added time-of-day lighting, night renders and path-traced photo renders with three-gpu-pathtracer.", "Kept it account-free: designs save in the browser, with no sign-up or install between the visitor and the first idea."], "outcome": ["Anyone can sketch a house at real sizes and walk through it in minutes.", "Answers questions a plan can't — will the sofa fit, how does the kitchen look at dusk.", "Zero sign-ups or installs to try it."]}},
    {"featured": true, "badge": "Clinic website", "title": "The Zepatide — a clinic website that sends every visitor to a doctor, not a checkout", "desc": "A live clinic site for prescription-only therapies — a 3D product hero, no prices or cart, every path ending in a free medical assessment, and an editor the clinic runs itself.", "img": "works/zepatide.png", "site": "thezepatide.com", "role": ["Full-Stack Developer", "UX/UI Designer"], "langs": ["React", "Vite", "Tailwind CSS", "Supabase", "three.js", "Cloudflare Pages"], "short": "The Zepatide", "showcase": "works/showcase/thezepatide-showcase.html", "caseStudy": {"problem": "The clinic sells compounded, prescription-only weight-loss and wellness therapies, mostly to visitors arriving on phones from Facebook and Messenger. Its older Laravel site had to become one that earns trust, shows the products honestly with no prices or cart, and gets people into a free medical assessment — and the clinic had to be able to edit every word of it themselves.", "approach": ["Rebuilt the site in React with Supabase behind it, first porting the original copy, look and behaviour exactly, then redesigning it section by section.", "Ordered the page so each section answers the visitor's next question: what it is, whether it suits them, whether it works, who's behind it, and how to start.", "Put the signature therapy on a lit 3D pedestal (three.js) that loads after first paint, with the claims in a still column beside it.", "Built a website editor with ten editors covering products, signature picks, results, videos, certificates, team and copy — saved changes go live straight away.", "Added a passcode-gated lab certificate gallery for ongoing clients, and a patient app behind the Patient Portal button for daily logs and nurses' home-visit rounds."], "outcome": ["Live at thezepatide.com: ten sections, zero prices shown, one main action — Take Assessment.", "Every path through the site ends in the free assessment or a conversation with the clinical team.", "The clinic runs every word, product and photo on the site from its own editor."]}},
    {"title":"Kayantabe","desc":"A dynamic volunteerism platform connecting passionate individuals with local community initiatives.","img":"works/kayantabe.png","site":CLIENT_ONLY,"role":["Full-Stack Developer","Project Lead"],"langs":["Laravel","Tailwind CSS","MySQL","Hostinger"],"caseStudy":{"problem":"Local initiatives struggled to reach and coordinate volunteers, relying on fragmented social posts with no central place to discover or manage activities.","approach":["Led the project end-to-end and built it on Laravel.","Created flows for organizations to post initiatives and for volunteers to join.","Designed a responsive, mobile-first UI to make sign-up frictionless.","Structured the data model so organizers could track participation."],"outcome":["Gave volunteers and organizers one platform, replacing scattered posts.","Made it simple for organizations to launch initiatives.","Streamlined sign-ups with far less friction."]}},
    {"title":"IMMFI","desc":"A modern, user-friendly layout using updated design principles — enhancing UX while keeping brand identity across pages.","img":"works/immfi.png","site":"immfi.org","role":["UX/UI Designer","Front-end Developer"],"langs":["Wordpress","Elementor"]},
    {"featured":true,"badge":"Tutoring platform","title":"Umbra","desc":"A web app connecting students and parents with nearby tutors — find, book, and manage tutoring sessions with ease.","img":"works/umbra.png","site":"umbra-app.com","role":["Full-Stack Developer","UX/UI Designer"],"langs":["Laravel","Tailwind CSS","MySQL","Hostinger"]},
    {"title":"SPUR Landing Page","desc":"A responsive landing page showcasing the SPUR mobile app — highlighting features and driving downloads.","img":"works/joinspur.png","site":CLIENT_ONLY,"role":["UX/UI Designer","Full-Stack Developer"],"langs":["React","Supabase","Vercel"]},
    {"title":"SPUR Mobile App","desc":"Find your next game, running partner, or tennis match. A location-based app connecting people who share a passion for sports & fitness.","img":"works/spurapp.png","site":CLIENT_ONLY,"role":["Mobile Developer","UX/UI Designer"],"langs":["React Native","Javascript","Firebase"]},
    {"title":"Solstice","desc":"Multi-array solar and battery quoting tool with an auditable calculation trail and five generated PDF documents.","img":"works/solstice.png","site":CLIENT_ONLY,"role":["Frontend Engineer","UX/UI Designer"],"langs":["React","TypeScript","Tailwind CSS","decimal.js","@react-pdf/renderer","Vitest"],"caseStudy":{"problem":"Solar installers quote from spreadsheets nobody fully trusts. Money rounds differently in a browser than it does in Excel, material quantities get estimated rather than derived from real stock lengths, and when a manager discounts a job there is no record of who approved what or why.","approach":["Built the pricing engine as a pure TypeScript module with no React or DOM imports, so the same code runs in the browser and under test against the spreadsheet.","Implemented Excel’s ROUND, CEILING and FLOOR semantics on decimal.js — half away from zero, with a real significance argument for 4.2 m rail stock and half-day crew bookings.","Made every derived figure return its own formula, inputs and rounding note, which gives the on-screen trace panel and the Calculation Trace Sheet PDF for free.","Designed an override flow where a discount stays unapplied until a manager approves it, with the approver and timestamp recorded on the document."],"outcome":["Every figure on screen expands to show the exact formula and inputs that produced it — 106 traced figures in the default state.","27 engine tests pin the Excel rounding rules, equipment-discount isolation and the full override-and-approval lifecycle.","Five audience-specific PDFs generate from a single record: customer quote, materials pick list, internal margin sheet, install job pack and calculation trace sheet."]}},
    {"title":"Scriptorium","desc":"One job record renders three document templates for two audiences — real vector PDFs generated entirely in the browser.","img":"works/scriptorium.png","site":CLIENT_ONLY,"role":["Frontend Engineer","UX/UI Designer"],"langs":["React","TypeScript","Tailwind CSS","@react-pdf/renderer","Zustand"],"caseStudy":{"problem":"Quoting systems usually keep the customer document and the internal document as two separate templates. They drift. A price gets corrected on one and not the other — or worse, buy prices, margins and supplier names end up in front of the customer.","approach":["Reduced the customer/internal split to a single FIELD_RULES table; templates ask visible(field, audience) instead of deciding for themselves, so one component renders both copies.","Built three paginating PDF templates with repeating table headers, branded chrome and Page n of m, rendered client-side with @react-pdf/renderer — no server, no headless Chrome.","Implemented an acceptance flow with a signature canvas that regenerates the PDF with a signature block and timestamp, moving the record from Quote to Job Order.","Made every save an immutable snapshot, with a field-level version diff across scalars, customer details, dates and per-line changes to quantity, price, cost, supplier and selection."],"outcome":["The two copies cannot drift — 10 shared fields, 2 customer-only and 14 internal-only, all driven from one rule table and one component.","Conditional narrative sections and their money appear and disappear with line-item selection across all three documents at once.","The PDF chrome was lifted wholesale from the Solstice estimator and generalised to an arbitrary job record — the reuse is real, not a story told afterwards."]}},
    {"title":"Veloce Goods","desc":"A premium headless B2C storefront for a luxury direct-to-consumer fashion & lifestyle brand — cinematic UI, instant search, and near-perfect web vitals.","img":"works/veloce.png","site":CLIENT_ONLY,"role":["Full-Stack Developer","UX/UI Designer"],"langs":["Next.js","React","Tailwind CSS","Stripe"],"caseStudy":{"problem":"Traditional e-commerce templates suffer from slow loading speeds and generic layouts, which hurt a brand’s premium perception and lower conversion rates.","approach":["Designed a cinematic UI/UX with fluid page transitions, responsive micro-interactions, and a distraction-free, multi-step checkout flow.","Built zero-latency catalog filtering with smart auto-suggest fuzzy search for an effortless browsing experience.","Engineered the storefront from the ground up to hit a near-perfect performance score on mobile and desktop web vitals."],"outcome":["Accelerated page-load times across the catalog and product pages.","Optimized the checkout funnel to directly lower cart-abandonment rates.","Boosted conversion metrics through a faster, more premium browsing experience."]}},
    {"title":"Veritas Layouts","desc":"An automated micro-SaaS document engine for an executive & legal productivity startup — a live side-by-side preview, strict layout parsing, and one-click cloud export.","img":"works/veritas.png","site":CLIENT_ONLY,"role":["Full-Stack Developer","UX/UI Designer"],"langs":["React","Node.js","Tailwind CSS","PDF Generation"],"caseStudy":{"problem":"Professional industries waste thousands of hours manually typesetting rigid document layouts (corporate templates, academic formats), frequently leading to formatting errors.","approach":["Built a multi-step form wizard with a pixel-perfect live preview that updates in real time as the user types.","Engineered a strict layout-parsing engine that respects rigid text boundaries and typography rules without breaking alignments or overflowing pages.","Added one-click high-fidelity PDF export, cloud-storage archiving, and template version-history tracking."],"outcome":["Productized a tedious manual task into a scalable micro-service.","Completely wiped out formatting errors.","Cut document-creation time down to seconds."]}},
    {"title":"OmniReserve","desc":"A multi-tenant B2B/B2C booking & resource marketplace for high-value asset rentals and multi-vendor scheduling — a bulletproof availability engine and automated split payouts.","img":"works/omnireserve.png","site":CLIENT_ONLY,"role":["Full-Stack Developer","Database Administrator"],"langs":["React","Node.js","PostgreSQL","Stripe"],"caseStudy":{"problem":"Off-the-shelf booking tools break under complex multi-merchant logic, automated revenue splitting, and timezone-dependent booking overlaps.","approach":["Built an advanced scheduling backend that prevents overlapping reservations down to the exact minute across changing timezones.","Architected an automated split-payout pipeline that securely collects a platform service fee while routing vendor earnings to their accounts.","Designed a dual-dashboard experience: a minimal customer reservation flow paired with an in-depth vendor analytics portal."],"outcome":["Created a self-sustaining marketplace framework.","Automated vendor onboarding and booking reconciliation.","Enabled operations to scale hands-free."]}},
    {"title":"ResumeForge","desc":"Fill in your details once — ResumeForge instantly generates a polished, ATS-friendly resume PDF in the iconic Harvard format.","img":"works/resumeforge.png","site":CLIENT_ONLY,"role":["Full-Stack Developer","UX/UI Designer"],"langs":["React","Node.js","Tailwind CSS","PDF Generation"]},
    {"title":"ZoneBridge","desc":"Drop a pin on any city or GPS coordinate and instantly see the exact time gap between it and anywhere in the world.","img":"works/zonebridge.png","site":CLIENT_ONLY,"role":["Full-Stack Developer","UX/UI Designer"],"langs":["React","Tailwind CSS","Mapbox GL","Javascript"]}
  ];


  /* [name, thesvg.org slug or full icon URL, adapt, variant]. `variant` picks a non-default
     file (`light` = dark-ink logo for light grounds; the default is white for
     some brands). `adapt` marks a monochrome-dark logo that
     is inverted in dark mode so it stays visible. */
  var STACK = [
    { label: 'Frontend', items: [['JavaScript','javascript'],['TypeScript','typescript'],['React','react'],['Next.js','nextdotjs',1],['Vue','vue'],['Angular','angular'],['Tailwind','tailwind-css'],['Bootstrap','bootstrap'],['Material UI','mui']] },
    { label: 'Backend', items: [['Node.js','nodedotjs'],['Express','express',1],['PHP','php',1,'light'],['Laravel','laravel'],['Python','python'],['Django','django'],['Java','java'],['.NET','dotnet'],['Socket.io','socketdotio',1,'light']] },
    { label: 'Data & cloud', items: [['MySQL','mysql',0,'light'],['PostgreSQL','postgresql'],['MongoDB','mongodb'],['Supabase','supabase'],['Firebase','firebase'],['AWS','aws'],['Azure','microsoft-azure'],['Vercel','vercel',1,'light'],['Railway','railway',1,'light'],['Netlify','netlify'],['Hostinger','hostinger']] },
    { label: 'Mobile', items: [['React Native','react'],['Flutter','flutter'],['Dart','dart'],['Swift','swift']] },
    { label: 'AI & dev tools', items: [['Cursor','cursor',1,'light'],['ChatGPT','openai-chatgpt',1],['Claude','claude'],['Gemini','google-gemini']] },
    { label: 'Automation', items: [['n8n','https://cdn.simpleicons.org/n8n'],['Zapier','zapier'],['Make','make']] },
    { label: 'Platforms', items: [['WordPress','wordpress'],['Shopify','shopify'],['Stripe','stripe'],['Twilio','twilio'],['Postman','postman'],['Jira','jira']] },
    { label: 'Design', items: [['Figma','figma'],['Photoshop','photoshop'],['Illustrator','illustrator'],['Canva','canva'],['Premiere','premiere'],['CapCut','capcut',1],['Filmora','wondershare-filmora',1]] }
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

  var GRAPHICS = ['cv-thirty-minutes.webp', 'cv-thirty-book.webp', 'cv-credential-line.webp', 'cv-no-waiting-room.webp', 'cv-find-yourself.webp', 'cv-started-on-the-floor.webp',
    'dalefuture.png', 'flowg.png', 'artboard-1-100-1.webp', 'finalmem.png', 'artboard-4-100.webp', 'artboard-6-100.webp'];
  // Short-form reels (works/reels/<name>.mp4 + a .webp poster). They never
  // autoplay: the grid shows the poster, the viewer waits for a press on play.
  var REELS = ['diplomat', 'lumen-icemelt', 'lumen-drain-the-sea', 'usisero-watawat'];

  /* ─────────────────────────────── helpers ─────────────────────────────── */

  function esc(v) {
    return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function $(id) { return document.getElementById(id); }
  function icon(name) { return '<svg class="ic" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }
  function isLive(p) { return !!p.site && p.site !== CLIENT_ONLY; }
  // Badge text: live sites say Live; the rest say their `status` or Client.
  function statusLabel(p) { return isLive(p) ? 'Live' : (p.status || 'Client'); }
  function showcaseLink(p, cls) {
    return '<a class="' + cls + '" href="' + esc(p.showcase) + '" target="_blank" rel="noopener" data-showcase="' + esc(p.short || p.title) + '">Showcase ' + icon('arrow') + '</a>';
  }
  function siteLink(p, cls) {
    return '<a class="' + cls + '" href="https://' + esc(p.site) + '" target="_blank" rel="noopener noreferrer">' +
      esc(p.site) + ' ' + icon('out') + '</a>';
  }
  function pill(p) {
    return '<span class="pill' + (isLive(p) ? ' pill-live' : '') + '">' + statusLabel(p) + '</span>';
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
          '<span class="deck-status' + (isLive(p) ? ' is-live' : '') + '">' + statusLabel(p) + '</span></div>' +
        '<div class="deck-id"><h3>' + esc(p.short || p.title) + '</h3>' +
          '<span class="deck-thumb">' + img(p.img, '', 1600, 900) + '</span></div>' +
        '<p class="deck-desc">' + esc(p.desc) + '</p>' +
        '<p class="deck-stack">' + esc(p.langs.slice(0, 4).join(' · ')) + '</p>' +
        '<div class="deck-actions">' +
          '<button type="button" class="deck-btn" data-case="' + i + '">' + (p.caseStudy ? 'Case study' : 'Details') + ' ' + icon('arrow') + '</button>' +
          (p.showcase ? showcaseLink(p, 'deck-url') : isLive(p) ? siteLink(p, 'deck-url') : '') +
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
    var src = /^https?:/.test(t[1]) ? t[1] : 'https://thesvg.org/icons/' + t[1] + '/' + (t[3] || 'default') + '.svg';
    return '<img src="' + esc(src) + '" width="' + size + '" height="' + size + '" alt="" loading="lazy" decoding="async"' +
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

  function reelHtml() {
    return REELS.map(function (r, k) {
      var i = GRAPHICS.length + k;
      return '<li><a href="works/reels/' + esc(r) + '.mp4" target="_blank" rel="noopener noreferrer" data-lb="' + i + '" aria-label="Play reel ' + (k + 1) + '">' +
        '<img src="works/reels/' + esc(r) + '.webp" alt="" width="540" height="960" loading="lazy" decoding="async">' +
        '<span class="reel-play" aria-hidden="true"><svg class="ic"><use href="#i-play"/></svg></span></a></li>';
    }).join('');
  }

  /* ─────────────────────────── case-study dialog ───────────────────────── */

  function caseHtml(p) {
    var cs = p.caseStudy;
    var h = '<figure class="case-media is-loading"><span class="case-loader" role="status" aria-label="Loading screenshot"></span>' + '<img src="' + esc(webp(p.img)) + '" alt="' + esc((p.short || p.title) + ' screenshot') + '"></figure>' +
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
      '<span class="case-links">' +
        (p.showcase ? showcaseLink(p, 'btn btn-ghost') : '') +
        (isLive(p) ? siteLink(p, 'btn btn-ghost') : p.showcase ? '' : '<span class="muted-note">Private client project — happy to demo it on a call.</span>') +
      '</span>' +
      '<a class="btn btn-primary" href="mailto:dale.bedania10@gmail.com?subject=' + encodeURIComponent('Project inquiry (saw ' + (p.short || p.title) + ')') + '">Start a similar project</a>' +
    '</div>';
    return h;
  }

  /* The screenshot can take a moment on a cold cache: hold its space with a
     loader and fade the image in once it has decoded, instead of the figure
     popping open under the text. */
  function watchCaseImage() {
    var fig = $('caseBody').querySelector('.case-media');
    var im = fig && fig.querySelector('img');
    if (!im) return;
    var done = function () { fig.classList.remove('is-loading'); };
    var fail = function () { fig.classList.remove('is-loading'); fig.classList.add('is-failed'); };
    if (im.complete) { if (im.naturalWidth) done(); else fail(); return; }
    im.addEventListener('load', done, { once: true });
    im.addEventListener('error', fail, { once: true });
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
      watchCaseImage();
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
    var n = GRAPHICS.length + REELS.length, at = 0;
    var im = $('lbImg'), vid = $('lbVid');

    // Stops the reel and drops its source so nothing keeps loading.
    function stopVideo() {
      if (vid.hidden) return;
      vid.pause(); vid.removeAttribute('src'); vid.removeAttribute('poster'); vid.load(); vid.hidden = true;
    }

    function show(i) {
      at = (i + n) % n;
      var reel = at >= GRAPHICS.length, src;
      stopVideo();
      if (reel) {
        var r = REELS[at - GRAPHICS.length];
        src = 'works/reels/' + r + '.mp4';
        vid.poster = 'works/reels/' + r + '.webp';
        vid.src = src; // preload="none" + no autoplay: plays only when pressed
        vid.setAttribute('aria-label', 'Reel ' + (at - GRAPHICS.length + 1) + ' of ' + REELS.length);
        vid.hidden = false; im.hidden = true;
      } else {
        src = 'works/graphics/' + GRAPHICS[at];
        im.src = src;
        im.alt = 'Design ' + (at + 1) + ' of ' + GRAPHICS.length;
        im.hidden = false;
      }
      $('lbOpen').href = src;
      $('lbCount').textContent = String(at + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
    }

    function open(e) {
      var a = e.target.closest('[data-lb]');
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      show(+a.getAttribute('data-lb'));
      dlg.showModal();
      syncLock();
    }
    $('designList').addEventListener('click', open);
    $('reelList').addEventListener('click', open);
    $('lbPrev').addEventListener('click', function () { show(at - 1); });
    $('lbNext').addEventListener('click', function () { show(at + 1); });
    $('lbClose').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.target === vid) return; // arrows seek the reel while it has focus
      if (e.key === 'ArrowLeft') show(at - 1);
      if (e.key === 'ArrowRight') show(at + 1);
    });
    // Clicking the dimmed area around the image closes.
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.classList.contains('lb-stage')) dlg.close();
    });
    dlg.addEventListener('close', function () { stopVideo(); syncLock(); });
  }

  /* Welcome panel: the reel and the product showcases, opened on every page
     load so a visitor sees the best work first. Any [data-welcome] link
     reopens it. */
  var SHOWCASES = [
    { name: 'Pina CRM', note: 'Real-estate & plastering platform', img: 'works/pina.png', href: 'works/showcase/pina-management-showcase.html' },
    { name: 'PinaAi', note: 'AI agents with an approval gate', img: 'works/pinaai.png', href: 'works/showcase/pina-ai-showcase.html' },
    { name: 'Pina Apps', note: 'Field tools for the CRM', img: 'works/pinaapps.png', href: 'works/showcase/pina-apps-showcase.html' },
    { name: 'The Zepatide', note: 'A clinic site built on trust', img: 'works/zepatide.png', href: 'works/showcase/thezepatide-showcase.html' },
    { name: 'MyContent Studios', note: 'Six AI content pipelines, one desk', img: 'works/mycontent.png', href: 'works/showcase/mycontent-studios-showcase.html' },
    { name: 'Usisero Studio', note: 'One button to a finished video', img: 'works/usisero.png', href: 'works/showcase/usisero-studio-showcase.html' },
    { name: 'Konsepto', note: '3D motorcycle customiser', img: 'works/konsepto.png', href: 'works/showcase/konsepto-showcase.html' },
    { name: 'Housewright', note: '2D + 3D home design', img: 'works/housewright.png', href: 'works/showcase/housewright-showcase.html' }
  ];

  function showcaseHtml() {
    return SHOWCASES.map(function (s) {
      return '<li><a class="sc-tile" href="' + esc(s.href) + '" target="_blank" rel="noopener" data-showcase="' + esc(s.name) + '">' +
        '<span class="sc-thumb">' + img(s.img, '', 1600, 900) + '</span>' +
        '<span class="sc-name">' + esc(s.name) + ' ' + icon('arrow') + '</span>' +
        '<span class="sc-note">' + esc(s.note) + '</span>' +
      '</a></li>';
    }).join('');
  }

  /* Showcase viewer: showcase links open full screen in this tab, in an
     iframe dialog stacked over whatever opened it (the welcome panel or a
     case study), so closing it returns there. Modifier-clicks and no-JS
     visitors still get a new tab from the link itself. */
  function initShowcaseViewer() {
    var dlg = $('showcaseViewer');
    if (!dlg || typeof dlg.showModal !== 'function') return;
    var frame = $('svFrame');
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-showcase]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      var v = $('welcomeVideo');
      if (v && !v.paused) v.pause();
      $('svTitle').textContent = a.getAttribute('data-showcase');
      $('svOpen').href = a.getAttribute('href');
      frame.src = a.getAttribute('href');
      dlg.showModal();
      syncLock();
    });
    $('svClose').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('close', function () {
      frame.src = 'about:blank';
      syncLock();
    });
  }

  function initWelcome() {
    var dlg = $('welcome');
    if (!dlg || typeof dlg.showModal !== 'function') return;
    var video = $('welcomeVideo');
    var soundBtn = $('welcomeSound');
    /* Sound is on by default. Browsers refuse unmuted autoplay until the
       visitor has interacted with the page, so if that play() is rejected we
       fall back to muted playback, show "Tap for sound", and switch sound on
       at the first click or key press. */
    function soundOn() {
      if (!video) return;
      video.muted = false;
      if (soundBtn) soundBtn.hidden = true;
      if (video.paused && dlg.open) {
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
      }
    }
    function armSoundOnGesture() {
      function once(e) {
        if (e.target === $('welcomeSkip') || e.target === $('welcomeClose')) return;
        document.removeEventListener('pointerdown', once, true);
        document.removeEventListener('keydown', once, true);
        if (dlg.open) soundOn();
      }
      document.addEventListener('pointerdown', once, true);
      document.addEventListener('keydown', once, true);
    }
    function playWithSound() {
      video.muted = false;
      var p = video.play();
      if (!p || !p.catch) return;
      p.catch(function () {
        video.muted = true;
        if (soundBtn) soundBtn.hidden = false;
        var q = video.play();
        if (q && q.catch) q.catch(function () {});
        armSoundOnGesture();
      });
    }
    if (soundBtn) soundBtn.addEventListener('click', function (e) { e.stopPropagation(); soundOn(); });
    if (video) video.addEventListener('volumechange', function () { if (!video.muted && soundBtn) soundBtn.hidden = true; });
    initPlayer(video, function () { dlg.close(); });
    function open() {
      if (dlg.open) return;
      dlg.showModal();
      syncLock();
      dlg.scrollTop = 0;
      if (video && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) playWithSound();
    }
    dlg.addEventListener('close', function () {
      if (video) video.pause();
      syncLock();
    });
    $('welcomeClose').addEventListener('click', function () { dlg.close(); });
    $('welcomeSkip').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-welcome]');
      if (!t) return;
      e.preventDefault();
      open();
    });
    setTimeout(open, 600);
  }

  /* The reel's own player: play/pause, a scrubbable progress track, time,
     mute and full screen. Instead of looping, the film ends on a card that
     offers the way into the site or another watch. State lives in data-*
     attributes on #player so the CSS can show the right icons. */
  function initPlayer(video, onContinue) {
    var player = $('player');
    if (!video || !player) return;
    var track = $('plTrack'), fill = $('plFill'), time = $('plTime'), dur = $('plDur');
    var end = $('plEnd'), toggle = $('plToggle'), mute = $('plMute'), big = $('plBig');
    function fmt(s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
    function set(name, on) { if (on) player.setAttribute('data-' + name, ''); else player.removeAttribute('data-' + name); }
    function play() { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
    function togglePlay() { if (video.paused || video.ended) play(); else video.pause(); }
    function sync() {
      set('paused', video.paused); set('muted', video.muted);
      toggle.setAttribute('aria-label', video.paused ? 'Play' : 'Pause');
      big.setAttribute('aria-label', video.paused ? 'Play' : 'Pause');
      mute.setAttribute('aria-label', video.muted ? 'Unmute' : 'Mute');
    }
    function progress() {
      var d = video.duration || 0, pct = d ? (video.currentTime / d) * 100 : 0;
      fill.style.width = pct + '%';
      time.textContent = fmt(video.currentTime);
      track.setAttribute('aria-valuenow', Math.round(pct));
      track.setAttribute('aria-valuetext', fmt(video.currentTime) + ' of ' + fmt(d));
    }
    function showEnd(on) { end.hidden = !on; set('ended', on); }

    video.addEventListener('play', function () { showEnd(false); sync(); });
    video.addEventListener('pause', sync);
    video.addEventListener('volumechange', sync);
    video.addEventListener('timeupdate', progress);
    video.addEventListener('loadedmetadata', function () { dur.textContent = fmt(video.duration); progress(); });
    video.addEventListener('ended', function () { showEnd(true); sync(); });
    if (video.readyState >= 1) dur.textContent = fmt(video.duration);

    video.addEventListener('click', togglePlay);
    big.addEventListener('click', togglePlay);
    toggle.addEventListener('click', togglePlay);
    mute.addEventListener('click', function () { video.muted = !video.muted; if (!video.muted && video.paused && !video.ended) play(); });
    $('plFull').addEventListener('click', function () {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (player.requestFullscreen) player.requestFullscreen().catch(function () {});
    });
    $('plReplay').addEventListener('click', function () { video.currentTime = 0; play(); });
    $('plContinue').addEventListener('click', onContinue);

    // Scrubbing: drag or click anywhere on the track; arrows step 5s.
    function seekTo(clientX) {
      var r = track.getBoundingClientRect();
      var f = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      if (video.duration) { video.currentTime = f * video.duration; progress(); }
    }
    track.addEventListener('pointerdown', function (e) {
      track.setPointerCapture(e.pointerId); set('scrubbing', true); seekTo(e.clientX);
      function move(ev) { seekTo(ev.clientX); }
      function up() { set('scrubbing', false); track.removeEventListener('pointermove', move); track.removeEventListener('pointerup', up); track.removeEventListener('pointercancel', up); }
      track.addEventListener('pointermove', move); track.addEventListener('pointerup', up); track.addEventListener('pointercancel', up);
    });
    track.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      video.currentTime = Math.min(video.duration || 0, Math.max(0, video.currentTime + (e.key === 'ArrowRight' ? 5 : -5)));
    });
    sync();
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
    deck: deckHtml, projectList: projectListHtml, kitList: stackHtml, designList: designHtml, reelList: reelHtml,
    showcaseList: showcaseHtml
  };

  function boot() {
    Object.keys(LISTS).forEach(function (id) { $(id).innerHTML = LISTS[id](); });
    initDeck(); initCaseDialog(); initLightbox(); initMore(); initNav(); initReveal(); initWelcome(); initShowcaseViewer();
    $('year').textContent = new Date().getFullYear();
  }

  if (typeof module === 'object' && module.exports) { module.exports = LISTS; return; }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
