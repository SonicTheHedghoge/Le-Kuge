import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Instagram, Facebook, Clock, ArrowRight, Flame } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MenuSection } from './components/MenuSection';
import { AIChef } from './components/AIChef';
import { BUSINESS_INFO, HERO_IMAGES, LOGO_URL } from './constants';

// Magnetic Button Component for that premium feel
const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void; href?: string }> = ({ children, className, onClick, href }) => {
  const ref = useRef<any>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <motion.div
      style={{ position: "relative" }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );

  const wrapperProps = {
    ref,
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    className,
    onClick
  };

  if (href) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" {...wrapperProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div {...wrapperProps}>
      {content}
    </motion.div>
  );
};

// Fire Embers Effect for Hero Section
const Embers = () => {
  // Using fixed array to avoid hydration mismatch
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: "100%", x: Math.random() * 100 + "%" }}
          animate={{
            opacity: [0, 1, 0],
            y: "-10%",
            x: `${(Math.random() - 0.5) * 20}%`
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut"
          }}
          className="absolute w-1 h-1 bg-brand-gold blur-[1px] rounded-full"
          style={{ 
             left: `${Math.random() * 100}%`,
             width: Math.random() * 3 + 1 + 'px',
             height: Math.random() * 3 + 1 + 'px'
          }}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroScale = useTransform(scrollY, [0, 600], [1.1, 1]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-gold selection:text-black overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-[40] transition-all duration-700 ${scrolled ? 'bg-black/60 backdrop-blur-xl py-4 border-b border-white/5 shadow-2xl shadow-black/50' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="relative group">
               <div className="absolute inset-0 bg-brand-gold blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
               <img src={LOGO_URL} alt="Le Kugé Logo" className="relative h-12 w-12 rounded-full border border-brand-gold/50 object-cover shadow-lg" />
             </div>
             <span className={`font-display font-bold text-2xl tracking-tighter text-shimmer ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'} transition-opacity`}>
               LE KUGÉ
             </span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.25em] font-bold text-white/70">
            {['Concept', 'Menu', 'Location'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-brand-gold transition-colors duration-300 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`} className="relative overflow-hidden group px-6 py-2.5 border border-brand-gold/30 rounded-sm">
            <span className="absolute inset-0 w-full h-full bg-brand-gold/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            <span className="relative font-bold text-xs uppercase tracking-widest text-brand-gold group-hover:text-white transition-colors duration-300">
              Book Table
            </span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={HERO_IMAGES[0]} 
            alt="Wood Fired Oven" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Embers Effect */}
        <Embers />

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.2, duration: 0.8 }}
               className="inline-flex items-center gap-2 py-1.5 px-4 border border-white/10 bg-black/30 backdrop-blur-md rounded-full mb-8"
             >
                <Flame size={12} className="text-brand-gold" fill="#D4AF37" />
                <span className="text-brand-gold/90 text-[10px] uppercase tracking-[0.3em] font-bold">
                  Authentic Neapolitan Pizza
                </span>
                <Flame size={12} className="text-brand-gold" fill="#D4AF37" />
             </motion.div>
             
             <h1 className="font-display text-7xl md:text-9xl font-bold leading-[0.9] mb-8 tracking-tight">
               <span className="block text-white">LE</span>
               <span className="block text-shimmer">KUGÉ</span>
             </h1>
             
             <p className="font-serif text-xl md:text-3xl text-white/80 italic mb-12 max-w-2xl mx-auto font-light">
               « À Djerba, le secret du goût commence toujours au feu de bois... »
             </p>
             
             <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
               <a href="#menu" className="group relative px-8 py-4 bg-brand-red overflow-hidden rounded-sm">
                 <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                 <span className="relative font-bold text-sm uppercase tracking-[0.2em] text-white flex items-center gap-3">
                   View Menu <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                 </span>
               </a>
               <div className="flex items-center gap-3 text-sm text-white/60 font-medium tracking-wide border border-white/10 px-6 py-4 rounded-sm bg-black/20 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {BUSINESS_INFO.status}
               </div>
             </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest opacity-50">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-brand-gold/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* Concept / Bio Section */}
      <section id="about" className="py-32 bg-brand-charcoal relative overflow-hidden">
        {/* Subtle radial gradient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative group"
            >
              <div className="absolute inset-0 border border-brand-gold/20 transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <div className="relative overflow-hidden">
                <img 
                  src={HERO_IMAGES[1]} 
                  alt="Chef preparing pizza" 
                  className="w-full h-[600px] object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h2 className="font-display text-5xl md:text-6xl font-bold mb-8 leading-tight">
                Passion & <br/>
                <span className="text-shimmer italic pr-2">Feu de Bois</span>
              </h2>
              <div className="space-y-8 text-white/70 font-sans text-lg leading-relaxed font-light">
                <p>
                  Located in the heart of Djerba Midoun, Le Kugé is more than a pizzeria; it is a tribute to the artisan tradition. We believe in the sanctity of dough, fire, and time.
                </p>
                <div className="border-l-2 border-brand-gold/50 pl-8 py-2 relative">
                  <span className="absolute -top-4 -left-3 text-4xl text-brand-gold/20 font-serif">"</span>
                  <p className="font-serif text-2xl text-white italic">
                    With a pizzaiolo who cooks as if he were treating his own family.
                  </p>
                </div>
                <p>
                  We focus on Neapolitan-style pizzas and homemade panuozzos, cooked to perfection in our wood-fired oven. The char, the aroma, and the texture are unmistakable signatures of our passion.
                </p>
              </div>
              
              <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
                {[
                  { label: "Followers", value: BUSINESS_INFO.social.followers },
                  { label: "Varieties", value: "15+" },
                  { label: "Artisan", value: "100%" }
                ].map((stat, i) => (
                  <div key={i} className="text-left">
                    <div className="text-3xl font-display font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <MenuSection />

      {/* Location & Info Section */}
      <section id="location" className="py-32 bg-[#080808] relative border-t border-white/5">
        <div className="container mx-auto px-6 relative z-10">
           <div className="grid lg:grid-cols-2 gap-20">
             {/* Contact Details */}
             <div className="space-y-16">
                <div>
                   <h2 className="font-display text-5xl font-bold mb-6">Visit Us</h2>
                   <p className="text-white/50 text-lg font-light max-w-md">
                     Experience the authentic taste of Italy right here in Djerba. No reservations needed for small groups.
                   </p>
                </div>

                <div className="space-y-10">
                  <div className="group flex items-start gap-6">
                    <div className="p-4 bg-white/5 border border-white/10 text-brand-gold rounded-full group-hover:bg-brand-gold group-hover:text-black transition-all duration-300">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg mb-2 text-white">Address</h4>
                      <p className="text-white/60 font-light leading-relaxed">{BUSINESS_INFO.address}</p>
                      <p className="text-sm text-brand-gold mt-2 font-medium">(En face de Papagallo)</p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-6">
                    <div className="p-4 bg-white/5 border border-white/10 text-brand-gold rounded-full group-hover:bg-brand-gold group-hover:text-black transition-all duration-300">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg mb-2 text-white">Phone</h4>
                      <a href={`tel:${BUSINESS_INFO.phone}`} className="text-white/60 font-light hover:text-white transition-colors text-xl">
                        {BUSINESS_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="group flex items-start gap-6">
                    <div className="p-4 bg-white/5 border border-white/10 text-brand-gold rounded-full group-hover:bg-brand-gold group-hover:text-black transition-all duration-300">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg mb-2 text-white">Opening Hours</h4>
                      <p className="text-white/60 font-light">Open Daily: 12:00 PM - 11:00 PM</p>
                      <p className="text-green-400 text-sm mt-2 font-bold uppercase tracking-wider">{BUSINESS_INFO.status}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 pt-8">
                  <MagneticButton 
                    href={BUSINESS_INFO.social.facebook}
                    className="w-14 h-14 flex items-center justify-center border border-white/10 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 group cursor-pointer"
                  >
                    <Facebook size={22} className="group-hover:scale-110 transition-transform" />
                  </MagneticButton>
                  <MagneticButton 
                    href={BUSINESS_INFO.social.instagram}
                    className="w-14 h-14 flex items-center justify-center border border-white/10 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 group cursor-pointer"
                  >
                    <Instagram size={22} className="group-hover:scale-110 transition-transform" />
                  </MagneticButton>
                </div>
             </div>

             {/* Map Placeholder */}
             <div className="h-[600px] w-full bg-neutral-900 rounded-lg overflow-hidden relative group border border-white/5">
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%) brightness(85%)' }}
                  loading="lazy" 
                  allowFullScreen 
                  src={`https://maps.google.com/maps?q=33.807,11.0&z=15&output=embed`}>
                </iframe>
                <div className="absolute inset-0 pointer-events-none border border-white/10 group-hover:border-brand-gold/30 transition-colors duration-500"></div>
                
                {/* Decorative corner accents */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-brand-gold opacity-50"></div>
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-brand-gold opacity-50"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-brand-gold opacity-50"></div>
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-brand-gold opacity-50"></div>
             </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
             <img src={LOGO_URL} alt="Logo" className="w-10 h-10 rounded-full grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
             <span className="font-display font-bold text-2xl tracking-tight text-white/90">LE KUGÉ</span>
          </div>
          <div className="flex gap-8 text-xs uppercase tracking-widest text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
          <div className="text-white/30 text-xs tracking-widest text-right">
            <p className="mb-2">© {new Date().getFullYear()} Le Kugé.</p>
            <p>Designed with <span className="text-brand-red animate-pulse">♥</span> & Fire</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AIChef />
    </div>
  );
};

export default App;