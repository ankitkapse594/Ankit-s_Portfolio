import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, Cpu, Database, Zap } from "lucide-react";

const HEX_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='34' viewBox='0 0 30 34'%3E%3Cpolygon points='15,2 28,9.5 28,24.5 15,32 2,24.5 2,9.5' fill='none' stroke='%2300ffff' stroke-width='0.4' opacity='0.5'/%3E%3C/svg%3E")`;

export function AIAvatar() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      el.style.transform = `perspective(900px) rotateY(${dx * 9}deg) rotateX(${-dy * 9}deg)`;
    };
    const handleLeave = () => {
      if (wrapRef.current) wrapRef.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-72 h-72 md:w-96 md:h-96"
      style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -inset-8 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,255,0.07) 0%, rgba(100,50,200,0.05) 50%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Outer dashed ring */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/25 animate-[spin_12s_linear_infinite]" />

      {/* Second ring */}
      <div className="absolute inset-4 rounded-full border border-secondary/15 animate-[spin_18s_linear_infinite_reverse]" />

      {/* 3D tilted orbit ring */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full border border-primary/20"
        style={{ inset: "8%", transform: "rotateX(68deg)" }}
      />

      {/* Central holographic orb */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 38% 36%, rgba(0,255,255,0.14) 0%, rgba(6,8,17,0.97) 55%, rgba(120,50,230,0.08) 100%)",
          border: "1px solid rgba(0,255,255,0.22)",
          boxShadow:
            "0 0 50px rgba(0,255,255,0.08), 0 0 100px rgba(100,50,200,0.06), inset 0 0 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Hex grid texture */}
        <div className="absolute inset-0" style={{ backgroundImage: HEX_SVG, opacity: 0.12 }} />

        {/* Inner glow sphere highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: "40%",
            height: "40%",
            top: "15%",
            left: "18%",
            background: "radial-gradient(circle, rgba(0,255,255,0.18) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* AK monogram */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <motion.span
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="font-mono font-black select-none"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
              background: "linear-gradient(135deg, #00ffff 0%, #a855f7 50%, #00ffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(0,255,255,0.4))",
            }}
          >
            AK
          </motion.span>
          <span
            className="font-mono tracking-[0.28em] uppercase select-none"
            style={{ fontSize: "0.55rem", color: "rgba(0,220,255,0.45)" }}
          >
            AI · ENGINEER
          </span>
        </div>

        {/* Scanning line */}
        <motion.div
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full"
          style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(0,255,255,0.65), transparent)",
            boxShadow: "0 0 10px rgba(0,255,255,0.4)",
          }}
        />

        {/* Corner circuit brackets */}
        <div className="absolute top-5 left-5 w-5 h-5 border-t border-l border-primary/35 pointer-events-none" />
        <div className="absolute top-5 right-5 w-5 h-5 border-t border-r border-primary/35 pointer-events-none" />
        <div className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-primary/35 pointer-events-none" />
        <div className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-primary/35 pointer-events-none" />
      </motion.div>

      {/* Floating tech badges */}
      <motion.div
        animate={{ y: [0, -11, 0], rotateZ: [0, 4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 glass-panel p-3 rounded-xl border border-primary/40 shadow-[0_0_15px_rgba(0,255,255,0.2)]"
      >
        <Bot className="text-primary w-6 h-6" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 11, 0], rotateZ: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-4 -left-4 glass-panel p-3 rounded-xl border border-secondary/40 shadow-[0_0_15px_rgba(157,78,221,0.2)]"
      >
        <Database className="text-secondary w-6 h-6" />
      </motion.div>

      <motion.div
        animate={{ x: [0, 9, 0], y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-4 -right-4 glass-panel p-3 rounded-xl border border-accent/30 shadow-[0_0_15px_rgba(255,26,140,0.2)]"
      >
        <Cpu className="text-accent w-6 h-6" />
      </motion.div>

      <motion.div
        animate={{ x: [0, -7, 0], y: [0, 7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        className="absolute -top-4 -left-4 glass-panel p-3 rounded-xl border border-yellow-400/30 shadow-[0_0_15px_rgba(250,200,0,0.15)]"
      >
        <Zap className="text-yellow-400 w-6 h-6" />
      </motion.div>
    </div>
  );
}
