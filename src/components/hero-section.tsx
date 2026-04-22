'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { featuredArticles, categoryColors } from '@/lib/data';

interface HeroSectionProps {
  onArticleClick: (id: string) => void;
}

export function HeroSection({ onArticleClick }: HeroSectionProps) {
  const mainArticle = featuredArticles[0];
  const secondaryArticles = featuredArticles.slice(1, 4);

  return (
    <section id="a-la-une" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 scroll-mt-28">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-10 w-1 bg-gradient-to-b from-primary to-primary/40 rounded-full" />
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">À la une</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Les informations essentielles du jour</p>
        </div>
      </motion.div>

      {/* ── MAIN HERO: Full-width featured article ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative group cursor-pointer mb-5"
        onClick={() => onArticleClick(mainArticle.id)}
      >
        <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30">
          <Image
            src="/img/hero-dakar.jpg"
            alt={mainArticle.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority
            sizes="100vw"
          />

          {/* Rich gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

          {/* Content - bottom left */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-3">
                <Badge className={`${categoryColors[mainArticle.category]} border-0 text-[11px] font-bold px-3 py-1 shadow-sm`}>
                  {mainArticle.category}
                </Badge>
                <Badge variant="outline" className="border-white/25 text-white/80 text-[10px] font-semibold px-2.5 py-0.5 backdrop-blur-sm bg-white/5">
                  À LA UNE
                </Badge>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-[2.5rem] font-black leading-[1.12] mb-3 text-white">
                {mainArticle.title}
              </h1>
              <p className="text-sm sm:text-[15px] text-white/70 line-clamp-2 mb-4 max-w-2xl font-light leading-relaxed hidden sm:block">
                {mainArticle.excerpt}
              </p>
              <div className="flex items-center gap-5 text-xs text-white/50">
                <span className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <User className="h-3 w-3" />
                  </div>
                  <span className="font-medium text-white/70">{mainArticle.author.name}</span>
                </span>
                <span className="flex items-center gap-1 hidden sm:flex">
                  <Calendar className="h-3 w-3" />
                  {new Date(mainArticle.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </span>
                <span className="flex items-center gap-1 hidden sm:flex">
                  <Clock className="h-3 w-3" />
                  {mainArticle.readTime} min
                </span>
              </div>
            </div>

            {/* Read arrow */}
            <div className="absolute bottom-8 right-8 lg:bottom-10 lg:right-10 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <ArrowRight className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── SECONDARY ARTICLES: 3-column image grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {secondaryArticles.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 * (index + 1), ease: 'easeOut' }}
            className="group cursor-pointer"
            onClick={() => onArticleClick(article.id)}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 mb-3">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <Badge className={`${categoryColors[article.category]} border-0 text-[10px] font-bold px-2.5 py-0.5 shadow-sm`}>
                  {article.category}
                </Badge>
              </div>
              <div className="absolute bottom-3 right-3 h-7 w-7 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ArrowRight className="h-3.5 w-3.5 text-white" />
              </div>
            </div>
            <h3 className="font-bold text-[15px] leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <User className="h-3 w-3" />
              <span className="font-medium">{article.author.name}</span>
              <span className="text-border">·</span>
              <span>
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-0.5">
                <Clock className="h-3 w-3" />
                {article.readTime} min
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
