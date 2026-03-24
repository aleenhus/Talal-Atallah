import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  ChevronRight, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Globe, 
  Zap, 
  Target, 
  Palette, 
  Camera, 
  Mail, 
  Phone, 
  MapPin,
  CheckCircle2
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass shadow-sm' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
            {/* Logo Placeholder - User can replace src with actual logo path */}
            <span className="text-paper font-display text-2xl font-bold">DT</span>
          </div>
          <span className={`text-2xl font-display font-bold tracking-tighter transition-colors duration-300 ${isScrolled ? 'text-dark' : 'text-dark'}`}>
            DS <span className="text-accent">TALAL</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors text-dark/80"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-6 py-2 bg-dark text-paper text-xs font-bold uppercase tracking-widest hover:bg-accent transition-all duration-300 rounded-full"
          >
            Start Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-dark" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-paper border-b border-dark/10 p-6 flex flex-col space-y-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-display font-bold text-dark hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="w-full py-4 bg-dark text-paper text-center font-bold uppercase tracking-widest rounded-lg hover:bg-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yHeading = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const ySubtext = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const yButtons = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scaleContent = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);
  const blurContent = useTransform(scrollYProgress, [0, 0.4], ["blur(0px)", "blur(10px)"]);
  
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotateBlob1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotateBlob2 = useTransform(scrollYProgress, [0, 1], [0, -45]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-paper">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: yBlob1, rotate: rotateBlob1 }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" 
        />
        <motion.div 
          style={{ y: yBlob2, rotate: rotateBlob2 }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-gray/15 rounded-full blur-[120px]" 
        />
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #141414 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          style={{ opacity: opacityContent, scale: scaleContent, filter: blurContent }}
          className="max-w-5xl"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-1 border border-accent/30 rounded-full text-accent text-xs font-bold uppercase tracking-[0.2em] mb-8"
          >
            Creative Direction • Branding • Strategy
          </motion.span>
          
          <motion.div style={{ y: yHeading }}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.85] tracking-tighter mb-10 text-dark"
            >
              WE ARCHITECT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-dark via-accent to-muted">
                VISUAL LEGACIES.
              </span>
            </motion.h1>
          </motion.div>

          <motion.p 
            style={{ y: ySubtext }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-2xl text-dark/60 max-w-2xl mb-12 leading-relaxed"
          >
            Ds Talal is an elite creative partner for brands that demand distinction. 
            We transform vision into market authority through bold design and strategic storytelling.
          </motion.p>

          <motion.div 
            style={{ y: yButtons }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <a 
              href="#portfolio" 
              className="group flex items-center justify-center gap-3 px-10 py-5 bg-dark text-paper font-bold uppercase tracking-widest hover:bg-accent transition-all duration-300 rounded-full shadow-lg hover:shadow-accent/20"
            >
              View Portfolio
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="flex items-center justify-center px-10 py-5 border border-dark/20 hover:border-accent text-dark transition-colors font-bold uppercase tracking-widest rounded-full"
            >
              Let's Talk
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity: opacityContent }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-dark">Scroll</span>
        <div className="w-[1px] h-12 bg-dark" />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-paper text-dark">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-dark overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                alt="Talal - Creative Director" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent p-8 rounded-2xl hidden md:block shadow-xl">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-dark font-display font-bold text-4xl leading-tight"
              >
                10+ <br />
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-sm uppercase tracking-widest"
                >
                  Years of Excellence
                </motion.span>
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              The Visionary
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight"
            >
              Crafting Identities that Command Attention.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-dark/70 mb-6 leading-relaxed"
            >
              Founded by Talal, Ds Talal is more than a creative agency. We are a strategic studio 
              dedicated to the pursuit of visual perfection. We believe that every brand has a story 
              waiting to be told with power and elegance.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-dark/70 mb-10 leading-relaxed"
            >
              Our approach combines deep market strategy with avant-garde aesthetics, 
              ensuring our clients don't just participate in their industry—they lead it.
            </motion.p>
            
            <div className="grid grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-6 bg-blue-gray/10 rounded-xl"
              >
                <motion.h4 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="font-display font-bold text-xl mb-2"
                >
                  Our Mission
                </motion.h4>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-sm text-dark/60"
                >
                  To elevate brands through uncompromising creative standards.
                </motion.p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="p-6 bg-accent/10 rounded-xl"
              >
                <motion.h4 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="font-display font-bold text-xl mb-2"
                >
                  Our Vision
                </motion.h4>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-sm text-dark/60"
                >
                  To be the global benchmark for luxury branding and digital strategy.
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Target className="text-accent" size={32} />,
      title: "Creative Direction",
      desc: "High-level conceptualization and artistic oversight for multi-channel campaigns.",
      outcome: "Cohesive brand narrative across all touchpoints."
    },
    {
      icon: <Palette className="text-accent" size={32} />,
      title: "Branding & Identity",
      desc: "Crafting unique visual languages, logos, and brand guidelines that resonate.",
      outcome: "A distinct market presence that builds trust and loyalty."
    },
    {
      icon: <Zap className="text-accent" size={32} />,
      title: "Digital Strategy",
      desc: "Data-driven marketing and growth strategies tailored for luxury markets.",
      outcome: "Measurable ROI and increased brand authority."
    },
    {
      icon: <Camera className="text-accent" size={32} />,
      title: "Visual Storytelling",
      desc: "Art direction and production for cinematic photography and video content.",
      outcome: "Emotional connection through high-end visual assets."
    }
  ];

  return (
    <section id="services" className="py-24 bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Capabilities
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6 text-paper"
          >
            Specialized Expertise.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-paper/50 text-lg"
          >
            We provide a full spectrum of creative services designed to propel your brand to the forefront of your industry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 glass-dark rounded-2xl hover:border-accent/50 transition-all duration-500 group"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                className="text-2xl font-display font-bold mb-4 text-paper"
              >
                {service.title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                className="text-paper/60 text-sm mb-6 leading-relaxed"
              >
                {service.desc}
              </motion.p>
              <div className="pt-6 border-t border-paper/10">
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 + 0.4 }}
                  className="text-[10px] uppercase tracking-widest text-accent font-bold block mb-2"
                >
                  Outcome
                </motion.span>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 + 0.5 }}
                  className="text-xs font-medium text-paper"
                >
                  {service.outcome}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    {
      title: "Luxe Residences",
      category: "Real Estate / Branding",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Aura Skincare",
      category: "Luxury / Identity",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1974&auto=format&fit=crop"
    },
    {
      title: "Velocity Motors",
      category: "Automotive / Strategy",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Zenith Tech",
      category: "Startup / Digital",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-paper text-dark">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              Selected Work
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold leading-tight"
            >
              Visualizing Success for Global Brands.
            </motion.h2>
          </div>
          <a href="#" className="group flex items-center gap-2 font-bold uppercase tracking-widest text-sm border-b-2 border-dark pb-1">
            View All Projects
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6">
                <motion.img 
                  variants={{
                    hover: { scale: 1.05 }
                  }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <motion.div 
                  variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 1 }
                  }}
                  initial="initial"
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-dark/40 flex items-center justify-center"
                >
                  <motion.span 
                    variants={{
                      initial: { opacity: 0, y: 20 },
                      hover: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.4, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                    className="px-8 py-3 bg-paper text-dark font-bold uppercase tracking-widest text-xs rounded-full"
                  >
                    View Case Study
                  </motion.span>
                </motion.div>
              </div>
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                className="text-2xl font-display font-bold mb-1"
              >
                {project.title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.4 }}
                className="text-dark/50 uppercase tracking-widest text-xs font-bold"
              >
                {project.category}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { number: "01", title: "Discovery", desc: "We dive deep into your brand's DNA, market position, and goals." },
    { number: "02", title: "Strategy", desc: "Developing a robust roadmap and creative direction for the project." },
    { number: "03", title: "Design", desc: "Crafting visual assets with meticulous attention to detail." },
    { number: "04", title: "Delivery", desc: "Launching your brand with full support and strategic oversight." }
  ];

  return (
    <section id="process" className="py-24 bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Methodology
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold"
          >
            The Path to Distinction.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative"
            >
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.05 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.1 + 0.3 }}
                className="text-8xl font-display font-bold text-white absolute -top-10 -left-4 z-0"
              >
                {step.number}
              </motion.span>
              <div className="relative z-10 pt-8">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                  className="text-2xl font-display font-bold mb-4"
                >
                  {step.title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                  className="text-white/50 leading-relaxed"
                >
                  {step.desc}
                </motion.p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-[1px] bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-paper text-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-12 flex justify-center"
          >
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-accent text-2xl">★</span>
            ))}
          </motion.div>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-display font-bold italic leading-tight mb-12"
          >
            "Ds Talal didn't just give us a new logo; they gave us a new identity that completely 
            changed how our customers perceive us. Our revenue increased by 40% within the first six months."
          </motion.blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-dark rounded-full overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" 
                alt="Client" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-display font-bold text-lg"
              >
                Marcus Thorne
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-dark/50 text-sm uppercase tracking-widest font-bold"
              >
                CEO, Thorne Real Estate
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <section id="contact" className="py-24 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              Get In Touch
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight"
            >
              Let's Build <br /> Something <br /> <span className="text-accent">Powerful.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-lg mb-12 max-w-md"
            >
              Ready to elevate your brand? We're currently accepting new projects for 2024. 
              Let's discuss how we can help you achieve market authority.
            </motion.p>
            
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-xs uppercase tracking-widest mb-1"
                  >
                    Email Us
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="font-bold"
                  >
                    hello@dstalal.com
                  </motion.p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-accent">
                  <Phone size={20} />
                </div>
                <div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-xs uppercase tracking-widest mb-1"
                  >
                    Call Us
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="font-bold"
                  >
                    +971 50 000 0000
                  </motion.p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-xs uppercase tracking-widest mb-1"
                  >
                    Our Studio
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="font-bold"
                  >
                    Dubai Design District, UAE
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="glass p-8 md:p-12 rounded-3xl">
            {formState === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-dark mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl font-display font-bold mb-4 text-paper"
                >
                  Message Received.
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-paper/60"
                >
                  Our team will review your inquiry and get back to you within 24 hours.
                </motion.p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-8 text-accent font-bold uppercase tracking-widest text-sm border-b border-accent"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-2"
                  >
                    <label className="text-xs uppercase tracking-widest font-bold text-white/40">Full Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent transition-colors"
                      placeholder="John Doe"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-2"
                  >
                    <label className="text-xs uppercase tracking-widest font-bold text-white/40">Email Address</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent transition-colors"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-2"
                >
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40">Service Interested In</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent transition-colors appearance-none">
                    <option className="bg-dark">Creative Direction</option>
                    <option className="bg-dark">Branding & Identity</option>
                    <option className="bg-dark">Digital Strategy</option>
                    <option className="bg-dark">Visual Storytelling</option>
                  </select>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-2"
                >
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40">Project Details</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Tell us about your vision..."
                  ></textarea>
                </motion.div>
                <button 
                  disabled={formState === 'submitting'}
                  type="submit" 
                  className="w-full py-5 bg-paper text-dark font-bold uppercase tracking-widest rounded-xl hover:bg-accent hover:text-paper transition-all duration-300 disabled:opacity-50"
                >
                  {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-dark border-t border-paper/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <a href="#" className="flex items-center gap-3 group justify-center md:justify-start mb-4">
              <div className="w-8 h-8 bg-paper rounded-md flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                <span className="text-dark font-display text-xl font-bold">DT</span>
              </div>
              <span className="text-xl font-display font-bold tracking-tighter text-paper">
                DS <span className="text-accent">TALAL</span>
              </span>
            </a>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-paper text-[10px] uppercase tracking-widest font-bold"
            >
              © 2024 Ds Talal. All Rights Reserved.
            </motion.p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-paper/40 hover:text-accent transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-paper/40 hover:text-accent transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-paper/40 hover:text-accent transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-paper/40 hover:text-accent transition-colors"><Globe size={20} /></a>
          </div>

          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-paper/40">
            <a href="#" className="hover:text-paper transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-paper transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-paper rounded-2xl flex items-center justify-center">
                <span className="text-dark font-display text-4xl font-bold">DT</span>
              </div>
              <div className="text-4xl font-display font-bold tracking-tighter text-paper">
                DS <span className="text-accent">TALAL</span>
              </div>
            </motion.div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 240 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-[1px] bg-accent mt-8"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
