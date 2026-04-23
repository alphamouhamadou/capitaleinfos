'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
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

  /* ── Loading Skeleton ── */
  if (loading || !mainArticle) {
    return (
      <section id="a-la-une" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-6 scroll-mt-36">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-5 bg-muted rounded w-52" />
            <div className="flex-1 h-px bg-muted" />
          </div>
          {/* Grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
            <div className="sm:col-span-2 lg:col-span-8 h-[420px] sm:h-[380px] bg-muted rounded-xl" />
            <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-4 lg:gap-5">
              <div className="h-40 bg-muted rounded-xl" />
              <div className="h-40 bg-muted rounded-xl" />
              <div className="h-40 bg-muted rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── Stagger children animation config ── */
  const sideVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const sideItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="a-la-une" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 scroll-mt-36">
      {/* ── Section Header : "À LA UNE ///" ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-3 mb-6 sm:mb-7"
      >
        <h2 className="text-sm sm:text-[15px] font-black uppercase tracking-wider text-foreground/80 whitespace-nowrap">
          À la une
          <span className="text-red-600 ml-1.5 font-black tracking-[0.15em]">{'///'}</span>
        </h2>
        <div className="flex-1 h-px bg-border" />
      </motion.div>

      {/* ── 12-Column Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">

        {/* ── MAIN FEATURED ARTICLE (8 cols) ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="sm:col-span-2 lg:col-span-8 group cursor-pointer"
          onClick={() => onArticleClick(mainArticle.id)}
        >
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] lg:aspect-[16/8] overflow-hidden rounded-xl shadow-lg shadow-black/[0.08] dark:shadow-black/25">
            {/* Image */}
            <Image
              src={mainArticle.image}
              alt={mainArticle.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              unoptimized
            />

            {/* Gradient overlay – bottom heavy for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-9">
              {/* Category badge */}
              <Badge className={`${categoryColors[mainArticle.category]} border-0 text-[10px] font-bold px-3 py-1 shadow-md mb-3`}>
                {mainArticle.category}
              </Badge>

              {/* Title */}
              <h1 className="text-lg sm:text-xl lg:text-[1.75rem] xl:text-[2.15rem] font-extrabold leading-[1.12] mb-2.5 text-white tracking-tight">
                {mainArticle.title}
              </h1>

              {/* Excerpt (hidden on small screens) */}
              <p className="text-[13px] sm:text-sm text-white/55 line-clamp-2 mb-4 max-w-2xl leading-relaxed hidden sm:block">
                {mainArticle.excerpt}
              </p>

              {/* Author · Date · Read time */}
              <div className="flex items-center flex-wrap gap-x-5 gap-y-1 text-[11px] text-white/40">
                <span className="flex items-center gap-1.5">
                  <User className="h-3 w-3 text-white/50" />
                  <span className="font-medium text-white/60">{mainArticle.author.name}</span>
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <Calendar className="h-3 w-3 text-white/50" />
                  {new Date(mainArticle.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-white/50" />
                  {mainArticle.readTime} min de lecture
                </span>
              </div>

              {/* Hover arrow – bottom right */}
              <div className="absolute bottom-7 right-7 lg:bottom-9 lg:right-9 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── SIDE ARTICLES – 3 cards (4 cols on desktop, 2-col grid on mobile) ── */}
        <motion.div
          variants={sideVariants}
          initial="hidden"
          animate="visible"
          className="sm:col-span-2 lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-5 content-start"
        >
          {secondaryArticles.map((article) => (
            <motion.article
              key={article.id}
              variants={sideItem}
              className="group cursor-pointer"
              onClick={() => onArticleClick(article.id)}
            >
              <div className="relative w-full h-[180px] sm:h-[160px] lg:h-auto lg:aspect-[16/9] overflow-hidden rounded-xl shadow-md shadow-black/[0.06] dark:shadow-black/20">
                {/* Image */}
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-600 group-hover:scale-[1.05]"
                  sizes="(max-width: 1024px) 50vw, 34vw"
                  unoptimized
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Category badge – top left */}
                <div className="absolute top-2.5 left-2.5">
                  <Badge className={`${categoryColors[article.category]} border-0 text-[9px] font-bold px-2 py-0.5 shadow-md`}>
                    {article.category}
                  </Badge>
                </div>

                {/* Hover arrow – top right */}
                <div className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowRight className="h-3 w-3 text-white" />
                </div>

                {/* Content – bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-3.5">
                  <h3 className="font-bold text-[13px] sm:text-[13.5px] leading-snug text-white mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-white/40">
                    <span className="font-medium text-white/55">
                      {article.author.name.split(' ')[0]}
                    </span>
                    <span className="text-white/20">·</span>
                    <span>
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                    <span className="text-white/20 hidden sm:inline">·</span>
                    <span className="hidden sm:flex items-center gap-0.5">
                      <Clock className="h-2.5 w-2.5" />
                      {article.readTime} min
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
