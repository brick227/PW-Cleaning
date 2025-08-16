/* PW Cleaning – script.js (stable) */
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for in-page links only
  const header = document.querySelector(".site-header");
  const headerOffset = header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return; // do nothing
      const target = document.querySelector(href);
      if (!target) return;               // let the browser handle it if not found
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // Contact form quick validation (works with Formspree)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      const name = form.querySelector('[name="name"]')?.value.trim();
      const email = form.querySelector('[name="email"]')?.value.trim();
      const msg = form.querySelector('[name="message"]')?.value.trim();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
      if (!name || !ok || !msg) {
        e.preventDefault();
        alert("Please enter your name, a valid email, and a message.");
      }
    });
  }
});