# Portfolio profesional — Noèlia González Casas

Portfolio personal realizado para la práctica de DAW. Funciona a la vez como currículum y como muestra de proyectos, para que una empresa entienda mi perfil de un vistazo y pueda comprobarlo en mi código.

**Versión publicada:** https://noelia287.github.io/portfolio/ (cambia la URL si tu repositorio se llama distinto)

## Objetivo

Presentar mi perfil, competencias, experiencia y formación de forma clara y visual. La sección de proyectos se carga sola desde la API pública de GitHub (`js/script.js`), así que el portfolio se mantiene vivo: al subir un repositorio nuevo aparece aquí sin tocar el código.

## Tecnologías

- HTML5 semántico
- CSS3 propio (variables, grid, flexbox, diseño responsive, tema oscuro, animaciones al hacer scroll)
- JavaScript sin librerías (`fetch` a la API de GitHub, `IntersectionObserver`, menú responsive)
- Tipografías Space Grotesk y DM Sans (Google Fonts)

## Estructura

```text
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── favicon.svg
│   └── favicon.png
└── README.md
```

## Visualización local

Abre `index.html` directamente en el navegador o utiliza Live Server desde Visual Studio Code.

## Publicación

Está pensado para publicarse con GitHub Pages: en el repositorio, `Settings > Pages > Deploy from a branch`, rama `main` y carpeta `/ (root)`.

## Personalizar

- Textos: `index.html`.
- Colores y tipografías: variables al inicio de `css/style.css`.
- Proyectos: se leen de GitHub. Añade una descripción a cada repositorio (y topics, si quieres etiquetas) y aparecerá aquí automáticamente.
