
  document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.count-up');

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const duration = 1200; // in ms
      const increment = target / (duration / 16); // ~60fps

      const update = () => {
        count += increment;
        if (count < target) {
          counter.textContent = Math.floor(count);
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
          // Optional: add typing animation class
     
        }
      };

      update();
    });

    // IntersectionObserver for reveal animations
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));

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

