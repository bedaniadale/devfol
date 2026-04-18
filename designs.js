/**
 * Graphic design portfolio: masonry gallery + filter + lightbox modal.
 * Replace `img` paths with files under works/designs/ when ready.
 */

const DESIGN_CATEGORY_LABELS = {
  poster: 'Poster',
  'social-media': 'Social Media',
  branding: 'Branding',
};

const designs = [
  {
    title: 'IMMFI — Site Visual Direction',
    desc: 'Web layout and visual hierarchy study for a nonprofit organization, emphasizing clarity and trust.',
    img: 'works/immfi.png',
    category: 'poster',
    tools: ['Photoshop', 'Figma'],
  },
  {
    title: 'SPUR — App Launch Campaign',
    desc: 'Social graphics promoting the SPUR mobile app: features, tone, and call-to-action.',
    img: 'works/joinspur.png',
    category: 'social-media',
    tools: ['Photoshop', 'Illustrator'],
  },
  {
    title: 'The Zepatide — Brand Web Presence',
    desc: 'Clean, medical-grade aesthetic for product-focused landing visuals.',
    img: 'works/zepatide.png',
    category: 'poster',
    tools: ['Photoshop', 'Illustrator'],
  },
  {
    title: 'Kayantabe — Volunteer Platform Identity',
    desc: 'Branding touches and promotional visuals for a volunteerism platform.',
    img: 'works/kayantabe.png',
    category: 'branding',
    tools: ['Illustrator', 'Figma'],
  },
  {
    title: 'Umbra — Tutoring App Promo',
    desc: 'Social-ready graphics highlighting booking and local tutor discovery.',
    img: 'works/umbra.png',
    category: 'social-media',
    tools: ['Photoshop', 'Canva'],
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function categoryLabel(key) {
  return DESIGN_CATEGORY_LABELS[key] || key;
}

function createToolPills(arr) {
  return arr
    .map(
      (item) =>
        `<span class="text-xs px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-700 font-medium">${escapeHtml(item)}</span>`
    )
    .join('');
}

function getFilteredDesigns(filter) {
  if (filter === 'all') return designs;
  return designs.filter((d) => d.category === filter);
}

function renderDesignGrid(filter) {
  const container = document.getElementById('designs');
  if (!container) return;

  const list = getFilteredDesigns(filter);
  if (list.length === 0) {
    container.innerHTML =
      '<p class="designs-empty text-sm text-gray-600 py-6">No pieces in this category yet.</p>';
    return;
  }

  let html = '';
  list.forEach((item) => {
    const globalIndex = designs.indexOf(item);
    const catLabel = categoryLabel(item.category);
    const escapedTitle = escapeHtml(item.title);
    const escapedSrc = escapeHtml(item.img);
    const escapedCat = escapeHtml(catLabel);

    html += `
      <div class="design-card-outer">
        <button type="button" class="design-card-trigger reveal-scale" data-design-index="${globalIndex}" aria-label="View details: ${escapedTitle}">
          <span class="design-card-media">
            <img src="${escapedSrc}" alt="${escapedTitle}" loading="lazy" class="design-card-img" />
            <span class="design-card-overlay" aria-hidden="true">
              <span class="design-card-overlay-title">${escapedTitle}</span>
              <span class="design-card-overlay-cat">${escapedCat}</span>
            </span>
          </span>
          <span class="design-card-meta">
            <span class="design-card-title">${escapedTitle}</span>
            <span class="design-card-cat-pill">${escapedCat}</span>
          </span>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
  observeNewDesignReveals();
}

function observeNewDesignReveals() {
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('#designs .reveal-scale').forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -48px 0px', threshold: 0.06 }
  );
  document.querySelectorAll('#designs .reveal-scale').forEach((el) => revealObserver.observe(el));
}

function bindDesignCardDelegation() {
  const container = document.getElementById('designs');
  if (!container || container.dataset.delegationBound === '1') return;
  container.dataset.delegationBound = '1';
  container.addEventListener('click', (event) => {
    const trigger = event.target.closest('.design-card-trigger');
    if (!trigger) return;
    const idx = Number(trigger.getAttribute('data-design-index'));
    if (!Number.isFinite(idx)) return;
    openDesignModal(idx);
  });
}

function openDesignModal(index) {
  const item = designs[index];
  if (!item) return;

  const modal = document.getElementById('designModal');
  const body = document.getElementById('designModalBody');
  if (!modal || !body) return;

  const roleChips = createToolPills(item.tools);
  const catLabel = categoryLabel(item.category);

  body.innerHTML = `
    <article class="design-modal-content">
      <div class="design-modal-image-wrap">
        <img src="${escapeHtml(item.img)}" alt="${escapeHtml(item.title)} preview" class="design-modal-image" />
      </div>
      <p class="design-modal-category">${escapeHtml(catLabel)}</p>
      <h4 class="design-modal-title">${escapeHtml(item.title)}</h4>
      <p class="design-modal-desc">${escapeHtml(item.desc)}</p>
      <div class="design-modal-tags">${roleChips}</div>
    </article>
  `;

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeDesignModal() {
  const modal = document.getElementById('designModal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function bindDesignModal() {
  const modal = document.getElementById('designModal');
  if (!modal || modal.dataset.modalBound === '1') return;
  modal.dataset.modalBound = '1';

  const closeBtn = document.getElementById('closeDesignModal');
  const backdrop = document.querySelector('[data-close-design]');

  if (closeBtn) closeBtn.addEventListener('click', closeDesignModal);
  if (backdrop) backdrop.addEventListener('click', closeDesignModal);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (modal.classList.contains('is-open')) {
      closeDesignModal();
    }
  });
}

function bindDesignFilters() {
  const wrap = document.getElementById('designFilters');
  if (!wrap || wrap.dataset.filtersBound === '1') return;
  wrap.dataset.filtersBound = '1';

  const chips = wrap.querySelectorAll('.design-filter-chip');
  if (!chips.length) return;

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.getAttribute('data-filter') || 'all';
      chips.forEach((c) => {
        c.classList.toggle('is-active', c === chip);
        c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
      });
      renderDesignGrid(filter);
    });
  });
}

function loadDesigns() {
  bindDesignCardDelegation();
  renderDesignGrid('all');
  bindDesignFilters();
  bindDesignModal();
}

loadDesigns();
