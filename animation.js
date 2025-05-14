
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
  });

