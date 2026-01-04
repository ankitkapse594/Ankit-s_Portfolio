import { motion } from "framer-motion";
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-full glass-panel rounded-2xl p-6 md:p-8 flex flex-col border-t border-white/10">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Code2 size={24} />
          </div>
          <div className="flex gap-3">
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

        <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs font-mono px-2 py-1 rounded bg-white/5 border border-white/5 text-primary/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
