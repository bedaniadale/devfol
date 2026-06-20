
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const applyTheme = (theme) => {
    const normalizedTheme = theme === 'dark' ? 'dark' : 'light';
    const isDark = normalizedTheme === 'dark';
    root.setAttribute('data-theme', normalizedTheme);
    try {
      localStorage.setItem('portfolio-theme', normalizedTheme);
    } catch (e) {
      // Ignore storage restrictions and keep in-memory theme.
    }

    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      const icon = themeToggle.querySelector('i');
      const label = themeToggle.querySelector('.theme-toggle-label');
      if (icon) {
        icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
      if (label) {
        label.textContent = isDark ? 'Light' : 'Dark';
      }
    }
  };

  const getInitialTheme = () => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  applyTheme(getInitialTheme());
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
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
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  const counters = document.querySelectorAll('.count-up');

  const setCounterFinal = (el) => {
    const target = +el.getAttribute('data-target');
    el.textContent = Number.isFinite(target) ? target : 0;
  };

  const runCountUp = (el) => {
    const target = +el.getAttribute('data-target');
    if (!Number.isFinite(target)) return;
    const duration = 1200;
    const start = performance.now();
    const from = 0;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      el.textContent = Math.round(from + (target - from) * eased);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    };
    requestAnimationFrame(tick);
  };

  const statsRoot = document.querySelector('.about-stats');
  if (prefersReducedMotion) {
    counters.forEach(setCounterFinal);
  } else if (statsRoot) {
    counters.forEach((el) => {
      el.textContent = '0';
    });
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          counters.forEach(runCountUp);
          statsObserver.disconnect();
        });
      },
      { rootMargin: '0px 0px -20% 0px', threshold: 0.2 }
    );
    statsObserver.observe(statsRoot);
  } else {
    counters.forEach(setCounterFinal);
  }

  /* Rotating role titles in the hero */
  const roleEl = document.getElementById('roleRotator');
  if (roleEl) {
    const roles = [
      'Software Engineer',
      'UX/UI · Graphic Designer',
    ];
    let roleIdx = 0;
    const setRole = (text, animate) => {
      if (animate) {
        roleEl.classList.remove('role-in');
        roleEl.classList.add('role-out');
        setTimeout(() => {
          roleEl.textContent = text;
          roleEl.classList.remove('role-out');
          roleEl.classList.add('role-in');
        }, 280);
      } else {
        roleEl.textContent = text;
        roleEl.classList.add('role-in');
      }
    };
    setRole(roles[0], false);
    if (!prefersReducedMotion) {
      setInterval(() => {
        roleIdx = (roleIdx + 1) % roles.length;
        setRole(roles[roleIdx], true);
      }, 2800);
    }
  }

  /* Stagger-in children of any container marked with data-stagger */
  if (!prefersReducedMotion) {
    document.querySelectorAll('[data-stagger]').forEach(function (parent) {
      var items = Array.from(parent.children);
      items.forEach(function (child, i) {
        child.classList.add('si');
        child.style.setProperty('--sd', (i * 40) + 'ms');
      });
      var staggerObs = new IntersectionObserver(
        function (entries) {
          if (!entries[0].isIntersecting) return;
          items.forEach(function (child) { child.classList.add('in'); });
          staggerObs.disconnect();
        },
        { rootMargin: '0px 0px -40px 0px', threshold: 0.04 }
      );
      staggerObs.observe(parent);
    });
  } else {
    document.querySelectorAll('[data-stagger] > *').forEach(function (child) {
      child.classList.add('si', 'in');
    });
  }

  /* ── Side-nav scroll tracking + parallax (shared rAF handler) ── */
  var heroAvatarEl  = document.getElementById('heroAvatar');
  var heroShellEl   = document.querySelector('.hero-shell');
  var sideNavItems  = document.querySelectorAll('.side-nav-item[data-nav]');
  var sideNavIds    = sideNavItems.length
    ? Array.from(sideNavItems).map(function (i) { return i.dataset.nav; })
    : [];

  var setSideActive = function (id) {
    sideNavItems.forEach(function (item) {
      item.classList.toggle('is-active', item.dataset.nav === id);
    });
  };
  if (sideNavIds.length) setSideActive(sideNavIds[0]);  /* starts at About */

  /* Smooth scroll on click */
  sideNavItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById(item.dataset.nav);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* Shared scroll handler — nav tracking & parallax */
  var scrollTick = false;
  var runScroll = function () {
    var scrollY  = window.scrollY;
    var vpH      = window.innerHeight;
    var docH     = document.documentElement.scrollHeight;

    /* --- Parallax: hero avatar floats up slower than page --- */
    if (!prefersReducedMotion && heroAvatarEl) {
      var heroH = heroShellEl ? heroShellEl.offsetHeight : 400;
      if (scrollY < heroH * 1.8) {
        heroAvatarEl.style.transform = 'translateY(' + (scrollY * 0.22).toFixed(1) + 'px)';
      }
    }

    /* --- Nav tracking --- */
    if (sideNavIds.length) {
      /* Bottom of page → always activate Contact */
      if (scrollY + vpH >= docH - 80) {
        setSideActive('contact');
      } else {
        /* Section whose top most recently crossed 28 % from viewport top */
        var triggerY = scrollY + vpH * 0.28;
        var active   = sideNavIds[0];
        sideNavIds.forEach(function (id) {
          var el = document.getElementById(id);
          if (!el) return;
          var top = el.getBoundingClientRect().top + scrollY;
          if (top <= triggerY) active = id;
        });
        setSideActive(active);
      }
    }

    scrollTick = false;
  };

  /* Lenis smooth scroll — falls back to native if unavailable or reduced-motion */
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    var lenis = new Lenis({
      lerp: 0.1, /* more responsive than fixed duration */
      smoothWheel: true,
      syncTouch: false, /* keep native inertia on touch screens */
    });

    /* Expose so modals can pause/resume background smooth-scroll */
    window.__lenis = lenis;

    /* Pipe Lenis scroll events into our existing runScroll */
    lenis.on('scroll', function () {
      if (!scrollTick) {
        requestAnimationFrame(runScroll);
        scrollTick = true;
      }
    });

    /* Drive Lenis with its own RAF loop */
    (function lenisRaf(time) {
      lenis.raf(time);
      requestAnimationFrame(lenisRaf);
    }(performance.now()));

    /* Make side-nav clicks use Lenis for consistent easing */
    sideNavItems.forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.getElementById(item.dataset.nav);
        if (target) lenis.scrollTo(target, { offset: -24 });
      });
    });

  } else {
    /* Fallback: native passive scroll listener */
    window.addEventListener('scroll', function () {
      if (!scrollTick) {
        requestAnimationFrame(runScroll);
        scrollTick = true;
      }
    }, { passive: true });
  }

  /* Run once on load so nav + parallax reflect initial position */
  runScroll();

  const cvModal = document.getElementById('cvModal');
  const openCvModal = document.getElementById('openCvModal');
  const closeCvModal = document.getElementById('closeCvModal');
  const closeCvBackdrop = document.querySelector('[data-close-cv]');

  if (cvModal && openCvModal) {
    const openModal = () => {
      cvModal.classList.add('is-open');
      cvModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      if (window.__lenis) window.__lenis.stop();
    };

    const closeModal = () => {
      cvModal.classList.remove('is-open');
      cvModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      if (window.__lenis) window.__lenis.start();
    };

    openCvModal.addEventListener('click', openModal);
    if (closeCvModal) closeCvModal.addEventListener('click', closeModal);
    if (closeCvBackdrop) closeCvBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cvModal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }
});
