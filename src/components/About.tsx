import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Cpu, Zap } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Nature-Inspired Design',
    description: 'We study natural systems that have evolved over millions of years, extracting principles that solve complex engineering challenges.',
  },
  {
    icon: Cpu,
    title: 'Advanced Technology',
    description: 'Cutting-edge computational methods and AI translate biological insights into practical, scalable solutions.',
  },
  {
    icon: Zap,
    title: 'Sustainable Innovation',
    description: 'Our solutions minimize environmental impact while maximizing efficiency, just as nature intended.',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      id="about" 
      ref={ref}
      className="relative py-32 px-6"
    >
      {/* Decorative circuit lines */}
      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-block px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            About Us
          </motion.span>
          
          <h2 className="font-serif-display text-3xl md:text-5xl font-semibold mb-6">
            Where <span className="gold-text">Nature</span> Meets{' '}
            <span className="gold-text">Engineering</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Code Nature Studio explores the intersection of natural intelligence and digital innovation. 
            We believe that nature holds the blueprints for solving humanity's most complex challenges.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              className="group relative p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/50 transition-all duration-500"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent" />
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
              </div>

              {/* Content */}
              <h3 className="relative font-serif-display text-xl font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              <p className="relative text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
      </div>
    </section>
  );
}
