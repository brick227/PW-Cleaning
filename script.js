/* PW Cleaning - Script.js */

// Smooth scroll for nav links
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 50,
        behavior: "smooth"
      });
    }
  });
});

// Simple form submission (mock for now)
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get form values
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    if (name && email && message) {
      alert(`Thank you, ${name}! We have received your message and will contact you soon.`);
      form.reset();
    } else {
      alert("Please fill in all fields before submitting.");
    }
  });
}

// Example: Placeholder for appointments integration
// Later, this can connect to Glide/Adalo app
function bookAppointment(date, time) {
  console.log(`Booking appointment for ${date} at ${time}...`);
  alert(`Appointment booked for ${date} at ${time}!`);
}