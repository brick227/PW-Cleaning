/* PW Cleaning – script.js */
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll
  const header = document.querySelector(".site-header");
  const headerOffset = header ? header.offsetHeight : 0;
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click", e=>{
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({top:y, behavior:"smooth"});
    });
  });

  // Contact form basic validation (works with Formspree)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", e=>{
      const name = form.querySelector('[name="name"]')?.value.trim();
      const email = form.querySelector('[name="email"]')?.value.trim();
      const message = form.querySelector('[name="message"]')?.value.trim();
      const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
      if (!name || !okEmail || !message) {
        e.preventDefault();
        alert("Please enter your name, a valid email, and a message.");
      }
    });
  }
});