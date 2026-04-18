// thesvg.org CDN — default (colored) variant
// URL pattern: https://thesvg.org/icons/{slug}/default.svg
// Icons without a thesvg.org slug fall back to iconify API or inline SVG.

function thesvgImg(slug, alt, w = 20, h = 20) {
  return `<img src="https://thesvg.org/icons/${slug}/default.svg" width="${w}" height="${h}" alt="${alt}" loading="lazy">`;
}

// For white-only icons that need inversion in light mode
function thesvgAdaptImg(slug, alt, w = 20, h = 20) {
  return `<img src="https://thesvg.org/icons/${slug}/default.svg" width="${w}" height="${h}" alt="${alt}" loading="lazy" class="icon-theme-adapt">`;
}

// ── AI & Dev Tools ────────────────────────────────────────────────────────────
let cursor    = thesvgAdaptImg('cursor',        'Cursor');
let chatgpt   = thesvgImg('openai-chatgpt','ChatGPT');
let claude    = thesvgImg('claude',        'Claude');
let gemini    = thesvgImg('google-gemini', 'Gemini');

// ── Frontend ──────────────────────────────────────────────────────────────────
let javascript = thesvgImg('javascript',   'JavaScript');
let typescript = thesvgImg('typescript',   'TypeScript');
let react      = thesvgImg('react',        'React.js');
let nextjs     = thesvgImg('nextdotjs',    'Next.js');
let vuejs      = thesvgImg('vue',          'Vue.js');
let angular    = thesvgImg('angular',      'Angular');
let inertia    = `<img src="https://api.iconify.design/simple-icons:inertia.svg" width="20" height="20" alt="Inertia.js" loading="lazy">`;
let tailwind   = thesvgImg('tailwind-css', 'Tailwind CSS');
let bootstrap  = thesvgImg('bootstrap',    'Bootstrap');
let shadcn     = `<img src="https://api.iconify.design/simple-icons:shadcnui.svg" width="20" height="20" alt="shadcn/ui" loading="lazy">`;
let materialui = thesvgImg('mui',          'Material UI');

// ── Mobile ────────────────────────────────────────────────────────────────────
let reactNative = thesvgImg('react',      'React Native');
let flutter     = thesvgImg('flutter',    'Flutter');
let dart        = thesvgImg('dart',       'Dart');
let swift       = thesvgImg('swift',      'Swift');

// ── Backend ───────────────────────────────────────────────────────────────────
let nodejs      = thesvgImg('nodedotjs', 'Node.js');
let expressjs   = thesvgImg('express',   'Express.js');
let php         = thesvgImg('php',       'PHP');
let _laravel    = thesvgImg('laravel',   'Laravel');
let python      = thesvgImg('python',    'Python');
let django      = thesvgImg('django',    'Django');
let java        = thesvgImg('java',      'Java');
let dotnet      = thesvgImg('dotnet',    '.NET');
let csharp      = `<img src="https://api.iconify.design/devicon:csharp.svg" width="20" height="20" alt="C#" loading="lazy">`;
let cplusplus   = `<img src="https://api.iconify.design/devicon:cplusplus.svg" width="20" height="20" alt="C++" loading="lazy">`;
let socketio    = thesvgImg('socketdotio', 'Socket.io');
// Visual Basic has no thesvg.org icon — keep iconify API
let visualBasic = `<img src="https://api.iconify.design/vscode-icons:file-type-vb.svg" width="20" height="20" alt="Visual Basic" loading="lazy">`;

// ── Database & Cloud ──────────────────────────────────────────────────────────
let mysql      = thesvgAdaptImg('mysql',           'MySQL');
let postgresql = thesvgImg('postgresql',      'PostgreSQL');
let mongodb    = thesvgImg('mongodb',         'MongoDB');
let supabase  = thesvgImg('supabase',        'Supabase');
let firebase  = thesvgImg('firebase',        'Firebase');
let aws       = thesvgImg('aws',             'AWS');
let azure     = thesvgImg('microsoft-azure', 'Azure');
let hostinger = thesvgImg('hostinger',       'Hostinger');
let vercel    = thesvgAdaptImg('vercel',          'Vercel');
let netlify   = thesvgImg('netlify',         'Netlify');

// ── Design Tools ──────────────────────────────────────────────────────────────
let figma       = thesvgImg('figma',                   'Figma');
let canva       = thesvgImg('canva',                   'Canva');
let photoshop   = thesvgImg('photoshop',               'Photoshop');
let illustrator = thesvgImg('illustrator',             'Illustrator');
let premiere    = thesvgImg('premiere',                'Premiere Pro');
let filmora     = `<img src="https://api.iconify.design/simple-icons:wondershare.svg" width="20" height="20" alt="Filmora" loading="lazy">`;

// ── Platforms & CMS ───────────────────────────────────────────────────────────
let wordpress = thesvgImg('wordpress', 'WordPress');
let shopify   = thesvgImg('shopify',   'Shopify');

// ── Automation & Integrations ─────────────────────────────────────────────────
let postman   = thesvgImg('postman', 'Postman');
let jira      = thesvgImg('jira',    'Jira');
let zapier    = thesvgImg('zapier',  'Zapier');
let n8n    = `<img src="https://api.iconify.design/simple-icons:n8n.svg" width="20" height="20" alt="n8n" loading="lazy">`;
let stripe = thesvgImg('stripe', 'Stripe');
let twilio = thesvgImg('twilio', 'Twilio');
// Clio has no thesvg.org icon — keep custom inline SVG
let clio = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><circle cx="128" cy="128" r="108" fill="none" stroke="currentColor" stroke-width="12"/><path d="M88 168V88h80" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// ── Other Languages ───────────────────────────────────────────────────────────
let solidity = thesvgImg('solidity', 'Solidity');

// ─────────────────────────────────────────────────────────────────────────────

function mountIcon(id, markup) {
  const node = document.getElementById(id);
  if (node) node.innerHTML = markup;
}

// AI & Dev Tools
mountIcon('cursor',    cursor);
mountIcon('chatgpt',   chatgpt);
mountIcon('claude',    claude);
mountIcon('gemini',    gemini);

// Frontend
mountIcon('javascript', javascript);
mountIcon('typescript', typescript);
mountIcon('react',      react);
mountIcon('nextjs',     nextjs);
mountIcon('vuejs',      vuejs);
mountIcon('angular',    angular);
mountIcon('inertia',    inertia);
mountIcon('tailwind',   tailwind);
mountIcon('bootstrap',  bootstrap);
mountIcon('shadcn',     shadcn);
mountIcon('materialui', materialui);

// Mobile
mountIcon('reactnative', reactNative);
mountIcon('flutter',     flutter);
mountIcon('dart',        dart);
mountIcon('swift',       swift);

// Backend
mountIcon('nodejs',      nodejs);
mountIcon('expressjs',   expressjs);
mountIcon('php',         php);
mountIcon('laravel',     _laravel);
mountIcon('python',      python);
mountIcon('django',      django);
mountIcon('java',        java);
mountIcon('dotnet',      dotnet);
mountIcon('csharp',      csharp);
mountIcon('cplusplus',   cplusplus);
mountIcon('socketio',    socketio);
mountIcon('visualbasic', visualBasic);

// Database & Cloud
mountIcon('mysql',      mysql);
mountIcon('postgresql', postgresql);
mountIcon('mongodb',    mongodb);
mountIcon('supabase',  supabase);
mountIcon('firebase',  firebase);
mountIcon('aws',       aws);
mountIcon('azure',     azure);
mountIcon('hostinger', hostinger);
mountIcon('vercel',    vercel);
mountIcon('netlify',   netlify);

// Design Tools
mountIcon('figma',       figma);
mountIcon('canva',       canva);
mountIcon('photoshop',   photoshop);
mountIcon('illustrator', illustrator);
mountIcon('premiere',    premiere);
mountIcon('filmora',     filmora);

// Platforms & CMS
mountIcon('wordpress', wordpress);
mountIcon('shopify',   shopify);

// Automation & Integrations
mountIcon('postman', postman);
mountIcon('jira',    jira);
mountIcon('zapier',  zapier);
mountIcon('n8n',     n8n);
mountIcon('stripe',  stripe);
mountIcon('twilio',  twilio);
mountIcon('clio',    clio);

// Other
mountIcon('solidity', solidity);
