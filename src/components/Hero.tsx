import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import cnsLogo from '@/assets/cns-logo.png';

export default function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Main Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative mb-8"
      >
        {/* Glow effect behind logo */}
        <div className="absolute inset-0 blur-3xl opacity-40">
          <div className="w-10 h-10 md:w-25 md:h-25 rounded-full bg-gradient-to-br from-primary via-gold-light to-primary" />
        </div>
        
        {/* Logo image */}
        <motion.div
          animate={{ 
            boxShadow: [
              '0 0 30px hsl(45 70% 47% / 0.2)',
              '0 0 60px hsl(45 70% 47% / 0.4)',
              '0 0 30px hsl(45 70% 47% / 0.2)',
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-primary/30"
        >
          <img 
            src={cnsLogo} 
            alt="Code Nature Systems - Tree and Circuit Logo" 
            className="w-full h-full object-contain"
          />
        </motion.div>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-semibold text-center mb-6 tracking-tight"
      >
        <span className="gold-text">Code</span>
        <span className="gold-text"> Nature </span>
        <span className="text-foreground">Studio</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-12 font-light"
      >
        Nature-Inspired Solutions Through Advanced Technology
      </motion.p>

      {/* CTA Button */}
      <motion.button
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 0 30px hsl(45 70% 47% / 0.4)'
        }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToAbout}
        className="px-8 py-4 text-lg font-medium border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
      >
        Learn More
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll to learn more"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </motion.div>
    </section>
  );
}
