/**
 * FAQ chatbot knowledge (rule-based, no API).
 *
 * Each rule supports an `answers` array — the bot picks one randomly so
 * repeated questions never sound like a tape recorder.
 * The legacy `answer` string still works as a fallback.
 *
 * Optional CHATBOT_META fields:
 *   timezone, remotePreference, portfolioUrl, phone, emailResponseTime
 */
var CHATBOT_META = {
  name: 'Dale Bedania',
  role: 'Full-stack Web Developer',
  location: 'Pampanga, Philippines',
  email: 'dale.bedania10@gmail.com',
  linkedin: 'https://www.linkedin.com/in/dale-bedania/',
  github: 'https://github.com/bedaniadale',
  availability: 'Dale is open to full-time roles and contract or project-based work.',
  cvPath: 'works/Bedania_Dale_Resume_2026.pdf',
  /** @type {string|null} */
  timezone: null,
  /** @type {string|null} */
  remotePreference: null,
  /** @type {string|null} */
  portfolioUrl: null,
  /** @type {string|null} */
  phone: null,
  /** @type {string|null} */
  emailResponseTime: null,
};

/**
 * @typedef {{ id: string, keywords: string[], phrases?: string[], answers: string[], answer?: string }} ChatbotRule
 * @type {ChatbotRule[]}
 */
var CHATBOT_RULES = [
  {
    id: 'identity',
    keywords: ['who', 'dale', 'bedania', 'introduce', 'yourself', 'about you', 'developer', 'person'],
    phrases: ['who are you', 'tell me about yourself', 'who is dale'],
    answers: [
      '<strong>Dale Bedania</strong> is a full-stack web developer from <strong>Pampanga, Philippines</strong> who started writing code back in <strong>2015</strong>. He builds practical, clean, and scalable web solutions. Check the <strong>Recent Projects</strong> and <strong>Experience</strong> sections on this page — or ask about his stack, education, or how to get in touch.',
      'Dale is a <strong>full-stack developer</strong> based in the Philippines. He\'s been coding since <strong>2015</strong>, graduated with a BSIT in Web Development in 2025, and currently works at <strong>Pina Realty Management</strong>. He handles everything from backend APIs to front-end UX.',
      'Good question! <strong>Dale Bedania</strong> builds web applications end-to-end — think Laravel, React, Supabase, the works. Based in <strong>Pampanga, Philippines</strong>, coding since age 13. Feel free to ask about specific projects or his background.',
    ],
  },
  {
    id: 'location',
    keywords: ['where', 'location', 'based', 'live', 'country', 'philippines', 'pampanga'],
    phrases: ['where are you', 'where do you live'],
    answers: [
      'Dale is based in <strong>Pampanga, Philippines</strong>.',
      'He\'s in <strong>Pampanga, Philippines</strong> — Central Luzon.',
      'Pampanga, Philippines. He\'s open to remote work as well.',
    ],
  },
  {
    id: 'education',
    keywords: [
      'education', 'school', 'university', 'degree', 'graduate', 'college',
      'hau', 'holy angel', 'bsit', 'web development', 'class of',
    ],
    phrases: ['where did you study', 'your education'],
    answers: [
      '<strong>Holy Angel University</strong> — <strong>BS Information Technology</strong>, specialization in <strong>Web Development</strong>, Class of <strong>2025</strong>. He graduated as the Most Outstanding Graduating Student per Program, Most Outstanding OJT, and served as <strong>Code Geeks President</strong> (2023–2024). Dean\'s and President\'s Lister throughout.',
      'Dale studied at <strong>Holy Angel University</strong> and graduated in <strong>2025</strong> with a BSIT in Web Development. Along the way he earned a Dean\'s List spot (2022–2024), a President\'s List, and an academic scholarship — on top of leading the Code Geeks organization.',
      'BSIT Web Development, <strong>Holy Angel University</strong>, 2025. A few standout honors: Most Outstanding Graduating Student, Most Outstanding OJT, Code Geeks President 2023–2024, Dean\'s Lister, and HAFRD Academic Scholar.',
    ],
  },
  {
    id: 'experience',
    keywords: [
      'experience', 'work', 'job', 'career', 'employment',
      'internship', 'intern', 'freelance', 'pina', 'realty',
      'australia', 'history',
    ],
    phrases: ['work experience', 'where do you work', 'current job'],
    answers: [
      'Currently <strong>Full Stack Web Developer</strong> at <strong>Pina Realty Management</strong> (Jul 2025 – present). Before that: full-stack project work for a <strong>direct client in Australia</strong>, a <strong>full-stack internship</strong> at HAU (Jun–Nov 2024), and freelance <strong>graphic design</strong> for NILEliteGears &amp; CompleteVitalityLife. He\'s been coding since <strong>2015</strong>.',
      'Dale\'s current role is <strong>Full Stack Developer</strong> at <strong>Pina Realty Management</strong> since July 2025. He also took on a direct project with an <strong>Australian client</strong> that same month. His earlier background includes a uni internship and freelance design work.',
      'His career in short: Pina Realty (full-stack, Jul 2025–now) → Australian client project (Jul 2025) → HAU internship (2024) → freelance graphic design (2024). First line of code written in <strong>2015</strong>.',
    ],
  },
  {
    id: 'skills',
    keywords: [
      'skill', 'stack', 'technologies', 'tech',
      'laravel', 'react', 'tailwind', 'mysql', 'supabase',
      'php', 'javascript', 'node',
    ],
    phrases: ['what can you do', 'tech stack', 'what technologies'],
    answers: [
      'Dale works full-stack: <strong>Laravel</strong>, <strong>PHP</strong>, <strong>JavaScript</strong>, <strong>React</strong>, <strong>Tailwind CSS</strong>, <strong>MySQL</strong>, <strong>Supabase</strong>, <strong>Node.js</strong>, and various hosting platforms (Vercel, Netlify, Hostinger). He also covers UX/UI design, database architecture, and API integration.',
      'On the frontend: React, Tailwind CSS, vanilla JS. On the backend: Laravel, PHP, Node.js. For data: MySQL, Supabase. He deploys on Vercel and Netlify, and handles UX/UI design as well. The full list is in the <strong>Technologies I Can Use</strong> section.',
      'Full-stack toolbox — <strong>React + Tailwind</strong> on the front, <strong>Laravel + PHP</strong> on the back, <strong>MySQL / Supabase</strong> for data, and API integration across the board. Plus UX/UI design when needed. Scroll to the tech section for the complete picture.',
    ],
  },
  {
    id: 'projects',
    keywords: [
      'project', 'portfolio', 'kayantabe', 'umbra', 'idmo',
      'pina', 'spur', 'zepatide', 'immfi', 'connect4', 'devfinder',
      'resumeforge', 'zonebridge', 'resume', 'timezone',
      'built', 'recent',
    ],
    phrases: ['show projects', 'what have you built'],
    answers: [
      'Recent highlights: <strong>HAU IDMO Employee Portal</strong>, <strong>Kayantabe</strong> (volunteerism platform), <strong>Umbra</strong> (tutoring marketplace), <strong>Pina Management CMS</strong> (real estate), <strong>SPUR</strong> (app + landing page), <strong>The Zepatide</strong>, and <strong>IMMFI</strong>. Newer builds include <strong>ResumeForge</strong> (Harvard-format resume PDF builder) and <strong>ZoneBridge</strong> (3D globe timezone gap calculator), plus Connect4 and GitHub DevFinder. Scroll to <strong>Recent Projects</strong> and tap a card for details.',
      'A few things Dale has shipped: a real estate CMS for Pina Realty, a volunteerism app called Kayantabe, a tutoring marketplace (Umbra), SPUR\'s app and landing page, and a university employee portal at HAU. Recent side projects include <strong>ResumeForge</strong> and <strong>ZoneBridge</strong>. Click any project card on this page for the full breakdown.',
      'He\'s built everything from a <strong>real estate CMS</strong> to a <strong>tutoring marketplace</strong> to a <strong>university employee portal</strong>. Notable names: Kayantabe, Umbra, Pina, SPUR, IMMFI, The Zepatide, <strong>ResumeForge</strong>, and <strong>ZoneBridge</strong>. Jump to the <strong>Recent Projects</strong> section — each card has live links and a description.',
    ],
  },
  {
    id: 'contact',
    keywords: [
      'contact', 'email', 'reach', 'linkedin', 'github',
      'message', 'hire', 'get in touch',
    ],
    phrases: ['how to contact', 'email address'],
    answers: [
      'Email: <a href="mailto:dale.bedania10@gmail.com" target="_blank" rel="noopener noreferrer">dale.bedania10@gmail.com</a><br>LinkedIn: <a href="https://www.linkedin.com/in/dale-bedania/" target="_blank" rel="noopener noreferrer">linkedin.com/in/dale-bedania</a><br>GitHub: <a href="https://github.com/bedaniadale" target="_blank" rel="noopener noreferrer">github.com/bedaniadale</a><br>Or use the <strong>View CV</strong> button in the hero to grab the PDF.',
      'Best way to reach Dale: <a href="mailto:dale.bedania10@gmail.com" target="_blank" rel="noopener noreferrer">dale.bedania10@gmail.com</a> or <a href="https://www.linkedin.com/in/dale-bedania/" target="_blank" rel="noopener noreferrer">LinkedIn</a>. His GitHub is <a href="https://github.com/bedaniadale" target="_blank" rel="noopener noreferrer">bedaniadale</a>.',
      'Drop him a line at <a href="mailto:dale.bedania10@gmail.com" target="_blank" rel="noopener noreferrer">dale.bedania10@gmail.com</a>. You can also connect on <a href="https://www.linkedin.com/in/dale-bedania/" target="_blank" rel="noopener noreferrer">LinkedIn</a> or browse his code on <a href="https://github.com/bedaniadale" target="_blank" rel="noopener noreferrer">GitHub</a>.',
    ],
  },
  {
    id: 'hiring',
    keywords: [
      'hiring', 'available', 'open', 'opportunity',
      'freelance', 'contract', 'full-time', 'fulltime', 'job', 'remote',
    ],
    phrases: ['are you available', 'looking for work', 'open to work'],
    answers: [
      'Yes — Dale is <strong>open to full-time roles</strong> and <strong>contract or project-based</strong> work. Send him an email or message on LinkedIn to discuss timeline and fit.',
      'He\'s actively open. <strong>Full-time or contract</strong> both work. If you have a role or project in mind, reach out via email or LinkedIn.',
      'Dale is available for <strong>full-time positions</strong> and <strong>freelance/contract</strong> projects. Best to connect directly to talk specifics — email is the fastest.',
    ],
  },
  {
    id: 'cv',
    keywords: ['cv', 'resume', 'curriculum', 'pdf', 'download'],
    phrases: ['view cv', 'download resume'],
    answers: [
      'Hit the <strong>View CV</strong> button in the hero section — it opens a modal where you can preview or download the PDF.',
      'The CV is in the hero section under <strong>View CV</strong>. Click it to preview the PDF and download from there.',
      'You can preview and download Dale\'s CV using the <strong>View CV</strong> button at the top of the page.',
    ],
  },
  {
    id: 'story',
    keywords: ['2015', 'started', 'coding', 'programming', 'journey', 'begin'],
    phrases: ['when did you start coding'],
    answers: [
      'Dale wrote his first line of code in <strong>2015</strong> at age 13 — pure curiosity, no class required. Ten years later he\'s a full-stack developer working on real products.',
      'He started coding in <strong>2015</strong>, age 13, mostly self-driven. That curiosity turned into a BSIT degree at HAU and now a full-time role as a full-stack developer.',
      'The origin story: <strong>2015</strong>, thirteen years old, tinkering with code just to see what it would do. That spark eventually led to a degree in Web Development and a career building production-grade apps.',
    ],
  },
];
