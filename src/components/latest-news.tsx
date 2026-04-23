'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categoryColors } from '@/lib/data';
import { useArticles } from '@/lib/articles-context';
import { ChevronRight } from 'lucide-react';

interface LatestNewsProps {
  onArticleClick: (id: string) => void;
}

export function LatestNews({ onArticleClick }: LatestNewsProps) {
  const { latestArticles, loading } = useArticles();
  const displayArticles = latestArticles.slice(0, 6);

  if (loading) {
    return (
      <section id="dernieres-actualites" className="py-8 scroll-mt-28">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-40 mb-7" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <div className="aspect-[16/10] bg-muted" />
                <div className="p-4 pb-5 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="dernieres-actualites" className="py-8 scroll-mt-28">
      {/* Section header */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-4">
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/50">
            Dernières actualités
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-border via-border/60 to-transparent hidden sm:block" />
        </div>
        <Button
          variant="ghost"
          className="hidden sm:flex gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors rounded-lg px-3"
          onClick={() => {
            const el = document.querySelector('#rubriques');
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 120;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
        >
          Tout voir
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
              duration: 0.5,
              delay: index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Card
              className="group cursor-pointer overflow-hidden border border-border/50 bg-card rounded-2xl h-full card-lift"
              onClick={() => onArticleClick(article.id)}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover img-zoom"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-3 left-3">
                  <Badge className={`${categoryColors[article.category]} border-0 text-[9px] font-bold px-2.5 py-0.5 shadow-md`}>
                    {article.category}
                  </Badge>
                </div>

                {/* Arrow on hover */}
                <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 shadow-sm">
                  <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-4 pb-5">
                <h3 className="font-bold text-[14px] leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-[13px] text-muted-foreground line-clamp-2 mb-3.5 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground/70 pt-3 border-t border-border/40">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Mobile see more */}
      <div className="flex justify-center mt-7 sm:hidden">
        <Button
          variant="outline"
          className="gap-2 text-sm font-semibold rounded-xl px-6"
          onClick={() => {
            const el = document.querySelector('#rubriques');
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 120;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
        >
          Voir plus d&apos;articles
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
