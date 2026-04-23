'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { categoryColors } from '@/lib/data';
import { useArticles } from '@/lib/articles-context';

interface HeroSectionProps {
  onArticleClick: (id: string) => void;
}

export function HeroSection({ onArticleClick }: HeroSectionProps) {
  const { featuredArticles, loading } = useArticles();
  const mainArticle = featuredArticles[0];
  const secondaryArticles = featuredArticles.slice(1, 4);

  if (loading || !mainArticle) {
    return (
      <section id="a-la-une" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-6 scroll-mt-28">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-24 mb-7" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
            <div className="lg:col-span-8 h-[400px] bg-muted rounded-2xl" />
            <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-5">
              <div className="h-40 bg-muted rounded-2xl" />
              <div className="h-40 bg-muted rounded-2xl" />
              <div className="h-40 bg-muted rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="a-la-une" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 scroll-mt-28">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-5 sm:mb-7"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/50">
            À la une
          </h2>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-border via-border/60 to-transparent" />
      </motion.div>

      {/* ── MAGAZINE GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
        {/* ── MAIN HERO ARTICLE ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="sm:col-span-2 lg:col-span-8 group cursor-pointer"
          onClick={() => onArticleClick(mainArticle.id)}
        >
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/8.5] overflow-hidden rounded-2xl lg:rounded-[1.75rem] shadow-2xl shadow-black/[0.08] dark:shadow-black/30">
            <Image
              src={mainArticle.image}
              alt={mainArticle.title}
              fill
              className="object-cover img-zoom"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              unoptimized
            />

            {/* Multi-layer gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

            {/* Subtle noise texture overlay */}
            <div className="absolute inset-0 mix-blend-overlay opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                {/* Category badges */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`${categoryColors[mainArticle.category]} border-0 text-[10px] font-bold px-3 py-1 shadow-lg`}>
                    {mainArticle.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/20 text-white/70 text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 backdrop-blur-sm bg-white/5"
                  >
                    À la une
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl lg:text-[2rem] xl:text-[2.5rem] font-black leading-[1.1] mb-3.5 text-white tracking-tight">
                  {mainArticle.title}
                </h1>

                {/* Excerpt */}
                <p className="text-[13px] sm:text-[14px] text-white/60 line-clamp-2 mb-5 max-w-2xl font-light leading-relaxed hidden sm:block">
                  {mainArticle.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-5 text-[11px] text-white/40">
                  <span className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <User className="h-3 w-3 text-white/70" />
                    </div>
                    <span className="font-medium text-white/65">{mainArticle.author.name}</span>
                  </span>
                  <span className="hidden sm:flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {new Date(mainArticle.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </span>
                  <span className="hidden sm:flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {mainArticle.readTime} min
                  </span>
                </div>
              </div>

              {/* Read more arrow */}
              <div className="absolute bottom-8 right-8 lg:bottom-10 lg:right-10 h-11 w-11 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── SIDE ARTICLES ── */}
        <div className="sm:col-span-2 lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-5">
          {secondaryArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.12 * (index + 1),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group cursor-pointer lg:flex-1"
              onClick={() => onArticleClick(article.id)}
            >
              <div className="relative h-full min-h-[160px] lg:min-h-[140px] overflow-hidden rounded-2xl shadow-lg shadow-black/[0.05] dark:shadow-black/20 card-lift">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover img-zoom"
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className={`${categoryColors[article.category]} border-0 text-[9px] font-bold px-2.5 py-0.5 shadow-md`}>
                    {article.category}
                  </Badge>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-3 right-3 h-7 w-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-400">
                  <ArrowRight className="h-3 w-3 text-white" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-bold text-[13.5px] sm:text-[14px] leading-snug text-white mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2.5 text-[10px] text-white/40">
                    <span className="font-medium text-white/55">{article.author.name.split(' ')[0]}</span>
                    <span className="text-white/20">·</span>
                    <span>
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="h-2.5 w-2.5" />
                      {article.readTime} min
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
