import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Download, 
  ChevronDown, 
  MapPin, 
  Mail, 
  Phone,
  Linkedin,
  Github,
  Cpu,
  Database,
  Globe,
  Bot,
  Award,
  ExternalLink,
  Code2
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { useSubmitContact } from "@/hooks/use-contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertMessageSchema, type InsertMessage } from "@shared/routes";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import profileImg from "@assets/WhatsApp_Image_2025-10-05_at_19.33.25_1767536769507.jpeg";
import resumePdf from "@assets/Ankit_Kapse_Resume_final_02_1784046625634.pdf";
import { FloatingGeometry } from "@/components/FloatingGeometry";
import { UnderwaterScene } from "@/components/UnderwaterScene";
import { ProjectModal, type ProjectData } from "@/components/ProjectModal";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TypedSubtitle } from "@/components/TypedSubtitle";
import { useScramble } from "@/hooks/use-scramble";

export default function Home() {
  const contactMutation = useSubmitContact();
  const scrambledName = useScramble("Ankit Kapse", 600, 30);
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

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
      company: "Rajsanyog",
      role: "Technical Head",
      date: "Jun 2025 – Present",
      location: "Nagpur",
      points: [
        "Lead end-to-end web portal development and digital consulting for political campaigns and organizational clients, owning delivery from architecture to deployment.",
        "Design and implement AI agents and automated tech solutions, building scalable platforms and custom digital tools used in live campaigns."
      ]
    },
    {
      company: "AICTE, India",
      role: "AI-ML Virtual Internship",
      date: "May 2025 – Aug 2025",
      location: "Remote",
      points: [
        "Completed structured training in cloud-based data handling and end-to-end pipeline development.",
        "Applied data modelling and database management concepts to real-world datasets."
      ]
    },
    {
      company: "AICTE, India",
      role: "Data Engineering Virtual Internship",
      date: "Jul 2024 – Sep 2024",
      location: "Remote",
      points: [
        "Integrated data analysis and predictive modelling techniques into project workflows.",
        "Learned deployment and optimization of AI models in real-world systems."
      ]
    }
  ];

  const projects = [
    {
      title: "VRAMP – Virtual RAM Management Platform",
      desc: "Developed a cloud-based virtual RAM system to extend smartphone memory and improve performance. Implemented compression and edge serialization enabling 10x connectivity with sub-250ms latency. Improved device performance, reducing app crashes and enabling smoother gaming without hardware upgrades.",
      tags: ["Node.js", "Docker", "Kubernetes", "Edge Serialization", "Cloud"],
      date: "Feb 2026 – Present"
    },
    {
      title: "Animal Diseases Detection System",
      desc: "Built a deep-learning model (ResNet50) to detect animal diseases from microscopic images. Developed an end-to-end pipeline with OpenCV preprocessing for fast, accurate prediction. Created a simple web interface enabling fast veterinary diagnosis for end users.",
      tags: ["Python", "ResNet50", "OpenCV", "Deep Learning"],
      date: "Jul 2025 – Nov 2025"
    }
  ];

  const skills = [
    { icon: <Bot size={24} />, category: "Cloud & AI", items: ["AWS", "AI Automation", "Machine Learning", "Deep Learning", "ResNet50 / OpenCV"] },
    { icon: <Database size={24} />, category: "Programming & Data", items: ["Python", "SQL", "Data Analysis", "Power BI", "Tableau"] },
    { icon: <Globe size={24} />, category: "Web Development", items: ["Node.js", "Web Portal Dev", "React", "REST APIs", "Full-Stack"] },
    { icon: <Cpu size={24} />, category: "Infrastructure", items: ["Docker", "Kubernetes", "Cloud Computing", "Edge Computing", "Virtualization"] }
  ];

  const certifications = [
    {
      title: "AWS — Data Engineering",
      issuer: "Amazon Web Services",
      desc: "Hands-on coursework across core AWS Data Engineering and Cloud Practitioner services."
    },
    {
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google / Coursera",
      desc: "SQL, spreadsheets, Tableau, and R for data-driven decisions."
    },
    {
      title: "Programming in Python",
      issuer: "Coursera",
      desc: "Python for data processing, automation, and application development."
    },
    {
      title: "Software Engineering Job Simulation",
      issuer: "JPMorgan Chase & Co. / Forage",
      desc: "Real-time market data processing, interactive dashboards, and an open-source contribution."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      {/* Global overlays */}
      <CustomCursor />
      <ScrollProgress />
      <UnderwaterScene />

      <Navigation />
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none z-0" />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 z-10 overflow-hidden">
        {/* 3D Floating Geometry */}
        <FloatingGeometry />

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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary animate-gradient-x font-mono">
                {scrambledName}
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-muted-foreground font-light mb-8 font-mono h-8">
              <TypedSubtitle />
            </h2>
            
            <p className="text-lg text-gray-400 max-w-lg mb-10 leading-relaxed">
              I don't just write code — I build systems that scale, ship, and solve real problems. Technical Head with end-to-end experience in web platforms, AI/ML, and Cloud Computing & Virtualization, including a Docker/Kubernetes based Virtual RAM platform with sub-250ms latency.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href={resumePdf} download="Ankit_Kapse_Resume.pdf">
                <Button 
                  size="lg" 
                  className="rounded-full bg-primary text-background hover:bg-primary/90 font-bold px-8 shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all"
                  data-testid="button-download-cv"
                >
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </Button>
              </a>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full border-white/20 hover:bg-white/10 text-white"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-view-projects"
              >
                View Projects
              </Button>
            </div>

            {/* Profile Links */}
            <div className="flex items-center gap-4 mt-6">
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Find me on</span>
              <div className="flex gap-3">
                {[
                  { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/ankit-kapse-ak02", label: "LinkedIn" },
                  { icon: <Github size={18} />, href: "https://github.com/ankitkapse594", label: "GitHub" },
                  { icon: <Code2 size={18} />, href: "https://codolio.com/profile/ankit_kapse", label: "Codolio" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    title={social.label}
                    data-testid={`link-hero-${social.label.toLowerCase()}`}
                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 hover:shadow-[0_0_10px_rgba(0,255,255,0.2)] transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center relative"
            style={{ perspective: 800 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Outer spinning rings */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-white/10 animate-[spin_15s_linear_infinite_reverse]" />
              {/* Extra 3D orbit */}
              <motion.div
                animate={{ rotateX: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ transformStyle: "preserve-3d" }}
                className="absolute inset-8 rounded-full border border-secondary/20"
              />

              {/* Profile photo */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/5 shadow-2xl bg-black">
                <img 
                  src={profileImg} 
                  alt="Ankit Kapse" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity hover:scale-105 duration-500" 
                  data-testid="img-profile"
                />
                {/* Scanner line */}
                <motion.div
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent"
                  style={{ boxShadow: "0 0 12px rgba(0,255,255,0.6)" }}
                />
              </div>
              
              {/* Floating tech badges */}
              <motion.div 
                animate={{ y: [0, -12, 0], rotateZ: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass-panel p-3 rounded-xl border border-primary/40 shadow-[0_0_15px_rgba(0,255,255,0.2)]"
              >
                <Bot className="text-primary w-6 h-6" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 12, 0], rotateZ: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 glass-panel p-3 rounded-xl border border-secondary/40 shadow-[0_0_15px_rgba(157,78,221,0.2)]"
              >
                <Database className="text-secondary w-6 h-6" />
              </motion.div>
              {/* Third badge */}
              <motion.div 
                animate={{ x: [0, 10, 0], y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 glass-panel p-3 rounded-xl border border-accent/30 shadow-[0_0_15px_rgba(255,26,140,0.2)]"
              >
                <Cpu className="text-accent w-6 h-6" />
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
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light text-center mb-6">
              I don't just write code — I build systems that <span className="text-white font-medium">scale, ship, and solve real problems</span>. Currently serving as <span className="text-primary font-medium">Technical Head at Rajsanyog</span>, I bring end-to-end experience in web platforms, AI/ML, and Cloud Computing & Virtualization. Skilled in <span className="text-white font-medium">Python, AWS, and full-stack development</span>, with proven leadership delivering cloud-based systems for real-world, client-facing projects.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: "Location", value: "Nagpur, India" },
                { label: "Degree", value: "B.Tech IT" },
                { label: "College", value: "RCOEM" },
                { label: "Graduation", value: "May 2027" }
              ].map((item) => (
                <div key={item.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-white font-medium text-sm">{item.value}</p>
                </div>
              ))}
            </div>
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
                data-testid={`card-experience-${idx}`}
              >
                <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
                
                <div className="glass-panel p-6 rounded-xl hover:border-primary/30 transition-colors group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-mono text-muted-foreground bg-white/5 px-3 py-1 rounded-full border border-white/5 self-start md:self-auto">
                      {exp.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <h4 className="text-lg text-secondary font-medium">{exp.company}</h4>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={12} /> {exp.location}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.points.map((point, pIdx) => (
                      <li key={pIdx} className="text-muted-foreground leading-relaxed text-sm flex gap-2">
                        <span className="text-primary mt-1 shrink-0">▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>
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
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projects.map((project, idx) => (
              <ProjectCard 
                key={idx}
                title={project.title}
                description={project.desc}
                tags={project.tags}
                github="#"
                link="#"
                delay={idx * 0.1}
                onClick={() => setActiveProject({
                  title: project.title,
                  description: project.desc,
                  tags: project.tags,
                  date: project.date,
                })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading title="Tech Stack" subtitle="Capabilities" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: 1000 }}>
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, rotateX: 40, y: 40 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.7, ease: "easeOut" }}
                whileHover={{ scale: 1.05, rotateY: 5, z: 30 }}
                style={{ transformStyle: "preserve-3d" }}
                className="glass-panel p-6 rounded-2xl hover:bg-white/5 hover:border-primary/20 hover:shadow-[0_0_25px_rgba(0,255,255,0.1)] transition-all text-center group cursor-default"
                data-testid={`card-skill-${idx}`}
              >
                <motion.div
                  whileHover={{ rotateY: 360 }}
                  transition={{ duration: 0.7 }}
                  className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] transition-all"
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-lg font-bold font-display mb-4 text-white group-hover:text-primary transition-colors">{skill.category}</h3>
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

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 glass-panel p-6 rounded-2xl text-center"
          >
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-mono">Soft Skills</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["Adaptability", "Decision-Making", "Rhetorical Communication", "Networking"].map((s) => (
                <span key={s} className="px-4 py-1.5 rounded-full border border-secondary/30 text-secondary text-sm font-mono bg-secondary/5">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-black/20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading title="Certifications" subtitle="Achievements" />
          
          <div className="grid md:grid-cols-2 gap-6" style={{ perspective: 1200 }}>
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, rotateY: -25, x: -30 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.65, ease: "easeOut" }}
                whileHover={{ scale: 1.03, rotateY: 3, z: 20 }}
                style={{ transformStyle: "preserve-3d" }}
                className="glass-panel p-6 rounded-2xl hover:border-primary/30 hover:shadow-[0_0_20px_rgba(0,255,255,0.08)] transition-all group cursor-default"
                data-testid={`card-certification-${idx}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <Award size={22} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold font-display text-lg group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-secondary text-sm font-mono mb-3">{cert.issuer}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{cert.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <a
              href="https://drive.google.com/drive/folders/1Zj6eLnMgGmtL19297EWN71aS3mEL5JNG?usp=sharing"
              target="_blank"
              rel="noreferrer"
              data-testid="link-certifications-drive"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-primary/30 hover:bg-primary/10 text-primary gap-2"
              >
                <ExternalLink size={16} />
                View All Certificates on Google Drive
              </Button>
            </a>
          </motion.div>
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
                  I'm always open to hearing about new projects, opportunities, and collaborations in AI, data, and web development.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                      <a 
                        href="mailto:ankitkapse594@gmail.com" 
                        className="text-white hover:text-primary transition-colors"
                        data-testid="link-email"
                      >
                        ankitkapse594@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Phone</p>
                      <a 
                        href="tel:+917499039470" 
                        className="text-white hover:text-primary transition-colors"
                        data-testid="link-phone"
                      >
                        +91 7499039470
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Location</p>
                      <p className="text-white" data-testid="text-location">Nagpur, India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Profiles</p>
                  <div className="flex gap-4">
                    {[
                      { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/ankit-kapse-ak02", label: "LinkedIn" },
                      { icon: <Github size={20} />, href: "https://github.com/ankitkapse594", label: "GitHub" },
                      { icon: <Code2 size={20} />, href: "https://codolio.com/profile/ankit_kapse", label: "Codolio" },
                    ].map((social) => (
                      <a 
                        key={social.label}
                        href={social.href} 
                        target="_blank" 
                        rel="noreferrer"
                        title={social.label}
                        data-testid={`link-${social.label.toLowerCase()}`}
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
                              data-testid="input-name"
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
                              data-testid="input-email"
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
                              data-testid="input-message"
                              className="min-h-[150px] bg-black/40 border-white/10 focus:border-primary/50 rounded-xl resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {contactMutation.isSuccess && (
                      <p className="text-green-400 text-sm font-mono" data-testid="status-success">
                        ✓ Message sent successfully! I'll get back to you soon.
                      </p>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:to-primary text-black font-bold py-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                      disabled={contactMutation.isPending}
                      data-testid="button-submit"
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
      <footer className="relative border-t border-white/5 bg-black/90 backdrop-blur-md z-10">
        {/* Glow accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <div className="container mx-auto px-4 py-14 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Brand column */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                ANKIT'S PORTFOLIO
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Technical Head · AI-ML Engineer · Web Developer · Data Engineer. Building intelligent systems from Nagpur, India.
              </p>
              {/* Social icons */}
              <div className="flex gap-3 pt-2">
                {[
                  { icon: <Linkedin size={17} />, href: "https://www.linkedin.com/in/ankit-kapse-ak02", label: "LinkedIn" },
                  { icon: <Github size={17} />, href: "https://github.com/ankitkapse594", label: "GitHub" },
                  { icon: <Code2 size={17} />, href: "https://codolio.com/profile/ankit_kapse", label: "Codolio" },
                  { icon: <Mail size={17} />, href: "mailto:ankitkapse594@gmail.com", label: "Email" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    title={s.label}
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 hover:shadow-[0_0_8px_rgba(0,255,255,0.3)] transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links column */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { label: "About",          href: "#about" },
                  { label: "Experience",     href: "#experience" },
                  { label: "Projects",       href: "#projects" },
                  { label: "Skills",         href: "#skills" },
                  { label: "Certifications", href: "#certifications" },
                  { label: "Contact",        href: "#contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono flex items-center gap-2 group"
                    >
                      <span className="text-primary/40 group-hover:text-primary transition-colors">▸</span>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:ankitkapse594@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                    <Mail size={14} className="text-primary shrink-0" />
                    ankitkapse594@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+917499039470" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Phone size={14} className="text-primary shrink-0" />
                    +91 7499039470
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin size={14} className="text-primary shrink-0" />
                  Nagpur, Maharashtra, India
                </li>
              </ul>

              <div className="pt-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Education</h3>
                <p className="text-sm text-muted-foreground">B.Tech Information Technology</p>
                <p className="text-xs text-primary/70 font-mono mt-0.5">RCOEM, Nagpur · 2023 – 2027</p>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-muted-foreground font-mono">
              © {new Date().getFullYear()} Ankit Kapse. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              Built with <span className="text-primary">React</span> · <span className="text-secondary">Framer Motion</span> · <span className="text-accent">Tailwind CSS</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
