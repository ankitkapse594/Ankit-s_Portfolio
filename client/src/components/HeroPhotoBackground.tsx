import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import profilePhoto from "@assets/WhatsApp_Image_2026-09-14_at_20.33.13_1789398314777.jpeg";

export function HeroPhotoBackground() {
  const { scrollY } = useScroll();
  const imageY = useSpring(
    useTransform(scrollY, [0, 900], [90, -36]),
    { stiffness: 70, damping: 22 }
  );
  const imageOpacity = useTransform(
    scrollY,
    [0, 180, 700, 1200],
    [0.08, 0.3, 0.2, 0.12]
  );

  return (
    <motion.div
      style={{ y: imageY, opacity: imageOpacity }}
      className="pointer-events-none absolute inset-x-[-8%] bottom-[-14%] z-0 h-[88%] overflow-hidden sm:inset-x-[-3%] sm:bottom-[-10%] lg:inset-x-[4%] lg:bottom-[-8%]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to top, black 0%, black 45%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, black 45%, transparent 100%)",
        }}
      >
        <img
          src={profilePhoto}
          alt=""
          className="h-full w-full object-cover object-[50%_76%] blur-[1px] saturate-[0.72] contrast-[0.92]"
        />
      </div>

      {/* Fade the photo into the existing background at the top and sides. */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/35 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_24%,hsl(var(--background)/0.8)_88%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/10 to-transparent" />
    </motion.div>
  );
}