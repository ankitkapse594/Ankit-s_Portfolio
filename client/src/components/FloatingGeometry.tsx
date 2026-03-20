import { motion } from "framer-motion";

function Ring({ size, delay, duration, color }: { size: number; delay: number; duration: number; color: string }) {
  return (
    <motion.div
      animate={{
        rotateX: [0, 360],
        rotateY: [0, 180],
        rotateZ: [0, 90],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1px solid ${color}`,
        boxShadow: `0 0 12px ${color}, inset 0 0 12px ${color}`,
        transformStyle: "preserve-3d",
      }}
    />
  );
}

function FloatingCube({ size, delay, x, y, color }: { size: number; delay: number; x: string; y: string; color: string }) {
  return (
    <motion.div
      animate={{
        rotateX: [0, 360],
        rotateY: [0, 360],
        y: [0, -20, 0],
      }}
      transition={{
        rotateX: { duration: 8, repeat: Infinity, ease: "linear", delay },
        rotateY: { duration: 12, repeat: Infinity, ease: "linear", delay },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        border: `1px solid ${color}`,
        boxShadow: `0 0 8px ${color}`,
        transformStyle: "preserve-3d",
        opacity: 0.4,
      }}
    />
  );
}

function Hexagon({ size, delay, x, y, color }: { size: number; delay: number; x: string; y: string; color: string }) {
  return (
    <motion.svg
      style={{ position: "absolute", left: x, top: y, opacity: 0.25 }}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      animate={{
        rotateZ: [0, 360],
        scale: [1, 1.15, 1],
      }}
      transition={{
        rotateZ: { duration: 20, repeat: Infinity, ease: "linear", delay },
        scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <polygon
        points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <polygon
        points="50,20 80,36.25 80,63.75 50,80 20,63.75 20,36.25"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        strokeDasharray="4 4"
      />
    </motion.svg>
  );
}

export function FloatingGeometry() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: 800 }}>
      {/* Top-right cluster */}
      <FloatingCube size={40} delay={0}   x="78%" y="12%" color="rgba(0,255,255,0.6)"   />
      <FloatingCube size={20} delay={1.5} x="85%" y="28%" color="rgba(157,78,221,0.6)"  />
      <FloatingCube size={30} delay={0.8} x="10%" y="20%" color="rgba(0,255,255,0.4)"   />

      {/* Hexagons */}
      <Hexagon size={120} delay={0}   x="70%" y="5%"  color="rgba(0,255,255,0.8)"   />
      <Hexagon size={80}  delay={2}   x="5%"  y="55%" color="rgba(157,78,221,0.8)"  />
      <Hexagon size={60}  delay={1}   x="88%" y="60%" color="rgba(255,26,140,0.8)"  />

      {/* Orbiting Rings */}
      <motion.div
        style={{
          position: "absolute",
          right: "8%",
          top: "15%",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <Ring size={90}  delay={0}   duration={6}  color="rgba(0,255,255,0.35)"  />
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          left: "4%",
          top: "30%",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateX: [0, 360] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <Ring size={60}  delay={2}   duration={9}  color="rgba(157,78,221,0.35)" />
      </motion.div>

      {/* Floating dots trail */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: i % 3 === 0 ? 4 : 2,
            height: i % 3 === 0 ? 4 : 2,
            borderRadius: "50%",
            left: `${8 + i * 7}%`,
            top: `${15 + Math.sin(i) * 30}%`,
            background: i % 2 === 0 ? "rgba(0,255,255,0.7)" : "rgba(157,78,221,0.7)",
            boxShadow: i % 2 === 0 ? "0 0 6px rgba(0,255,255,0.8)" : "0 0 6px rgba(157,78,221,0.8)",
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + (i % 3),
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
