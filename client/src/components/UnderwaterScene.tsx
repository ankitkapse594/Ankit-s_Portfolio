import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────
   Canvas-2D underwater fish scene
   – Works in every environment (no WebGL required)
   – Tries Three.js WebGL when available (production / GPU hosts)
   ───────────────────────────────────────────────────────── */

interface Fish {
  orbitCX: number;
  orbitCY: number;
  orbitRX: number;
  orbitRY: number;
  speed: number;
  phase: number;
  size: number;
  color: string;
  glow: string;
  opacity: number;
}

interface Bubble {
  x: number;
  y: number;
  baseX: number;
  radius: number;
  speed: number;
  phase: number;
  opacity: number;
}

function drawFish(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  size: number,
  color: string,
  glow: string,
  opacity: number,
  tailWag: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = opacity;

  // Glow aura
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.8);
  gradient.addColorStop(0, glow + "40");
  gradient.addColorStop(1, "transparent");
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 1.8, size * 0.9, 0, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Body (elongated ellipse)
  ctx.beginPath();
  ctx.ellipse(0, 0, size, size * 0.36, 0, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.shadowColor = glow;
  ctx.shadowBlur = size * 0.8;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Tail (wagging triangle)
  const tw = tailWag;
  ctx.beginPath();
  ctx.moveTo(-size * 0.85, 0);
  ctx.lineTo(-size * 1.55 + tw * size * 0.18, -size * 0.38);
  ctx.lineTo(-size * 1.55 + tw * size * 0.18, size * 0.38);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity * 0.75;
  ctx.fill();

  // Dorsal fin
  ctx.beginPath();
  ctx.moveTo(size * 0.1, -size * 0.34);
  ctx.lineTo(size * 0.35, -size * 0.62);
  ctx.lineTo(-size * 0.15, -size * 0.34);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity * 0.55;
  ctx.fill();

  // Eye
  ctx.globalAlpha = opacity;
  ctx.beginPath();
  ctx.arc(size * 0.62, -size * 0.08, size * 0.1, 0, Math.PI * 2);
  ctx.fillStyle = "#001122";
  ctx.fill();

  // Eye shine
  ctx.beginPath();
  ctx.arc(size * 0.64, -size * 0.11, size * 0.04, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fill();

  ctx.restore();
}

function drawBubble(ctx: CanvasRenderingContext2D, b: Bubble) {
  ctx.save();
  ctx.globalAlpha = b.opacity;
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(125,249,255,0.7)";
  ctx.lineWidth = 0.8;
  ctx.stroke();
  // Inner shine
  ctx.beginPath();
  ctx.arc(b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.28, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.fill();
  ctx.restore();
}

function drawLightRays(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const rayCount = 5;
  for (let i = 0; i < rayCount; i++) {
    const baseX = (w * (i + 1)) / (rayCount + 1) + Math.sin(t * 0.12 + i * 1.3) * 50;
    const alpha = 0.018 + Math.sin(t * 0.2 + i * 0.7) * 0.008;
    const grad = ctx.createLinearGradient(baseX, 0, baseX + 60, h * 0.65);
    grad.addColorStop(0, `rgba(0,200,255,${alpha})`);
    grad.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.moveTo(baseX - 30, 0);
    ctx.lineTo(baseX + 90, h * 0.65);
    ctx.lineTo(baseX + 30, h * 0.65);
    ctx.lineTo(baseX - 90, 0);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
  }
}

export function UnderwaterScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Fish ──────────────────────────────────────────────
    const allFish: Fish[] = [
      { orbitCX: 0.5, orbitCY: 0.38, orbitRX: 0.32, orbitRY: 0.12, speed: 0.22, phase: 0,             size: 22, color: "rgba(0,229,255,0.7)",   glow: "#00e5ff", opacity: 0.72 },
      { orbitCX: 0.5, orbitCY: 0.62, orbitRX: 0.38, orbitRY: 0.14, speed: 0.17, phase: Math.PI,       size: 17, color: "rgba(124,77,255,0.65)",  glow: "#7c4dff", opacity: 0.65 },
      { orbitCX: 0.5, orbitCY: 0.26, orbitRX: 0.26, orbitRY: 0.09, speed: 0.30, phase: Math.PI*0.65,  size: 14, color: "rgba(0,191,165,0.65)",   glow: "#00bfa5", opacity: 0.6  },
      { orbitCX: 0.5, orbitCY: 0.72, orbitRX: 0.42, orbitRY: 0.15, speed: 0.14, phase: Math.PI*1.35,  size: 26, color: "rgba(64,196,255,0.65)",  glow: "#40c4ff", opacity: 0.68 },
    ];
    const fish = isMobile ? allFish.slice(0, 2) : allFish;

    // ── Bubbles ────────────────────────────────────────────
    const bubbleCount = isMobile ? 18 : 36;
    const bubbles: Bubble[] = Array.from({ length: bubbleCount }, () => ({
      baseX:   Math.random() * canvas.width,
      x:       0,
      y:       canvas.height + Math.random() * canvas.height,
      radius:  1.5 + Math.random() * 4,
      speed:   0.4 + Math.random() * 0.8,
      phase:   Math.random() * Math.PI * 2,
      opacity: 0.15 + Math.random() * 0.25,
    }));

    let start = performance.now();
    let animId: number;

    const render = (now: number) => {
      animId = requestAnimationFrame(render);
      const t = (now - start) / 1000;

      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Light rays
      drawLightRays(ctx, W, H, t);

      // Fish
      fish.forEach((f) => {
        const angle = t * f.speed + f.phase;
        const px = f.orbitCX * W + Math.cos(angle) * f.orbitRX * W;
        const py = f.orbitCY * H + Math.sin(angle) * f.orbitRY * H;

        // Direction of travel
        const nextAngle = angle + 0.005;
        const nx = f.orbitCX * W + Math.cos(nextAngle) * f.orbitRX * W;
        const ny = f.orbitCY * H + Math.sin(nextAngle) * f.orbitRY * H;
        const dir = Math.atan2(ny - py, nx - px);

        const tailWag = Math.sin(t * f.speed * 5 + f.phase) * 1;
        drawFish(ctx, px, py, dir, f.size, f.color, f.glow, f.opacity, tailWag);
      });

      // Bubbles
      bubbles.forEach((b) => {
        b.y -= b.speed * 0.6;
        b.x = b.baseX + Math.sin(t * 0.35 + b.phase) * 18;
        if (b.y + b.radius < 0) {
          b.y = H + b.radius;
          b.baseX = Math.random() * W;
        }
        drawBubble(ctx, b);
      });
    };

    animId = requestAnimationFrame(render);

    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", width: "100vw", height: "100vh" }}
    />
  );
}
