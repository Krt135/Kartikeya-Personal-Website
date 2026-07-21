(function () {
  const canvas = document.getElementById("fluid-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const COUNT = 90;

  // Particles start uninitialized until a real size is found
  const particles = Array.from({ length: COUNT }, () => ({ x: 0, y: 0, vx: 0, vy: 0 }));

  const pointer = { x: -9999, y: -9999, active: false };
  let width = 0;
  let height = 0;
  let dimensionsInitialized = false;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;

    // Wait until CSS layout sets real pixel dimensions
    if (width === 0 || height === 0) return;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // If this is the first time finding a real dimension, randomize positions safely
    if (!dimensionsInitialized) {
      for (const p of particles) {
        p.x = Math.random();
        p.y = Math.random();
      }
      dimensionsInitialized = true;
    }
  }

  function step() {
    if (dimensionsInitialized && width > 0 && height > 0) {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        const px = p.x * width;
        const py = p.y * height;

        p.vx += (Math.random() - 0.5) * 0.0006;
        p.vy += (Math.random() - 0.5) * 0.0006;

        if (pointer.active) {
          const dx = px - pointer.x;
          const dy = py - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const radius = 90;
          if (dist < radius) {
            const force = (1 - dist / radius) * 0.9;
            p.vx += (dx / dist) * force * 0.02;
            p.vy += (dy / dist) * force * 0.02;
          }
        }

        p.vx *= 0.94;
        p.vy *= 0.94;
        p.vx += (0.5 - p.x) * 0.0009;
        p.vy += (0.5 - p.y) * 0.0009;

        p.x += p.vx;
        p.y += p.vy;

        p.x = Math.min(1, Math.max(0, p.x));
        p.y = Math.min(1, Math.max(0, p.y));
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ax = a.x * width;
        const ay = a.y * height;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const bx = b.x * width;
          const by = b.y * height;
          const dx = ax - bx;
          const dy = ay - by;
          const d2 = dx * dx + dy * dy;
          if (d2 < 46 * 46) {
            const alpha = 1 - Math.sqrt(d2) / 46;
            ctx.strokeStyle = `rgba(60, 110, 82, ${alpha * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(60, 110, 82, 0.85)";
        ctx.fill();
      }
    }

    if (!reducedMotion) {
      requestAnimationFrame(step);
    }
  }

  function toLocal(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  const observer = new ResizeObserver(() => resize());
  observer.observe(canvas);

  canvas.addEventListener("pointermove", (e) => {
    const { x, y } = toLocal(e.clientX, e.clientY);
    pointer.x = x; pointer.y = y; pointer.active = true;
  });
  canvas.addEventListener("pointerleave", () => pointer.active = false);
  canvas.addEventListener("pointerdown", (e) => {
    const { x, y } = toLocal(e.clientX, e.clientY);
    pointer.x = x; pointer.y = y; pointer.active = true;
  });

  step();
})();

(function () {
  const wrap = document.querySelector(".sim-embed");
  const frame = document.querySelector(".sim-embed-frame");
  if (!wrap || !frame) return;

  const NATIVE_W = 1600;
  const NATIVE_H = 900;

  // Set directly as inline styles, not a CSS class — so the reveal never
  // depends on the external stylesheet being loaded/reloaded at the right
  // moment.
  frame.style.transformOrigin = "center center";
  frame.style.opacity = "0";
  frame.style.transition = "opacity 0.4s ease";

  // ---- on-page debug readout (no DevTools required to see it) ----------
  const debugEl = document.getElementById("sim-debug");
  function logDebug(stage) {
    if (!debugEl) return;
    debugEl.textContent =
      `stage: ${stage}\n` +
      `wrap: ${wrap.clientWidth}x${wrap.clientHeight}\n` +
      `scale: ${frame.style.transform || "none"}\n` +
      `opacity: ${frame.style.opacity}\n` +
      `loaded: ${frame.dataset.loaded || "false"}\n` +
      `t: ${Date.now() % 100000}`;
  }
  // -------------------------------------------------------------------

  function fit() {
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    // Guard: never apply a scale computed from a transient/collapsed 0 size.
    if (!w || !h) {
      logDebug("fit-skip-zero-size");
      return;
    }
    const scale = Math.min(w / NATIVE_W, h / NATIVE_H);
    if (scale > 0) {
      frame.style.transform = `scale(${scale})`;
    }
    logDebug("fit");
  }

  function reveal() {
    frame.style.opacity = "1";
    logDebug("reveal");
  }

  fit();
  window.addEventListener("resize", fit);
  if (window.ResizeObserver) {
    new ResizeObserver(fit).observe(wrap);
  }

  frame.addEventListener("load", () => {
    frame.dataset.loaded = "true";
    logDebug("iframe-load-event");
    setTimeout(reveal, 350);
  });

  let loadAttempts = 0;

  function attemptLoad() {
    loadAttempts++;
    frame.dataset.loaded = "false";
    frame.src = "https://krt135.github.io/Fluid-Simulator/?cachebust=" + Date.now();
    logDebug("attempt-" + loadAttempts);
  }

  frame.addEventListener("load", () => {
    frame.dataset.loaded = "true";
    logDebug("iframe-load-event");
    setTimeout(reveal, 350);
  });

  attemptLoad();

  // If load hasn't fired within 3s, treat this attempt as failed/hung and retry.
  function watchdog() {
    if (frame.dataset.loaded !== "true" && loadAttempts < 4) {
      logDebug("watchdog-retry-" + loadAttempts);
      attemptLoad();
    }
  }
  setInterval(watchdog, 3000);
  setInterval(fit, 1000);
})();

(function () {
  const overlay = document.getElementById("modal-overlay");
  const body = document.getElementById("modal-body");
  const closeBtn = document.getElementById("modal-close");
  if (!overlay || !body || !closeBtn) return;

  let lastFocused = null;

  function openModal(contentNode) {
    body.innerHTML = "";
    body.appendChild(contentNode);
    lastFocused = document.activeElement;
    overlay.classList.add("is-open");
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove("is-open");
    if (lastFocused) lastFocused.focus();
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeModal();
  });

  // Photos
  document.querySelectorAll(".plate[data-modal-img]").forEach((plate) => {
    function open() {
      const frag = document.createDocumentFragment();
      const img = document.createElement("img");
      img.src = plate.dataset.modalImg;
      img.alt = plate.querySelector("img")?.alt || "";
      const caption = document.createElement("p");
      caption.className = "modal-img-caption";
      caption.textContent = plate.dataset.modalCaption || "";
      frag.appendChild(img);
      frag.appendChild(caption);
      openModal(frag);
    }
    plate.addEventListener("click", open);
    plate.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });

  // Poems
  document.querySelectorAll(".poem-card[data-modal-target]").forEach((card) => {
    function open() {
      const template = document.getElementById(card.dataset.modalTarget + "-full");
      if (!template) return;
      openModal(template.content.cloneNode(true));
    }
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });
})();