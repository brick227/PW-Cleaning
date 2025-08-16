/* PW Cleaning – script.js */

/* Wait for DOM */
document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Smooth scroll for in-page links
     (accounts for sticky header height)
  ========================== */
  const header = document.querySelector(".site-header");
  const headerOffset = header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return; // let normal nav proceed if not found
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  /* If the page loads with a hash, offset it so the header doesn't cover it */
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y });
    }
  }

  /* =========================
     Contact form (Formspree)
     - Light validation
     - Progressive enhancement: AJAX submit with thank-you message
       (falls back to normal POST if fetch fails)
  ========================== */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      // Basic validation
      const name = form.querySelector('[name="name"]')?.value.trim();
      const email = form.querySelector('[name="email"]')?.value.trim();
      const message = form.querySelector('[name="message"]')?.value.trim();
      const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");

      if (!name || !emailOK || !message) {
        e.preventDefault();
        alert("Please enter your name, a valid email, and a message.");
        return;
      }

      // Try AJAX submit so we can show a friendly success note in-page
      try {
        e.preventDefault();

        const data = new FormData(form);
        const res = await fetch(form.action, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: data
        });

        if (res.ok) {
          // Replace form with a thank-you block
          form.outerHTML = `
            <div class="note" role="status" aria-live="polite">
              <strong>Thanks, ${escapeHTML(name)}!</strong> We received your request and will contact you shortly.
            </div>`;
          // Optionally scroll to the thank-you
          const note = document.querySelector(".note");
          if (note) {
            const y = note.getBoundingClientRect().top + window.scrollY - headerOffset - 12;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        } else {
          // If Formspree returns an error, fall back to default submission
          form.submit();
        }
      } catch {
        // Network or CORS issues: fall back to normal submission
        form.submit();
      }
    });
  }
});

/* Utility to avoid injecting raw HTML from user fields */
function escapeHTML(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* Example stub for future app integrations (Glide/Adalo) */
function bookAppointment(date, time) {
  console.log(`Booking appointment for ${date} at ${time}...`);
  alert(`Appointment requested for ${date} at ${time}. We’ll confirm by email/text.`);
}