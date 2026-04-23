'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, ArrowUpRight, Newspaper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  categoryColors,
  type Category,
} from '@/lib/data';
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
    <section id="rubriques" className="py-8 scroll-mt-28">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-7">
        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/50">
          Rubriques
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border via-border/60 to-transparent" />
      </div>

      <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as Category)}>
        {/* Tabs */}
        <TabsList className="w-full justify-start gap-1 bg-muted/40 p-1 h-auto flex-wrap mb-7 rounded-xl">
          {tabCategories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="px-4 py-2 text-[12px] font-semibold transition-all duration-300 rounded-lg data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-lg data-[state=active]:shadow-black/[0.08] hover:bg-muted/80"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {!loading && !mainArticle && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Newspaper className="h-10 w-10 text-muted-foreground/30 mb-3" />
                <p className="text-sm font-medium">Aucun article dans cette rubrique.</p>
              </div>
            )}

            {/* Main article */}
            {mainArticle && (
              <motion.div
                className="group cursor-pointer"
                onClick={() => onArticleClick(mainArticle.id)}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl shadow-black/[0.06] dark:shadow-black/25">
                  <Image
                    src={mainArticle.image}
                    alt={mainArticle.title}
                    fill
                    className="object-cover img-zoom"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute top-3.5 left-3.5">
                    <Badge className={`${categoryColors[mainArticle.category]} border-0 text-[9px] font-bold px-2.5 py-0.5 shadow-md`}>
                      {mainArticle.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="font-bold text-[15px] sm:text-lg leading-snug mb-3">
                      {mainArticle.title}
                    </h3>
                    <div className="flex items-center gap-4 text-[11px] text-white/50">
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
                  <div className="absolute top-3.5 right-3.5 h-8 w-8 rounded-full bg-white/90 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 shadow-sm">
                    <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Side articles */}
            <div className="flex flex-col gap-3">
              {sideArticles.map((article) => (
                <motion.div
                  key={article.id}
                  className="group cursor-pointer flex gap-3.5 items-start bg-card rounded-2xl p-3.5 border border-border/40 hover:shadow-xl hover:shadow-black/[0.05] dark:hover:shadow-black/20 hover:border-primary/15 transition-all duration-400"
                  onClick={() => onArticleClick(article.id)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative flex-shrink-0 w-[88px] h-[78px] overflow-hidden rounded-xl shadow-sm">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover img-zoom"
                      sizes="88px"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1 py-0.5">
                    <Badge
                      variant="secondary"
                      className="mb-1.5 text-[9px] font-bold px-2 py-0 h-4.5"
                    >
                      {article.category}
                    </Badge>
                    <h4 className="font-semibold text-[13px] leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-1">
                      {article.title}
                    </h4>
                    <span className="text-[10.5px] text-muted-foreground font-medium">
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
