document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     SMOOTH IN-PAGE NAVIGATION
     ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach((a) => {

    a.addEventListener("click", (e) => {

      const target = document.querySelector(
        a.getAttribute("href")
      );

      if (target) {

        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  /* =========================================
     SCROLL REVEAL ANIMATIONS
     ========================================= */

  const revealItems = document.querySelectorAll(
    ".section, .metrics > div, .card, .project-step, .architecture-card, .migration-graphic, .edge-graphic"
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal");
  });


  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });


  /* =========================================
     EXPERIENCE METRIC COUNTERS
     ========================================= */

  const metrics = document.querySelectorAll(
    ".metrics strong"
  );


  const animateMetric = (element) => {

    const original = element.textContent.trim();

    const match = original.match(
      /([\d,]+)(.*)/
    );

    if (!match) return;

    const target = Number(
      match[1].replace(/,/g, "")
    );

    const suffix = match[2] || "";

    const duration = 900;

    const start = performance.now();


    const tick = (now) => {

      const progress = Math.min(
        (now - start) / duration,
        1
      );


      const eased =
        1 - Math.pow(1 - progress, 3);


      const value =
        Math.floor(target * eased);


      element.textContent =
        value.toLocaleString("en-IN") +
        suffix;


      if (progress < 1) {

        requestAnimationFrame(tick);

      } else {

        element.textContent = original;

      }

    };


    requestAnimationFrame(tick);

  };


  const metricObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            animateMetric(entry.target);

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.5
      }
    );


  metrics.forEach((metric) => {

    metricObserver.observe(metric);

  });

});
