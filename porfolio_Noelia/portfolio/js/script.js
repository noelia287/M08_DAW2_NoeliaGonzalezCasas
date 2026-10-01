"use strict";

const GITHUB_USER = "noelia287";
const MAX_REPOS = 6;

const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = [...document.querySelectorAll(".nav-links a")];
const year = document.querySelector("#year");
const revealElements = document.querySelectorAll(".reveal");

// Año actual del footer
year.textContent = new Date().getFullYear();

// Cambiar aspecto del header al hacer scroll
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
});

// Menú responsive
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Cerrar el menú al seleccionar una sección
navLinkItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Resaltar en el menú la sección que se está viendo
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinkItems.forEach((a) => a.classList.toggle("active", a.hash === "#" + entry.target.id));
        });
    },
    { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

// Animaciones suaves al entrar en pantalla
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);
revealElements.forEach((element) => revealObserver.observe(element));

/* ---------- Proyectos: se leen de la API pública de GitHub ---------- */
/* Así el portfolio se mantiene vivo: al subir un repo nuevo aparece solo. */

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
}

function projectCard(repo, index) {
    const card = el("article", "project-card");

    const top = el("div", "project-top");
    top.append(el("span", "project-index", String(index + 1).padStart(2, "0")));
    top.append(el("span", "project-arrow", "↗"));

    const title = el("h3");
    const titleLink = el("a", "", repo.name);
    titleLink.href = repo.html_url;
    titleLink.target = "_blank";
    titleLink.rel = "noopener noreferrer";
    title.append(titleLink);

    const description = el("p", "", repo.description || "Sin descripción todavía. Añádela en GitHub y aparecerá aquí.");

    const tags = el("div", "tags");
    const tagValues = (repo.topics && repo.topics.length ? repo.topics : [repo.language]).filter(Boolean).slice(0, 3);
    tagValues.forEach((t) => tags.append(el("span", "", t)));

    const link = el("a", "", "Ver en GitHub →");
    link.href = repo.html_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    card.append(top, title, description, tags, link);
    return card;
}

async function loadRepos() {
    const grid = document.getElementById("projects-grid");
    try {
        const url = `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=30`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("GitHub respondió " + response.status);
        const repos = (await response.json()).filter((r) => !r.fork).slice(0, MAX_REPOS);
        if (!repos.length) {
            grid.replaceChildren(el("p", "muted", "Todavía no hay repositorios públicos."));
            return;
        }
        grid.replaceChildren(...repos.map(projectCard));
    } catch (error) {
        grid.replaceChildren(el("p", "muted", "No se han podido cargar los proyectos ahora mismo. Puedes verlos directamente en GitHub."));
    }
}

loadRepos();
