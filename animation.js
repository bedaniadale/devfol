
  document.addEventListener('DOMContentLoaded', () => {
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

    // CV dropdown toggle
    const cvDropdown = document.getElementById('cvDropdown');
    if (cvDropdown) {
      const button = cvDropdown.querySelector('button');
      const menu = cvDropdown.querySelector('div[role="menu"]');
      if (button && menu) {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          menu.classList.toggle('hidden');
        });
        document.addEventListener('click', () => menu.classList.add('hidden'));
      }
    }
  });

