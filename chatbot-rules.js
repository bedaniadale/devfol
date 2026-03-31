/**
 * FAQ chatbot knowledge (rule-based, no API).
 *
 * Optional fields — set when you want them spoken by the bot (see CHATBOT_META below):
 * - timezone: e.g. "Philippines (PHT, UTC+8)"
 * - remotePreference: e.g. "Remote-first; open to hybrid in Central Luzon"
 * - portfolioUrl: public site URL if not the current page
 * - phone: include only if you want it in answers
 * - emailResponseTime: e.g. "Usually within 24–48 hours"
 */
var CHATBOT_META = {
  name: 'Dale Bedania',
  role: 'Full-stack Web Developer',
  location: 'Pampanga, Philippines',
  email: 'dale.bedania10@gmail.com',
  linkedin: 'https://www.linkedin.com/in/dale-bedania/',
  github: 'https://github.com/bedaniadale',
  availability:
    'Dale is open to full-time roles and contract or project-based work.',
  cvPath: 'works/Bedania_CVFormal.pdf',
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
 * @typedef {{ id: string, keywords: string[], phrases?: string[], answer: string }} ChatbotRule
 * @type {ChatbotRule[]}
 */
var CHATBOT_RULES = [
  {
    id: 'identity',
    keywords: [
      'who',
      'dale',
      'bedania',
      'introduce',
      'yourself',
      'about you',
      'developer',
      'person',
    ],
    phrases: ['who are you', 'tell me about yourself', 'who is dale'],
    answer:
      '<strong>Dale Bedania</strong> is a full-stack web developer based in <strong>Pampanga, Philippines</strong>. He started programming in <strong>2015</strong> and focuses on practical, clean, and scalable web solutions. Use the <strong>Recent Projects</strong> and <strong>Experience</strong> sections on this page for more detail, or ask about education, stack, or contact.',
  },
  {
    id: 'location',
    keywords: ['where', 'location', 'based', 'live', 'country', 'philippines', 'pampanga'],
    phrases: ['where are you', 'where do you live'],
    answer:
      'Dale is based in <strong>Pampanga, Philippines</strong>.',
  },
  {
    id: 'education',
    keywords: [
      'education',
      'school',
      'university',
      'degree',
      'graduate',
      'college',
      'hau',
      'holy angel',
      'bsit',
      'web development',
      'class of',
    ],
    phrases: ['where did you study', 'your education'],
    answer:
      '<strong>Holy Angel University</strong> — <strong>Bachelor of Science in Information Technology</strong>, specialization <strong>Web Development</strong>, Class of <strong>2025</strong>. Notable recognition includes Most Outstanding Graduating Student per Program, Most Outstanding On-the-Job Trainee per Program, Dean\'s Lister (2022–2024), President\'s Lister, HAFRD Academic Scholarship, and serving as Code Geeks\' President (2023–2024).',
  },
  {
    id: 'experience',
    keywords: [
      'experience',
      'work',
      'job',
      'career',
      'employment',
      'internship',
      'intern',
      'freelance',
      'pina',
      'realty',
      'australia',
      'history',
    ],
    phrases: ['work experience', 'where do you work', 'current job'],
    answer:
      'Highlights: <strong>Full Stack Web Developer</strong> at <strong>Pina Realty Management</strong> (Jul 2025 – present); project work for a <strong>direct client in Australia</strong> (Jul 2025); <strong>BSIT Web Development</strong> graduate at <strong>Holy Angel University</strong> (Apr 2025); <strong>Full Stack Web Developer internship</strong> at HAU (Jun–Nov 2024); <strong>Graphic Designer</strong> freelance for NILEliteGears &amp; CompleteVitalityLife (Apr–Jul 2024). He wrote his first line of code in <strong>2015</strong>.',
  },
  {
    id: 'skills',
    keywords: [
      'skill',
      'stack',
      'technologies',
      'tech',
      'laravel',
      'react',
      'tailwind',
      'mysql',
      'supabase',
      'php',
      'javascript',
      'node',
    ],
    phrases: ['what can you do', 'tech stack', 'what technologies'],
    answer:
      'Dale works across <strong>full-stack web development</strong>: common tools include <strong>Laravel</strong>, <strong>PHP</strong>, <strong>JavaScript</strong>, <strong>React</strong>, <strong>Tailwind CSS</strong>, <strong>MySQL</strong>, <strong>Supabase</strong>, <strong>Node.js</strong>, and deployment/hosting (e.g. Hostinger, Vercel, Netlify). The <strong>Technologies I Can Use</strong> section on this page lists more. He also covers <strong>UX/UI design</strong>, <strong>database</strong> work, and <strong>API</strong> integration.',
  },
  {
    id: 'projects',
    keywords: [
      'project',
      'portfolio',
      'kayantabe',
      'umbra',
      'idmo',
      'pina',
      'spur',
      'zepatide',
      'immfi',
      'connect4',
      'devfinder',
      'built',
      'recent',
    ],
    phrases: ['show projects', 'what have you built'],
    answer:
      'Recent work includes the <strong>Holy Angel University IDMO Employee Portal</strong>, <strong>Kayantabe</strong> (volunteerism), <strong>Umbra</strong> (tutoring marketplace), <strong>Pina Management CMS</strong> (real estate), <strong>SPUR</strong> (app + landing), <strong>The Zepatide</strong>, <strong>IMMFI</strong>, and smaller apps like <strong>Connect4 by Dale</strong> and <strong>GitHub DevFinder</strong>. Scroll to <strong>Recent Projects</strong> on this page and click a card for details.',
  },
  {
    id: 'contact',
    keywords: [
      'contact',
      'email',
      'reach',
      'linkedin',
      'github',
      'message',
      'hire',
      'get in touch',
    ],
    phrases: ['how to contact', 'email address'],
    answer:
      'Email: <a href="mailto:dale.bedania10@gmail.com" target="_blank" rel="noopener noreferrer">dale.bedania10@gmail.com</a><br>LinkedIn: <a href="https://www.linkedin.com/in/dale-bedania/" target="_blank" rel="noopener noreferrer">linkedin.com/in/dale-bedania</a><br>GitHub: <a href="https://github.com/bedaniadale" target="_blank" rel="noopener noreferrer">github.com/bedaniadale</a><br>Use the <strong>View CV</strong> button in the hero for a PDF.',
  },
  {
    id: 'hiring',
    keywords: [
      'hiring',
      'available',
      'open',
      'opportunity',
      'freelance',
      'contract',
      'full-time',
      'fulltime',
      'job',
      'remote',
    ],
    phrases: ['are you available', 'looking for work', 'open to work'],
    answer:
      'Dale is <strong>open to full-time roles</strong> and <strong>contract or project-based</strong> work. For specifics (timeline, stack fit, or engagement type), reach out by email or LinkedIn.',
  },
  {
    id: 'cv',
    keywords: ['cv', 'resume', 'curriculum', 'pdf', 'download'],
    phrases: ['view cv', 'download resume'],
    answer:
      'Click <strong>View CV</strong> in the hero section to preview Dale\'s CV in the modal, or download the PDF from there.',
  },
  {
    id: 'story',
    keywords: ['2015', 'started', 'coding', 'programming', 'journey', 'begin'],
    phrases: ['when did you start coding'],
    answer:
      'Dale started programming in <strong>2015</strong> at age 13, driven by curiosity and building things with code. He\'s since grown into a full-stack developer focused on real-world problems.',
  },
];
