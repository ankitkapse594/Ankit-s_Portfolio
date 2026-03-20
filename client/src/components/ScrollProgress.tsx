import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, rgba(0,255,255,1) 0%, rgba(157,78,221,1) 50%, rgba(255,26,140,1) 100%)",
        boxShadow: "0 0 10px rgba(0,255,255,0.8), 0 0 20px rgba(157,78,221,0.5)",
      }}
    />
  );
}
