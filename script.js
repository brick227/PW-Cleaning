/* PW Cleaning – script.js (stable) */
document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------
     Smooth scroll for hash links
     --------------------------- */
  const header = document.querySelector(".site-header"); // optional
  const headerOffset = header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      // Ignore plain "#" or external links
      if (!href || href === "#" || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });

  /* ---------------------------
     Contact form (optional)
     - Works if you add an id="contactForm"
       OR if it's the first <form> on the page
     - Validates name/email/message
     --------------------------- */
  const form =
    document.getElementById("contactForm") ||
    document.querySelector("form");

  if (form) {
    form.addEventListener("submit", e => {
      // If you're using Formspree/Getform, let the network submit happen
      // but we can still do a quick client validation.
      const nameEl =
        form.querySelector("#name") || form.querySelector('[name="name"]');
      const emailEl =
        form.querySelector("#email") || form.querySelector('[name="email"]');
      const msgEl =
        form.querySelector("#message") || form.querySelector('[name="message"]');

      // If any are missing, don't block submission—just exit quietly.
      if (!nameEl || !emailEl || !msgEl) return;

      const name = (nameEl.value || "").trim();
      const email = (emailEl.value || "").trim();
      const message = (msgEl.value || "").trim();

      // Basic email check
      const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOK || !message) {
        e.preventDefault(); // stop submit only if invalid
        alert("Please enter your name, a valid email, and a message.");
        return;
      }

      // Optional friendly confirmation if you're NOT posting to a backend.
      // If your form action posts to Formspree/Getform, you can remove this.
      // e.preventDefault();
      // alert(`Thank you, ${name}! We’ll contact you shortly.`);
      // form.reset();
    });
  }

  /* ---------------------------
     Placeholder booking hook
     --------------------------- */
  window.bookAppointment = function (date, time) {
    console.log(`Booking appointment for ${date} at ${time}…`);
    alert(`Appointment requested for ${date} at ${time}!`);
  };
});