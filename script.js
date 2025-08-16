/* PW Cleaning – script.js (refined) */

/* ========== Smooth scroll for internal anchor links ========== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // header height buffer
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ========== Sticky header shadow on scroll ========== */
const header = document.querySelector('.site-header');
const onScroll = () => {
  if (!header) return;
  header.classList.toggle('with-shadow', window.scrollY > 4);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ========== Make entire service card clickable (fallback) ========== */
document.querySelectorAll('.service').forEach(card => {
  // If not already wrapped by <a class="service-link">, click the first link inside
  if (!card.closest('a.service-link')) {
    const inner = card.querySelector('a[href]');
    if (inner) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => { window.location.href = inner.href; });
    }
  }
});

/* ========== AJAX Formspree submit with inline feedback ========== */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    const isFormspree = /formspree\.io\/f\//i.test(form.action);
    if (!isFormspree) return; // allow normal submit for other providers
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const prev = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

    let msg = form.querySelector('.form-message');
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'form-message';
      form.appendChild(msg);
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (res.ok) {
        form.reset();
        msg.textContent = 'Thanks! We received your request and will contact you shortly.';
        msg.style.color = '#2e7d32';
      } else {
        msg.textContent = 'Something went wrong. Please try again or text/call us.';
        msg.style.color = '#c62828';
      }
    } catch {
      msg.textContent = 'Network error. Please check your connection and try again.';
      msg.style.color = '#c62828';
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = prev; }
    }
  });
}

/* ========== Simple Lightbox for gallery images (.gallery-item) ========== */
(function setupLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  const img = document.createElement('img');
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  const open = (src, alt) => {
    img.src = src;
    img.alt = alt || '';
    overlay.style.display = 'flex';
  };
  const close = () => { overlay.style.display = 'none'; };

  items.forEach(el => {
    el.addEventListener('click', () => open(el.src, el.alt));
    el.style.cursor = 'zoom-in';
  });

  overlay.addEventListener('click', close);
  window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

/* ========== Auto-year in footer (use <span id="year"></span>) ========== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();