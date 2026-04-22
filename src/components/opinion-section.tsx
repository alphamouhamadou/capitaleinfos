'use client';

import { motion } from 'framer-motion';
import { Quote, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { articles, type Article } from '@/lib/data';

interface OpinionSectionProps {
  onArticleClick: (id: string) => void;
}

const opinionArticles: Article[] = articles.filter(
  (a) =>
    a.category === 'Environnement' || a.category === 'Politique'
).slice(0, 3);

const avatarColors = [
  'bg-primary text-primary-foreground',
  'bg-amber-600 text-white',
  'bg-emerald-600 text-white',
];

export function OpinionSection({ onArticleClick }: OpinionSectionProps) {
  return (
    <section className="py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Opinions</h2>
        <div className="h-1 w-16 bg-primary rounded-full mt-2" />
      </div>

      <div className="space-y-4">
        {opinionArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
          >
            <Card
              className="group cursor-pointer border-l-4 border-l-primary hover:shadow-lg transition-all duration-300 bg-card"
              onClick={() => onArticleClick(article.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className={avatarColors[index % avatarColors.length]}>
                        {article.author.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Quote className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                        {article.category === 'Politique' ? 'Éditorial' : 'Tribune'}
                      </span>
                    </div>
                    <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        {article.author.name} — {article.author.role}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
