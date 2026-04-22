'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
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
];

interface CategorySectionProps {
  onArticleClick: (id: string) => void;
}

export function CategorySection({ onArticleClick }: CategorySectionProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('Politique');
  const categoryArticles = getArticlesByCategory(activeCategory);
  const mainArticle = categoryArticles[0];
  const sideArticles = categoryArticles.slice(1, 4);

  return (
    <section className="py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Rubriques</h2>
        <div className="h-1 w-16 bg-primary rounded-full mt-2" />
      </div>

      <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as Category)}>
        <TabsList className="w-full justify-start gap-1 bg-muted p-1 h-auto flex-wrap mb-6">
          {tabCategories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm font-medium transition-all"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Main article */}
            {mainArticle && (
              <div
                className="group cursor-pointer"
                onClick={() => onArticleClick(mainArticle.id)}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <Image
                    src={mainArticle.image}
                    alt={mainArticle.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <Badge className={`${categoryColors[mainArticle.category]} mb-2 text-xs`}>
                      {mainArticle.category}
                    </Badge>
                    <h3 className="font-bold text-lg leading-snug mb-2">
                      {mainArticle.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-white/70">
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
                </div>
              </div>
            )}

            {/* Side articles */}
            <div className="flex flex-col gap-3">
              {sideArticles.map((article) => (
                <div
                  key={article.id}
                  className="group cursor-pointer flex gap-3 items-start bg-card rounded-lg p-3 border border-border hover:shadow-md transition-all duration-300"
                  onClick={() => onArticleClick(article.id)}
                >
                  <div className="relative flex-shrink-0 w-24 h-20 overflow-hidden rounded-md">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="96px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-1">
                      {article.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </section>
  );
}
