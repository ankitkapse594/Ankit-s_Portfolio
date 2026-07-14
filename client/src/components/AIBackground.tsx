import { useEffect, useRef } from "react";

export function AIBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Node = { x: number; y: number; vx: number; vy: number; pulse: number };
    type Particle = { x: number; y: number; vy: number; alpha: number; size: number };
    type Beam = { x: number; speed: number; alpha: number; width: number };

    const nodes: Node[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      pulse: Math.random() * Math.PI * 2,
    }));

    const particles: Particle[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: -(Math.random() * 0.35 + 0.08),
      alpha: Math.random() * 0.3 + 0.05,
      size: Math.random() * 1.5 + 0.3,
    }));

    const beams: Beam[] = Array.from({ length: 3 }, (_, i) => ({
      x: (canvas.width / 3) * i + Math.random() * 200,
      speed: 0.25 + Math.random() * 0.25,
      alpha: 0.012 + Math.random() * 0.01,
      width: 80 + Math.random() * 100,
    }));

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.018;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const glow = 0.5 + 0.5 * Math.sin(n.pulse);
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.2 + glow * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 220, 255, ${0.35 + glow * 0.25})`;
        ctx.fill();
      });

      particles.forEach((p) => {
        p.y += p.vy;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160, 90, 255, ${p.alpha})`;
        ctx.fill();
      });

      beams.forEach((b) => {
        b.x += b.speed;
        if (b.x > canvas.width + b.width) b.x = -b.width;
        const slant = canvas.height * 0.25;
        const grad = ctx.createLinearGradient(b.x - b.width / 2, 0, b.x + b.width / 2, 0);
        grad.addColorStop(0, `rgba(0, 255, 255, 0)`);
        grad.addColorStop(0.5, `rgba(0, 255, 255, ${b.alpha})`);
        grad.addColorStop(1, `rgba(0, 255, 255, 0)`);
        ctx.beginPath();
        ctx.moveTo(b.x - b.width / 2, 0);
        ctx.lineTo(b.x + b.width / 2, 0);
        ctx.lineTo(b.x + b.width / 2 + slant, canvas.height);
        ctx.lineTo(b.x - b.width / 2 + slant, canvas.height);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.55 }}
    />
  );
}
