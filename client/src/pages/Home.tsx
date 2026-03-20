import { motion } from "framer-motion";
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
  ExternalLink
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
import resumePdf from "@assets/RCOEM_ankit_kapse_resume_1774020852451.pdf";

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
      company: "Rajsanyog",
      role: "Technical Head",
      date: "Jun 2025 – Present",
      location: "Nagpur",
      points: [
        "End-to-end web portal development and digital consulting to support political campaigns and organizational needs.",
        "Implement AI agents and automated tech solutions, including scalable platforms and custom digital tools.",
        "Startup-focused tech solutions, including scalable platforms and custom digital tools."
      ]
    },
    {
      company: "AICTE, India",
      role: "AI-ML Virtual Internship",
      date: "May 2025 – Aug 2025",
      location: "Remote",
      points: [
        "Completed training in cloud-based data handling and pipeline development.",
        "Applied data modelling and database management concepts.",
        "Utilized tools for data cleaning, transformation, and visualization."
      ]
    },
    {
      company: "AICTE, India",
      role: "Data Engineering Virtual Internship",
      date: "Jul 2024 – Sep 2024",
      location: "Remote",
      points: [
        "Gained practical experience with Python AI frameworks for algorithm implementation.",
        "Integrated data analysis, predictive modelling, and feature engineering in projects.",
        "Learned deployment and optimization of AI models in real-world systems."
      ]
    }
  ];

  const projects = [
    {
      title: "Animal Diseases Detection System",
      desc: "Built a deep learning model (ResNet50) to detect animal diseases from microscopic images. Developed an end-to-end pipeline with OpenCV preprocessing and real-time prediction. Generated automated reports with disease name, symptoms, and treatment suggestions.",
      tags: ["Python", "ResNet50", "OpenCV", "Deep Learning"],
      date: "Jul 2025 – Nov 2025"
    },
    {
      title: "VRAM – Virtual RAM Management Platform",
      desc: "Developed a cloud-based virtual RAM system to extend smartphone memory and improve processing performance. Built a Node.js backend to offload app states to cloud containers. Implemented compression and edge serialization to enable 10x connectivity with low latency.",
      tags: ["Node.js", "Cloud Computing", "Edge Serialization", "Performance"],
      date: "Feb 2025 – Present"
    }
  ];

  const skills = [
    { icon: <Bot size={24} />, category: "AI & Automation", items: ["AI Automation", "Deep Learning", "Machine Learning", "Computer Vision", "AI Agents"] },
    { icon: <Database size={24} />, category: "Data & Cloud", items: ["AWS", "Data Analysis", "SQL", "Data Engineering", "Pipeline Dev"] },
    { icon: <Globe size={24} />, category: "Web Development", items: ["Web Portals", "React", "Node.js", "REST APIs", "Full-Stack"] },
    { icon: <Cpu size={24} />, category: "Programming", items: ["Python", "JavaScript", "TypeScript", "Data Processing", "Automation"] }
  ];

  const certifications = [
    {
      title: "AWS – Data Engineering",
      issuer: "Amazon Web Services",
      desc: "Comprehensive AWS Data Engineering and Cloud Practitioners courses, gaining hands-on experience with core AWS services."
    },
    {
      title: "Google Data Analytics",
      issuer: "Google / Coursera",
      desc: "Google Data Analytics Professional Certificate — insights with SQL, spreadsheets, Tableau, and R for data-driven decision-making."
    },
    {
      title: "Programming in Python",
      issuer: "Coursera",
      desc: "Proficient in Python programming for data processing, automation, and application development."
    },
    {
      title: "Software Engineering Job Simulation",
      issuer: "JPMorgan Chase & Co. / Forage",
      desc: "Processed real-time market data, built and tested features, created interactive visual dashboards for traders, and completed an open-source contribution."
    }
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
              Technical Head • AI-ML Engineer • Web Developer
            </h2>
            
            <p className="text-lg text-gray-400 max-w-lg mb-10 leading-relaxed">
              A dedicated technology professional specialising in web portal development, AI solutions, and scalable platforms. Currently leading tech at Rajsanyog.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href={resumePdf} download="RCOEM_Ankit_Kapse_Resume.pdf">
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
                  data-testid="img-profile"
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
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light text-center mb-6">
              I am a dedicated technology professional with a <span className="text-white font-medium">Bachelor of Technology in Information Technology</span> and extensive experience in 
              web portal development and AI solutions. Currently serving as <span className="text-primary font-medium">Technical Head at Rajsanyog</span>, I specialise in creating scalable 
              technology platforms for political campaigns while managing home-grown management and AI integration skills.
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
                data-testid={`card-skill-${idx}`}
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

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 glass-panel p-6 rounded-2xl text-center"
          >
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-mono">Soft Skills</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["Adaptability", "Decision-Making", "Rhetorical Skills", "Networking"].map((s) => (
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
          
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl hover:border-primary/30 transition-all group"
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
                      { icon: <Linkedin size={20} />, href: "https://linkedin.com", label: "LinkedIn" },
                      { icon: <Github size={20} />, href: "https://github.com/AnkitKapse", label: "GitHub" },
                    ].map((social) => (
                      <a 
                        key={social.label}
                        href={social.href} 
                        target="_blank" 
                        rel="noreferrer"
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
      <footer className="py-8 border-t border-white/5 bg-black">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground font-mono text-sm">
            © {new Date().getFullYear()} Ankit Kapse — B.Tech IT, RCOEM. Engineered with <span className="text-primary">Intelligence</span>.
          </p>
        </div>
      </footer>
    </div>
  );
}
