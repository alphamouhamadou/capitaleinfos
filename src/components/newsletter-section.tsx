'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
              <Mail className="h-7 w-7" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Abonnez-vous à notre newsletter
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto text-sm sm:text-base">
            Recevez chaque matin les principales actualités sénégalaises
            directement dans votre boîte mail. Gratuit et sans spam.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/15 rounded-lg p-4 inline-block"
            >
              <p className="font-semibold">
                Merci pour votre inscription ! 🎉
              </p>
              <p className="text-sm text-white/80 mt-1">
                Vous recevrez notre prochaine édition demain matin.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/15 border-white/25 placeholder:text-white/50 text-white h-12 focus:border-white focus:ring-white/30"
                aria-label="Adresse email"
              />
              <Button
                type="submit"
                className="h-12 bg-white text-primary hover:bg-white/90 font-semibold px-6"
              >
                <Send className="h-4 w-4 mr-2" />
                S&apos;abonner
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
