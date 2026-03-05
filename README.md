# Portfolio — Daniël Vink

Minimal, modern portfolio built with **plain HTML, CSS, and JavaScript** and **Vite**. No framework.

## Run locally

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

## Build

```bash
npm run build
```

Output is in `dist/`. Preview with:

```bash
npm run preview
```

## Project structure

- **`index.html`** — Single page: nav, hero, projects, about, contact footer.
- **`src/scripts/main.js`** — Renders project cards from JSON, nav scroll, scroll-reveal animations.
- **`src/data/projects.json`** — Project data (title, description, image, link, liveUrl, tags).
- **`src/styles/`** — Design system in `variables.css`; components: nav, hero, projects, about, footer; animations and utilities.

## Editing projects

Edit `src/data/projects.json`. Each project can have:

- `title`, `description`, `image`, `link` (code/repo URL)
- `liveUrl` (optional) — show a “Live” button when set
- `tags` — array of 1–3 tags
- `external` — open in new tab when true

## Design

- **Typography:** Poppins, type scale and 8px spacing grid in `variables.css`.
- **Animations:** Fade + translate on section enter; staggered project cards; `prefers-reduced-motion` respected.
- **Accessibility:** Skip link, focus states, semantic HTML, sufficient contrast.

## Author

Daniël Vink — [GitHub](https://github.com/Davi9898)
