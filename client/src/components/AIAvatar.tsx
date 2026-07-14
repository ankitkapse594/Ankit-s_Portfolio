import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import avatarPortrait from "@assets/ai_avatar.png";
import avatarGreeting from "@assets/ai_avatar_2.png";

const GREETING =
  "Hello! I'm Ankit Kapse. Welcome to my AI Laboratory. " +
  "I'm an AI Engineer, Data Engineer, and Technical Head at Rajsanyog, " +
  "passionate about building intelligent systems that solve real-world problems. " +
  "Feel free to explore my projects, certifications, and experience. " +
  "Let's build the future together.";

export function AIAvatar() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isGreeting, setIsGreeting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [greeted, setGreeted] = useState(false);

  const stopSpeech = useCallback(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsGreeting(false);
    setGreeted(true);
  }, []);

  /* ─── Greeting + speech ─── */
  useEffect(() => {
    if (sessionStorage.getItem("ak_greeted")) { setGreeted(true); return; }

    const timer = setTimeout(() => {
      setIsGreeting(true);
      sessionStorage.setItem("ak_greeted", "1");

      if (!("speechSynthesis" in window)) {
        setTimeout(stopSpeech, 5000);
        return;
      }

      const utter = new SpeechSynthesisUtterance(GREETING);
      utter.rate = 0.88;
      utter.pitch = 1.0;
      utter.volume = 0.85;

      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => {
        setIsSpeaking(false);
        setTimeout(() => { setIsGreeting(false); setGreeted(true); }, 800);
      };
      utter.onerror = () => {
        setIsSpeaking(false);
        setIsGreeting(false);
        setGreeted(true);
      };

      window.speechSynthesis.speak(utter);
    }, 3600);

    return () => clearTimeout(timer);
  }, [stopSpeech]);

  /* ─── Mouse parallax tilt ─── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const dx = (e.clientX / window.innerWidth - 0.5) * 2;
      const dy = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.transform = `perspective(900px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const currentImg = isGreeting ? avatarGreeting : avatarPortrait;

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{
        width: "min(22rem, 92vw)",
        height: "min(28rem, 115vw)",
        transformStyle: "preserve-3d",
        transition: "transform 0.14s ease-out",
      }}
    >
      {/* Ambient glow halo */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-3rem",
          background:
            "radial-gradient(ellipse, rgba(0,220,255,0.07) 0%, rgba(120,50,230,0.05) 45%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      {/* Orbit decorations */}
      <div className="absolute -inset-5 rounded-2xl border border-dashed border-primary/12 animate-[spin_18s_linear_infinite]" />
      <div className="absolute -inset-2 rounded-2xl border border-secondary/8 animate-[spin_24s_linear_infinite_reverse]" />

      {/* Main avatar frame */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          border: "1px solid rgba(0,220,255,0.22)",
          boxShadow:
            "0 0 50px rgba(0,220,255,0.1), 0 0 100px rgba(120,50,230,0.07), inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* Avatar image — cross-fades on greeting state */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={currentImg}
            alt="Ankit Kapse — AI Engineer"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="w-full h-full object-cover object-top select-none"
            draggable={false}
            style={{ filter: "brightness(1.06) contrast(1.03) saturate(1.1)" }}
          />
        </AnimatePresence>

        {/* Bottom gradient overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{
            background: "linear-gradient(0deg, rgba(6,8,17,0.92) 0%, rgba(6,8,17,0.4) 60%, transparent 100%)",
          }}
        />

        {/* Scan line */}
        <motion.div
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full pointer-events-none"
          style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(0,220,255,0.45), transparent)",
            boxShadow: "0 0 10px rgba(0,220,255,0.3)",
          }}
        />

        {/* Corner brackets */}
        {[
          "top-3 left-3 border-t-2 border-l-2",
          "top-3 right-3 border-t-2 border-r-2",
          "bottom-3 left-3 border-b-2 border-l-2",
          "bottom-3 right-3 border-b-2 border-r-2",
        ].map((cls, i) => (
          <div key={i} className={`absolute w-5 h-5 border-primary/50 pointer-events-none ${cls}`} />
        ))}

        {/* Status bar */}
        <div className="absolute bottom-0 inset-x-0 px-4 py-2.5 flex items-center justify-between pointer-events-none">
          <span className="text-[9px] font-mono text-primary/60 tracking-[0.2em] uppercase">
            ANKIT KAPSE · AI ENGINEER
          </span>
          <AnimatePresence>
            {isSpeaking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1"
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-primary rounded-full"
                    animate={{ height: ["4px", "12px", "4px"] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Speaking glow pulse ring */}
      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.02, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl border-2 border-primary/40 pointer-events-none"
            style={{ boxShadow: "0 0 30px rgba(0,220,255,0.15)" }}
          />
        )}
      </AnimatePresence>

      {/* Greeting speech bubble */}
      <AnimatePresence>
        {isGreeting && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap glass-panel px-4 py-2 rounded-xl border border-primary/30 cursor-pointer"
            style={{ boxShadow: "0 0 20px rgba(0,220,255,0.1)" }}
            onClick={stopSpeech}
            title="Click to stop"
          >
            <p className="text-sm font-mono text-primary">
              {isSpeaking ? (
                <span>👋 Hello! Welcome to my AI Lab <span className="text-primary/50 text-xs">(click to stop)</span></span>
              ) : (
                <span>👋 Hello! Welcome to my AI Lab!</span>
              )}
            </p>
            {/* Arrow */}
            <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b border-primary/30 bg-card/80 backdrop-blur-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating holographic side panels */}
      <motion.div
        animate={{ y: [0, -8, 0], x: [0, 3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -right-16 top-1/4 hidden lg:block"
      >
        <div
          className="w-12 h-20 rounded-lg border border-primary/20 backdrop-blur-sm flex flex-col items-center justify-center gap-1.5"
          style={{
            background: "rgba(0,220,255,0.04)",
            boxShadow: "0 0 15px rgba(0,220,255,0.05)",
          }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="h-px rounded-full bg-primary/30"
              style={{ width: `${40 + Math.sin(i) * 20}%` }}
              animate={{ opacity: [0.3, 0.8, 0.3], width: [`${40 + Math.sin(i) * 20}%`, `${60 + Math.cos(i) * 20}%`, `${40 + Math.sin(i) * 20}%`] }}
              transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], x: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute -left-14 bottom-1/3 hidden lg:block"
      >
        <div
          className="w-10 h-10 rounded-lg border border-secondary/20 backdrop-blur-sm flex items-center justify-center"
          style={{
            background: "rgba(120,50,230,0.05)",
            boxShadow: "0 0 12px rgba(120,50,230,0.05)",
          }}
        >
          <motion.div
            className="w-5 h-5 rounded-sm border border-secondary/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
