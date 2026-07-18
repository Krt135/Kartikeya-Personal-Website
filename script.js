// Lightweight, dependency-free particle field used as the hero's signature
// visual — a nod to the SPH fluid simulator project described below it.
// Not a full physics solver: particles repel a dragged cursor and settle
// back with light damping + mutual spacing.
(function () {
  const canvas = document.getElementById("fluid-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const COUNT = 90;
  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: 0,
    vy: 0,
  }));

  const pointer = { x: -9999, y: -9999, active: false };
  let width = 0;
  let height = 0;
  let raf = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      const px = p.x * width;
      const py = p.y * height;

      // gentle drift
      p.vx += (Math.random() - 0.5) * 0.0006;
      p.vy += (Math.random() - 0.5) * 0.0006;

      // pointer repulsion
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

      // damping + center pull
      p.vx *= 0.94;
      p.vy *= 0.94;
      p.vx += (0.5 - p.x) * 0.0009;
      p.vy += (0.5 - p.y) * 0.0009;

      p.x += p.vx;
      p.y += p.vy;

      p.x = Math.min(1, Math.max(0, p.x));
      p.y = Math.min(1, Math.max(0, p.y));
    }

    // connective mesh lines between nearby particles
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
      const px = p.x * width;
      const py = p.y * height;
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(60, 110, 82, 0.85)";
      ctx.fill();
    }

    if (!reducedMotion) {
      raf = requestAnimationFrame(step);
    }
  }

  function toLocal(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function onMove(e) {
    const { x, y } = toLocal(e.clientX, e.clientY);
    pointer.x = x;
    pointer.y = y;
    pointer.active = true;
  }
  function onLeave() {
    pointer.active = false;
  }

  resize();
  step();

  window.addEventListener("resize", resize);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerleave", onLeave);
  canvas.addEventListener("pointerdown", onMove);
})();
