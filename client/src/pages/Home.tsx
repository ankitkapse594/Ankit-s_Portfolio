import { motion } from "framer-motion";
import { 
  Download, 
  ChevronDown, 
  MapPin, 
  Mail, 
  Phone,
  Linkedin,
  Github,
  Twitter,
  Cpu,
  Database,
  Globe,
  Bot
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { useSubmitContact } from "@/hooks/use-contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertMessageSchema, type InsertMessage } from "@shared/routes";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import profileImg from "@assets/WhatsApp_Image_2025-10-05_at_19.33.25_1767536769507.jpeg";
import resumePdf from "@assets/Resume_AnkitKapse_1767536754697.pdf";

export default function Home() {
  const contactMutation = useSubmitContact();
  
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: InsertMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  const experiences = [
    {
      company: "Feature.AI",
      role: "Co-Founder",
      date: "Jun 2024 - Present",
      desc: "Leading technical strategy for AI-driven products. Architecting scalable data pipelines and overseeing full-stack development."
    },
    {
      company: "AICTE",
      role: "AI-ML Virtual Internship",
      date: "Apr 2025 - Jun 2025",
      desc: "Developed practical AI/ML solutions, working with large datasets and modern model architectures."
    },
    {
      company: "Data Engineering Virtual Internship",
      role: "Data Engineer Intern",
      date: "Jul 2024 - Sep 2024",
      desc: "Built ETL pipelines, optimized database schemas, and automated data validation workflows."
    }
  ];

  const projects = [
    {
      title: "AI Task Automation System",
      desc: "An intelligent agent system that autonomously prioritizes and executes routine digital tasks using LLMs.",
      tags: ["Python", "OpenAI API", "Celery", "Redis"]
    },
    {
      title: "Data Engineering Pipeline",
      desc: "High-throughput data ingestion pipeline processing 1M+ events daily with real-time analytics dashboard.",
      tags: ["Apache Airflow", "Kafka", "PostgreSQL", "dbt"]
    },
    {
      title: "Predictive AI Models",
      desc: "Machine learning models for forecasting market trends with 85% accuracy on historical validation sets.",
      tags: ["TensorFlow", "Pandas", "Scikit-learn"]
    },
    {
      title: "AI-Powered Web Apps",
      desc: "Suite of micro-SaaS applications leveraging generative AI for content creation and image synthesis.",
      tags: ["React", "Node.js", "Stable Diffusion"]
    }
  ];

  const skills = [
    { icon: <Bot size={24} />, category: "AI & ML", items: ["TensorFlow", "PyTorch", "LLMs", "Computer Vision", "NLP"] },
    { icon: <Database size={24} />, category: "Data Engineering", items: ["ETL Pipelines", "SQL/NoSQL", "Apache Spark", "Airflow", "Kafka"] },
    { icon: <Globe size={24} />, category: "Web Development", items: ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS"] },
    { icon: <Cpu size={24} />, category: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"] }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navigation />
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none z-0" />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 z-10 overflow-hidden">
        {/* Animated Orbs */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" 
        />

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-primary font-mono text-sm tracking-wider">SYSTEM.INIT(READY)</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 leading-tight">
              Hello, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary animate-gradient-x">
                Ankit Kapse
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-muted-foreground font-light mb-8 font-mono">
              AI Engineer • Data Engineer • Co-Founder
            </h2>
            
            <p className="text-lg text-gray-400 max-w-lg mb-10 leading-relaxed">
              Building intelligent systems through automation, robust data pipelines, and cutting-edge AI architectures.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href={resumePdf} download="Resume_AnkitKapse.pdf">
                <Button size="lg" className="rounded-full bg-primary text-background hover:bg-primary/90 font-bold px-8 shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all">
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </Button>
              </a>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full border-white/20 hover:bg-white/10 text-white"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex justify-center relative"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-white/10 animate-[spin_15s_linear_infinite_reverse]" />
              
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/5 shadow-2xl bg-black">
                <img 
                  src={profileImg} 
                  alt="Ankit Kapse" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity hover:scale-105 duration-500" 
                />
              </div>
              
              {/* Floating tech badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 glass-panel p-3 rounded-xl border border-primary/30"
              >
                <Bot className="text-primary w-6 h-6" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 glass-panel p-3 rounded-xl border border-secondary/30"
              >
                <Database className="text-secondary w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <ChevronDown className="text-muted-foreground w-8 h-8 animate-bounce" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black/20 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading title="About Me" subtitle="The Architect" />
          
          <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light text-center">
              I am a technology enthusiast obsessed with <span className="text-white font-medium">efficiency</span> and <span className="text-white font-medium">automation</span>. 
              My journey is defined by bridging the gap between raw data and actionable intelligence. 
              Whether it's training custom LLMs, architecting real-time data pipelines, or building autonomous agents, 
              I build systems that don't just work—they <span className="text-primary font-medium">evolve</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionHeading title="Experience" subtitle="Timeline" />

          <div className="relative border-l border-white/10 ml-4 md:ml-10 space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative pl-8 md:pl-12"
              >
                <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
                
                <div className="glass-panel p-6 rounded-xl hover:border-primary/30 transition-colors group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-mono text-muted-foreground bg-white/5 px-3 py-1 rounded-full border border-white/5">
                      {exp.date}
                    </span>
                  </div>
                  <h4 className="text-lg text-secondary font-medium mb-4">{exp.company}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black/20 relative z-10">
        <div className="container mx-auto px-4">
          <SectionHeading title="Selected Works" subtitle="Portfolio" />
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, idx) => (
              <ProjectCard 
                key={idx}
                title={project.title}
                description={project.desc}
                tags={project.tags}
                github="#"
                link="#"
                delay={idx * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading title="Tech Stack" subtitle="Capabilities" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors text-center group"
              >
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-bold font-display mb-4 text-white">{skill.category}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground font-mono">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-t from-black/80 to-transparent relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading title="Get In Touch" subtitle="Connect" />
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="glass-panel p-8 rounded-3xl h-full">
                <h3 className="text-2xl font-display font-bold mb-6 text-white">Contact Information</h3>
                <p className="text-muted-foreground mb-8">
                  I'm always interested in hearing about new projects and opportunities in AI and Data Engineering.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                      <a href="mailto:ankitkapse594@gmail.com" className="text-white hover:text-primary transition-colors">ankitkapse594@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Phone</p>
                      <a href="tel:+917499039470" className="text-white hover:text-primary transition-colors">+91 7499039470</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Location</p>
                      <p className="text-white">Nagpur, India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Social Profiles</p>
                  <div className="flex gap-4">
                    {[
                      { icon: <Linkedin size={20} />, href: "https://linkedin.com" },
                      { icon: <Github size={20} />, href: "https://github.com/AnkitKapse" },
                      { icon: <Twitter size={20} />, href: "#" }
                    ].map((social, i) => (
                      <a 
                        key={i} 
                        href={social.href} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass-panel p-8 rounded-3xl border-t border-primary/20">
                <h3 className="text-2xl font-display font-bold mb-6 text-white">Send Message</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your Name" 
                              {...field} 
                              className="bg-black/40 border-white/10 focus:border-primary/50 rounded-xl py-6"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your@email.com" 
                              {...field} 
                              className="bg-black/40 border-white/10 focus:border-primary/50 rounded-xl py-6"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell me about your project..." 
                              {...field} 
                              className="min-h-[150px] bg-black/40 border-white/10 focus:border-primary/50 rounded-xl resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:to-primary text-black font-bold py-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-black">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground font-mono text-sm">
            © {new Date().getFullYear()} Ankit Kapse. Engineered with <span className="text-primary">Intelligence</span>.
          </p>
        </div>
      </footer>
    </div>
  );
}
