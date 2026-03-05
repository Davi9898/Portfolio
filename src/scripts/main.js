import projectsData from '../data/projects.json';

// ─────────────────────────────────────────────────────────────
// Loader
// ─────────────────────────────────────────────────────────────
function initLoader() {
  const loader  = document.getElementById('loader');
  const numEl   = document.getElementById('loader-num');
  const barEl   = document.getElementById('loader-bar');

  if (!loader || !numEl || !barEl) return;

  let count = 0;
  const total    = 100;
  const duration = 1600; // ms
  const step     = duration / total;

  const tick = setInterval(() => {
    count += 1;
    numEl.textContent = count;
    barEl.style.width = `${count}%`;

    if (count >= total) {
      clearInterval(tick);
      setTimeout(() => loader.classList.add('hidden'), 250);
    }
  }, step);
}

// ─────────────────────────────────────────────────────────────
// Custom cursor
// ─────────────────────────────────────────────────────────────
function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring) return;

  // No fancy cursor on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  let dotX = -100, dotY = -100;
  let ringX = -100, ringY = -100;
  let visible = false;

  document.addEventListener('mousemove', (e) => {
    dotX = e.clientX;
    dotY = e.clientY;
    if (!visible) {
      // Teleport ring to cursor position on first move to avoid sliding in from corner
      ringX = dotX;
      ringY = dotY;
      visible = true;
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    }
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (visible) {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    }
  });

  // Smooth ring lag via rAF
  function animateCursor() {
    dot.style.transform = `translate(calc(${dotX}px - 50%), calc(${dotY}px - 50%))`;

    ringX += (dotX - ringX) * 0.11;
    ringY += (dotY - ringY) * 0.11;
    ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover state
  function addHover(el) {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('is-hovering');
      ring.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('is-hovering');
      ring.classList.remove('is-hovering');
    });
  }

  document.querySelectorAll('a, button, .chip, .marquee-item').forEach(addHover);

  // Re-apply to dynamically added elements (project cards rendered later)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      m.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        node.querySelectorAll?.('a, button').forEach(addHover);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// ─────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────
function initNav() {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('nav-burger');
  const drawer = document.getElementById('nav-drawer');

  if (!nav) return;

  // Scroll class
  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  burger?.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
    drawer?.classList.toggle('is-open', isOpen);
    drawer?.setAttribute('aria-hidden', String(!isOpen));
  });

  // Close drawer on link click
  drawer?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      burger?.classList.remove('is-open');
      burger?.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
    });
  });
}

// ─────────────────────────────────────────────────────────────
// Smooth anchor scroll
// ─────────────────────────────────────────────────────────────
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const navH = document.getElementById('nav')?.offsetHeight ?? 72;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}

// ─────────────────────────────────────────────────────────────
// Scroll reveal (IntersectionObserver)
// ─────────────────────────────────────────────────────────────
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((el) => io.observe(el));
}

// ─────────────────────────────────────────────────────────────
// Projects
// ─────────────────────────────────────────────────────────────
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid || !Array.isArray(projectsData) || !projectsData.length) return;

  const html = projectsData.map((p, i) => {
    const num  = String(i + 1).padStart(2, '0');
    const tags = (p.tags ?? [])
      .map((t) => `<span class="project-tag">${t}</span>`)
      .join('');

    const links = [];
    if (p.liveUrl) {
      links.push(buildLink(p.liveUrl, 'Live', p.external));
    }
    if (p.link && p.link !== p.liveUrl) {
      links.push(buildLink(p.link, p.external ? 'Code' : 'View', p.external));
    }

    const linksHtml = links.length
      ? `<div class="project-links">${links.join('')}</div>`
      : '';

    return `
      <article
        class="project-card"
        style="--card-delay: ${i * 0.07}s"
        aria-label="Project: ${p.title}"
      >
        <span class="project-num" aria-hidden="true">${num}</span>
        <div class="project-tags" aria-label="Technologies">${tags}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        ${linksHtml}
      </article>
    `;
  });

  grid.innerHTML = html.join('');

  // Reveal cards on scroll with stagger
  const cards = grid.querySelectorAll('.project-card');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card  = entry.target;
        const delay = card.style.getPropertyValue('--card-delay') || '0s';
        card.style.transitionDelay = delay;
        card.classList.add('is-visible');
        io.unobserve(card);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );

  cards.forEach((card) => io.observe(card));
}

function buildLink(href, label, external) {
  const attrs = external
    ? `target="_blank" rel="noopener noreferrer"`
    : '';
  return `
    <a href="${href}" class="project-link" ${attrs}>
      <span>${label}</span>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path d="M1.5 9.5L9.5 1.5M9.5 1.5H4M9.5 1.5V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
  `;
}

// ─────────────────────────────────────────────────────────────
// 3-D card tilt on mouse move
// ─────────────────────────────────────────────────────────────
function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  // Use a single delegated listener for performance
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest?.('.project-card');
    if (!card) return;

    const r  = card.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const rx = ((e.clientY - cy) / (r.height / 2)) * -5;
    const ry = ((e.clientX - cx) / (r.width  / 2)) *  5;

    card.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px) translateY(0)`;
  });

  document.addEventListener('mouseleave', (e) => {
    const card = e.target.closest?.('.project-card');
    if (!card) return;
    card.style.transform = '';
  }, true);

  // Smooth reset when leaving the card
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.65s cubic-bezier(0.16,1,0.3,1), border-color 340ms ease, box-shadow 340ms ease';
      card.style.transform  = '';
      setTimeout(() => {
        card.style.transition = '';
      }, 450);
    });
  });
}

// ─────────────────────────────────────────────────────────────
// Marquee: ensure it's always a seamless loop
// ─────────────────────────────────────────────────────────────
function initMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;
  // Items are already duplicated in HTML; animation handles the loop
}

// ─────────────────────────────────────────────────────────────
// Contact form — mailto fallback
// ─────────────────────────────────────────────────────────────
function initContactForm() {
  const form      = document.getElementById('contact-form');
  const statusEl  = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameEl    = form.querySelector('[name="name"]');
    const emailEl   = form.querySelector('[name="email"]');
    const msgEl     = form.querySelector('[name="message"]');
    let valid = true;

    // Simple inline validation
    [nameEl, emailEl, msgEl].forEach((el) => {
      el.classList.remove('has-error');
      if (!el.value.trim()) {
        el.classList.add('has-error');
        valid = false;
      }
    });
    if (emailEl && !/\S+@\S+\.\S+/.test(emailEl.value)) {
      emailEl.classList.add('has-error');
      valid = false;
    }

    if (!valid) {
      if (statusEl) {
        statusEl.textContent = 'Please fill in all fields correctly.';
        statusEl.className   = 'form-note is-error';
      }
      return;
    }

    const name    = nameEl.value.trim();
    const email   = emailEl.value.trim();
    const message = msgEl.value.trim();

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href =
      `mailto:danielvink1998@gmail.com?subject=${subject}&body=${body}`;

    // Optimistic feedback
    if (statusEl) {
      statusEl.textContent = 'Opening your mail client…';
      statusEl.className   = 'form-note is-success';
    }
    form.reset();
  });
}

// ─────────────────────────────────────────────────────────────
// Footer year
// ─────────────────────────────────────────────────────────────
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// ─────────────────────────────────────────────────────────────
// Boot
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initNav();
  initSmoothScroll();
  setYear();

  // Render projects immediately so scroll observer picks them up
  renderProjects();
  initContactForm();

  // Delay reveal observers until loader animation finishes
  const revealDelay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 2000;
  setTimeout(() => {
    initScrollReveal();
    initCardTilt();
    initMarquee();
  }, revealDelay);
});
