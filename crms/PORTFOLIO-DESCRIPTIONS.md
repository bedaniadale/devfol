# Portfolio Descriptions — Business Systems Collection

Copy-ready descriptions for five full-featured business management systems.
Each project has: a card tagline, a short blurb, a long description, feature
bullets, technical highlights, stack, scale metrics, and screenshot list.

---

## 0. Collection-level blurb (for a portfolio section header)

> **Five production-grade business systems.** Each one implements the full rule
> engine a real operator would need — payroll statutory tables, prerequisite
> graphs, inventory ledgers, clinical scheduling, work-order lifecycles — as a
> self-contained React application with deterministic demo data, role-based
> access, and no backend dependency. Combined: ~45,000 lines across 147 source
> files and 64 screens.

**Suggested framing line for your About/Skills section:**
> I build domain-heavy line-of-business applications — the kind where the hard
> part isn't the UI, it's getting the rules right: tax brackets, prerequisite
> chains, stock conservation, shift-crossing-midnight attribution, and approval
> workflows that can't be gamed.

---

# 1. TorqueDesk — Auto Repair / Service Shop Management & Work Order System

**Folder:** `Auto Repair  Service Shop Management & Work Order System`
**Screenshots:** `screenshots/auto-repair-work-order-system/`

### Card tagline
> Kanban work orders, parts allocation that deducts real stock, and a public
> job-status portal for customers.

### Short description (grid card, ~45 words)
> A shop-floor management system for auto repair and equipment service centres.
> Units are checked in with a photo-documented inspection, pushed across a
> six-stage Kanban board, allocated parts straight out of inventory, tracked for
> labor per technician, and closed with an itemized printable invoice.

### Long description (project detail page)
> **TorqueDesk** runs a vehicle *or* device repair shop end to end. Intake
> captures the unit, a 10-point condition checklist, and in-browser–compressed
> damage photos. The job then moves across a drag-and-drop Kanban board —
> Intake → Diagnosis → Waiting for Parts → In Progress → Quality Check → Ready
> for Pickup — and every stage change automatically fires a customer status
> message on their preferred channel (SMS, email, or phone).
>
> The interesting engineering is in the coupling: allocating a part to a job
> deducts stock *in the same atomic transaction* and writes a linked
> `StockMovement` record, so inventory and job state can never drift. Labor
> entries snapshot the technician's hourly rate at time of logging, so a later
> raise never silently rewrites a historical invoice. Every job also publishes a
> public status link where the customer sees a progress rail, the diagnosis, the
> running estimate, and their full alert history — with stages the job never
> entered marked *Not needed* rather than falsely ticked.

### Key features

**1. Vehicle / Device Intake & Inspection**
- Dual-mode unit handling — vehicles (year, make, model, plate, VIN, engine, odometer) and devices/equipment (serial number, hours/cycles), with labels and fields swapping by unit type
- 10-point condition checklist where each row cycles `OK → Watch → Fail → N/A`
- Damage photo upload with in-browser downscaling to max-900px JPEG before storage, plus editable captions
- Fuel/battery level slider, items-left-with-unit tracking, and reported issues in the customer's own words
- Validation gate blocks check-in until unit, title, and reported issues are present

**2. Work Order Kanban Board**
- Six live stages plus an archived *Closed* state, with native HTML5 drag-and-drop **and** keyboard-accessible back/next buttons on every card
- Cards surface priority, assigned technicians, part count, actual-vs-estimated hours, photo and alert counts
- Colour-coded due-date chip that flips red on overdue
- Filter by search text, technician, or priority; each column header shows job count **and** the dollar value sitting in that stage

**3. Parts Allocation & Inventory Deduction**
- Allocation deducts from stock atomically and writes a `StockMovement` linked back to the job
- Refuses allocation on insufficient on-hand quantity; warns when a part crosses its reorder point
- *Return* restores stock and logs the reverse movement; deleting a work order returns everything it held
- Inventory page: stock value at cost and retail, low-stock filter, inline reorder-point editing, goods receiving, new SKUs with a live margin readout, and a full movement ledger

**4. Mechanic Assignment & Labor Tracking**
- Multiple technicians per work order, each with their own billable hourly rate
- Labor entries snapshot the rate onto the entry — historical invoices are immutable against future rate changes
- Actual-vs-estimated hours meter on every job header, turning amber on overrun
- Technician page: weekly capacity utilisation, hours logged, billable revenue booked, and per-person assignment lists

**5. Customer Status Portal & Invoicing**
- Automatic milestone alerts on stage transitions, each stage carrying its own customer-facing headline and copy
- Free-form advisor messaging (SMS / email / portal notice)
- Public status link (`/portal/<code>`) with progress rail, diagnosis, assigned tech, running estimate, and alert history
- Itemized invoice — parts (SKU, qty, unit price) and labor (description, tech, hours, rate) with shop supplies, discount, tax, total — flowing issue → send → mark paid, printable via the browser print pipeline
- Invoicing dashboard rolls up collected, awaiting payment, ready-to-invoice, and gross profit

### Technical highlights
- **Atomic cross-entity mutations.** Every action touching two entities (allocating a part, moving a stage, passing QC) is a single store action — inventory and job state cannot desynchronise.
- **No cached totals.** `computeTotals()` recomputes `parts + labor + capped shop supplies → subtotal → discount → tax → total` from current lines, so editing one part line instantly updates the header, board, dashboard, and public portal.
- **Rate snapshotting** as a deliberate correctness decision for financial history.
- **Client-side image pipeline** — canvas downscale + JPEG re-encode to keep localStorage viable.
- TypeScript in strict mode; build runs `tsc --noEmit` as a gate before bundling.

### Stack
React 18 · TypeScript (strict) · Vite 6 · Tailwind CSS 4 · Zustand 5 · React Router 6 · lucide-react

### Scale
20 source files · ~7,200 lines · 9 screens · zero-backend, localStorage-persisted

### Screenshots
`01-dashboard` · `02-work-order-board` · `03-work-order-detail` · `04-parts-inventory` · `05-invoices-billing`

### Tags
`React` `TypeScript` `Zustand` `Tailwind` `Kanban / Drag-and-Drop` `Inventory Management` `Invoicing` `Customer Portal`

---

# 2. Biometric Payroll & HR Management System (HRMS)

**Folder:** `Biometric Payroll & HR Management System (HRMS)`
**Screenshots:** `screenshots/biometric-payroll-hrms/`

### Card tagline
> Ingests raw biometric device logs, evaluates every workday against schedule,
> and computes statutory-compliant payroll with PDF payslips.

### Short description (grid card, ~50 words)
> An HRMS that replaces spreadsheet payroll. It parses raw ZKTeco/Anviz/RFID
> terminal exports, evaluates each workday against the employee's schedule,
> routes leave and overtime through two-level approvals, then computes payroll
> including overtime multipliers, night differential, SSS/PhilHealth/Pag-IBIG
> contributions and BIR withholding tax — releasing PDF payslips to each account.

### Long description (project detail page)
> A complete HR and payroll platform built around the messiest real-world input
> there is: **raw biometric device exports.** The parser handles ZKTeco/Anviz
> format, RFID gate-controller dumps, generic CSV/TSV with any header naming,
> and headerless files where column positions are inferred from the first data
> row. Delimiters are auto-detected; four date formats parse in 24-hour or AM/PM,
> with `DD/MM` vs `MM/DD` disambiguated when a component exceeds 12. Credentials
> resolve against biometric ID, RFID number, *or* employee number with
> zero-padding tolerated. Re-uploading the same export is safe — existing punches
> are skipped, not duplicated.
>
> Each affected day is then evaluated against that employee's schedule and
> flagged across ten states — late, undertime, absent, no-time-out, overtime
> rendered, night differential, rest-day work, holiday work, duplicate punch,
> manual edit. **Shifts crossing midnight are attributed to the shift, not the
> calendar day**: a 21:00–06:00 night shift lands both punches on one record, and
> punches sort relative to shift start so a 21:00 time-in precedes the 06:00
> time-out.
>
> Payroll then computes per cut-off with full statutory schedules, and every
> payslip renders to a single-page A4 PDF carrying a verification code derived
> from the run and employee IDs.

### Key features

**1. Biometric attendance import & evaluation**
- Multi-format parser: ZKTeco/Anviz (`AC-No, Name, Date/Time, State, Verify Mode`), RFID controllers (`CardNo, Timestamp, Direction`), generic CSV/TSV, and headerless dumps with inferred columns
- Auto-detected delimiters (`, \t ; |`) and four date formats in 24h or AM/PM
- Credential resolution across biometric ID / RFID / employee number with zero-padding tolerance (`0102` matches enrollment `102`)
- Unresolved rows are **reported, never silently dropped**; re-imports are idempotent
- Ten-flag daily evaluation engine against each employee's schedule and grace period
- Midnight-crossing shift attribution via `shiftDateFor()`
- Inline HR correction that recomputes derived minutes on save and tags the day `manual_edit` so re-imports never overwrite the fix

**2. Leave & overtime request workflow**
- 8 leave types with half-day support, plus overtime claims
- Two-level approval chain (direct manager → HR) with full decision trail, remarks, and timestamps; managers' own filings skip level 1 and nobody can approve their own request
- Filing validated against credit balance net of pending filings, overlapping filings, ranges with no working days on that schedule, and duplicate OT claims
- Approvers see decision context — remaining credits, teammates already on leave over the same dates, and the overtime the device log actually recorded
- Final approval draws down credits and re-evaluates covered attendance days so absences become `on_leave`

**3. Automated payroll computation engine**
- Rate derivation from configurable basis: `daily = monthly × 12 ÷ working days/year`, `hourly = daily ÷ standard hours/day`
- Day-type overtime multipliers — regular 1.25×, rest day 1.69×, regular holiday 2.60×, special holiday 1.69×
- Night differential at 10% of hourly for the 22:00–06:00 overlap
- **Overtime paid at the lesser of hours rendered and hours approved** — unapproved OT stays logged but uncompensated, with both figures stated on the payslip
- Monthly-paid staff correctly earn only the additional 100% on regular holidays (base already in the monthly rate)
- Full statutory schedules: SSS (15% total / 5% employee, MSC ₱5,000–₱35,000, MPF above ₱20,000, plus EC), PhilHealth (5%, ₱10,000 floor / ₱100,000 ceiling, 50-50 split), Pag-IBIG (2% employee capped at ₱10,000 fund salary), BIR TRAIN Law withholding table with monthly and semi-monthly brackets
- Semi-monthly handling: contributions split across cut-offs, loan amortisations on the second
- Employer-side cost and 13th-month accrual computed alongside
- Run lifecycle `computed → approved → paid`; recompute pulls latest attendance and approvals; paid runs lock

**4. Digital payslip generation**
- Single-page A4 PDF per payslip: company header, employee/period block, attendance summary strip, itemised earnings and deductions **with their computation detail**, net pay banner, employer contributions, and the rates used
- Verification code derived from run and employee IDs so a printed copy traces back to its run
- Payroll register exports as PDF or CSV, plus a bank transfer file
- **Payslips release to employees only once HR marks the run paid** — before that they see a pending notice

**5. Employee document & information hub**
- Full 201 file: personal details, government identifiers (SSS/PhilHealth/Pag-IBIG/TIN), compensation with derived statutory preview, work schedule and enrolled credentials, leave balances, active loans, attendance, filings, documents, and a dated employment-history timeline
- Document uploads (contracts, government IDs, certificates, medical, clearances) with optional expiry that flags before lapsing
- Documents stored **outside the main record** so payloads aren't re-serialised on every state change
- Employees view and download their own files from *My profile*

### Technical highlights
- **Domain layer independent of React** — `attendance.ts`, `payroll.ts`, `statutory.ts`, `workflow.ts` are pure business rules, testable and reusable.
- **Every statutory rate, multiplier and threshold lives in one file** (`statutory.ts`) or the settings record, so a rules change is a single-file edit. Pay rules, night-differential window, cycle, rate basis, and holiday calendar are all editable at runtime through Settings.
- **Role-based access** across HR administrator / manager / employee, with permissions following the signed-in person.
- **Storage quota handling** — documents capped at 1.5 MB, quota errors surface as messages rather than silent failures, and a Data screen shows the current footprint.
- Deterministic seeding so the demo dataset is identical on every rebuild.

### Stack
React 18 · TypeScript · Vite 5 · React Router 6 · Recharts · jsPDF + jspdf-autotable · lucide-react

### Scale
34 source files · ~11,700 lines · 15 screens · three permission tiers

### Screenshots
`01-role-based-sign-in` · `02-hr-dashboard` · `03-payroll-run-register` · `04-biometric-attendance-logs` · `05-leave-overtime-approvals`

### Tags
`React` `TypeScript` `Payroll Engine` `Statutory Compliance` `CSV Parsing` `PDF Generation` `Approval Workflows` `RBAC`

---

# 3. NexusPOS — Multi-Branch Retail POS & Inventory Management System

**Folder:** `Multi-Branch Retail POS & Inventory Management System`
**Screenshots:** `screenshots/multi-branch-retail-pos/`

### Card tagline
> Keyboard-wedge barcode scanning, split-tender checkout, and genuine real-time
> stock sync across branches via BroadcastChannel.

### Short description (grid card, ~45 words)
> A retail point-of-sale with real-time inventory synchronisation across multiple
> stores and warehouses. Barcode scanning without a driver, split-tender
> payments, transfers that conserve network stock, velocity-driven reorder
> suggestions, and X/Z shift reconciliation with denomination-level drawer counts.

### Long description (project detail page)
> **NexusPOS** is a fast retail checkout terminal that behaves like real
> hardware. The scanner integration listens for raw key events globally and
> reconstructs codes from the burst-typing signature a keyboard-wedge scanner
> produces — keys under 60 ms apart, terminated by Enter — so there's no driver,
> no focused field, and manual typing is never misread as a scan.
>
> **The multi-branch sync is real, not simulated.** Every browser tab is an
> independent terminal: the signed-in operator and active branch live in
> `sessionStorage`, so you can run two branches side by side in two tabs. State
> persists to `localStorage` and broadcasts over `BroadcastChannel` with a
> `storage`-event fallback — make a stock movement in one tab and it appears in
> the other without a reload.
>
> Underneath, one reducer owns all state. A sale, a transfer, an adjustment and a
> goods receipt all express stock movement as `{branchId, productId, delta}`
> through a single `applyDeltas` path, so inventory cannot drift. Money math
> lives in one module used by the POS, by refunds, and by the data generator —
> every receipt in the system is arithmetically consistent.

### Key features

**1. High-speed point of sale**
- Driverless barcode capture from keyboard-wedge scanners via burst-timing signature detection
- Item lookup by name, SKU or barcode, category filters, and a touch grid
- **Multi-tender payments** — cash, card, e-wallet, voucher and store credit split across one sale, with only cash permitted to over-tender and produce change (matching real terminal behaviour)
- Line-level and order-level discounts with tax recalculated on the discounted amount via proportional allocation
- Park/resume carts and printed or digital (`.txt`) receipts
- Hotkeys: `F2` search · `F4` pay · `F8` park · `F9` discount

**2. Multi-location inventory sync**
- Stock deducts on sale completion and returns on void or refund
- **Transfers** deduct from source immediately and sit *in transit* until received; receiving short returns the shortfall to source, so total network stock is always conserved
- Adjustments for damage, expiry, shrinkage, cycle counts and found stock, each written to an auditable ledger with cost impact
- Inventory matrix showing every SKU across every location simultaneously
- Cross-tab live replication via `BroadcastChannel` + `storage` fallback

**3. Low-stock & reorder triggering**
- Per-branch reorder points, overridable per SKU (warehouses default to 5× the store threshold)
- **Suggested order quantity derived from real 30-day sales velocity** plus supplier lead time and a 10-day buffer — not a fixed number
- Days-of-cover flagged red when it falls below supplier lead time
- Selected items become purchase requisitions **grouped by supplier**, moving draft → submitted → approved → received, with receiving posting the stock
- A sale that pushes an item across its threshold raises a prompt at the register

**4. Cashier shift reconciliation**
- Shift opened with a counted float; sales attributed to it
- **X-Reading** — interim, non-resetting snapshot, printable any time
- **Z-Reading** — final report that closes the shift, with denomination-by-denomination drawer count or a straight total
- Transparent expected-cash formula: `float + cash sales − change given − cash refunds + pay-ins − pay-outs − safe drops`
- Variance graded against configurable tolerance as balanced / overage / shortage, with full history retained

**5. Sales analytics & product performance**
- Revenue, gross profit, margin, transactions and average basket, each compared against the preceding equivalent period
- Revenue/profit/transaction trend, peak trading hours (peak bar highlighted), revenue by category, revenue per location, and payment mix
- Top products by revenue with unit economics, plus a lowest-margin table for repricing decisions
- CSV export for product performance, inventory and the reorder worklist

### Technical highlights
- **Single-reducer stock integrity.** All four mutation types funnel through one `applyDeltas` path — there is no second way to move stock.
- **One money module.** `computeTotals` serves POS, refunds and the seed generator; values round to 2 decimals at every step.
- **Refunds stored as negative sales** linked to the original, so summing any filtered set of sales nets refunds out automatically — no special-case reporting logic.
- **Per-product tax** with exemptions (fresh produce, bakery, dairy), charged on the post-discount amount via proportional allocation.
- **Six-operator RBAC** — administrator, store manager, three location-locked cashiers, and an inventory controller — gating navigation and destructive actions (cashiers get no Analytics/Products/Settings; the inventory controller gets no register).
- **80 mm thermal print stylesheet** isolating `.receipt-print` so receipts and X/Z readings print correctly to a roll.
- Seeded PRNG generates a deterministic 45-day dataset, with today's sales always generated up to the current hour and never into the future.
- JSON backup export/restore and versioned auto-regeneration on `STATE_VERSION` bump.

### Stack
React 18 · JavaScript (ES modules) · Vite 5 · React Router 6 · Recharts · lucide-react · `BroadcastChannel` API · custom design-token CSS with light/dark themes

### Scale
29 source files · ~8,700 lines · 11 screens · 6 operator roles · 45-day deterministic dataset

### Screenshots
`01-terminal-sign-in` · `02-multi-branch-dashboard` · `03-point-of-sale-register` · `04-inventory-stock-control` · `05-sales-analytics`

### Tags
`React` `POS` `Barcode Scanning` `Real-Time Sync` `BroadcastChannel` `Inventory Ledger` `Analytics` `Thermal Printing` `RBAC`

---

# 4. ClinicCare — Multi-Doctor Outpatient EHR & Clinic Appointment System

**Folder:** `Multi-Doctor Outpatient EHR & Clinic Appointment System`
**Screenshots:** `screenshots/multi-doctor-ehr-clinic/`

### Card tagline
> Live-availability online booking, SOAP-structured records, allergy-checked
> prescriptions with PDF output, and an idempotent reminder engine.

### Short description (grid card, ~45 words)
> A multi-doctor, multi-location outpatient clinic platform: patients book
> against real doctor availability, doctors write SOAP-structured notes and
> generate allergy-cross-checked prescription PDFs, reception runs a live patient
> flow board with waiting-room display mode, and a background dispatcher sends
> deduplicated appointment reminders.

### Long description (project detail page)
> **ClinicCare** covers the full outpatient loop — booking, consultation,
> prescription, queue, and follow-up. Patients pick a specialty and location,
> then a doctor; a date strip shows **real-time free-slot counts per day** with
> days off greyed out. Slots are generated from the doctor's weekly roster, minus
> booked appointments, minus time already passed, so past and taken slots render
> struck-through and unselectable. Reception uses the identical dialog, with the
> booking channel recorded as *Reception* or *Phone* instead of *Patient Portal*.
>
> Clinical records are structured as **S**ubjective / **O**bjective /
> **A**ssessment / **P**lan with a vitals block that computes BMI automatically.
> The consultation workspace keeps the patient's allergies, chronic conditions,
> prior notes and previous prescriptions in a side rail while the doctor types.
> Prescriptions draw from a searchable ~34-medicine formulary, and a **red
> allergy banner fires when a prescribed generic matches a recorded allergy**
> before the script is ever issued.
>
> The reminder engine is the quiet win: every message carries a `dedupeKey`, so a
> scan that runs twice — or a tab reopened hours later — never double-sends, but
> still catches up on everything missed while the tab was closed.

### Key features

**1. Patient portal & online booking**
- Specialty → location → doctor selection, with each doctor card showing slot length and consultation fee
- Date strip with live per-day free-slot counts and greyed-out days off
- Slot generation from the weekly roster minus booked appointments minus elapsed time; taken and past slots struck through and non-selectable
- Confirmation queues SMS **and** email immediately
- Patients view visit summaries, download prescriptions, and cancel — cancellation releases the slot and notifies
- Shared booking dialog for reception with channel attribution

**2. Electronic health records — SOAP notes**
- Structured Subjective / Objective / Assessment / Plan capture
- Vitals block with automatic BMI computation
- Contextual side rail: allergies, chronic conditions, prior notes, previous prescriptions
- Draft vs **signed** note states
- Setting a follow-up date arms an automated reminder

**3. Digital prescription generator**
- Searchable ~34-medicine formulary by brand, generic or category, with safety cautions
- Per-line dosage notation (`1-0-1`), frequency, duration, route and instructions
- **Allergy cross-check** — red banner when a prescribed generic matches a recorded allergy
- Live on-screen preview plus a formal A4 PDF: letterhead, prescriber block, Rx table, advice, follow-up box, signature block — printable or downloadable
- jsPDF is **code-split and lazy-loaded on first use**, so it costs nothing on initial page load

**4. Queuing & patient flow board**
- Four lanes: Expected → Waiting → In Consultation → Completed
- Check-in issues a per-clinic, per-day queue token (`MC-004`)
- Live-ticking wait timers that change colour past 15 and 30 minutes
- Estimated time-to-go per waiting patient, derived from the queue ahead and the doctor's slot length
- **Waiting-room mode** strips controls for display on a public screen

**5. Automated reminders & notifications**
- Background dispatcher (default 20s interval) scanning state and emitting six trigger types: booking confirmation, 24-hour reminder, 2-hour reminder, follow-up due (from 3 days out, suppressed if already rebooked), cancellation, and queue-called
- **Idempotent delivery** via per-message `dedupeKey` — repeated scans never double-send, but reopened tabs still catch up on missed messages
- Failed messages (missing recipient address) land in a retryable outbox

### Technical highlights
- **Time-relative seed data.** `seed.ts` builds the dataset relative to the moment the app opens — encounters are described as "this doctor's Nth slot, N days out" and resolved against each doctor's real roster, so the schedule grid, queue board and slot maths agree on any weekday and wait timers read sensibly at any hour.
- **Side effects owned by action creators** — booking queues confirmations, check-in allocates a queue token, cancelling emits a notice — keeping pages purely declarative.
- **Lazy-loaded PDF vendor bundle** as a deliberate performance decision.
- Single `useReducer` store persisting the whole clinic to `localStorage` on every change, with JSON export snapshotting before a demo reset.
- Honest scoping: prescriptions are explicitly marked not-for-medico-legal-use, and the messaging layer is a single documented swap point (`dispatchDueMessages`) for a real SMS/email gateway.

### Stack
React 18 · TypeScript · Vite 5 · Tailwind CSS 3 · React Router 6 · date-fns · jsPDF (code-split) · clsx · lucide-react

### Scale
38 source files · ~10,700 lines · 13 screens · ~34-medicine formulary

### Screenshots
`01-clinic-dashboard` · `02-appointment-scheduling` · `03-live-queue-board` · `04-consultation-notes` · `05-patient-health-record`

### Tags
`React` `TypeScript` `EHR` `SOAP Notes` `Appointment Scheduling` `PDF Generation` `Notification Engine` `Idempotency` `Tailwind`

---

# 5. Northfield — University Student Information & Online Enrollment Portal

**Folder:** `University Student Information and Online Enrollment Portal`
**Screenshots:** `screenshots/university-enrollment-portal/`

### Card tagline
> A prerequisite graph engine, a backtracking timetable solver, and grade
> publication that unlocks the curriculum — verified by 5,016 assertions.

### Short description (grid card, ~50 words)
> A student information system with self-service enrollment and automated
> rule-checking. A prerequisite engine validates every basket against published
> grades, a backtracking solver auto-resolves schedule conflicts greedy picking
> can't, faculty encode and publish grades through a three-state handoff, and
> transcripts, GWA and degree progress recompute automatically.

### Long description (project detail page)
> **Northfield** is the rules-heaviest of the five. Every course carries
> prerequisites (must be *passed* in an earlier term), co-requisites (passed or
> taken concurrently) and a minimum year standing, and eligibility is recomputed
> against the student's published record every time the basket changes — with
> every refusal naming the specific unmet requirement. Two properties the engine
> guarantees: a prerequisite can never be satisfied by a subject taken
> *alongside* it, and lecture/lab pairs are judged as a unit, so ticking `CS102`
> pulls `CS102L` in automatically and removing either drops both.
>
> The schedule builder does something greedy schedulers can't. Picking sections
> one at a time dead-ends even when a valid timetable exists — an early choice
> takes the only slot a later course could use — so **`assignSections` is a
> backtracking search** that places the most constrained courses first and
> rewinds on failure. When genuinely no conflict-free combination exists, it says
> so rather than silently dropping subjects.
>
> Grade publication is the system's hinge. Instructors draft privately, lock the
> sheet to the registrar, and only on **publication** are transcript records
> written, GWAs recomputed and dependent courses unlocked — a grade sitting in a
> draft sheet never unlocks anything.

### Key features

**1. Curriculum & prerequisite engine**
- Per-course `prereqs`, `coreqs`, and minimum year `standing`, recomputed on every basket change
- Every refusal names the specific unmet requirement
- Concurrent-satisfaction impossible — a prerequisite requires an earlier term's pass
- Lecture/lab pairs treated atomically in both directions
- **Only published grades count** toward eligibility
- Curriculum viewer showing the full ladder for both programs, with click-through to a subject's transitive prerequisite chain and the courses it unlocks

**2. Section & schedule builder**
- Meetings modelled as day-sets plus minute ranges; collision when weekday and time range overlap
- Clash flagged *before* selection, colliding blocks outlined red on the weekly timetable, submission blocked while any conflict stands
- **Capacity counts approved plus pending** — a pending request holds its seat so the registrar is never forced to over-fill a room; full sections struck from the picker
- *Auto-resolve conflicts* and *Load recommended* both run a **backtracking constraint solver** ordering by most-constrained-first with rewind on failure

**3. Online enrollment & load assessment**
- Four-step workspace: choose subjects → verify timetable → read rule check → review assessment
- Single gate `assessEnrollment` runs eligibility, conflicts, capacity, duplicates and unit load together — and **the registrar re-runs the identical function at review time**, because the world may have changed since filing
- Unit ceilings by academic standing: probation 15, regular 24, Dean's List (GWA ≤ 1.75) 27, graduating 30; below 12 units flags part-time
- Assessment with per-program lecture and laboratory rates, nine itemised miscellaneous fees, scholarship discounts, then a 30% down payment and four instalments
- `PENDING → APPROVED / REJECTED` flow; editing an approved load re-files as an add/drop request; registrar can batch-approve everything that validates cleanly or override a flagged request with recorded remarks

**4. Faculty grading portal**
- Class lists derived live from approved enrollments — approve a student and they appear on the instructor's sheet immediately
- Raw midterm and final ratings (0–100), final = 40% midterm + 60% finals, transmuted to the 1.00–5.00 scale (1.00 highest, 3.00 passing, 5.00 failed)
- Rating, grade, remark and class distribution update as you type
- **Three-state handoff**: Open (private drafts) → Locked (read-only, requires every student to have a final rating or drop mark) → Published (registrar releases; transcript records written, GWAs recomputed, dependent courses unlocked)
- Registrar can reopen a locked sheet or publish every submitted sheet at once

**5. Academic transcript & evaluation**
- Unit-weighted GWA on the 1.00–5.00 scale plus 4.00-scale GPA equivalent
- Incomplete and dropped rows excluded from both; a 5.00 counts against the average without adding earned units
- Transcript grouped by term chronologically with per-term and running cumulative GWA, tagging Dean's List terms
- Course-by-course degree audit: passed / enrolled / failed / incomplete / not taken, units earned vs required, what's cleared to take now and what's blocked **and by what**
- Electives passed outside the ladder credited separately; Latin honors projected from cumulative GWA

### Technical highlights
- **Verified with a 5,016-assertion harness** covering prerequisite integrity across every historical record, co-requisite resolution, schedule conflicts, capacity, unit ceilings, GWA/GPA arithmetic against hand-computed values, transmutation boundaries, transcript ordering, degree-progress bounds, room allocation and population sanity — all passing.
- **End-to-end browser-driven validation** of the full lifecycle: student builds a load → conflict forced and auto-resolved → request submitted → registrar approves → student appears on the instructor's class list → grades encoded, locked, published → transcript, GWA and degree evaluation update.
- **Two real defects found and fixed** through that process: greedy section-picking dead-ending on solvable timetables (replaced with the backtracking solver), and lecture/lab pairs judged in isolation and therefore reported as permanently ineligible.
- **`rules.js` is pure** — no React, no state — so the same functions serve the student portal, the registrar's re-validation, and the seed generator. The demo data *cannot* contradict the rules the live portal enforces.
- **Seed data generated by walking the curriculum ladder**: each past term enrols only courses whose prerequisites were already satisfied, failed subjects are retaken at the next opportunity, and passes take effect only after the term closes.
- **Rooms allocated against a booking ledger**, so the registrar's room double-booking report ships empty and will light up if a schedule is edited into a clash.
- Three-role access (student / faculty / registrar) across 16 screens.

### Stack
React 18 · JavaScript (ES modules) · Vite 5 · React Router 6 · lucide-react · hand-rolled design system

### Scale
26 source files · ~6,600 lines · 16 screens · 3 roles · 66 courses · 101 students · 104 sections · ~2,300 academic records · 5,016 verification assertions

### Screenshots
`01-portal-sign-in` · `02-student-dashboard` · `03-online-enrollment` · `04-academic-evaluation` · `05-registrar-sections-capacity`

### Tags
`React` `Rules Engine` `Constraint Solving` `Backtracking Algorithm` `Graph Traversal` `Academic Records` `RBAC` `Test Harness`

---

## Cross-project talking points (good for interviews or an "Approach" section)

- **Domain logic isolated from UI in every project** — `domain/`, `lib/rules.js`, `lib/pricing.js`. Pure functions that the UI, the validators, and the seed generators all share, which is why the demo data can't contradict the rules.
- **Single-source-of-truth mutation paths** — `applyDeltas` for all stock movement, `computeTotals` for all money math, one reducer per app. Divergence is designed out, not tested for.
- **Deterministic seeded datasets** — every project rebuilds an identical demo world from a fixed PRNG or a ladder-walking generator, with version-bump invalidation.
- **Correctness details that only show up in real operations** — rate snapshotting on labor entries, midnight-crossing shift attribution, idempotent notification `dedupeKey`s, transfers conserving network stock on short receipt, pending enrollments holding seats, unapproved overtime logged but unpaid.
- **Honest limitation statements** in every README — sign-in is account selection not authentication, messaging is simulated, statutory tables need verification against current circulars. These are reference implementations with clearly marked integration seams.
