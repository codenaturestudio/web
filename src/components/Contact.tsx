import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formState);

    // Show an in-app toast notification
    toast({
      title: 'Message sent',
      description: "Thanks for contacting us — we'll get back to you shortly.",
    });

    // Reset form
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section 
      id="contact" 
      ref={ref}
      className="relative py-24 px-4 sm:px-6 overflow-x-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get In Touch
          </motion.span>
          
          <h2 className="font-serif-display text-3xl md:text-5xl font-semibold mb-6">
            Start Your <span className="gold-text">Journey</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to harness the power of nature for your next innovation? 
            Let's explore the possibilities together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-2 lg:gap-12">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6 min-w-0"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full max-w-full box-border px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full max-w-full box-border px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                rows={5}
                className="w-full max-w-full box-border px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground resize-none"
                placeholder="Tell us about your project..."
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px hsl(45 70% 47% / 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors duration-300"
            >
              Send Message
              <Send className="w-4 h-4" />
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8 min-w-0"
          >
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border overflow-hidden">
              <h3 className="font-serif-display text-2xl font-semibold mb-6 text-foreground">
                Connect With Us
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-foreground font-medium text-sm md:text-base truncate md:whitespace-normal md:overflow-visible">codenaturestudio@gmail.com</p>
                  </div>
                </div>
{/* 
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="text-foreground font-medium">+55(81) </p>
                  </div>
                </div> 
*/}

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="text-foreground font-medium">Brazil</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative quote */}
            <div className="p-4 md:p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <p className="font-serif-display text-lg italic text-foreground/80">
                "Look deep into nature, and then you will understand everything better."
              </p>
              <p className="mt-3 text-sm text-primary font-medium">— Albert Einstein</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
