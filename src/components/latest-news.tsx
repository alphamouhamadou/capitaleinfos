'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { latestArticles, categoryColors } from '@/lib/data';
import { ChevronRight } from 'lucide-react';

interface LatestNewsProps {
  onArticleClick: (id: string) => void;
}

export function LatestNews({ onArticleClick }: LatestNewsProps) {
  const displayArticles = latestArticles.slice(0, 6);

  return (
    <section id="dernieres-actualites" className="py-10 scroll-mt-28">
      {/* Section header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 bg-gradient-to-b from-primary to-primary/40 rounded-full" />
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Dernières actualités</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Les informations les plus récentes du Sénégal</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="hidden sm:flex gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
        >
          Tout voir
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
          >
            <Card
              className="group cursor-pointer overflow-hidden border border-border/60 hover:shadow-2xl hover:shadow-black/8 dark:hover:shadow-black/30 hover:border-primary/20 transition-all duration-400 h-full bg-card rounded-2xl"
              onClick={() => onArticleClick(article.id)}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-3 left-3">
                  <Badge className={`${categoryColors[article.category]} border-0 text-[10px] font-bold px-2.5 py-0.5 shadow-sm`}>
                    {article.category}
                  </Badge>
                </div>

                {/* Arrow icon on hover */}
                <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="font-bold text-[15px] leading-snug mb-2.5 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min de lecture
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Mobile "see more" */}
      <div className="flex justify-center mt-8 sm:hidden">
        <Button
          variant="outline"
          className="gap-2 font-medium rounded-xl"
        >
          Voir plus d&apos;articles
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
