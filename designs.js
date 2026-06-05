/**
 * Graphic design gallery — aspect-aware bento grid + lightbox.
 * Slot shape follows each image's natural ratio (portrait / landscape / square).
 */

const GRAPHICS_BASE = 'works/graphics/';

const GRAPHICS_FILES = [
  'dalefuture.png',
  'flowg.png',
  'artboard-1-100-1.webp',
  'welcomeback2.webp',
  'finalmem.png',
  'meetourteam-2.webp',
  'dp2022.webp',
  'bday_dale2-1.png',
  'artboard-4-100.webp',
  'artboard-5-100.webp',
  'artboard-6-100.webp',
  'artboard-7-100.webp',
  '1.webp',
  'efef475b-ec17-4a13-a5f2-e7ae1156aadc.jpg',
  '0ad9042b-41b8-4ee9-9d65-26750ee28ef1.jpg',
  '3e157134-d079-4d2f-8b8c-c27f78568f34.jpg',
  '1dfa30eb-1346-44e0-bfa1-c30dee95e6ea.jpg',
  '12563e67-865d-4b29-9acc-3b61e809185d.jpg',
  '42ef1801-b6a4-4aa4-9f7e-82db6b1bd601.jpg',
  'ddba4cc9-8b30-4c7a-ac56-6956d3c9cbc8.jpg',
  'ad0ea7ce-fc3c-425b-8ce0-f2fc74a1a9f0.jpg',
  '6e6deef8-be3e-44d6-8bb6-2b4c061dfad1.jpg',
  '8a8780cf-2862-4c52-992d-1f24f2c2f7f6.jpg',
  'f4d3219f-d45b-4d1c-9b16-89f0fce7bc8b.jpg',
];

/** Populated after image dimensions load */
var designs = [];

/**
 * Map aspect ratio w/h → bento slot class suffix (matches CSS grid spans).
 * Portrait → tall columns; landscape → wide rows; near-square → large square tiles.
 */
function bentoSlotFromRatio(r) {
  if (!Number.isFinite(r) || r <= 0) return 'wide';
  /* Portrait / tall: narrow column slots (match poster shape) */
  if (r < 0.52) return 'tall-xl';
  if (r < 0.98) return 'tall';
  /* Near-square: large square tile */
  if (r >= 0.98 && r <= 1.06) return 'feature';
  /* Moderate landscape */
  if (r > 1.06 && r <= 1.48) return 'wide';
  /* Wide banners */
  if (r > 1.48 && r <= 2.35) return 'wide-lg';
  /* Ultra-wide strips */
  return 'ultrawide';
}

function loadImageMeta(src) {
  return new Promise(function (resolve) {
    var im = new Image();
    im.onload = function () {
      resolve({ w: im.naturalWidth, h: im.naturalHeight });
    };
    im.onerror = function () {
      resolve({ w: 4, h: 3 });
    };
    im.src = src;
  });
}

function titleFromFilename(filename, index) {
  var base = filename.replace(/\.[^.]+$/, '');
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(base)) {
    return 'Graphic work ' + String(index + 1);
  }
  if (/^artboard-/i.test(base)) {
    var am = base.match(/^artboard-(\d+)/i);
    if (am) return 'Artboard ' + am[1];
  }
  var s = base
    .replace(/^meetourteam[-_]?\d*/i, 'Meet our team')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!s) return 'Work ' + String(index + 1);
  return s.replace(/\b\w/g, function (c) {
    return c.toUpperCase();
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function refreshGraphicsStagger() {
  var parent = document.getElementById('graphicsBento');
  if (!parent || !parent.hasAttribute('data-stagger')) return;
  var prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = Array.from(parent.children);
  items.forEach(function (child, i) {
    child.classList.add('si');
    child.style.setProperty('--sd', i * 40 + 'ms');
    if (prefersReducedMotion) child.classList.add('in');
  });
  if (!prefersReducedMotion && items.length) {
    var staggerObs = new IntersectionObserver(
      function (entries) {
        if (!entries[0].isIntersecting) return;
        items.forEach(function (child) {
          child.classList.add('in');
        });
        staggerObs.disconnect();
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.04 }
    );
    staggerObs.observe(parent);
  }
}

function initGraphicsCarousel() {
  var scroller = document.getElementById('graphicsGalleryScroller');
  var gallery = document.getElementById('graphicsGallery');
  var dotsWrap = document.getElementById('graphicsGalleryDots');
  if (!scroller) return;

  var originals = Array.prototype.slice.call(scroller.querySelectorAll('.education-gallery__slide'));
  if (!originals.length) return;

  var realCount = originals.length;
  var prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var scrollSmooth = prefersReduced ? 'auto' : 'smooth';

  /** @type {HTMLElement[]} */
  var slides = originals.slice();
  var jumping = false;

  if (realCount >= 2) {
    // Clone all items for the end
    originals.forEach(function (el) {
      var clone = el.cloneNode(true);
      clone.classList.add('education-gallery__slide--clone');
      clone.setAttribute('aria-hidden', 'true');
      var img = clone.querySelector('img');
      if (img) { img.alt = ''; img.setAttribute('aria-hidden', 'true'); }
      scroller.appendChild(clone);
    });
    // Clone all items for the beginning
    originals.forEach(function (el) {
      var clone = el.cloneNode(true);
      clone.classList.add('education-gallery__slide--clone');
      clone.setAttribute('aria-hidden', 'true');
      var img = clone.querySelector('img');
      if (img) { img.alt = ''; img.setAttribute('aria-hidden', 'true'); }
      scroller.insertBefore(clone, originals[0]);
    });
    slides = Array.prototype.slice.call(scroller.querySelectorAll('.education-gallery__slide'));
  }

  var activeLogical = 0;
  var carouselPaused = false;
  var marqueeRaf = null;

  var MARQUEE_SPEED = 0.5;

  function domIndexForLogical(L) {
    return realCount >= 2 ? L + realCount : L;
  }

  function logicalFromDomIndex(di) {
    if (realCount < 2) return di;
    return ((di % realCount) + realCount) % realCount;
  }

  function scrollSlideToView(index, behavior) {
    var el = slides[index];
    if (!el) return;
    var targetLeft = el.offsetLeft - (scroller.clientWidth - el.offsetWidth) / 2;
    scroller.scrollTo({
      left: targetLeft,
      behavior: behavior || scrollSmooth
    });
  }

  function scrollToLogical(L) {
    var clamped = ((L % realCount) + realCount) % realCount;
    activeLogical = clamped;
    scrollSlideToView(domIndexForLogical(clamped), scrollSmooth);
    updateDots();
  }

  function updateDots() {
    if (!dotsWrap) return;
    var dot = dotsWrap.querySelectorAll('.education-gallery__dot');
    dot.forEach(function (d, j) {
      var on = j === activeLogical;
      d.classList.toggle('is-active', on);
      if (on) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
  }

  function jumpToDi(targetDi) {
    jumping = true;
    scroller.style.scrollBehavior = 'auto';
    scrollSlideToView(targetDi, 'auto');
    activeLogical = logicalFromDomIndex(targetDi);
    requestAnimationFrame(function () {
      scroller.style.scrollBehavior = '';
      jumping = false;
      updateDots();
    });
  }

  function maybeUnjumpClone() {
    if (realCount < 2 || jumping) return;
    var di = centeredDomIndex();
    if (di < realCount) {
      jumpToDi(di + realCount);
    } else if (di >= 2 * realCount) {
      jumpToDi(di - realCount);
    }
  }

  function centeredDomIndex() {
    var mid = scroller.scrollLeft + scroller.clientWidth * 0.5;
    var best = 0;
    var bestDist = Infinity;
    slides.forEach(function (slide, j) {
      var sl = slide.offsetLeft;
      var sr = sl + slide.offsetWidth;
      var center = (sl + sr) * 0.5;
      var dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = j;
      }
    });
    return best;
  }

  function syncActiveFromScroll() {
    if (jumping) return;
    var di = centeredDomIndex();
    var logical = logicalFromDomIndex(di);
    if (logical !== activeLogical) {
      activeLogical = logical;
      updateDots();
    }
  }

  function scheduleEdgeJump() {
    setTimeout(function () {
      maybeUnjumpClone();
    }, prefersReduced ? 60 : 400);
  }

  function goPrev() {
    if (realCount < 2) return;
    var current = centeredDomIndex();
    scrollSlideToView(current - 1, scrollSmooth);
    scheduleEdgeJump();
  }

  function goNext() {
    if (realCount < 2) return;
    var current = centeredDomIndex();
    scrollSlideToView(current + 1, scrollSmooth);
    scheduleEdgeJump();
  }

  var scrollT = null;
  var settleT = null;
  scroller.addEventListener(
    'scroll',
    function () {
      if (settleT) clearTimeout(settleT);
      settleT = setTimeout(function () {
        settleT = null;
        maybeUnjumpClone();
      }, prefersReduced ? 80 : 320);

      if (scrollT) return;
      scrollT = requestAnimationFrame(function () {
        scrollT = null;
        syncActiveFromScroll();
      });
    },
    { passive: true }
  );

  scroller.addEventListener('scrollend', function () {
    maybeUnjumpClone();
  });

  scroller.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  });

  var userInteracting = false;
  var interactionTimeout = null;

  function resetInteractionTimeout() {
    userInteracting = true;
    if (interactionTimeout) clearTimeout(interactionTimeout);
    interactionTimeout = setTimeout(function () {
      userInteracting = false;
    }, 3000);
  }

  scroller.addEventListener('wheel', resetInteractionTimeout, { passive: true });
  scroller.addEventListener('touchstart', resetInteractionTimeout, { passive: true });
  scroller.addEventListener('pointerdown', resetInteractionTimeout, { passive: true });

  var wrapper = gallery ? gallery.parentElement : null;
  if (wrapper) {
    wrapper.addEventListener('mouseenter', function () {
      carouselPaused = true;
    });
    wrapper.addEventListener('mouseleave', function () {
      carouselPaused = false;
    });
    wrapper.addEventListener('focusin', function () {
      carouselPaused = true;
    });
    wrapper.addEventListener('focusout', function () {
      carouselPaused = false;
    });
  }

  function marqueeTick() {
    if (!prefersReduced && realCount >= 2 && !carouselPaused && !userInteracting && !document.hidden) {
      scroller.scrollLeft += MARQUEE_SPEED;
    }
    maybeUnjumpClone();
    syncActiveFromScroll();
    marqueeRaf = requestAnimationFrame(marqueeTick);
  }

  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    for (var j = 0; j < realCount; j++) {
      (function (idx) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'education-gallery__dot' + (idx === 0 ? ' is-active' : '');
        b.setAttribute('aria-label', 'Go to image ' + (idx + 1));
        if (idx === 0) b.setAttribute('aria-current', 'true');
        b.addEventListener('click', function () {
          scrollToLogical(idx);
        });
        dotsWrap.appendChild(b);
      })(j);
    }
  }

  function bootPositionAndMarquee() {
    if (realCount >= 2) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          jumping = true;
          scrollSlideToView(realCount, 'auto');
          activeLogical = 0;
          jumping = false;
          updateDots();
          if (!prefersReduced) {
            marqueeRaf = requestAnimationFrame(marqueeTick);
          }
        });
      });
    } else {
      updateDots();
    }
  }

  bootPositionAndMarquee();
}

function renderGraphicsBento() {
  var container = document.getElementById('graphicsGalleryScroller');
  if (!container) return;

  var html = '';
  designs.forEach(function (item, index) {
    var escTitle = escapeHtml(item.title);
    var escSrc = escapeHtml(item.img);
    var ratioVal = item.ratio && Number.isFinite(item.ratio) ? item.ratio.toFixed(4) : '1.0000';
    html +=
      '<figure class="education-gallery__slide" style="cursor: pointer; position: relative; aspect-ratio: ' +
      ratioVal +
      ';" data-design-index="' +
      index +
      '" aria-label="View larger: ' +
      escTitle +
      '">' +
      '<img src="' +
      escSrc +
      '" alt="' +
      escTitle +
      '" loading="lazy" decoding="async" />' +
      '<span class="graphics-bento__cap" aria-hidden="true">' +
      escTitle +
      '</span>' +
      '</figure>';
  });
  container.innerHTML = html;
  initGraphicsCarousel();
}

function bindGraphicsDelegation() {
  var container = document.getElementById('graphicsGalleryScroller');
  if (!container || container.dataset.delegationBound === '1') return;
  container.dataset.delegationBound = '1';
  container.addEventListener('click', function (event) {
    var trigger = event.target.closest('.education-gallery__slide[data-design-index]');
    if (!trigger) return;
    var idx = Number(trigger.getAttribute('data-design-index'));
    if (!Number.isFinite(idx)) return;
    openDesignModal(idx);
  });
}

function createToolPills(arr) {
  return arr
    .map(function (item) {
      return (
        '<span class="text-xs px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-700 font-medium">' +
        escapeHtml(item) +
        '</span>'
      );
    })
    .join('');
}

function openDesignModal(index) {
  var item = designs[index];
  if (!item) return;

  var modal = document.getElementById('designModal');
  var body = document.getElementById('designModalBody');
  if (!modal || !body) return;

  var roleChips = item.tools && item.tools.length ? createToolPills(item.tools) : '';
  var descBlock =
    item.desc && String(item.desc).trim()
      ? '<p class="design-modal-desc">' + escapeHtml(item.desc) + '</p>'
      : '';
  var tagsBlock = roleChips ? '<div class="design-modal-tags">' + roleChips + '</div>' : '';

  body.innerHTML =
    '<article class="design-modal-content">' +
    '<div class="design-modal-image-wrap">' +
    '<img src="' +
    escapeHtml(item.img) +
    '" alt="' +
    escapeHtml(item.title) +
    '" class="design-modal-image" />' +
    '</div>' +
    '<p class="design-modal-category">Graphic design</p>' +
    '<h4 class="design-modal-title">' +
    escapeHtml(item.title) +
    '</h4>' +
    descBlock +
    tagsBlock +
    '</article>';

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeDesignModal() {
  var modal = document.getElementById('designModal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function bindDesignModal() {
  var modal = document.getElementById('designModal');
  if (!modal || modal.dataset.modalBound === '1') return;
  modal.dataset.modalBound = '1';

  var closeBtn = document.getElementById('closeDesignModal');
  var backdrop = document.querySelector('[data-close-design]');

  if (closeBtn) closeBtn.addEventListener('click', closeDesignModal);
  if (backdrop) backdrop.addEventListener('click', closeDesignModal);

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (modal.classList.contains('is-open')) {
      closeDesignModal();
    }
  });
}

function initGraphicsGallery() {
  Promise.all(GRAPHICS_FILES.map(function (f) {
    return loadImageMeta(GRAPHICS_BASE + f);
  })).then(function (metas) {
    designs = GRAPHICS_FILES.map(function (file, i) {
      var w = metas[i].w;
      var h = metas[i].h;
      var r = h > 0 ? w / h : 1;
      return {
        title: titleFromFilename(file, i),
        img: GRAPHICS_BASE + file,
        bento: bentoSlotFromRatio(r),
        ratio: r,
      };
    });
    renderGraphicsBento();
    bindGraphicsDelegation();
    bindDesignModal();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGraphicsGallery);
} else {
  initGraphicsGallery();
}
