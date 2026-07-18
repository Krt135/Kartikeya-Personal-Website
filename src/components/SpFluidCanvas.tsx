import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 240;
const SUBSTEPS = 4;
const H = 28;
const H2 = H * H;
const REST_DENSITY = 1.0;
const STIFFNESS = 0.08;
const VISCOSITY = 0.02;
const DAMPING = 0.985;
const GRAVITY = 0.015;
const INTERACTION_RADIUS = 90;
const INTERACTION_STRENGTH = 0.35;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  px: number;
  py: number;
};

function poly6(r: number) {
  if (r >= H) return 0;
  const x = H2 - r * r;
  return (315 / (64 * Math.PI * Math.pow(H, 9))) * x * x * x;
}

function spikyGrad(r: number) {
  if (r >= H || r <= 0) return 0;
  const x = H - r;
  return (-45 / (Math.PI * Math.pow(H, 6))) * x * x;
}

export function SpFluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        particles = Array.from({ length: PARTICLE_COUNT }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          px: 0,
          py: 0,
        }));
      }
    };

    const findNeighbors = (index: number) => {
      const neighbors: number[] = [];
      const p = particles[index];
      for (let j = 0; j < particles.length; j += 1) {
        if (j === index) continue;
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const r = Math.hypot(dx, dy);
        if (r < H) neighbors.push(j);
      }
      return neighbors;
    };

    const simulate = () => {
      for (let step = 0; step < SUBSTEPS; step += 1) {
        const densities = new Float32Array(particles.length);
        const pressures = new Float32Array(particles.length);

        for (let i = 0; i < particles.length; i += 1) {
          let density = 0;
          const neighbors = findNeighbors(i);
          for (const j of neighbors) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            density += poly6(Math.hypot(dx, dy));
          }
          densities[i] = Math.max(density, 0.0001);
          pressures[i] = STIFFNESS * (densities[i] - REST_DENSITY);
        }

        for (let i = 0; i < particles.length; i += 1) {
          let fx = 0;
          let fy = GRAVITY;
          const neighbors = findNeighbors(i);

          for (const j of neighbors) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const r = Math.hypot(dx, dy) || 0.0001;
            const nx = dx / r;
            const ny = dy / r;
            const grad = spikyGrad(r);
            const pressureForce =
              ((pressures[i] + pressures[j]) / (2 * densities[j])) * grad;
            fx -= pressureForce * nx;
            fy -= pressureForce * ny;

            const relVx = particles[i].vx - particles[j].vx;
            const relVy = particles[i].vy - particles[j].vy;
            const relVn = relVx * nx + relVy * ny;
            const visc = VISCOSITY * relVn * poly6(r);
            fx -= visc * nx;
            fy -= visc * ny;
          }

          const pointer = pointerRef.current;
          if (pointer.active) {
            const dx = particles[i].x - pointer.x;
            const dy = particles[i].y - pointer.y;
            const r = Math.hypot(dx, dy);
            if (r < INTERACTION_RADIUS) {
              const force = (1 - r / INTERACTION_RADIUS) * INTERACTION_STRENGTH;
              fx += (dx / (r || 1)) * force;
              fy += (dy / (r || 1)) * force;
            }
          }

          particles[i].vx = (particles[i].vx + fx) * DAMPING;
          particles[i].vy = (particles[i].vy + fy) * DAMPING;
          particles[i].x += particles[i].vx;
          particles[i].y += particles[i].vy;

          const pad = 8;
          if (particles[i].x < pad) {
            particles[i].x = pad;
            particles[i].vx *= -0.5;
          }
          if (particles[i].x > width - pad) {
            particles[i].x = width - pad;
            particles[i].vx *= -0.5;
          }
          if (particles[i].y < pad) {
            particles[i].y = pad;
            particles[i].vy *= -0.5;
          }
          if (particles[i].y > height - pad) {
            particles[i].y = height - pad;
            particles[i].vy *= -0.5;
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "oklch(14% 0.015 250)";
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        const speed = Math.hypot(p.vx, p.vy);
        const alpha = 0.45 + Math.min(speed * 0.15, 0.45);
        const radius = 2.2 + Math.min(speed * 0.4, 1.2);

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3);
        gradient.addColorStop(0, `oklch(85% 0.16 195 / ${alpha})`);
        gradient.addColorStop(1, "oklch(85% 0.16 195 / 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      simulate();
      draw();
      animationId = window.requestAnimationFrame(loop);
    };

    const setPointer = (clientX: number, clientY: number, active: boolean) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        active,
      };
    };

    const onPointerDown = (event: PointerEvent) => {
      canvas.setPointerCapture(event.pointerId);
      setPointer(event.clientX, event.clientY, true);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (pointerRef.current.active) {
        setPointer(event.clientX, event.clientY, true);
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      setPointer(event.clientX, event.clientY, false);
    };

    resize();
    loop();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerUp);
    };
  }, []);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_0_80px_oklch(85%_0.16_195_/_0.08)] md:aspect-auto md:h-[420px]">
      <canvas ref={canvasRef} className="h-full w-full touch-none" />

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
            SPH · INTERACTIVE
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            {PARTICLE_COUNT} particles
          </span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <p className="max-w-[18rem] font-mono text-[10px] leading-relaxed text-muted-foreground">
            drag & move — density-based pressure with sub-stepped integration
          </p>
          <span className="font-mono text-[11px] text-primary">∇·v ≈ 0</span>
        </div>
      </div>
    </div>
  );
}
