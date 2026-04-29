import { motion } from "motion/react";
import { ArrowRight, ChevronRight, CheckCircle2, TrendingUp, Zap, Target, Users, Megaphone, BrainCircuit, Menu, X, Instagram, Mail } from "lucide-react";
import { useState, useEffect, MouseEvent } from "react";
import logo from "./assets/logo.png";
import heroImage from "./assets/hero.png";

// --- Components ---

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = ["sobre-mi", "servicios", "proceso", "contacto"];
    const observerOptions = {
      root: null,
      rootMargin: "-130px 0px -80% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrolling) return;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isScrolling]);

  const handleNavClick = (id: string) => {
    setActiveLink(id);
    setIsScrolling(true);
    setIsMobileMenuOpen(false);
    // Remove the lock after the smooth scroll finishes (approx 1200ms for safety)
    setTimeout(() => setIsScrolling(false), 1200);
  };

  const navLinks = [
    { name: "Sobre mí", href: "#sobre-mi", id: "sobre-mi" },
    { name: "Servicios", href: "#servicios", id: "servicios" },
    { name: "Proceso", href: "#proceso", id: "proceso" },
    { name: "Trabajemos juntos", href: "#contacto", id: "contacto" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-brand-black/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-32 flex items-center justify-between">
        <a 
          href="#" 
          className="flex items-center group transition-transform hover:scale-105 active:scale-95"
          onClick={() => handleNavClick("")}
        >
          <img 
            src={logo} 
            alt="Arnau Anfruns" 
            className="h-16 md:h-24 w-auto object-contain"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 text-[11px] font-bold uppercase tracking-[0.25em]">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => handleNavClick(link.id)}
              className={`transition-all duration-300 pb-1 ${
                activeLink === link.id
                  ? "text-brand-navy border-b-2 border-brand-navy"
                  : "text-white/50 hover:text-brand-navy"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 w-full bg-brand-black border-b border-white/10 p-10 flex flex-col gap-8"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => handleNavClick(link.id)}
              className={`text-xl font-black uppercase tracking-[0.2em] transition-all ${
                activeLink === link.id ? "text-brand-navy" : "text-white/50"
              }`}
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-48 pb-24 min-h-screen flex items-center bg-brand-black text-brand-white overflow-x-hidden">
      {/* Background Accent Blur */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-brand-navy rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-8 w-full"
        >
          <div className="inline-block px-3 py-1 border border-brand-navy/30 rounded-full mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-navy flex items-center gap-2">
              <BrainCircuit size={14} />
              Marketing & Publicidad v2026
            </span>
          </div>
          <h1 className="text-3xl sm:text-6xl lg:text-[90px] xl:text-[100px] leading-[1.1] md:leading-[0.85] font-black tracking-tighter mb-8 uppercase break-words hyphens-none">
            Estrategia con <span className="text-brand-navy">Criterio.</span><br className="hidden sm:block" />
            Resultados con <span className="text-white/20">Impacto.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 mb-12 max-w-xl leading-relaxed font-medium">
            Consultoría estratégica especializada en escalar marcas personales mediante <span className="text-brand-white">Publicidad de Alto Rendimiento</span> y Relaciones Públicas con impacto real.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 items-center">
            <a href="#contacto" className="px-12 py-6 bg-brand-navy text-brand-black font-black uppercase tracking-[0.2em] text-xs hover:bg-brand-white transition-all shadow-2xl shadow-brand-navy/20">
              Agendar Consultoría
            </a>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-white/40 tracking-widest mb-1 font-black">Próxima disponibilidad</span>
              <span className="text-sm font-mono text-brand-navy">Octubre 2026 — 2 Slots</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block md:col-span-4 relative aspect-[3/4] bg-white/5 border border-white/10 group overflow-hidden"
        >
          <img 
            src={heroImage} 
            alt="Estrategia y Criterio" 
            className="object-cover w-full h-full grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="sobre-mi" className="py-24 bg-brand-black text-brand-white border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-brand-navy font-black tracking-[0.4em] text-[10px] uppercase mb-6 block">El Arquitecto</span>
            <h2 className="text-5xl md:text-6xl font-black mb-10 leading-[0.9] tracking-tighter uppercase">Menos ruido, <br /><span className="text-white/30">más directo.</span></h2>
            <div className="space-y-6 text-white/50 font-medium leading-relaxed md:text-lg">
              <p>
                Soy <span className="text-brand-white font-bold">Arnau Anfruns</span>, consultor estratégico enfocado en transformar la inversión en publicidad en un activo de alto rendimiento.
              </p>
              <p>
                Mi valor reside en el <strong className="text-brand-navy uppercase tracking-widest text-sm">criterio estratégico</strong>. No implemento herramientas por moda; las utilizo para amplificar resultados humanos y empresariales mediante sistemas de IA predictiva.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-6">
               <div className="w-12 h-px bg-brand-navy"></div>
               <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/50">BCN // Arnau Anfruns</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="p-6 sm:p-10 bg-white/5 border border-white/10 flex flex-col justify-center">
               <span className="text-3xl sm:text-6xl font-black mb-2 tracking-tighter">07</span>
               <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/40 font-black">Años de Experiencia</span>
             </div>
             <div className="p-6 sm:p-10 bg-brand-navy text-brand-black flex flex-col justify-center">
               <span className="text-3xl sm:text-6xl font-black mb-2 tracking-tighter">+50</span>
               <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-black">Clientes</span>
             </div>
             <div className="p-6 sm:p-10 bg-white/5 border border-white/10 flex flex-col justify-center">
               <span className="text-3xl sm:text-6xl font-black mb-2 tracking-tighter">12M</span>
               <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/40 font-black">Inversión Publicitaria</span>
             </div>
             <div className="p-6 sm:p-10 bg-white/5 border border-white/10 flex flex-col justify-center">
               <span className="text-3xl sm:text-6xl font-black mb-2 tracking-tighter">240%</span>
               <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-brand-navy font-black">ROI Medio</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Marketing Digital",
      desc: "Embudos de venta impulsados por IA Predictiva y estrategias de crecimiento radical.",
      sub: "Estrategia de Crecimiento"
    },
    {
      title: "Publicidad Ads",
      desc: "Media Buying avanzado para marcas que facturan 6+ cifras mensuales.",
      sub: "Rendimiento Publicitario"
    },
    {
      title: "Relaciones Públicas",
      desc: "Autoridad masiva mediante posicionamiento mediático estratégico.",
      sub: "Construcción de Autoridad"
    }
  ];

  return (
    <section id="servicios" className="py-32 bg-brand-black text-brand-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 border-b border-white/10 pb-10 gap-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Especialización.</h2>
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black">Especialidades</span>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 p-10 border-l-4 border-brand-navy group hover:bg-white/10 transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.3em] text-brand-navy mb-4 font-black">{s.sub}</h3>
                <p className="text-2xl font-black tracking-tight leading-tight uppercase mb-6">{s.title}</p>
                <p className="text-white/40 text-sm leading-relaxed font-medium">{s.desc}</p>
              </div>
              <div className="mt-12 flex justify-end">
                <ArrowRight size={20} className="text-white/20 group-hover:text-brand-navy transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Results = () => {
  return (
    <section className="py-24 bg-brand-black text-brand-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-12 gap-20 items-center">
          <div className="md:col-span-12 mb-10">
             <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none text-center">Impacto real.</h2>
          </div>
          
          <div className="md:col-span-6 space-y-10">
             {[
               { title: "Escalado Predictivo", text: "Multiplicamos la captación sin disparar el CPA mediante IA." },
               { title: "Dominio de Mercado", text: "Tu marca se posiciona como el estándar de oro en el sector." },
             ].map((b, i) => (
               <div key={i} className="flex gap-8 group">
                 <div className="text-4xl font-black text-brand-navy opacity-30 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                 <div>
                   <h4 className="text-xl font-black uppercase tracking-tight mb-2">{b.title}</h4>
                   <p className="text-white/40 text-sm font-medium leading-relaxed">{b.text}</p>
                 </div>
               </div>
             ))}
          </div>

          <div className="md:col-span-6 bg-white/5 p-12 border border-white/10 relative group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <TrendingUp size={120} />
             </div>
             <blockquote className="text-2xl font-medium leading-relaxed mb-10 relative z-10 italic">
               "Trabajar con Arnau no es solo invertir en marketing, es tener una estrategia clara que convierte visitas en clientes reales. Entiende el negocio, no solo las métricas."
             </blockquote>
             <p className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-navy">— Josep Maria // Assessoria Anfruns</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { title: "Auditoría Profunda", desc: "Analizamos cada métrica y proceso actual para encontrar fugas de beneficio." },
    { title: "El Plan Maestro", desc: "Diseño de la estructura estratégica personalizada basada en datos y psicología." },
    { title: "Lanzamiento Agresivo", desc: "Activación de campañas y sistemas con monitoreo de resultados en tiempo real." },
    { title: "Escalado con IA", desc: "Apicamos IA para escalar creatividades y outputs sin disparar los costes operativos." }
  ];

  return (
    <section id="proceso" className="py-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-left mb-20 border-b border-brand-black pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">El Proceso.</h2>
          <p className="text-sm font-black uppercase tracking-widest text-brand-black">De la auditoría al escalado</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12">
          {steps.map((s, i) => (
            <div key={i} className="relative group">
              <div className="text-6xl md:text-8xl font-black text-gray-200 mb-4 group-hover:text-brand-navy/20 transition-colors border-b border-gray-200 pb-4">0{i+1}</div>
              <div className="relative">
                <h4 className="text-lg font-bold mb-4 tracking-tight uppercase">
                  {s.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed font-medium">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className="py-24 bg-brand-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-16">
          <p className="text-xs font-black uppercase tracking-[0.5em] text-gray-300">LÍDERES QUE CONFÍAN 2026</p>
          <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-16 gap-y-12 items-center opacity-30 grayscale saturate-0 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
            <div className="text-xl md:text-2xl font-black tracking-tighter uppercase text-center">ASSESSORIA ANFRUNS</div>
            <div className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-center">DAKE <span className="text-[10px] font-medium tracking-normal normal-case opacity-60 block">Culto a la Cocina</span></div>
            <div className="text-xl md:text-2xl font-black tracking-tighter uppercase italic border-b-4 border-brand-navy pb-1 text-center">SAV VILARÓ</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const CONTACT_EMAIL = "arnauanfrunsmarketing@gmail.com";
  const INSTAGRAM_URL = "https://www.instagram.com/anfruns_studio/";
  const [copied, setCopied] = useState(false);

  const handleEmailClick = (e: MouseEvent) => {
    e.preventDefault();
    // Copiar al portapapeles
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    // Abrir Gmail Web directamente
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`, '_blank');
  };

  return (
    <section id="contacto" className="py-16 md:py-32 bg-brand-black text-brand-white relative">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 italic leading-none">Directo al <span className="text-brand-navy underline underline-offset-8">Objetivo.</span></h2>
        
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 mt-12">
          {/* Instagram Action */}
          <a 
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white/5 border border-white/10 p-8 md:p-12 flex flex-col items-center justify-center gap-4 hover:bg-brand-navy hover:text-brand-black transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <Instagram size={60} />
            </div>
            <Instagram size={40} className="text-brand-navy group-hover:text-brand-black transition-colors" />
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-1 opacity-50">Social Direct</p>
              <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">Instagram DM</h3>
            </div>
            <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-20px] group-hover:translate-x-0" />
          </a>

          {/* Email Action */}
          <a 
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`}
            target="_top"
            onClick={handleEmailClick}
            className="group relative bg-white/5 border border-white/10 p-4 py-8 sm:p-10 md:p-12 flex flex-col items-center justify-center gap-4 hover:bg-white hover:text-brand-black transition-all duration-500"
          >
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <Mail size={40} />
            </div>
            {copied ? (
              <CheckCircle2 size={32} className="text-green-500 transition-colors" />
            ) : (
              <Mail size={32} className="text-brand-navy group-hover:text-brand-black transition-colors" />
            )}
            <div className="text-center w-full px-1">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-1 opacity-50">
                {copied ? "Dirección Copiada" : "E-mail Directo"}
              </p>
              <h3 className="text-[8.5px] xs:text-[10px] sm:text-sm md:text-base font-black uppercase tracking-tighter leading-tight break-all">
                {CONTACT_EMAIL}
              </h3>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-[-20px] group-hover:translate-x-0">
               <span className="text-[9px] font-black uppercase tracking-widest text-inherit">
                 {copied ? "¡Listo!" : "Abrir Gmail"}
               </span>
               <ArrowRight size={16} />
            </div>
          </a>
        </div>

        <p className="mt-16 text-white/30 text-[10px] font-black uppercase tracking-[0.5em]">Respuesta en menos de 24h</p>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-brand-black text-brand-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-4">
          <img 
            src={logo} 
            alt="Arnau Anfruns" 
            className="h-12 w-auto object-contain"
          />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">BCN</span>
        </div>
        <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.2em] text-white/40">
           <span>© 2026 Arnau Anfruns. Todos los derechos reservados.</span>
        </div>
        <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-brand-navy">
          <a href="https://www.linkedin.com/in/arnau-anfruns-vilaro" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-brand-black selection:bg-brand-navy selection:text-brand-black">
      <Navbar />
      <Hero />
      <SocialProof />
      <About />
      <Services />
      <Results />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
}
