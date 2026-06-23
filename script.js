(function () {
  "use strict";

  /* Sticky header on scroll */
  const header = document.querySelector(".site-header");
  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 60);
    lastScroll = y;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Hero mouse layer */
  const mouseLayer = document.getElementById("mouseLayer");
  const hero = document.querySelector(".hero");

  if (mouseLayer && hero) {
    hero.addEventListener("mousemove", function (e) {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mouseLayer.style.setProperty("--mouse-x", x + "%");
      mouseLayer.style.setProperty("--mouse-y", y + "%");
    });
  }

  /* Particles */
  const particlesContainer = document.getElementById("particles");
  if (particlesContainer) {
    const count = window.matchMedia("(max-width: 768px)").matches ? 20 : 40;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.setProperty("--dx", (Math.random() - 0.5) * 60 + "px");
      p.style.setProperty("--dy", (Math.random() - 0.5) * 60 + "px");
      p.style.setProperty("--float-duration", 10 + Math.random() * 15 + "s");
      p.style.setProperty("--float-delay", Math.random() * 5 + "s");
      particlesContainer.appendChild(p);
    }
  }

  /* Scroll reveal — IntersectionObserver */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Capability cards — 3D tilt on hover */
  document.querySelectorAll(".capability").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        "perspective(800px) rotateY(" + x * 8 + "deg) rotateX(" + -y * 8 + "deg) translateY(-4px)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

  /* Contact form — prevent default submit */
  const form = document.querySelector(".contact__form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = "Отправлено ✓";
      btn.disabled = true;
      btn.style.background = "var(--success)";
      setTimeout(function () {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = "";
        form.reset();
      }, 2500);
    });
  }
})();
