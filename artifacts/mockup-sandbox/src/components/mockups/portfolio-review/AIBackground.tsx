import "./_group.css";
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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };
    let scrollY = window.scrollY;
    let smoothScrollY = scrollY;

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX / Math.max(window.innerWidth, 1);
      mouse.y = event.clientY / Math.max(window.innerHeight, 1);
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    if (!reducedMotion) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    }

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

    const wrap = (value: number, size: number) => ((value % size) + size) % size;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!reducedMotion) {
        smoothMouse.x += (mouse.x - smoothMouse.x) * 0.04;
        smoothMouse.y += (mouse.y - smoothMouse.y) * 0.04;
        smoothScrollY += (scrollY - smoothScrollY) * 0.06;
      }

      const pointerOffsetX = (smoothMouse.x - 0.5) * 26;
      const pointerOffsetY = (smoothMouse.y - 0.5) * 18;
      const scrollOffset = -smoothScrollY * 0.07;

      nodes.forEach((n) => {
        if (!reducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          n.pulse += 0.018;
        }
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeAX = nodes[i].x + pointerOffsetX + scrollOffset * 0.12;
          const nodeAY = wrap(nodes[i].y + pointerOffsetY + scrollOffset, canvas.height);
          const nodeBX = nodes[j].x + pointerOffsetX + scrollOffset * 0.12;
          const nodeBY = wrap(nodes[j].y + pointerOffsetY + scrollOffset, canvas.height);
          const dx = nodeAX - nodeBX;
          const dy = nodeAY - nodeBY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.2;
            ctx.beginPath();
            ctx.moveTo(nodeAX, nodeAY);
            ctx.lineTo(nodeBX, nodeBY);
            ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const glow = 0.5 + 0.5 * Math.sin(n.pulse);
        const nodeX = n.x + pointerOffsetX + scrollOffset * 0.12;
        const nodeY = wrap(n.y + pointerOffsetY + scrollOffset, canvas.height);
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 1.2 + glow * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 220, 255, ${0.35 + glow * 0.25})`;
        ctx.fill();
      });

      particles.forEach((p) => {
        if (!reducedMotion) p.y += p.vy;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        const particleX = p.x + pointerOffsetX * 0.55;
        const particleY = wrap(p.y + pointerOffsetY * 0.4 + scrollOffset * 0.45, canvas.height);
        ctx.beginPath();
        ctx.arc(particleX, particleY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160, 90, 255, ${p.alpha})`;
        ctx.fill();
      });

      beams.forEach((b) => {
        if (!reducedMotion) b.x += b.speed;
        if (b.x > canvas.width + b.width) b.x = -b.width;
        const beamX = b.x + pointerOffsetX * 0.25;
        const slant = canvas.height * 0.25;
        const grad = ctx.createLinearGradient(beamX - b.width / 2, 0, beamX + b.width / 2, 0);
        grad.addColorStop(0, `rgba(0, 255, 255, 0)`);
        grad.addColorStop(0.5, `rgba(0, 255, 255, ${b.alpha})`);
        grad.addColorStop(1, `rgba(0, 255, 255, 0)`);
        ctx.beginPath();
        ctx.moveTo(beamX - b.width / 2, 0);
        ctx.lineTo(beamX + b.width / 2, 0);
        ctx.lineTo(beamX + b.width / 2 + slant, canvas.height);
        ctx.lineTo(beamX - b.width / 2 + slant, canvas.height);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      });

      if (!reducedMotion) animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (!reducedMotion) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.5 }}
      aria-hidden="true"
    />
  );
}
