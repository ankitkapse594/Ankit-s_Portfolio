import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const trailX = useSpring(cursorX, { stiffness: 70, damping: 18, mass: 0.5 });
  const trailY = useSpring(cursorY, { stiffness: 70, damping: 18, mass: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null
      );
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: isPointer ? "rgba(157,78,221,0.8)" : "rgba(0,255,255,0.5)",
          boxShadow: isPointer
            ? "0 0 18px rgba(157,78,221,0.5)"
            : "0 0 12px rgba(0,255,255,0.3)",
          width: isPointer ? 44 : 32,
          height: isPointer ? 44 : 32,
          transition: "width 0.2s, height 0.2s, border-color 0.2s, box-shadow 0.2s",
        }}
      />

      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: isClicking ? 6 : isPointer ? 10 : 7,
          height: isClicking ? 6 : isPointer ? 10 : 7,
          background: isPointer ? "rgb(157,78,221)" : "rgb(0,255,255)",
          boxShadow: isPointer
            ? "0 0 14px rgba(157,78,221,1), 0 0 30px rgba(157,78,221,0.5)"
            : "0 0 10px rgba(0,255,255,1), 0 0 22px rgba(0,255,255,0.4)",
          transition: "width 0.15s, height 0.15s, background 0.2s, box-shadow 0.2s",
        }}
      />
    </>
  );
}
