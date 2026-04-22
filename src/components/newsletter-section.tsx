'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary/10"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/3 bg-primary/8 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full translate-y-1/3 -translate-x-1/4 bg-amber-500/6 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="relative mx-auto max-w-3xl px-6 py-14 sm:px-8 sm:py-20 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="h-14 w-14 rounded-2xl bg-primary/15 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-primary/10 animate-float">
              <Mail className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>

          {/* Label */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
              Newsletter
            </span>
            <Sparkles className="h-3 w-3 text-amber-400" />
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-black mb-3 leading-tight text-white tracking-tight">
            Ne manquez aucune actualité
          </h2>
          <p className="text-white/50 mb-9 max-w-md mx-auto text-[13.5px] sm:text-sm leading-relaxed">
            Recevez chaque matin les principales actualités sénégalaises
            directement dans votre boîte mail. Gratuit et sans spam.
          </p>

          {/* Form / Success */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="inline-flex items-center gap-4 bg-white/8 backdrop-blur-sm rounded-2xl p-5 border border-white/10"
            >
              <div className="h-11 w-11 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-[15px]">Merci pour votre inscription !</p>
                <p className="text-[12px] text-white/50 mt-0.5">
                  Vous recevrez notre prochaine édition demain matin.
                </p>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/8 backdrop-blur-sm border-white/10 placeholder:text-white/25 text-white h-12 rounded-xl focus:border-white/30 focus:ring-white/10 text-[13.5px] px-5"
                  aria-label="Adresse email"
                />
              </div>
              <Button
                type="submit"
                className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-7 rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
              >
                <Send className="h-3.5 w-3.5 mr-2" />
                S&apos;abonner
              </Button>
            </form>
          )}

          <p className="text-white/25 text-[10.5px] mt-7">
            En vous inscrivant, vous acceptez notre politique de confidentialité.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
