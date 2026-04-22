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
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-red-600 to-rose-700 text-white shadow-2xl shadow-primary/20"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full" />

        <div className="relative mx-auto max-w-3xl px-6 py-14 sm:px-8 sm:py-20 text-center">
          <div className="flex justify-center mb-5">
            <div className="h-16 w-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/10">
              <Mail className="h-7 w-7" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Newsletter</span>
            <Sparkles className="h-4 w-4 text-amber-300" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 leading-tight">
            Abonnez-vous à notre newsletter
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Recevez chaque matin les principales actualités sénégalaises
            directement dans votre boîte mail. Gratuit et sans spam.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 inline-flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <Check className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg">Merci pour votre inscription !</p>
                <p className="text-sm text-white/70 mt-0.5">
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
                  className="w-full bg-white/15 backdrop-blur-sm border-white/20 placeholder:text-white/40 text-white h-12 rounded-xl focus:border-white focus:ring-white/30 text-base px-5"
                  aria-label="Adresse email"
                />
              </div>
              <Button
                type="submit"
                className="h-12 bg-white text-primary hover:bg-white/90 font-bold px-8 rounded-xl shadow-lg shadow-black/10 transition-all hover:shadow-xl hover:scale-[1.02]"
              >
                <Send className="h-4 w-4 mr-2" />
                S&apos;abonner
              </Button>
            </form>
          )}

          <p className="text-white/40 text-xs mt-6">
            En vous inscrivant, vous acceptez notre politique de confidentialité. Désabonnement en un clic.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
