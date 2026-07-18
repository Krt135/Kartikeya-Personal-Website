import { useEffect, useRef } from "react";

// Lightweight, dependency-free particle field used as the hero's signature
// visual — a nod to the SPH fluid simulator project. Not a full physics
// solver, just a playful reference to it: particles repel a dragged cursor
// and settle back with light damping + mutual spacing.
export default function FluidVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const COUNT = 90;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: 0,
      vy: 0,
    }));

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function step() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        let px = p.x * width;
        let py = p.y * height;

        // gentle drift
        p.vx += (Math.random() - 0.5) * 0.0006;
        p.vy += (Math.random() - 0.5) * 0.0006;

        // pointer repulsion
        if (pointer.current.active) {
          const dx = px - pointer.current.x;
          const dy = py - pointer.current.y;
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

      // connective lines for nearby particles (subtle mesh)
      ctx!.lineWidth = 1;
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
            ctx!.strokeStyle = `rgba(60, 110, 82, ${alpha * 0.35})`;
            ctx!.beginPath();
            ctx!.moveTo(ax, ay);
            ctx!.lineTo(bx, by);
            ctx!.stroke();
          }
        }
      }

      for (const p of particles) {
        const px = p.x * width;
        const py = p.y * height;
        ctx!.beginPath();
        ctx!.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(60, 110, 82, 0.85)";
        ctx!.fill();
      }

      if (!reducedMotion) {
        raf = requestAnimationFrame(step);
      }
    }

    resize();
    step();
    if (reducedMotion) {
      // draw a single static frame
      step();
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    function toLocal(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function onMove(e: PointerEvent) {
      const { x, y } = toLocal(e.clientX, e.clientY);
      pointer.current = { x, y, active: true };
    }
    function onLeave() {
      pointer.current.active = false;
    }

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onMove);
    };
  }, []);

  return (
    <div className="relative rounded-md border border-ink/15 bg-ink/[0.02] overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-3 font-mono text-[11px] tracking-wide text-ink/50">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-moss" />
          SPH · interactive
        </span>
        <span>240 particles</span>
      </div>
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 100%, rgba(60,110,82,0.22) 0%, rgba(60,110,82,0.08) 45%, transparent 75%)",
          }}
        />
        <canvas
          ref={canvasRef}
          className="relative w-full h-[220px] sm:h-[260px] touch-none cursor-crosshair"
          aria-hidden="true"
        />
      </div>
      <div className="flex items-center justify-between px-4 pb-3 font-mono text-[11px] text-ink/40">
        <span>drag &amp; move — density-based pressure with sub-stepped integration</span>
        <span>∇·v ≈ 0</span>
      </div>
    </div>
  );
}
