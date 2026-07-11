import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X, Code2, Calendar, Github, ExternalLink } from "lucide-react";

export interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  date?: string;
  github?: string;
  link?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project || !backdropRef.current || !cardRef.current) return;

    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.82, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.42, ease: "back.out(1.5)" }
    );
  }, [project]);

  const handleClose = () => {
    if (!backdropRef.current || !cardRef.current) { onClose(); return; }
    gsap.to(cardRef.current, { opacity: 0, scale: 0.88, y: 20, duration: 0.22, ease: "power2.in" });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.28, ease: "power2.in", onComplete: onClose });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!project) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(5,8,20,0.82)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === backdropRef.current) handleClose(); }}
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-lg glass-panel rounded-3xl p-8 border-t border-primary/30 shadow-[0_0_60px_rgba(0,255,255,0.12),0_0_120px_rgba(0,255,255,0.04)]"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
        data-testid="modal-project"
      >
        {/* Close */}
        <button
          onClick={handleClose}
          data-testid="button-close-modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
        >
          <X size={16} />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 shadow-[0_0_20px_rgba(0,255,255,0.15)]">
          <Code2 size={26} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-display font-bold text-white mb-2 pr-10">{project.title}</h2>

        {/* Date */}
        {project.date && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono mb-5">
            <Calendar size={12} className="text-primary" />
            {project.date}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-primary/40 via-secondary/20 to-transparent mb-5" />

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(project.github || project.link) && (
          <div className="flex gap-3 pt-2 border-t border-white/5">
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors font-mono"
              >
                <Github size={15} /> GitHub
              </a>
            )}
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-mono"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
