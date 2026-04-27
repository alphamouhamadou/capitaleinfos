'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, ArrowUpRight, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getCategoryColor } from '@/lib/category-utils';
import { useArticles } from '@/lib/articles-context';

interface LatestNewsProps {
  onArticleClick: (id: string) => void;
}

export function LatestNews({ onArticleClick }: LatestNewsProps) {
  const { latestArticles, loading } = useArticles();
  const displayArticles = latestArticles.slice(0, 6);

  /* ── Loading skeleton ─────────────────────────────────────── */
  if (loading) {
    return (
      <section id="dernieres-actualites" className="py-10 scroll-mt-36">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="h-5 bg-muted rounded w-56" />
            <div className="h-9 w-28 bg-muted rounded-lg hidden sm:block" />
          </div>
          {/* Grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-border/40">
                <div className="aspect-[16/10] bg-muted" />
                <div className="p-4 pb-5 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-5/6" />
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <div className="h-3 bg-muted rounded w-24" />
                    <div className="h-3 bg-muted rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── Section content ──────────────────────────────────────── */
  return (
    <section id="dernieres-actualites" className="py-10 scroll-mt-36">
      {/* ── Header row ──────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex items-center gap-4"
        >
          {/* Triple-slash accent bar */}
          <div className="w-1 h-8 bg-primary rounded-full" />
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            <span className="text-foreground">Dernières actualités</span>
            {' '}<span className="text-primary tracking-wider">{'///'}</span>
          </h2>
        </motion.div>

        {/* Desktop "Tout voir" – right-aligned in header */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
          className="hidden sm:block"
        >
          <Button
            variant="outline"
            className="gap-2 text-sm font-semibold rounded-lg px-5 h-9 hover:bg-primary hover:text-primary-foreground transition-colors border-border/60"
            onClick={() => {
              const el = document.querySelector('#rubriques');
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 140;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
          >
            Tout voir
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </motion.div>
      </div>

      {/* ── Article grid ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.55,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            <Card
              className="group cursor-pointer overflow-hidden border border-border/50 bg-card rounded-2xl h-full card-lift"
              onClick={() => onArticleClick(article.id)}
            >
              {/* ── Image area ──────────────────────────────── */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover img-zoom"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />

                {/* Dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category badge – overlaid on image */}
                <div className="absolute top-3 left-3">
                  <Badge
                    className={`${getCategoryColor(article.category)} border-0 text-[10px] font-bold px-2.5 py-0.5 shadow-md uppercase tracking-wide`}
                  >
                    {article.category}
                  </Badge>
                </div>

                {/* Arrow icon – appears on hover */}
                <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-400 shadow-md">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </div>
              </div>

              {/* ── Content area ─────────────────────────────── */}
              <CardContent className="p-4 pb-5 flex flex-col flex-1">
                {/* Title */}
                <h3 className="font-bold text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[13px] text-muted-foreground line-clamp-2 mb-3 leading-relaxed flex-1">
                  {article.excerpt}
                </p>

                {/* Bottom meta: date + read time */}
                <div className="flex items-center justify-between text-[11px] text-muted-foreground/70 pt-3 mt-auto border-t border-border/40">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min de lecture
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ── Mobile "Tout voir" – centered below grid ──────── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        className="flex justify-center mt-8 sm:hidden"
      >
        <Button
          variant="outline"
          className="gap-2 text-sm font-semibold rounded-xl px-6 h-10 hover:bg-primary hover:text-primary-foreground transition-colors border-border/60"
          onClick={() => {
            const el = document.querySelector('#rubriques');
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 140;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
        >
          Tout voir
          <ChevronRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </section>
  );
}
