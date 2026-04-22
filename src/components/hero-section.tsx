'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { featuredArticles, categoryColors } from '@/lib/data';

interface HeroSectionProps {
  onArticleClick: (id: string) => void;
}

export function HeroSection({ onArticleClick }: HeroSectionProps) {
  const mainArticle = featuredArticles[0];
  const secondaryArticles = featuredArticles.slice(1);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Main featured article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative group cursor-pointer"
          onClick={() => onArticleClick(mainArticle.id)}
        >
          <div className="relative aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/img/hero-dakar.jpg"
              alt={mainArticle.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <Badge className={`${categoryColors[mainArticle.category]} mb-3`}>
                {mainArticle.category}
              </Badge>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors">
                {mainArticle.title}
              </h1>
              <p className="text-sm sm:text-base text-white/80 line-clamp-2 mb-4">
                {mainArticle.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-white/60">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {mainArticle.author.name}
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
                  {mainArticle.readTime} min de lecture
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {secondaryArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 * (index + 1) }}
              className="group cursor-pointer"
              onClick={() => onArticleClick(article.id)}
            >
              <div className="flex gap-4 items-start bg-card rounded-xl p-3 border border-border hover:shadow-lg transition-all duration-300 h-full">
                <div className="relative flex-shrink-0 w-28 h-24 sm:w-32 sm:h-28 overflow-hidden rounded-lg">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="128px"
                  />
                </div>
                <div className="flex flex-col justify-between py-0.5 min-w-0">
                  <div>
                    <Badge
                      variant="secondary"
                      className="mb-2 text-[10px] px-1.5 py-0"
                    >
                      {article.category}
                    </Badge>
                    <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                    <User className="h-3 w-3" />
                    <span>{article.author.name}</span>
                    <span>·</span>
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
