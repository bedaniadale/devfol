/**
 * About-section carousel: infinite auto-scroll (no arrows), clone-based loop,
 * pause on hover/focus, respects prefers-reduced-motion.
 */
(function () {
  function init() {
    var scroller = document.getElementById('eduGalleryScroller');
    var eduGallery = document.getElementById('eduGallery');
    var dotsWrap = document.getElementById('eduGalleryDots');
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

    /** Pixels per frame (~0.5 at 60fps ≈ 30px/s; smooth infinite drift) */
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
      el.scrollIntoView({
        behavior: behavior || scrollSmooth,
        inline: 'center',
        block: 'nearest',
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
      scroller.style.scrollBehavior = 'auto'; // override CSS smooth scrolling
      scrollSlideToView(targetDi, 'auto');
      activeLogical = logicalFromDomIndex(targetDi);
      // Wait a frame before restoring smooth behavior and clearing jumping flag
      requestAnimationFrame(function () {
        scroller.style.scrollBehavior = '';
        jumping = false;
        updateDots();
      });
    }

    function maybeUnjumpClone() {
      if (realCount < 2 || jumping) return;
      var di = centeredDomIndex();
      
      // If we've scrolled into the prepended clones at the beginning
      if (di < realCount) {
        jumpToDi(di + realCount);
      }
      // If we've scrolled into the appended clones at the end
      else if (di >= 2 * realCount) {
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

    var row = document.querySelector('.about-carousel-row');
    if (row) {
      row.addEventListener('mouseenter', function () {
        carouselPaused = true;
      });
      row.addEventListener('mouseleave', function () {
        carouselPaused = false;
      });
    }
    if (eduGallery) {
      eduGallery.addEventListener('focusin', function () {
        carouselPaused = true;
      });
      eduGallery.addEventListener('focusout', function () {
        carouselPaused = false;
      });
    }

    function marqueeTick() {
      if (!prefersReduced && realCount >= 2 && !carouselPaused && !document.hidden) {
        scroller.scrollLeft += MARQUEE_SPEED;
      }
      maybeUnjumpClone();
      syncActiveFromScroll();
      marqueeRaf = requestAnimationFrame(marqueeTick);
    }

    if (dotsWrap) {
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
