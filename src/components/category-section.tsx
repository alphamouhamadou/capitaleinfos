'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, ArrowUpRight, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getCategoryColor,
  type Category,
} from '@/lib/category-utils';
import { useArticles } from '@/lib/articles-context';

const tabCategories: Category[] = [
  'Politique',
  'Économie',
  'Sport',
  'Culture',
  'Société',
  'International',
  'Environnement',
];

interface CategorySectionProps {
  onArticleClick: (id: string) => void;
}

export function CategorySection({ onArticleClick }: CategorySectionProps) {
  const { getArticlesByCategory, loading } = useArticles();
  const [activeCategory, setActiveCategory] = useState<Category>('Politique');
  const categoryArticles = getArticlesByCategory(activeCategory);
  const mainArticle = categoryArticles[0];
  const sideArticles = categoryArticles.slice(1, 4);

  // Listen for category switch events from the navigation menu
  useEffect(() => {
    const handleSwitchCategory = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setActiveCategory(customEvent.detail as Category);
    };
    window.addEventListener('switch-category', handleSwitchCategory);
    return () => window.removeEventListener('switch-category', handleSwitchCategory);
  }, []);

  return (
    <section id="rubriques" className="py-10 scroll-mt-36">
      {/* ── Section header — seneweb.com "RUBRIQUES ///" style ── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-foreground">
            Rubriques
          </h2>
          <span className="text-[13px] font-black tracking-[0.15em] text-red-500" aria-hidden="true">
            {'///'}
          </span>
        </div>
        <div className="h-[3px] w-16 bg-gradient-to-r from-red-500 to-red-500/0 rounded-full" />
      </div>

      <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as Category)}>
        {/* ── Tabs — horizontal scroll, seneweb-style active tab ── */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none mb-7">
          <TabsList className="w-max sm:w-full justify-start gap-0 bg-transparent h-auto flex-wrap sm:flex-nowrap rounded-none min-w-full sm:min-w-0 p-0 border-b border-border">
            {tabCategories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide transition-all duration-300 rounded-none whitespace-nowrap flex-shrink-0 border-b-[3px] border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:rounded-t-md text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* ── Content with AnimatePresence ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            {/* Loading skeleton */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="aspect-[16/10] rounded-xl bg-muted animate-pulse" />
                <div className="flex flex-col gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3.5 items-start">
                      <div className="flex-shrink-0 w-[100px] h-[80px] rounded-lg bg-muted animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-16 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-full bg-muted animate-pulse rounded" />
                        <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {!loading && !mainArticle && (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <div className="h-16 w-16 rounded-full bg-muted/60 flex items-center justify-center mb-4">
                  <Layers className="h-7 w-7 text-muted-foreground/40" />
                </div>
                <p className="text-base font-semibold mb-1">Aucun article disponible</p>
                <p className="text-sm text-muted-foreground/70">
                  Il n&apos;y a pas encore d&apos;articles dans la rubrique{' '}
                  <span className="font-semibold text-foreground/70">{activeCategory}</span>.
                </p>
              </div>
            )}

            {/* Articles grid: main + side */}
            {!loading && mainArticle && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* ── Main article — large hero card ── */}
                <motion.article
                  className="group cursor-pointer"
                  onClick={() => onArticleClick(mainArticle.id)}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-lg shadow-black/[0.08] dark:shadow-black/30">
                    <Image
                      src={mainArticle.image}
                      alt={mainArticle.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                    {/* Category badge — top-left */}
                    <div className="absolute top-3 left-3">
                      <Badge
                        className={`${getCategoryColor(mainArticle.category)} border-0 text-[9px] font-bold px-2.5 py-0.5 shadow-md tracking-wide uppercase`}
                      >
                        {mainArticle.category}
                      </Badge>
                    </div>

                    {/* Content — bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                      <h3 className="font-bold text-[15px] sm:text-lg leading-snug mb-2.5 line-clamp-3 group-hover:underline decoration-2 underline-offset-4">
                        {mainArticle.title}
                      </h3>
                      <div className="flex items-center gap-4 text-[11px] text-white/60">
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
                    </div>

                    {/* Arrow icon — top-right, visible on hover */}
                    <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm">
                      <ArrowUpRight className="h-4 w-4 text-red-500" />
                    </div>
                  </div>
                </motion.article>

                {/* ── Side articles — list layout ── */}
                <div className="flex flex-col gap-0 divide-y divide-border/60">
                  {sideArticles.map((article, index) => (
                    <motion.article
                      key={article.id}
                      className="group cursor-pointer flex gap-3.5 items-start py-4 first:pt-0 last:pb-0"
                      onClick={() => onArticleClick(article.id)}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.07,
                        ease: [0.25, 0.46, 0.45, 0.94] as const,
                      }}
                    >
                      {/* Thumbnail */}
                      <div className="relative flex-shrink-0 w-[100px] h-[80px] overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                          sizes="100px"
                          unoptimized
                        />
                      </div>

                      {/* Text content */}
                      <div className="min-w-0 flex-1 flex flex-col justify-center py-0.5">
                        <Badge
                          variant="secondary"
                          className={`mb-1.5 text-[9px] font-bold px-2 py-0 h-4 w-fit border-0 ${getCategoryColor(article.category)}`}
                        >
                          {article.category}
                        </Badge>
                        <h4 className="font-semibold text-[13px] leading-snug line-clamp-2 group-hover:text-red-500 transition-colors duration-300 mb-1.5">
                          {article.title}
                        </h4>
                        <span className="text-[10.5px] text-muted-foreground font-medium flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </motion.article>
                  ))}

                  {/* Single-article fallback */}
                  {sideArticles.length === 0 && mainArticle && (
                    <div className="flex-1 flex items-center justify-center py-8 text-center">
                      <p className="text-sm text-muted-foreground">
                        Un seul article disponible dans cette rubrique pour le moment.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </section>
  );
}
