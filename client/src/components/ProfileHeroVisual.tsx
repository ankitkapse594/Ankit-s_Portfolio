import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import profilePhoto from "@assets/WhatsApp_Image_2026-09-14_at_20.33.13_1789398314777.jpeg";

export function ProfileHeroVisual() {
  const frameRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const x = useSpring(useMotionValue(0), { stiffness: 90, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 90, damping: 20 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const bounds = frameRef.current.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateX.set(pointerY * -7);
    rotateY.set(pointerX * 7);
    x.set(pointerX * 8);
    y.set(pointerY * 8);
  };

  const resetPosition = () => {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      style={{ rotateX, rotateY, x, y, transformStyle: "preserve-3d" }}
      className="relative w-[min(78vw,390px)] aspect-[4/5] max-h-[min(70vh,520px)]"
      aria-label="Portrait of Ankit Kapse"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-7 rounded-[44%] border border-primary/20"
        style={{ transform: "translateZ(-20px)" }}
      />
      <motion.div
        animate={{ rotate: -360, scale: [1, 1.04, 1] }}
        transition={{
          rotate: { duration: 38, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -inset-12 rounded-[46%] border border-secondary/15"
        style={{ transform: "translateZ(-30px)" }}
      />

      <div
        className="absolute -inset-4 rounded-[42%] opacity-60 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,220,255,0.22), rgba(157,78,221,0.12) 45%, transparent 72%)",
          transform: "translateZ(-15px)",
        }}
      />

      <div
        className="relative h-full overflow-hidden rounded-[42%] border border-primary/35 bg-black/50 shadow-[0_0_55px_rgba(0,220,255,0.16),inset_0_0_35px_rgba(0,0,0,0.5)]"
        style={{ transform: "translateZ(20px)" }}
      >
        <img
          src={profilePhoto}
          alt="Ankit Kapse sitting by the waterfront at night"
          className="h-full w-full object-cover object-[50%_36%] brightness-[0.92] contrast-[1.05] saturate-[0.9]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-primary/10" />
        <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-70" />
        <div className="absolute inset-0 rounded-[42%] ring-1 ring-inset ring-white/10" />
      </div>

      <div
        className="absolute -left-8 top-10 hidden rounded-lg border border-primary/20 bg-background/70 px-3 py-2 backdrop-blur-md sm:block"
        style={{ transform: "translateZ(45px)" }}
      >
        <p className="font-mono text-[9px] tracking-[0.18em] text-primary/70">PROFILE // ACTIVE</p>
        <p className="mt-1 font-mono text-[10px] text-white/50">AK-01 / AI-ML</p>
      </div>
      <div
        className="absolute -bottom-3 -right-6 hidden rounded-lg border border-secondary/20 bg-background/75 px-3 py-2 backdrop-blur-md sm:block"
        style={{ transform: "translateZ(45px)" }}
      >
        <p className="font-mono text-[9px] tracking-[0.18em] text-secondary/80">NEURAL ID</p>
        <p className="mt-1 font-mono text-[10px] text-white/50">NAGPUR // INDIA</p>
      </div>
    </motion.div>
  );
}