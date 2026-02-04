import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';
import { Flame } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pizza' | 'panuozzo'>('all');

  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-32 relative bg-brand-charcoal overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-wood-pattern opacity-5 pointer-events-none mix-blend-overlay"></div>
      
      {/* Dynamic ambient lights */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-[1px] w-12 bg-brand-gold/30"></div>
            <span className="uppercase tracking-[0.4em] text-[11px] font-bold text-brand-gold">From the Oven</span>
            <div className="h-[1px] w-12 bg-brand-gold/30"></div>
          </motion.div>
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-6xl md:text-7xl font-display font-bold text-white mb-10"
          >
            Our Menu
          </motion.h2>
          
          <div className="flex justify-center gap-6">
            {['all', 'pizza', 'panuozzo'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`relative px-8 py-3 overflow-hidden rounded-sm transition-all duration-500 uppercase tracking-[0.2em] text-[10px] font-bold group ${
                  activeCategory === cat 
                    ? 'text-brand-dark bg-brand-gold shadow-[0_0_30px_rgba(212,175,55,0.2)]' 
                    : 'text-white/60 hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                <span className="relative z-10">{cat === 'all' ? 'Tout' : cat + 's'}</span>
                {activeCategory === cat && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full animate-shine" />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const { left, top } = divRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-xl overflow-hidden bg-[#121212] border border-white/5 hover:border-white/10 transition-colors duration-500"
    >
      {/* Spotlight Effect Gradient */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(212, 175, 55, 0.15), transparent 40%)`
        }}
      />

      <div className="relative z-20 flex flex-col h-full">
        <div className="h-72 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent z-10 opacity-80" />
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
            {item.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 bg-black/60 backdrop-blur-md text-white/90 text-[9px] uppercase tracking-widest font-bold rounded-sm border border-white/10 shadow-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="p-8 flex-1 flex flex-col relative bg-[#121212]">
          {/* Subtle noise on card background */}
          <div className="absolute inset-0 opacity-[0.03] bg-wood-pattern mix-blend-overlay pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4 gap-4">
              <h3 className="font-display text-2xl text-white group-hover:text-shimmer transition-colors duration-300 leading-tight">
                {item.name}
              </h3>
              <span className="font-serif text-xl text-brand-gold italic whitespace-nowrap">
                {item.price}
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-8 font-light line-clamp-3">
              {item.description}
            </p>
            
            <div className="mt-auto">
              <button className="w-full py-4 border border-white/10 text-white/70 text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                <span>Commander</span>
                <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
