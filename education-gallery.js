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
      var cloneLast = originals[realCount - 1].cloneNode(true);
      var cloneFirst = originals[0].cloneNode(true);
      cloneLast.classList.add('education-gallery__slide--clone');
      cloneFirst.classList.add('education-gallery__slide--clone');
      cloneLast.setAttribute('aria-hidden', 'true');
      cloneFirst.setAttribute('aria-hidden', 'true');
      var imCl = cloneLast.querySelector('img');
      var imCf = cloneFirst.querySelector('img');
      if (imCl) {
        imCl.alt = '';
        imCl.setAttribute('aria-hidden', 'true');
      }
      if (imCf) {
        imCf.alt = '';
        imCf.setAttribute('aria-hidden', 'true');
      }
      scroller.insertBefore(cloneLast, originals[0]);
      scroller.appendChild(cloneFirst);
      slides = Array.prototype.slice.call(scroller.querySelectorAll('.education-gallery__slide'));
    }

    var activeLogical = 0;
    var carouselPaused = false;
    var marqueeRaf = null;

    /** Pixels per frame (~0.5 at 60fps ≈ 30px/s; smooth infinite drift) */
    var MARQUEE_SPEED = 0.5;

    function domIndexForLogical(L) {
      return realCount >= 2 ? L + 1 : L;
    }

    function logicalFromDomIndex(di) {
      if (realCount < 2) return di;
      if (di === 0) return realCount - 1;
      if (di === slides.length - 1) return 0;
      return di - 1;
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

    function maybeUnjumpClone() {
      if (realCount < 2 || jumping) return;
      var di = centeredDomIndex();
      if (di === 0) {
        jumping = true;
        scrollSlideToView(realCount, 'auto');
        activeLogical = realCount - 1;
        requestAnimationFrame(function () {
          jumping = false;
          updateDots();
        });
        return;
      }
      if (di === slides.length - 1) {
        jumping = true;
        scrollSlideToView(1, 'auto');
        activeLogical = 0;
        requestAnimationFrame(function () {
          jumping = false;
          updateDots();
        });
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
      if (realCount < 2) {
        scrollToLogical(activeLogical - 1);
        return;
      }
      if (activeLogical === 0) {
        jumping = true;
        scrollSlideToView(0, scrollSmooth);
        activeLogical = realCount - 1;
        updateDots();
        jumping = false;
        scheduleEdgeJump();
      } else {
        scrollToLogical(activeLogical - 1);
      }
    }

    function goNext() {
      if (realCount < 2) {
        scrollToLogical(activeLogical + 1);
        return;
      }
      if (activeLogical === realCount - 1) {
        jumping = true;
        scrollSlideToView(slides.length - 1, scrollSmooth);
        activeLogical = 0;
        updateDots();
        jumping = false;
        scheduleEdgeJump();
      } else {
        scrollToLogical(activeLogical + 1);
      }
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
            scrollSlideToView(1, 'auto');
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
