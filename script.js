// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const menu = document.querySelector(".menu");

menuBtn?.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

// Close menu after clicking a link (mobile)
document.querySelectorAll("#menu a").forEach((a) => {
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
    menuBtn?.setAttribute("aria-label", "Open menu");
  });
});

// Active nav highlight on scroll
const sections = ["home", "beats", "collaborations", "about", "contact"].map(id => document.getElementById(id));
const navLinks = Array.from(document.querySelectorAll("#menu a")).filter(a => a.getAttribute("href")?.startsWith("#"));

const setActive = (id) => {
  navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
};

const onScroll = () => {
  const y = window.scrollY + 120;
  let current = "home";
  sections.forEach(sec => {
    if (sec && sec.offsetTop <= y) current = sec.id;
  });
  setActive(current);
};
window.addEventListener("scroll", onScroll);
onScroll();

// Beat filtering
const chips = document.querySelectorAll(".chip");
const beatCards = document.querySelectorAll(".beat-card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.dataset.filter;
    beatCards.forEach((card) => {
      const genre = card.dataset.genre;
      const show = filter === "all" || genre === filter;
      card.style.display = show ? "" : "none";
    });
  });
});

// Contact form (simple mailto fallback)
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

// Replace this with your real email
const TO_EMAIL = "yourmail@example.com";

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !subject || !message) {
    statusEl.textContent = "Please fill all fields.";
    return;
  }

  const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${encodeURIComponent(message)}`;
  const mailto = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;

  statusEl.textContent = "Opening your mail app…";
  window.location.href = mailto;

  // Optional reset
  setTimeout(() => {
    form.reset();
    statusEl.textContent = "Message draft created. Send it from your mail app.";
  }, 400);
});