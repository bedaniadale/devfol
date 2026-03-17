
  document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');

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
      const currentTheme = root.getAttribute('data-theme');
      if (currentTheme) return currentTheme;
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

    const counters = document.querySelectorAll('.count-up');

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      // Show final value immediately
      counter.textContent = target;
    });

    // Make all reveal elements visible immediately
    const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
    revealEls.forEach(el => {
      el.classList.add('is-visible');
    });

    // CV modal
    const cvModal = document.getElementById('cvModal');
    const openCvModal = document.getElementById('openCvModal');
    const closeCvModal = document.getElementById('closeCvModal');
    const closeCvBackdrop = document.querySelector('[data-close-cv]');

    if (cvModal && openCvModal) {
      const openModal = () => {
        cvModal.classList.add('is-open');
        cvModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
      };

      const closeModal = () => {
        cvModal.classList.remove('is-open');
        cvModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
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

