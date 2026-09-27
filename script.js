const nav = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
});

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const light = document.body.classList.contains("light");
  themeToggle.textContent = light ? "☀" : "☾";
  localStorage.setItem("portfolio-theme", light ? "light" : "dark");
});

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");
    const selected = filter.dataset.filter;

    projects.forEach(project => {
      project.classList.toggle(
        "hidden",
        selected !== "all" && project.dataset.category !== selected
      );
    });
  });
});

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalLinks = document.getElementById("modalLinks");

document.querySelectorAll(".details-btn").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".project-card");
    modalTitle.textContent = card.dataset.title;
    modalDescription.textContent = card.dataset.description;
    modalTech.innerHTML = card.dataset.tech
      .split(",")
      .map(item => `<span>${item.trim()}</span>`)
      .join("");

    const links = [];
    if (card.dataset.demo) {
      links.push(`<a class="modal-link primary-link" href="${card.dataset.demo}" target="_blank" rel="noopener">Live Demo ↗</a>`);
    }
    if (card.dataset.github) {
      links.push(`<a class="modal-link" href="${card.dataset.github}" target="_blank" rel="noopener">GitHub ↗</a>`);
    }
    if (card.dataset.backend) {
      links.push(`<a class="modal-link" href="${card.dataset.backend}" target="_blank" rel="noopener">Backend API ↗</a>`);
    }
    modalLinks.innerHTML = links.join("");

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalBackdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
