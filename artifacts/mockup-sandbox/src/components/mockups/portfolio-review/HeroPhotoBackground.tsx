import "./_group.css";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

const profilePhoto = "/__mockup/images/portfolio-profile.jpeg";

export function HeroPhotoBackground() {
  const { scrollY } = useScroll();
  const imageY = useSpring(
    useTransform(scrollY, [0, 900], [90, -36]),
    { stiffness: 70, damping: 22 }
  );
  const imageOpacity = useTransform(
    scrollY,
    [0, 180, 700, 1200],
    [0.78, 1, 0.88, 0.65]
  );

  return (
    <motion.div
      style={{ y: imageY, opacity: imageOpacity }}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-x-[-10%] bottom-[-2%] h-[74%] overflow-hidden sm:inset-x-[-4%] sm:h-[82%] md:inset-x-auto md:inset-y-0 md:right-[-4%] md:h-full md:w-[72%] lg:right-0 lg:w-[68%]"
        style={{
          maskImage: "linear-gradient(to top, black 0%, black 89%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, black 89%, transparent 100%)",
        }}
      >
        <img
          src={profilePhoto}
          alt=""
          className="h-full w-full object-cover object-[50%_72%] brightness-[1.12] saturate-[1.02] contrast-[1.06] md:object-[50%_55%] md:opacity-100 opacity-[0.66]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/35 to-transparent md:via-background/45" />
      </div>

      {/* Keep the introduction clear while letting the portrait emerge from below. */}
      <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-background via-background/80 to-transparent md:h-[12%] md:via-background/35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_60%,transparent_10%,hsl(var(--background)/0.38)_85%)] md:bg-[radial-gradient(ellipse_at_75%_55%,transparent_28%,hsl(var(--background)/0.24)_88%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-background/15 to-transparent" />
    </motion.div>
  );
}