import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHASES = [
  "INITIALIZING PORTFOLIO...",
  "LOADING AI ENGINE...",
  "CONNECTING NEURAL CORE...",
  "LAUNCHING EXPERIENCE...",
  "ACCESS GRANTED.",
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 2.8 + 1.2;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 650);
        }, 350);
      }
      setProgress(Math.min(prog, 100));
      setPhase(Math.min(Math.floor((Math.min(prog, 100) / 100) * (PHASES.length - 1)), PHASES.length - 1));
    }, 48);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const a = (1 - dist / 160) * 0.3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 220, 255, ${a})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 220, 255, 0.6)";
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#060811" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 opacity-25 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: "radial-gradient(circle at 40% 40%, rgba(0,255,255,0.12), rgba(6,8,17,0.95))",
                  border: "1px solid rgba(0,255,255,0.35)",
                  boxShadow: "0 0 40px rgba(0,255,255,0.25), inset 0 0 40px rgba(0,0,0,0.5)",
                }}
              >
                <span
                  className="font-mono text-3xl font-black"
                  style={{
                    background: "linear-gradient(135deg, #00ffff, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  AK
                </span>
                <motion.div
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  style={{ opacity: 0.7 }}
                />
              </div>
              <div
                className="absolute -inset-3 rounded-full border border-cyan-500/20"
                style={{ animation: "spin 3s linear infinite" }}
              />
              <div
                className="absolute -inset-6 rounded-full border border-violet-500/10"
                style={{ animation: "spin 5s linear infinite reverse" }}
              />
            </motion.div>

            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-sm tracking-widest"
              style={{ color: "rgba(0,220,255,0.75)" }}
            >
              {PHASES[phase]}
            </motion.p>

            <div className="w-64 md:w-80 space-y-1.5">
              <div className="h-px rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #06b6d4, #a855f7)",
                  }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.15)" }}>
                  BOOT SEQUENCE
                </span>
                <span className="text-[10px] font-mono" style={{ color: "rgba(0,220,255,0.5)" }}>
                  {Math.floor(progress)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
