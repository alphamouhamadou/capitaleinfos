'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getArticlesByCategory,
  categoryColors,
  type Category,
} from '@/lib/data';

const tabCategories: Category[] = [
  'Politique',
  'Économie',
  'Sport',
  'Culture',
  'Société',
  'Technologie',
  'International',
  'Environnement',
];

interface CategorySectionProps {
  onArticleClick: (id: string) => void;
}

export function CategorySection({ onArticleClick }: CategorySectionProps) {
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
    <section id="rubriques" className="py-10 scroll-mt-28">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-1 bg-gradient-to-b from-primary to-primary/40 rounded-full" />
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Rubriques</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Explorez l&apos;actualité par catégorie</p>
        </div>
      </div>

      <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as Category)}>
        <TabsList className="w-full justify-start gap-1 bg-muted/60 p-1 h-auto flex-wrap mb-6 rounded-xl">
          {tabCategories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm font-semibold transition-all rounded-lg data-[state=active]:shadow-md"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Main article */}
            {mainArticle && (
              <motion.div
                className="group cursor-pointer"
                onClick={() => onArticleClick(mainArticle.id)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={mainArticle.image}
                    alt={mainArticle.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${categoryColors[mainArticle.category]} border-0 text-[11px] font-bold px-3 py-1 shadow-sm`}>
                      {mainArticle.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="font-bold text-lg sm:text-xl leading-snug mb-3">
                      {mainArticle.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(mainArticle.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {mainArticle.readTime} min
                      </span>
                    </div>
                  </div>
                  {/* Arrow on hover */}
                  <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/90 dark:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Side articles */}
            <div className="flex flex-col gap-3">
              {sideArticles.map((article) => (
                <motion.div
                  key={article.id}
                  className="group cursor-pointer flex gap-3 items-start bg-card rounded-2xl p-3.5 border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                  onClick={() => onArticleClick(article.id)}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative flex-shrink-0 w-[90px] h-[80px] overflow-hidden rounded-xl">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="90px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Badge
                      variant="secondary"
                      className="mb-1.5 text-[10px] font-bold px-2 py-0 h-5"
                    >
                      {article.category}
                    </Badge>
                    <h4 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-1.5">
                      {article.title}
                    </h4>
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {sideArticles.length === 0 && mainArticle && (
                <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm p-8 text-center">
                  Un seul article disponible dans cette catégorie pour le moment.
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </section>
  );
}
