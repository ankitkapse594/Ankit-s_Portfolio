import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Github, Code2 } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  delay?: number;
}

export function ProjectCard({ title, description, tags, link, github, delay = 0 }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className="group relative"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full cursor-default"
      >
        {/* Glow backing */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Glare shimmer that follows mouse */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([lx, ly]) =>
                `radial-gradient(circle at ${lx}% ${ly}%, rgba(0,255,255,0.12) 0%, transparent 60%)`
            ),
          }}
        />

        {/* Card face */}
        <div
          className="relative h-full glass-panel rounded-2xl p-6 md:p-8 flex flex-col border-t border-white/10"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Icon & links row */}
          <div className="flex justify-between items-start mb-6">
            <motion.div
              style={{ transform: "translateZ(30px)" }}
              className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors shadow-[0_0_15px_rgba(0,255,255,0.1)]"
            >
              <Code2 size={24} />
            </motion.div>
            <div className="flex gap-3" style={{ transform: "translateZ(20px)" }}>
              {github && (
                <a href={github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                  <Github size={20} />
                </a>
              )}
              {link && (
                <a href={link} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>

          <motion.h3
            style={{ transform: "translateZ(25px)" }}
            className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors"
          >
            {title}
          </motion.h3>

          <p className="text-muted-foreground mb-6 flex-grow leading-relaxed text-sm">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto" style={{ transform: "translateZ(15px)" }}>
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2 py-1 rounded bg-white/5 border border-primary/20 text-primary/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
