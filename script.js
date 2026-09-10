
const progress = document.getElementById("progressBar");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const glow = document.querySelector(".cursor-glow");
const card = document.querySelector(".profile-card");

function updateProgress() {
  if (!progress) return;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = height > 0 ? (window.scrollY / height) * 100 : 0;
  progress.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("load", updateProgress);

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}

if (glow && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

if (card && window.matchMedia("(pointer:fine)").matches) {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotate(3deg)";
  });
}
