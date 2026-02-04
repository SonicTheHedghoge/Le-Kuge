import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithChef } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChef: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Ciao! I am Chef Luigi. Looking for the perfect pizza recommendation?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const responseText = await chatWithChef(userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] font-sans flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="pointer-events-auto mb-4 w-[calc(100vw-32px)] sm:w-[380px] h-[calc(80vh-80px)] sm:h-[600px] flex flex-col rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-xl bg-black/90"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-red/90 to-red-900/90 p-4 sm:p-5 flex items-center justify-between border-b border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/10 shadow-lg">
                   <ChefHat className="text-white w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base sm:text-lg tracking-wide">Chef Luigi AI</h3>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] text-white/70 uppercase tracking-widest font-medium">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-6 bg-transparent custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 sm:p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-gold text-brand-dark rounded-tr-none font-medium' 
                      : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5 backdrop-blur-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 bg-black/40 border-t border-white/10 backdrop-blur-md">
              <div className="relative flex items-center group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for a pizza recommendation..."
                  className="w-full bg-white/5 text-white pl-4 pr-12 py-3 sm:py-4 rounded-xl border border-white/10 focus:border-brand-gold/50 focus:bg-white/10 focus:outline-none transition-all duration-300 placeholder:text-white/20 text-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2 sm:p-2.5 bg-brand-gold text-brand-dark rounded-lg hover:bg-white transition-all disabled:opacity-0 disabled:scale-75 transform duration-200"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-brand-gold rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] text-brand-dark hover:bg-white transition-all duration-500 z-50 border-2 border-transparent hover:border-brand-gold"
      >
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} className="sm:hidden" />
              <X size={28} className="hidden sm:block" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={28} className="sm:hidden" />
              <MessageCircle size={32} className="hidden sm:block" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 shadow-lg border border-black"></span>
            </span>
        )}
      </motion.button>
    </div>
  );
};