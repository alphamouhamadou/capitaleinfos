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
  const secondaryArticles = featuredArticles.slice(1);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main featured article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7 relative group cursor-pointer"
          onClick={() => onArticleClick(mainArticle.id)}
        >
          <div className="relative aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30">
            <Image
              src="/img/hero-dakar.jpg"
              alt={mainArticle.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            {/* Multi-layer gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Badge className={`${categoryColors[mainArticle.category]} border-0 text-[11px] font-bold px-3 py-1`}>
                  {mainArticle.category}
                </Badge>
                <span className="text-[11px] text-white/50 font-medium">• À la une</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-[2rem] xl:text-4xl font-extrabold leading-[1.15] mb-3 max-w-2xl">
                {mainArticle.title}
              </h1>
              <p className="text-sm sm:text-[15px] text-white/75 line-clamp-2 mb-4 max-w-xl font-light leading-relaxed">
                {mainArticle.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-white/50">
                  <span className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <User className="h-3 w-3" />
                    </div>
                    <span className="font-medium text-white/70">{mainArticle.author.name}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(mainArticle.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {mainArticle.readTime} min
                  </span>
                </div>
                <ArrowRight className="h-5 w-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary articles */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {secondaryArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * (index + 1), ease: 'easeOut' }}
              className="group cursor-pointer"
              onClick={() => onArticleClick(article.id)}
            >
              <div className="flex gap-4 items-start bg-card rounded-2xl p-3 border border-border/50 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:border-primary/20 transition-all duration-300 h-full relative overflow-hidden">
                {/* Subtle accent on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex-shrink-0 w-[100px] h-[90px] sm:w-[120px] sm:h-[100px] overflow-hidden rounded-xl">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="120px"
                  />
                </div>
                <div className="relative flex flex-col justify-between py-0.5 min-w-0 flex-1">
                  <div>
                    <Badge
                      variant="secondary"
                      className="mb-2 text-[10px] font-bold px-2 py-0 h-5"
                    >
                      {article.category}
                    </Badge>
                    <h3 className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-2">
                    <User className="h-3 w-3" />
                    <span className="font-medium">{article.author.name}</span>
                    <span className="text-border">·</span>
                    <span>
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
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
