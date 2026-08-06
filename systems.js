/* ============================================================================
   Dale Bedania — SYSTEMS
   The product side of the portfolio: five finished business systems, staged as
   their own landing page inside the one-page site.

   Deliberately a separate layer from app.js. Everything here is scoped to
   #systems and #systemModal, it renders itself at parse time (so app.js's
   boot — which runs on DOMContentLoaded, after this file — measures the page
   with this section already in it), and it runs its own reveal observer for
   the same reason: app.js's observer has already collected its .reveal set by
   the time anything below would exist.

   The only thing borrowed from app.js is the scroll lock (window.__pf), because
   two independent locks would fight over body position and Lenis.

   Copy source: crms/PORTFOLIO-DESCRIPTIONS.md — every number, feature line and
   stack entry below is lifted from it. Keep them in step.
   ============================================================================ */
(function () {
  'use strict';

  /* ─────────────────────────────── CATALOGUE ──────────────────────────────
       code       short product name — the "character" name in the modal
       name       the full system title
       sector     one word, sits above the name
       accent     the system's own colour; drives its folder and its modal
       tagline    one line, the promise
       pitch      the grid-card blurb, reused as the modal lede
       story      the long description, one string per paragraph (**bold** ok)
       stats      four scannable readouts
       features   what it does — the five key feature groups
       under      technical highlights, for the buyer who reads code
       fit        who it is for
       stack      what it is built with
       shots      the screens, in order. `f` is the file in crms/<slug>/
     ──────────────────────────────────────────────────────────────────────── */

  var SYSTEMS = [
    {
      slug: 'auto-repair-work-order-system',
      code: 'TorqueDesk',
      name: 'Auto Repair & Service Shop Management System',
      sector: 'Automotive',
      accent: '#f2612c',
      tagline: 'Kanban work orders, parts allocation that deducts real stock, and a public job-status portal for customers.',
      pitch: 'A shop-floor management system for auto repair and equipment service centres. Units are checked in with a photo-documented inspection, pushed across a six-stage Kanban board, allocated parts straight out of inventory, tracked for labor per technician, and closed with an itemized printable invoice.',
      story: [
        'TorqueDesk runs a vehicle **or** device repair shop end to end. Intake captures the unit, a 10-point condition checklist, and in-browser–compressed damage photos. The job then moves across a drag-and-drop Kanban board — Intake → Diagnosis → Waiting for Parts → In Progress → Quality Check → Ready for Pickup — and every stage change automatically fires a customer status message on their preferred channel.',
        'The interesting engineering is in the coupling: allocating a part to a job deducts stock **in the same atomic transaction** and writes a linked stock movement, so inventory and job state can never drift. Labor entries snapshot the technician’s hourly rate at time of logging, so a later raise never silently rewrites a historical invoice.',
        'Every job also publishes a public status link where the customer sees a progress rail, the diagnosis, the running estimate, and their full alert history — with stages the job never entered marked **Not needed** rather than falsely ticked.'
      ],
      stats: [
        { v: '9', k: 'screens' },
        { v: '7.2k', k: 'lines of code' },
        { v: '6', k: 'pipeline stages' },
        { v: 'Public', k: 'customer portal' }
      ],
      features: [
        { i: 'mdi:clipboard-check-outline', t: 'Vehicle & device intake', d: 'Dual-mode unit handling, a 10-point condition checklist, and damage photos downscaled in-browser before storage.' },
        { i: 'mdi:view-column-outline', t: 'Work order Kanban board', d: 'Six live stages with drag-and-drop and keyboard-accessible moves; each column header carries job count and the value sitting in it.' },
        { i: 'mdi:archive-arrow-down-outline', t: 'Parts allocation & inventory', d: 'Allocation deducts stock atomically, refuses on insufficient quantity, and returns everything a deleted job held.' },
        { i: 'mdi:account-hard-hat', t: 'Mechanic assignment & labor', d: 'Multiple techs per order at their own rate, actual-vs-estimated hours, and weekly capacity utilisation per person.' },
        { i: 'mdi:receipt-text-outline', t: 'Customer portal & invoicing', d: 'Milestone alerts on every stage change, a public status link, and itemized parts + labor invoices through issue → send → paid.' }
      ],
      under: [
        { t: 'Atomic cross-entity mutations', d: 'Every action touching two entities is a single store action — inventory and job state cannot desynchronise.' },
        { t: 'No cached totals', d: 'Totals recompute from current lines, so editing one part instantly updates the header, board, dashboard and public portal.' },
        { t: 'Rate snapshotting', d: 'A deliberate correctness decision: financial history stays immutable against future rate changes.' },
        { t: 'Strict TypeScript', d: 'The build runs a no-emit type check as a gate before bundling.' }
      ],
      fit: ['Auto repair shops', 'Motorcycle service centres', 'Device & appliance repair', 'Fleet maintenance'],
      stack: ['React 18', 'TypeScript (strict)', 'Vite 6', 'Tailwind CSS 4', 'Zustand 5', 'React Router 6'],
      shots: [
        { f: '01-dashboard.png',         t: 'Shop dashboard',     d: 'Jobs on the floor, parts pressure, work-in-progress value and money still owed.' },
        { f: '02-work-order-board.png',  t: 'Work order board',   d: 'The whole shop in one view — every open job sitting in the stage it is actually in.' },
        { f: '03-work-order-detail.png', t: 'Work order detail',  d: 'One job: complaint, diagnosis, labor lines, parts drawn, and the promised date.' },
        { f: '04-parts-inventory.png',   t: 'Parts inventory',    d: 'Stock value at cost and retail, low-stock filter, receiving, and a full movement ledger.' },
        { f: '05-invoices-billing.png',  t: 'Invoices & billing', d: 'Collected, awaiting payment, ready to invoice, and gross profit — rolled up.' }
      ]
    },

    {
      slug: 'biometric-payroll-hrms',
      code: 'Northwind HRMS',
      name: 'Biometric Payroll & HR Management System',
      sector: 'Human Resources',
      accent: '#6d5cf6',
      tagline: 'Ingests raw biometric device logs, evaluates every workday against schedule, and computes statutory-compliant payroll with PDF payslips.',
      pitch: 'An HRMS that replaces spreadsheet payroll. It parses raw ZKTeco/Anviz/RFID terminal exports, evaluates each workday against the employee’s schedule, routes leave and overtime through two-level approvals, then computes payroll including overtime multipliers, night differential, SSS/PhilHealth/Pag-IBIG contributions and BIR withholding tax — releasing PDF payslips to each account.',
      story: [
        'A complete HR and payroll platform built around the messiest real-world input there is: **raw biometric device exports.** The parser handles ZKTeco/Anviz format, RFID gate-controller dumps, generic CSV/TSV with any header naming, and headerless files where column positions are inferred from the first data row. Credentials resolve against biometric ID, RFID number **or** employee number, with zero-padding tolerated. Re-uploading the same export is safe — existing punches are skipped, not duplicated.',
        'Each affected day is evaluated against that employee’s schedule and flagged across ten states — late, undertime, absent, no-time-out, overtime rendered, night differential, rest-day work, holiday work, duplicate punch, manual edit. **Shifts crossing midnight are attributed to the shift, not the calendar day**, so a 21:00–06:00 night shift lands both punches on one record.',
        'Payroll then computes per cut-off with full statutory schedules, and every payslip renders to a single-page A4 PDF carrying a verification code derived from the run and employee IDs.'
      ],
      stats: [
        { v: '15', k: 'screens' },
        { v: '11.7k', k: 'lines of code' },
        { v: '3', k: 'permission tiers' },
        { v: 'BIR + SSS', k: 'statutory tables' }
      ],
      features: [
        { i: 'mdi:fingerprint', t: 'Biometric import & evaluation', d: 'Multi-format parser with auto-detected delimiters; unresolved rows are reported, never silently dropped, and re-imports are idempotent.' },
        { i: 'mdi:account-check-outline', t: 'Leave & overtime workflow', d: 'Eight leave types through a two-level approval chain — nobody approves their own filing, and approvers see the real decision context.' },
        { i: 'mdi:calculator-variant-outline', t: 'Automated payroll engine', d: 'Day-type OT multipliers, night differential, SSS / PhilHealth / Pag-IBIG and the TRAIN Law withholding table, semi-monthly aware.' },
        { i: 'mdi:file-document-outline', t: 'Digital payslip generation', d: 'A4 PDF per payslip with computation detail and a verification code; payslips release only once HR marks the run paid.' },
        { i: 'mdi:folder-account-outline', t: 'Employee 201 file', d: 'Personal details, government IDs, compensation, credentials, balances, loans, documents and a dated employment timeline.' }
      ],
      under: [
        { t: 'Domain layer independent of React', d: 'Attendance, payroll, statutory and workflow rules are pure functions — testable, reusable, and shared with the seed generator.' },
        { t: 'One file owns every rate', d: 'Statutory rates, multipliers and thresholds live in a single module, so a rules change is a single-file edit.' },
        { t: 'Overtime paid at the lesser of rendered and approved', d: 'Unapproved OT stays logged but uncompensated, with both figures stated on the payslip.' },
        { t: 'Deterministic seeding', d: 'The demo dataset is identical on every rebuild, so a walkthrough always shows the same numbers.' }
      ],
      fit: ['SMEs with 20–500 staff', 'BPO & shift operations', 'Manufacturing & logistics', 'Any company on a biometric device'],
      stack: ['React 18', 'TypeScript', 'Vite 5', 'React Router 6', 'Recharts', 'jsPDF'],
      shots: [
        { f: '01-role-based-sign-in.png',        t: 'Role-based sign-in',         d: 'One door, three views — permissions and visible data follow the account’s role.' },
        { f: '02-hr-dashboard.png',              t: 'HR dashboard',               d: 'Attendance trend, overtime and night differential, payroll cost by department.' },
        { f: '03-payroll-run-register.png',      t: 'Payroll run register',       d: 'Gross, deductions, statutory and net pay for the cut-off — computed, then approved, then locked.' },
        { f: '04-biometric-attendance-logs.png', t: 'Biometric attendance logs',  d: 'Raw device punches, evaluated against each employee’s schedule and grace period.' },
        { f: '05-leave-overtime-approvals.png',  t: 'Leave & overtime approvals', d: 'What is pending on the manager, and what is pending on HR — with the full decision trail.' }
      ]
    },

    {
      slug: 'multi-branch-retail-pos',
      code: 'NexusPOS',
      name: 'Multi-Branch Retail POS & Inventory Management System',
      sector: 'Retail',
      accent: '#3b6ef6',
      tagline: 'Keyboard-wedge barcode scanning, split-tender checkout, and genuine real-time stock sync across branches.',
      pitch: 'A retail point-of-sale with real-time inventory synchronisation across multiple stores and warehouses. Barcode scanning without a driver, split-tender payments, transfers that conserve network stock, velocity-driven reorder suggestions, and X/Z shift reconciliation with denomination-level drawer counts.',
      story: [
        'NexusPOS is a fast retail checkout terminal that behaves like real hardware. The scanner integration listens for raw key events globally and reconstructs codes from the burst-typing signature a keyboard-wedge scanner produces — so there is no driver, no focused field, and manual typing is never misread as a scan.',
        '**The multi-branch sync is real, not simulated.** Every browser tab is an independent terminal: the signed-in operator and active branch live in session storage, so two branches can run side by side in two tabs. State broadcasts across tabs — make a stock movement in one and it appears in the other without a reload.',
        'Underneath, one reducer owns all state. A sale, a transfer, an adjustment and a goods receipt all express stock movement through a single path, so inventory cannot drift. Money math lives in one module used by the register, by refunds, and by the data generator — every receipt in the system is arithmetically consistent.'
      ],
      stats: [
        { v: '11', k: 'screens' },
        { v: '8.7k', k: 'lines of code' },
        { v: '6', k: 'operator roles' },
        { v: 'Live', k: 'cross-branch sync' }
      ],
      features: [
        { i: 'mdi:barcode-scan', t: 'High-speed point of sale', d: 'Driverless barcode capture, multi-tender payments across one sale, park/resume carts, and hotkeys built for a counter.' },
        { i: 'mdi:store-outline', t: 'Multi-location inventory sync', d: 'Transfers sit in transit until received and a short receipt returns the shortfall — total network stock is always conserved.' },
        { i: 'mdi:alert-decagram-outline', t: 'Low-stock & reorder triggering', d: 'Suggested order quantity derived from real 30-day sales velocity plus lead time — not a fixed number.' },
        { i: 'mdi:cash-register', t: 'Cashier shift reconciliation', d: 'X-Reading snapshots, Z-Reading closes the shift, and variance is graded against a configurable tolerance.' },
        { i: 'mdi:chart-areaspline', t: 'Sales analytics', d: 'Revenue, margin and basket size against the preceding period, peak trading hours, and a lowest-margin table for repricing.' }
      ],
      under: [
        { t: 'Single-reducer stock integrity', d: 'All four mutation types funnel through one path — there is no second way to move stock.' },
        { t: 'Refunds stored as negative sales', d: 'Summing any filtered set of sales nets refunds out automatically, with no special-case reporting logic.' },
        { t: 'One money module', d: 'The same totals function serves the register, refunds and the seed generator, rounding at every step.' },
        { t: '80mm thermal print stylesheet', d: 'Receipts and X/Z readings print correctly to a roll, isolated from the rest of the page.' }
      ],
      fit: ['Retail chains', 'Convenience & grocery', 'Pharmacies', 'Franchise operations'],
      stack: ['React 18', 'JavaScript (ESM)', 'Vite 5', 'React Router 6', 'Recharts', 'BroadcastChannel API'],
      shots: [
        { f: '01-terminal-sign-in.png',        t: 'Terminal sign-in',          d: 'Cashiers sign into a terminal bound to a branch — the register knows where it is.' },
        { f: '02-multi-branch-dashboard.png',  t: 'Multi-branch dashboard',    d: 'Revenue, transactions, margin and drawer status for the store and for the whole network.' },
        { f: '03-point-of-sale-register.png',  t: 'Point of sale register',    d: 'The counter screen. Scan, adjust, split the tender, print — built to be used fast.' },
        { f: '04-inventory-stock-control.png', t: 'Inventory & stock control', d: 'Every SKU across every location at once, with an auditable movement ledger behind it.' },
        { f: '05-sales-analytics.png',         t: 'Sales analytics',           d: 'Where the money came from — by hour, by product, by category, by branch.' }
      ]
    },

    {
      slug: 'multi-doctor-ehr-clinic',
      code: 'ClinicCare',
      name: 'Multi-Doctor Outpatient EHR & Clinic Appointment System',
      sector: 'Healthcare',
      accent: '#12a37c',
      tagline: 'Live-availability online booking, SOAP-structured records, allergy-checked prescriptions, and an idempotent reminder engine.',
      pitch: 'A multi-doctor, multi-location outpatient clinic platform: patients book against real doctor availability, doctors write SOAP-structured notes and generate allergy-cross-checked prescription PDFs, reception runs a live patient flow board with waiting-room display mode, and a background dispatcher sends deduplicated appointment reminders.',
      story: [
        'ClinicCare covers the full outpatient loop — booking, consultation, prescription, queue and follow-up. Patients pick a specialty and location, then a doctor; a date strip shows **real-time free-slot counts per day** with days off greyed out. Slots are generated from the doctor’s weekly roster, minus booked appointments, minus time already passed, so past and taken slots render struck-through and unselectable.',
        'Clinical records are structured as Subjective / Objective / Assessment / Plan with a vitals block that computes BMI automatically. The consultation workspace keeps the patient’s allergies, chronic conditions, prior notes and previous prescriptions in a side rail while the doctor types — and a **red allergy banner fires when a prescribed generic matches a recorded allergy**, before the script is ever issued.',
        'The reminder engine is the quiet win: every message carries a dedupe key, so a scan that runs twice — or a tab reopened hours later — never double-sends, but still catches up on everything missed while the tab was closed.'
      ],
      stats: [
        { v: '13', k: 'screens' },
        { v: '10.7k', k: 'lines of code' },
        { v: '34', k: 'medicine formulary' },
        { v: 'Multi', k: 'doctor & location' }
      ],
      features: [
        { i: 'mdi:calendar-clock', t: 'Patient portal & online booking', d: 'Specialty → location → doctor, with live per-day slot counts and cancellation that releases the slot and notifies.' },
        { i: 'mdi:notebook-edit-outline', t: 'Electronic health records', d: 'SOAP-structured notes with automatic BMI, a contextual history rail, and draft-versus-signed states.' },
        { i: 'mdi:pill', t: 'Digital prescription generator', d: 'Searchable formulary, per-line dosage notation, allergy cross-check, and a formal A4 PDF script.' },
        { i: 'mdi:monitor-dashboard', t: 'Queuing & patient flow board', d: 'Four lanes with live-ticking wait timers, per-clinic queue tokens, and a waiting-room display mode.' },
        { i: 'mdi:bell-ring-outline', t: 'Automated reminders', d: 'Six trigger types dispatched in the background, with failed sends landing in a retryable outbox.' }
      ],
      under: [
        { t: 'Time-relative seed data', d: 'The dataset builds relative to the moment the app opens, so the schedule grid, queue board and slot maths agree on any weekday, at any hour.' },
        { t: 'Idempotent delivery', d: 'Per-message dedupe keys mean repeated scans never double-send, while a reopened tab still catches up.' },
        { t: 'Lazy-loaded PDF vendor bundle', d: 'The PDF library is code-split and loaded on first use, so it costs nothing on initial page load.' },
        { t: 'One documented integration seam', d: 'The messaging layer is a single swap point for a real SMS/email gateway — clearly marked, not buried.' }
      ],
      fit: ['Multi-doctor clinics', 'Diagnostic centres', 'Dental & specialty practices', 'Small hospital OPDs'],
      stack: ['React 18', 'TypeScript', 'Vite 5', 'Tailwind CSS 3', 'React Router 6', 'date-fns', 'jsPDF'],
      shots: [
        { f: '01-clinic-dashboard.png',       t: 'Clinic dashboard',      d: 'Today at a glance — booked, waiting, average wait and expected billing across every location.' },
        { f: '02-appointment-scheduling.png', t: 'Appointment scheduling', d: 'Book against a doctor’s real availability; taken and elapsed slots are struck through and unselectable.' },
        { f: '03-live-queue-board.png',       t: 'Live queue board',      d: 'Expected → Waiting → In consultation → Completed, with wait timers that change colour as they run.' },
        { f: '04-consultation-notes.png',     t: 'Consultation notes',    d: 'The doctor’s screen — history in the rail, SOAP note and prescription in the workspace.' },
        { f: '05-patient-health-record.png',  t: 'Patient health record', d: 'One continuous chart per patient: every visit, every prescription, every attachment.' }
      ]
    },

    {
      slug: 'university-enrollment-portal',
      code: 'Northfield',
      name: 'University Student Information & Online Enrollment Portal',
      sector: 'Education',
      accent: '#c9a227',
      tagline: 'A prerequisite graph engine, a backtracking timetable solver, and grade publication that unlocks the curriculum — verified by 5,016 assertions.',
      pitch: 'A student information system with self-service enrollment and automated rule-checking. A prerequisite engine validates every basket against published grades, a backtracking solver auto-resolves schedule conflicts greedy picking can’t, faculty encode and publish grades through a three-state handoff, and transcripts, GWA and degree progress recompute automatically.',
      story: [
        'Northfield is the rules-heaviest of the five. Every course carries prerequisites, co-requisites and a minimum year standing, and eligibility is recomputed against the student’s published record every time the basket changes — with every refusal naming the specific unmet requirement. A prerequisite can never be satisfied by a subject taken **alongside** it, and lecture/lab pairs are judged as a unit.',
        'The schedule builder does something greedy schedulers can’t. Picking sections one at a time dead-ends even when a valid timetable exists, so section assignment is a **backtracking search** that places the most constrained courses first and rewinds on failure. When genuinely no conflict-free combination exists, it says so rather than silently dropping subjects.',
        'Grade publication is the system’s hinge. Instructors draft privately, lock the sheet to the registrar, and only on **publication** are transcript records written, GWAs recomputed and dependent courses unlocked — a grade sitting in a draft sheet never unlocks anything.'
      ],
      stats: [
        { v: '16', k: 'screens' },
        { v: '6.6k', k: 'lines of code' },
        { v: '5,016', k: 'verification assertions' },
        { v: '3', k: 'portals in one' }
      ],
      features: [
        { i: 'mdi:lock-check-outline', t: 'Curriculum & prerequisite engine', d: 'Recomputed on every basket change, with only published grades counting and every refusal naming its unmet requirement.' },
        { i: 'mdi:calendar-check-outline', t: 'Section & schedule builder', d: 'Clashes flagged before selection, capacity counting approved plus pending, and a constraint solver behind auto-resolve.' },
        { i: 'mdi:cash-check', t: 'Enrollment & load assessment', d: 'One gate runs eligibility, conflicts, capacity, duplicates and unit ceilings — and the registrar re-runs the identical function at review.' },
        { i: 'mdi:account-tie-outline', t: 'Faculty grading portal', d: 'Class lists derived live from approved enrollments, transmutation to the 1.00–5.00 scale, and an Open → Locked → Published handoff.' },
        { i: 'mdi:school-outline', t: 'Transcript & degree audit', d: 'Unit-weighted GWA with GPA equivalent, per-term and cumulative, plus what is cleared to take now and what is blocked and by what.' }
      ],
      under: [
        { t: 'Verified with a 5,016-assertion harness', d: 'Prerequisite integrity, conflict detection, GWA arithmetic against hand-computed values, transcript ordering and room allocation — all passing.' },
        { t: 'End-to-end lifecycle validation', d: 'Build a load → force and auto-resolve a conflict → approve → appear on the class list → publish grades → watch the transcript update.' },
        { t: 'Two real defects found and fixed', d: 'Greedy section-picking dead-ending on solvable timetables, and lecture/lab pairs judged in isolation.' },
        { t: 'The rules module is pure', d: 'The same functions serve the student portal, the registrar’s re-validation and the seed generator — the demo data cannot contradict the live rules.' }
      ],
      fit: ['Universities & colleges', 'Senior high schools', 'Technical & vocational institutes', 'Review centres'],
      stack: ['React 18', 'JavaScript (ESM)', 'Vite 5', 'React Router 6', 'Hand-rolled design system'],
      shots: [
        { f: '01-portal-sign-in.png',              t: 'Portal sign-in',          d: 'One portal, three roles — student, faculty and registrar each land in their own system.' },
        { f: '02-student-dashboard.png',           t: 'Student dashboard',       d: 'Standing, load, balance, and what the student has to do next.' },
        { f: '03-online-enrollment.png',           t: 'Online enrollment',       d: 'Build the load; the rules engine blocks what the student is not allowed to take, and says why.' },
        { f: '04-academic-evaluation.png',         t: 'Academic evaluation',     d: 'Course-by-course progress toward the degree, with computed GWA and projected honors.' },
        { f: '05-registrar-sections-capacity.png', t: 'Registrar — sections',    d: 'Section ceilings, live counts, and the levers the registrar actually pulls.' }
      ]
    }
  ];

  /* The collection headline numbers — the sum of the five, from the .md. */
  var TOTALS = [
    { v: '5', k: 'systems' },
    { v: '64', k: 'screens' },
    { v: '147', k: 'source files' },
    { v: '~45k', k: 'lines of code' }
  ];

  /* The three value marks under the hero headline. */
  var MARKS = [
    { i: 'mdi:scale-balance', t: 'The rules are already right', d: 'Tax brackets, prerequisite chains, stock conservation, midnight-crossing shifts, approval chains that can’t be gamed. That is the part that takes months.' },
    { i: 'mdi:rocket-launch-outline', t: 'Live in days, not quarters', d: 'The system exists and runs today. Your branding, your workflow, your data and deployment — that is the whole timeline.' },
    { i: 'mdi:code-tags-check', t: 'Yours, source and all', d: 'Full source, the domain layer, the seed generators and the documentation. No per-seat rent, no vendor lock.' }
  ];

  /* How buying one actually goes. */
  var FLOW = [
    { t: 'Open a folder', d: 'Walk the real screens right here. Every screenshot is the running build, not a mockup.' },
    { t: 'Live demo & fit check', d: 'I drive the system on a call and we list exactly what has to change for your operation.' },
    { t: 'Configure & integrate', d: 'Your branding, your rules, your data migrated in — and the integration seams wired to your real providers.' },
    { t: 'Deploy & hand over', d: 'Hosted and turned on, your team trained, source and documentation handed to you.' }
  ];

  /* What every purchase comes with. */
  var INCLUDED = [
    'Full source code',
    'The pure domain / rules layer',
    'Deterministic demo dataset',
    'Deployment to your hosting',
    'Your branding applied',
    'Admin & staff training',
    'Technical documentation',
    'Post-launch support window'
  ];

  /* Said plainly on the page rather than discovered after the sale. Each build
     ships as a reference implementation with its integration points marked —
     authentication, SMS/email dispatch and payment rails are swap points wired
     during delivery, not pretended away. */
  var HONEST = 'Every build ships with its integration seams documented — authentication, SMS/email dispatch and payment rails are marked swap points, wired to your real providers during delivery.';

  /* ─────────────────────────────── HELPERS ────────────────────────────────── */

  var CONTACT = 'https://facebook.com/bedaniadale';
  var EMAIL = 'mailto:dale.bedania10@gmail.com';

  function el(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  /* Escape first, then promote **runs** to <strong>. The order is the point:
     the copy is data, so nothing in it can ever reach the DOM as markup. */
  function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function shotSrc(sys, i) { return 'crms/' + sys.slug + '/' + sys.shots[i].f; }
  function icon(name) { return '<i class="iconify" data-icon="' + esc(name) + '"></i>'; }
  function scanIcons(node) { if (window.Iconify) window.Iconify.scan(node); }

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* app.js owns the page's scroll lock. Borrow it rather than shipping a second
     one that would fight it over body position and Lenis. */
  function lock(on) {
    if (window.__pf && window.__pf.lockScroll) { window.__pf.lockScroll(on); return; }
    document.body.classList.toggle('modal-open', on);
  }

  /* This section's own reveal pass — see the file header for why it cannot use
     app.js's. `scopeRoot` is passed for modal content, whose scroll container is
     not the viewport. */
  function revealIn(root, scopeRoot) {
    var els = root.querySelectorAll('.reveal:not(.in)');
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
      });
    }, { root: scopeRoot || null, rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    els.forEach(function (e) { obs.observe(e); });
  }

  /* ───────────────────────────── SECTION RENDER ───────────────────────────── */

  function renderTotals() {
    var host = el('sysTotals'); if (!host) return;
    host.innerHTML = TOTALS.map(function (t, i) {
      return '<li style="--d:' + (i * 70) + 'ms"><b>' + esc(t.v) + '</b><span>' + esc(t.k) + '</span></li>';
    }).join('');
  }

  function renderMarks() {
    var host = el('sysMarks'); if (!host) return;
    host.innerHTML = MARKS.map(function (m, i) {
      return '<li class="sys-mark-item reveal" style="--d:' + (i * 90) + 'ms">' +
        '<span class="sys-mark-ic">' + icon(m.i) + '</span>' +
        '<h4>' + esc(m.t) + '</h4><p>' + esc(m.d) + '</p></li>';
    }).join('');
  }

  /* The folder. Three layers so it reads as an object rather than a card: the
     back of the folder, the sheets standing in it (real screenshots), and the
     front flap drawn over the sheets' bottom edge. Hover lifts the sheets out
     of the flap and fans them — the gesture of pulling a folder off a shelf,
     which is the whole metaphor. */
  function folderHtml(s, i) {
    var sheets = s.shots.slice(0, 3).map(function (sh, k) {
      return '<img class="sysf-sheet" data-k="' + k + '" src="' + esc(shotSrc(s, k)) +
        '" alt="" loading="lazy" decoding="async" width="1920" height="1080">';
    }).join('');

    return '<li class="sysf reveal" style="--ac:' + esc(s.accent) + ';--d:' + (i * 70) + 'ms">' +
      '<button type="button" class="sysf-btn js-open-system" data-sys="' + i + '" ' +
        'aria-label="Open ' + esc(s.code) + ' — ' + esc(s.name) + '">' +
        '<span class="sysf-plate">' +
          '<span class="sysf-back"></span>' +
          '<span class="sysf-sheets">' + sheets + '</span>' +
          '<span class="sysf-front">' +
            '<span class="sysf-tab"><em>' + pad(i + 1) + '</em>' + icon('mdi:folder-outline') + '</span>' +
            '<span class="sysf-front-face"><span class="sysf-front-label">' + esc(s.code) + '</span></span>' +
          '</span>' +
        '</span>' +
        // outside .sysf-plate on purpose: the plate clips its sheets, and a
        // glow living inside it would be clipped square along with them
        '<span class="sysf-glow"></span>' +
        '<span class="sysf-info">' +
          '<span class="sysf-sector">' + esc(s.sector) + '</span>' +
          '<span class="sysf-name">' + esc(s.name) + '</span>' +
          '<span class="sysf-tag">' + esc(s.tagline) + '</span>' +
          '<span class="sysf-foot">' +
            '<span class="sysf-count">' + s.shots.length + ' screens · ' + esc(s.stats[1].v) + ' lines</span>' +
            '<span class="sysf-open">Open ' + icon('mdi:arrow-top-right') + '</span>' +
          '</span>' +
        '</span>' +
      '</button></li>';
  }

  function renderShelf() {
    var host = el('sysShelf'); if (!host) return;
    host.innerHTML = SYSTEMS.map(folderHtml).join('');
  }

  function renderFlow() {
    var host = el('sysFlow'); if (!host) return;
    host.innerHTML = FLOW.map(function (f, i) {
      return '<li class="sys-step reveal" style="--d:' + (i * 80) + 'ms">' +
        '<span class="sys-step-n">' + pad(i + 1) + '</span>' +
        '<h4>' + esc(f.t) + '</h4><p>' + esc(f.d) + '</p></li>';
    }).join('');
  }

  function renderNote() {
    var host = el('sysNote'); if (!host) return;
    host.innerHTML = icon('mdi:shield-check-outline') + '<span>' + esc(HONEST) + '</span>';
  }

  /* ─────────────────────────── THE MODAL (character select) ────────────────
     Opening is a sequence, not a fade:
       1. three slanted panels wipe across the viewport (.sysx-wipe)
       2. behind them the frame is already assembled, so the wipe reveals a
          finished screen rather than one that then has to build itself
       3. the identity block, the plate and the roster each run their own
          entrance under .is-enter, staggered by a --k index in the markup
     Every entrance is a transform / opacity / clip-path animation, so the whole
     thing composites. Replaying it is a class removal, a forced reflow and a
     class add — the standard restart, done in one place: play().
     ─────────────────────────────────────────────────────────────────────── */

  var modal = null, scroller = null;
  var cur = -1;      // index of the open system
  var shot = 0;      // index of the shown screenshot
  var lastFocus = null;

  function heroHtml(s, i) {
    var stats = s.stats.map(function (st) {
      return '<li><b>' + esc(st.v) + '</b><span>' + esc(st.k) + '</span></li>';
    }).join('');

    var roster = s.shots.map(function (sh, k) {
      return '<button type="button" class="sysx-thumb' + (k === 0 ? ' is-on' : '') + '" data-shot="' + k + '" style="--k:' + k + '" ' +
        'aria-label="Screen ' + (k + 1) + ' — ' + esc(sh.t) + '">' +
        '<img src="' + esc(shotSrc(s, k)) + '" alt="" decoding="async" width="1920" height="1080">' +
        '<span class="sysx-thumb-n">' + pad(k + 1) + '</span></button>';
    }).join('');

    return '<section class="sysx-hero">' +
      '<span class="sysx-ghost" aria-hidden="true">' + esc(s.code) + '</span>' +

      '<div class="sysx-id">' +
        '<span class="sysx-sector" style="--k:0">' + esc(s.sector) + '</span>' +
        '<h2 class="sysx-code" id="sysxName" style="--k:1">' + esc(s.code) + '</h2>' +
        '<p class="sysx-name" style="--k:2">' + esc(s.name) + '</p>' +
        '<p class="sysx-tag" style="--k:3">' + esc(s.tagline) + '</p>' +
        '<ul class="sysx-stats" style="--k:4">' + stats + '</ul>' +
        '<div class="sysx-acts" style="--k:5">' +
          '<a class="sysx-btn sysx-btn--go" href="' + CONTACT + '" target="_blank" rel="noopener noreferrer">' +
            'Request a live demo ' + icon('mdi:arrow-right') + '</a>' +
          '<button type="button" class="sysx-btn sysx-btn--ghost" data-sys-scroll>' +
            'What it does ' + icon('mdi:chevron-down') + '</button>' +
        '</div>' +
      '</div>' +

      '<div class="sysx-view">' +
        '<div class="sysx-plate" id="sysxPlate">' +
          '<span class="sysx-chrome" aria-hidden="true"><i></i><i></i><i></i>' +
            '<em>' + esc(s.code.toLowerCase().replace(/\s+/g, '')) + '.app</em></span>' +
          '<div class="sysx-shot">' +
            '<img class="sysx-img is-front" id="sysxImgA" src="' + esc(shotSrc(s, 0)) + '" alt="' + esc(s.shots[0].t) + '" width="1920" height="1080">' +
            '<img class="sysx-img" id="sysxImgB" src="" alt="" width="1920" height="1080">' +
            '<span class="sysx-flash" aria-hidden="true"></span>' +
            '<span class="sysx-slash" aria-hidden="true"></span>' +
          '</div>' +
        '</div>' +
        '<div class="sysx-cap" id="sysxCap">' +
          '<span class="sysx-cap-n" id="sysxShotN">01</span>' +
          '<div><h3 id="sysxShotT">' + esc(s.shots[0].t) + '</h3>' +
          '<p id="sysxShotD">' + esc(s.shots[0].d) + '</p></div>' +
        '</div>' +
        '<div class="sysx-roster" id="sysxRoster">' + roster + '</div>' +
        '<span class="sysx-roster-hint">' + icon('mdi:keyboard-outline') +
          ' <b>←</b> <b>→</b> or <b>1</b>–<b>' + s.shots.length + '</b> to switch screens</span>' +
      '</div>' +
    '</section>';
  }

  function detailHtml(s, i) {
    var story = s.story.map(function (p) { return '<p>' + rich(p) + '</p>'; }).join('');

    var feats = s.features.map(function (f, k) {
      return '<li class="sysx-feat reveal" style="--d:' + ((k % 3) * 70) + 'ms">' +
        '<span class="sysx-feat-ic">' + icon(f.i) + '</span>' +
        '<h4>' + esc(f.t) + '</h4><p>' + esc(f.d) + '</p></li>';
    }).join('');

    var under = s.under.map(function (u, k) {
      return '<li class="sysx-under-item reveal" style="--d:' + ((k % 2) * 80) + 'ms">' +
        '<h4>' + esc(u.t) + '</h4><p>' + esc(u.d) + '</p></li>';
    }).join('');

    var included = INCLUDED.map(function (x) {
      return '<li>' + icon('mdi:check-circle') + esc(x) + '</li>';
    }).join('');

    var fit = s.fit.map(function (x) { return '<span class="sysx-chip">' + esc(x) + '</span>'; }).join('');
    var stack = s.stack.map(function (x) { return '<span class="sysx-chip sysx-chip--tech">' + esc(x) + '</span>'; }).join('');
    var next = SYSTEMS[(i + 1) % SYSTEMS.length];

    return '<section class="sysx-detail" id="sysxDetail">' +

      '<div class="sysx-story reveal">' +
        '<span class="sysx-h">The build</span>' +
        story +
      '</div>' +

      '<div class="sysx-block">' +
        '<h3 class="sysx-h reveal">What it does</h3>' +
        '<ol class="sysx-feats">' + feats + '</ol>' +
      '</div>' +

      '<div class="sysx-block">' +
        '<h3 class="sysx-h reveal">Under the hood</h3>' +
        '<ol class="sysx-under">' + under + '</ol>' +
      '</div>' +

      '<div class="sysx-split">' +
        '<div class="sysx-block reveal">' +
          '<h3 class="sysx-h">Built for</h3>' +
          '<div class="sysx-chips">' + fit + '</div>' +
          '<h3 class="sysx-h sysx-h--gap">Built with</h3>' +
          '<div class="sysx-chips">' + stack + '</div>' +
        '</div>' +
        '<div class="sysx-block reveal">' +
          '<h3 class="sysx-h">What you get</h3>' +
          '<ul class="sysx-incl">' + included + '</ul>' +
          '<p class="sysx-fine">' + icon('mdi:shield-check-outline') + esc(HONEST) + '</p>' +
        '</div>' +
      '</div>' +

      '<div class="sysx-cta reveal">' +
        '<h3>Want <em>' + esc(s.code) + '</em> running your operation?</h3>' +
        '<p>Tell me how you work today. I will drive the live build on a call, list exactly what has to change for you, and quote it. No obligation.</p>' +
        '<div class="sysx-cta-acts">' +
          '<a class="sysx-btn sysx-btn--go" href="' + CONTACT + '" target="_blank" rel="noopener noreferrer">' + icon('mdi:facebook-messenger') + ' Message me</a>' +
          '<a class="sysx-btn sysx-btn--ghost" href="' + EMAIL + '">' + icon('mdi:email-outline') + ' dale.bedania10@gmail.com</a>' +
        '</div>' +
      '</div>' +

      '<nav class="sysx-next reveal" aria-label="Other systems">' +
        '<span class="sysx-next-k">Next in the catalogue</span>' +
        '<button type="button" class="sysx-next-btn" data-sys-step="1">' +
          '<span>' + esc(next.code) + '</span>' + icon('mdi:arrow-right') +
        '</button>' +
      '</nav>' +
    '</section>';
  }

  /* Restart the entrance. The reflow read is load-bearing: without it the class
     removal and the re-add coalesce into no change and nothing replays. */
  function play() {
    if (!modal || reduced) return;
    modal.classList.remove('is-enter');
    void modal.offsetWidth;
    modal.classList.add('is-enter');
  }

  function preload(s) {
    s.shots.forEach(function (sh, k) { var im = new Image(); im.src = shotSrc(s, k); });
  }

  function paint(i, replayWipe) {
    var s = SYSTEMS[i]; if (!s) return;
    cur = i; shot = 0;

    modal.style.setProperty('--ac', s.accent);
    el('sysxIdx').textContent = pad(i + 1);
    el('sysxTot').textContent = pad(SYSTEMS.length);

    scroller.innerHTML = heroHtml(s, i) + detailHtml(s, i);
    scroller.scrollTop = 0;
    scanIcons(scroller);
    revealIn(scroller, scroller);
    preload(s);

    if (replayWipe) {
      modal.classList.remove('is-wipe');
      void modal.offsetWidth;
      modal.classList.add('is-wipe');
    }
    play();
  }

  /* Screen swap. Two stacked <img> so the change is a real crossfade rather
     than a blank frame while the next file decodes — the same trick the work
     index's peek card uses. The flash and the scale are what make it land like
     a select rather than a gallery next-button. */
  function setShot(k, dir) {
    var s = SYSTEMS[cur]; if (!s || k === shot || !s.shots[k]) return;
    var a = el('sysxImgA'), b = el('sysxImgB'), plate = el('sysxPlate');
    if (!a || !b || !plate) return;

    var front = a.classList.contains('is-front') ? a : b;
    var back = front === a ? b : a;

    back.src = shotSrc(s, k);
    back.alt = s.shots[k].t;

    plate.classList.remove('is-swap', 'from-left', 'from-right');
    void plate.offsetWidth;
    if (!reduced) plate.classList.add('is-swap', dir < 0 ? 'from-left' : 'from-right');

    back.classList.add('is-front');
    front.classList.remove('is-front');

    shot = k;
    el('sysxShotN').textContent = pad(k + 1);
    el('sysxShotT').textContent = s.shots[k].t;
    el('sysxShotD').textContent = s.shots[k].d;

    var cap = el('sysxCap');
    if (cap && !reduced) { cap.classList.remove('is-swap'); void cap.offsetWidth; cap.classList.add('is-swap'); }

    var thumbs = modal.querySelectorAll('.sysx-thumb');
    thumbs.forEach(function (t, ti) { t.classList.toggle('is-on', ti === k); });
  }

  function stepShot(d) {
    var s = SYSTEMS[cur]; if (!s) return;
    setShot((shot + d + s.shots.length) % s.shots.length, d);
  }

  function stepSystem(d) {
    if (cur < 0) return;
    paint((cur + d + SYSTEMS.length) % SYSTEMS.length, true);
  }

  function open(i) {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.classList.add('is-wipe', 'open');
    modal.setAttribute('aria-hidden', 'false');
    lock(true);
    paint(i, false);
    // focus lands on the close control so Escape and Tab have somewhere to start
    var close = modal.querySelector('.sysx-close');
    if (close) setTimeout(function () { close.focus(); }, reduced ? 0 : 460);
  }

  function close() {
    if (!modal || !modal.classList.contains('open')) return;
    modal.classList.remove('open', 'is-enter', 'is-wipe');
    modal.setAttribute('aria-hidden', 'true');
    lock(false);
    cur = -1;
    // release the decoded screenshots; this modal holds five full-size PNGs
    scroller.innerHTML = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* Focus containment. The frame covers the whole viewport, so a Tab that
     escapes it lands on controls the visitor cannot see. */
  function trapTab(e) {
    var f = modal.querySelectorAll('a[href], button:not([disabled])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function bind() {
    // open — delegated, because the shelf is rendered
    document.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('.js-open-system') : null;
      if (t) { e.preventDefault(); open(+t.dataset.sys); }
    });

    if (!modal) return;

    modal.addEventListener('click', function (e) {
      var t = e.target;
      if (!t.closest) return;

      if (t.closest('[data-close-sys]')) { close(); return; }

      var step = t.closest('[data-sys-step]');
      if (step) { stepSystem(+step.dataset.sysStep); return; }

      var thumb = t.closest('.sysx-thumb');
      if (thumb) { var k = +thumb.dataset.shot; setShot(k, k > shot ? 1 : -1); return; }

      if (t.closest('[data-sys-scroll]')) {
        var target = el('sysxDetail');
        if (target) scroller.scrollTo({ top: target.offsetTop - 40, behavior: reduced ? 'auto' : 'smooth' });
      }
    });

    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab') { trapTab(e); return; }
      // typing into a field is not navigation
      var t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); stepShot(1); return; }
      if (e.key === 'ArrowLeft') { e.preventDefault(); stepShot(-1); return; }
      // roster shortcuts — a select screen lets you jump straight to a slot
      if (/^[1-9]$/.test(e.key)) { var n = +e.key - 1; setShot(n, n > shot ? 1 : -1); }
    });

    // swipe through the screens on touch
    var sx = 0, sy = 0, tracking = false;
    modal.addEventListener('touchstart', function (e) {
      if (!e.target.closest || !e.target.closest('.sysx-view')) return;
      tracking = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY;
    }, { passive: true });
    modal.addEventListener('touchend', function (e) {
      if (!tracking) return;
      tracking = false;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.6) stepShot(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* ───────────────────────────────── BOOT ─────────────────────────────────
     Synchronous, at parse time. This script sits at the end of <body>, so the
     section markup already exists — and app.js's boot (DOMContentLoaded, i.e.
     after this) then measures a page that already contains the shelf. */
  function boot() {
    modal = el('systemModal');
    scroller = el('sysxScroll');

    renderTotals(); renderMarks(); renderShelf(); renderFlow(); renderNote();

    var section = el('systems');
    if (section) { revealIn(section); scanIcons(section); }
    bind();
  }

  boot();
})();
