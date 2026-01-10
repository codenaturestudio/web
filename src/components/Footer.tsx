import { motion } from 'framer-motion';
import cnsLogo from '@/assets/cns-logo.png';

const footerLinks = {
  company: [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Careers', href: '#' },
  ],
  resources: [
    { name: 'Research', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'Blog', href: '#' },
  ],
  legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Cookies', href: '#' },
  ],
};

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative py-16 px-6 bg-forest-deep border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a 
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center gap-3 mb-4 group"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all duration-300">
                <img 
                  src={cnsLogo} 
                  alt="Code Nature Studio" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif-display text-lg font-semibold text-foreground">
                Code Nature Studio
              </span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The fusion of natural intelligence and digital innovation.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Code Nature Studio. All rights reserved.
          </p>
          
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Built inspired by nature
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
