import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import cnsLogo from '@/assets/cns-logo.png';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/90 backdrop-blur-lg border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all duration-300">
              <img 
                src={cnsLogo} 
                alt="Code Nature Systems" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-serif-display text-xl font-semibold text-foreground hidden sm:block">
              Code Nature Studio
            </span>
          </motion.a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                whileHover={{ y: -2 }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 text-sm font-medium border border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--gold)/0.3)]"
            onClick={() => scrollToSection('#contact')}
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
