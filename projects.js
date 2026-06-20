
let projects = [ 
    { 
        "title":"Holy Angel University IDMO Employee Portal",
        "desc": "Employee Portal for Holy Angel University, streamlining HR processes and data management.",
        "img": "works/hauoieidmo.png",
        "site": "hau-oie-idmo.com",
        "role":['Full-Stack Developer', "UX/UI Designer"],
        "langs":['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger'],
        "caseStudy": {
            "problem": "The IDMO managed employee records and HR requests through manual, document-heavy processes that were slow to search, easy to duplicate, and hard to keep consistent.",
            "approach": [
                "Built a centralized Laravel portal with role-based access for HR staff and employees.",
                "Designed clean, intuitive UX/UI flows so non-technical staff could manage records without training.",
                "Modeled an optimized MySQL schema for fast, reliable lookups across employee data.",
                "Deployed and configured production hosting on Hostinger with SSL."
            ],
            "outcome": [
                "Replaced scattered manual tracking with a single source of truth for employee data.",
                "Gave HR and employees fast self-service access to records and requests.",
                "Cut down repetitive paperwork and made employee information searchable in seconds."
            ]
        },
    },
    { 
        "title":"Kayantabe",
        "desc": "A dynamic volunteerism web platform designed to connect passionate individuals with local community initiatives.",
        "img": "works/kayantabe.png",
        "site": "kayantabe.com",
        "role":['Full-Stack Developer', "Project Lead"],
        "langs":['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger'],
        "caseStudy": {
            "problem": "Local community initiatives struggled to reach and coordinate volunteers, relying on fragmented social-media posts with no central place to discover, sign up for, or manage activities.",
            "approach": [
                "Led the project end-to-end and built the platform on Laravel.",
                "Created flows for organizations to post initiatives and for volunteers to discover and join them.",
                "Designed a responsive, mobile-first UI to make sign-up frictionless.",
                "Structured the data model so organizers could track participation per initiative."
            ],
            "outcome": [
                "Gave volunteers and organizers one platform to connect, replacing scattered social posts.",
                "Made it simple for organizations to launch initiatives and grow their volunteer base.",
                "Streamlined sign-ups so more people could get involved with far less friction."
            ]
        },
    },
    { 
        "title":"Umbra",
        "desc": "A web application that connects students and parents with nearby tutors. It offers a seamless platform for finding, booking, and managing tutoring sessions—designed to make learning more accessible and personalized.",
        "img": "works/umbra.png",
        "site": "umbra-app.com", 
        "role":['Full-Stack Developer', "UX/UI Designer"],
        "langs":['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger'],
    },
    { 
        "title":"Pina Management CMS",
        "desc": "Developed a custom CMS portal tailored for a real estate company, enabling efficient management of property listings, client records, and transactions. Focused on streamlining workflows and providing a user-friendly interface to improve daily operations.",
        "img": "works/pina.png",
        "site": "In progress",
        "role":['Database Administrator', "Full-Stack Developer"],
        "langs":["React","Supabase","Vercel"],
        "caseStudy": {
            "problem": "A real estate company tracked property listings, client records, and transactions across spreadsheets and disconnected tools, making day-to-day operations slow and error-prone.",
            "approach": [
                "Built a custom CMS with React and Supabase tailored to their real-estate workflow.",
                "Structured the database for listings, clients, and transactions with data integrity in mind.",
                "Focused the interface on the team's daily tasks to reduce friction and training time."
            ],
            "outcome": [
                "Centralizes listings, clients, and transactions into one operational portal.",
                "Replaces error-prone spreadsheets with a single, reliable source of truth.",
                "Speeds up daily operations with workflows built around the team's real tasks."
            ]
        },
    },
    { 
        "title":"SPUR Landing Page",
       "desc": "Designed and built a responsive landing page to showcase the mobile app I developed, highlighting its key features and benefits. Ensured a modern, engaging layout that aligns with the app’s branding and drives user interest and downloads.",
        "img": "works/joinspur.png",
        "site": "joinspurapp.com", 
        "role":['UX/UI Designer', "Full-Stack Developer"],
        "langs":["React", "Supabase", "Vercel"],
    },
    {
        "title":"SPUR Mobile App",
        "desc":"Find your next game, running partner, or tennis match. SPUR is a location-based app that connects you with people who share your passion for sports and fitness. Match by skill, find local events, and build your squad.",
        "img":"works/spurapp.png",
        "site":"In progress",
        "role":['Mobile Developer', 'UX/UI Designer'],
        "langs":["React Native", "Javascript", "Firebase"],
    },
    { 
        "title":"The Zepatide",
      "desc": "Created a professional website to establish a strong brand identity for medical-grade products. Focused on a clean, trustworthy design that communicates product quality while enhancing credibility and customer engagement.",
        "img": "works/zepatide.png",
        "site": "thezepatide.com", 
        "role":['UX/UI Designer', "Front-end Developer"],
        "langs":["React", "Supabase", "Vercel"],
    },
    { 
        "title":"IMMFI",
        "desc": "Implemented a modern, user-friendly layout using updated design principles and front-end technologies. Focused on enhancing the user experience while maintaining brand identity across all pages.",
        "img": "works/immfi.png",
        "site": "immfi.org", 
        "role":['UX/UI Designer', "Front-end Developer"],
        "langs":["Wordpress", "Elementor"],
    },

    { 
        "title":"Connect4 by Dale",
        "desc": "A browser-based Connect Four game with two-player drop logic, win detection, and a clean responsive layout—built to practice DOM manipulation and game state in vanilla JavaScript.",
        "img": "works/connect4.png",
        "site": "bedaniadale.github.io/daleconnect4", 
        "role":['Full-Stack Developer'],
        "langs":["HTML", "CSS", "Javascript"],
    },
    { 
        "title":"GitHub DevFinder",
        "desc": "A frontend challenge app that searches GitHub users and displays profile details from the GitHub API—focused on accessible layout, loading states, and handling API responses.",
        "img": "works/devfinder.png",
        "site": "bedaniadale.github.io/devfinder", 
        "role":['Full-Stack Developer'],
        "langs":["HTML", "CSS", "Javascript"],
    },
    {
        "title": "ResumeForge",
        "desc": "Fill in your details once — ResumeForge handles the rest. Instantly generates a polished, ATS-friendly resume PDF styled after the iconic Harvard format, no design skills or formatting headaches required.",
        "img": "works/resumeforge.png",
        "site": "In progress",
        "role": ["Full-Stack Developer", "UX/UI Designer"],
        "langs": ["React", "Node.js", "Tailwind CSS", "PDF Generation"],
    },
    {
        "title": "ZoneBridge",
        "desc": "Drop a pin on any city or GPS coordinate and instantly see the exact time gap between it and anywhere else in the world. Built for remote teams, frequent travelers, and anyone tired of mental timezone math.",
        "img": "works/zonebridge.png",
        "site": "In progress",
        "role": ["Full-Stack Developer", "UX/UI Designer"],
        "langs": ["React", "Tailwind CSS", "Mapbox GL", "Javascript"],
    }


]

function escapeHtml(value) {
    return String(value)
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
  return `<span class="iconify" data-icon="${icon}" style="font-size:13px;flex-shrink:0;"></span>`;
}

const ROLE_ICON_MAP = {
  'full-stack developer':   'mdi:code-braces',
  'front-end developer':    'mdi:monitor-shimmer',
  'ux/ui designer':         'mdi:palette-outline',
  'project lead':           'mdi:account-star-outline',
  'database administrator': 'mdi:database-cog-outline',
  'mobile developer':       'mdi:cellphone-check',
};

function roleIcon(name) {
  const icon = ROLE_ICON_MAP[name.toLowerCase()];
  if (!icon) return '';
  return `<span class="iconify" data-icon="${icon}" style="font-size:13px;flex-shrink:0;"></span>`;
}

function createRoles(arr) {
  return arr.map(item =>
    `<span class="text-xs px-2.5 py-1 rounded-full border border-gray-200 bg-white text-gray-800 font-medium">${escapeHtml(item)}</span>`
  ).join('');
}

function createLanguages(arr) {
  return arr.map(item =>
    `<span class="text-xs px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-700 font-medium" style="display:inline-flex;align-items:center;gap:4px;">${techIcon(item)}${escapeHtml(item)}</span>`
  ).join('');
}


function buildCaseStudy(cs) {
    if (!cs) return '';

    const esc = escapeHtml;
    const steps = [];

    if (cs.problem) {
        steps.push(`
          <div class="cs-step cs-step--problem">
            <div class="cs-step-node"><span class="iconify" data-icon="mdi:alert-circle-outline"></span></div>
            <div class="cs-step-body">
              <h5 class="cs-step-label">The Problem</h5>
              <p class="cs-step-text">${esc(cs.problem)}</p>
            </div>
          </div>
        `);
    }

    if (cs.approach && cs.approach.length) {
        const items = cs.approach.map((p) => `<li>${esc(p)}</li>`).join('');
        steps.push(`
          <div class="cs-step cs-step--approach">
            <div class="cs-step-node"><span class="iconify" data-icon="mdi:tools"></span></div>
            <div class="cs-step-body">
              <h5 class="cs-step-label">What I did</h5>
              <ul class="cs-step-list">${items}</ul>
            </div>
          </div>
        `);
    }

    if (cs.outcome && cs.outcome.length) {
        const cards = cs.outcome.map((p) => `
          <div class="cs-outcome-card">
            <span class="iconify" data-icon="mdi:check-circle"></span>
            <span>${esc(p)}</span>
          </div>
        `).join('');
        steps.push(`
          <div class="cs-step cs-step--outcome">
            <div class="cs-step-node"><span class="iconify" data-icon="mdi:trophy-outline"></span></div>
            <div class="cs-step-body">
              <h5 class="cs-step-label">Outcome</h5>
              <div class="cs-outcome-grid">${cards}</div>
            </div>
          </div>
        `);
    }

    if (!steps.length) return '';

    return `
      <div class="case-study">
        <span class="case-study-eyebrow"><span class="iconify" data-icon="mdi:star-four-points"></span> Case Study</span>
        <div class="cs-timeline">${steps.join('')}</div>
      </div>
    `;
}

function integrateLink(site) {
    if(site === "In progress") {
        return '#home' 
    } 

    return `https://${site}`; 
}

function checkTarget(site) { 
     if(site === "In progress") {
        return '' 
    } 

    return `_blank`; 
}

function siteLabelForMockup(site) {
    if (site === 'In progress') return 'Preview';
    let s = String(site).replace(/^https?:\/\//i, '').trim();
    if (s.length > 42) return `${s.slice(0, 39)}…`;
    return s;
}

function browserMockupHtml(imgSrc, title, site, variant) {
    const label = siteLabelForMockup(site);
    const escapedLabel = escapeHtml(label);
    const escapedSrc = escapeHtml(imgSrc);
    const escapedTitle = escapeHtml(title);
    const isCard = variant === 'card';
    const loadingAttr = isCard ? ' loading="lazy"' : '';
    const imgClasses = isCard
        ? 'project-thumb block w-full transition-transform duration-300 group-hover:scale-[1.01]'
        : 'project-modal-image';
    const viewportClass = isCard ? 'project-browser-viewport' : 'project-browser-viewport project-browser-viewport--modal';
    const mockupClass = isCard ? 'project-browser-mockup project-browser-mockup--card' : 'project-browser-mockup project-browser-mockup--modal';
    const altText = isCard ? escapedTitle : `${escapedTitle} preview`;

    return `
      <div class="${mockupClass}">
        <div class="project-browser-chrome" aria-hidden="true">
          <span class="project-browser-dots">
            <span class="project-browser-dot project-browser-dot--red"></span>
            <span class="project-browser-dot project-browser-dot--yellow"></span>
            <span class="project-browser-dot project-browser-dot--green"></span>
          </span>
          <span class="project-browser-url">${escapedLabel}</span>
        </div>
        <div class="${viewportClass}">
          <img src="${escapedSrc}" alt="${altText}"${loadingAttr} class="${imgClasses}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
          <div class="project-thumb-placeholder" style="display:none;">Screenshot coming soon</div>
        </div>
      </div>
    `;
}

function loadProjects() { 
    let sprojects = ''; 

    projects.forEach((item, index) => {

        const roles = createRoles(item.role);
        const langs = createLanguages(item.langs);

        const hasCase = !!item.caseStudy;
        const cardClass = hasCase
            ? 'project-card project-card--case group flex flex-col overflow-hidden reveal-scale'
            : 'project-card group flex flex-col overflow-hidden reveal-scale';
        const caseBadge = hasCase
            ? `<span class="case-study-badge"><span class="iconify" data-icon="mdi:file-document-outline" style="font-size:13px;"></span> Case Study</span>`
            : '';
        const detailsLabel = hasCase ? 'Read Case Study' : 'View Details';

        const siteLabel = siteLabelForMockup(item.site);
        const siteCta = item.site === 'In progress' ? 'Coming Soon' : 'View Site';

        let project = `
    <article class="${cardClass}">
      <div class="project-media">
        <img src="${escapeHtml(item.img)}" alt="${escapeHtml(item.title)} screenshot" loading="lazy"
             class="project-media-img"
             onerror="this.style.display='none';this.parentElement.querySelector('.project-media-fallback').style.display='flex';" />
        <div class="project-media-fallback">Screenshot coming soon</div>
        <div class="project-media-shade" aria-hidden="true"></div>
        ${caseBadge}
        <div class="project-media-caption">
          <span class="project-media-site"><span class="iconify" data-icon="mdi:web" style="font-size:12px;"></span>${escapeHtml(siteLabel)}</span>
          <h3 class="project-media-title">${escapeHtml(item.title)}</h3>
        </div>
      </div>

      <div class="project-content">
        <p class="project-desc">${escapeHtml(item.desc)}</p>

        <div class="project-chips">
          ${roles}
          ${langs}
        </div>

        <div class="project-actions">
          <button type="button" class="project-details-btn btn-secondary" data-project-index="${index}">
            ${detailsLabel}
          </button>
          <a href="${integrateLink(item.site)}" target="${checkTarget(item.site)}" rel="noopener noreferrer" class="project-site-link">
            <span class="iconify" data-icon="mdi:link-variant" style="font-size: 1rem;"></span>
            <span class="truncate">${siteCta}</span>
          </a>
        </div>
      </div>
    </article>
        `
        
        sprojects+=project
    });

    document.getElementById('projects').innerHTML = sprojects;
    if (typeof Iconify !== 'undefined') Iconify.scan();
    bindProjectDetailsModal();

}

function bindProjectDetailsModal() {
    const projectModal = document.getElementById('projectModal');
    const projectModalBody = document.getElementById('projectModalBody');
    const closeProjectModal = document.getElementById('closeProjectModal');
    const closeProjectBackdrop = document.querySelector('[data-close-project]');
    const projectsContainer = document.getElementById('projects');

    if (!projectModal || !projectModalBody || !projectsContainer) return;

    const openProjectModal = (projectIndex) => {
        const item = projects[projectIndex];
        if (!item) return;

        const roleChips = item.role.map((role) =>
          `<span class="text-xs px-2.5 py-1 rounded-full border border-gray-200 bg-white text-gray-800 font-medium">${escapeHtml(role)}</span>`
        ).join('');
        const languageChips = item.langs.map((lang) =>
          `<span class="text-xs px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-700 font-medium" style="display:inline-flex;align-items:center;gap:4px;">${techIcon(lang)}${escapeHtml(lang)}</span>`
        ).join('');

        const caseStudyHtml = buildCaseStudy(item.caseStudy);

        projectModalBody.innerHTML = `
          <article class="project-modal-content">
            <div class="project-modal-image-wrap">
              ${browserMockupHtml(item.img, item.title, item.site, 'modal')}
            </div>
            <h4 class="project-modal-title">${escapeHtml(item.title)}</h4>
            <p class="project-modal-desc">${escapeHtml(item.desc)}</p>
            ${caseStudyHtml}
            <div class="project-modal-tags">
              ${roleChips}
              ${languageChips}
            </div>
            <a href="${integrateLink(item.site)}" target="${checkTarget(item.site)}" rel="noopener noreferrer" class="project-modal-link inline-flex items-center gap-2 rounded-full bg-black px-3.5 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5">
              <span class="iconify" data-icon="mdi:link-variant" style="font-size: 1rem;"></span>
              <span>${item.site === 'In progress' ? 'Coming Soon' : 'View Site'}</span>
            </a>
          </article>
        `;

        projectModal.classList.add('is-open');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        if (window.__lenis) window.__lenis.stop();
        if (projectModalBody) projectModalBody.scrollTop = 0;
        if (typeof Iconify !== 'undefined') Iconify.scan(projectModalBody);
    };

    const closeModal = () => {
        projectModal.classList.remove('is-open');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (window.__lenis) window.__lenis.start();
    };

    projectsContainer.addEventListener('click', (event) => {
        const trigger = event.target.closest('.project-details-btn');
        if (!trigger) return;
        const projectIndex = Number(trigger.getAttribute('data-project-index'));
        openProjectModal(projectIndex);
    });

    if (closeProjectModal) closeProjectModal.addEventListener('click', closeModal);
    if (closeProjectBackdrop) closeProjectBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && projectModal.classList.contains('is-open')) {
            closeModal();
        }
    });
}

loadProjects(); 