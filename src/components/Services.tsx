import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TreePine, Network, Microscope, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: TreePine,
    title: 'Biomimetic Research',
    description: 'Deep analysis of natural systems to identify solutions applicable to engineering and design challenges.',
    features: ['Pattern Analysis', 'Structural Studies', 'Ecosystem Modeling'],
  },
  {
    icon: Network,
    title: 'Neural Architecture',
    description: 'AI systems modeled after biological neural networks for enhanced learning and adaptation.',
    features: ['Deep Learning', 'Adaptive Systems', 'Pattern Recognition'],
  },
  {
    icon: Microscope,
    title: 'Material Science',
    description: 'Development of advanced materials inspired by natural structures and processes.',
    features: ['Self-Healing Materials', 'Bio-Composites', 'Smart Surfaces'],
  },
  {
    icon: Lightbulb,
    title: 'Innovation Consulting',
    description: 'Strategic guidance for integrating biomimetic principles into your business solutions.',
    features: ['Strategy Development', 'R&D Partnership', 'Implementation'],
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      id="services" 
      ref={ref}
      className="relative py-32 px-6 bg-forest-deep/50"
    >
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
            Our Services
          </motion.span>
          
          <h2 className="font-serif-display text-3xl md:text-5xl font-semibold mb-6">
            <span className="gold-text">Nature-Powered</span> Solutions
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From research to implementation, we offer comprehensive services that bridge 
            the gap between natural wisdom and technological advancement.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-500 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              </div>

              <div className="relative flex flex-col items-center md:flex-row md:items-start gap-6">
                {/* Icon */}
                <div className="flex-shrink-0 mb-4 md:mb-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto md:mx-0 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-serif-display text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features tags */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
