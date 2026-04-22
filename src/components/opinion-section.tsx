'use client';

import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { articles, type Article } from '@/lib/data';

interface OpinionSectionProps {
  onArticleClick: (id: string) => void;
}

const opinionArticles: Article[] = articles.filter(
  (a) =>
    a.category === 'Environnement' || a.category === 'Politique'
).slice(0, 3);

const avatarColors = [
  'bg-gradient-to-br from-primary to-red-600 text-white',
  'bg-gradient-to-br from-amber-500 to-orange-600 text-white',
  'bg-gradient-to-br from-emerald-500 to-teal-600 text-white',
];

export function OpinionSection({ onArticleClick }: OpinionSectionProps) {
  return (
    <section className="py-10">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-1 bg-gradient-to-b from-primary to-primary/40 rounded-full" />
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Opinions</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Éditoriaux et tribunes de nos analystes</p>
        </div>
      </div>

      <div className="space-y-4">
        {opinionArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.12, ease: 'easeOut' }}
          >
            <Card
              className="group cursor-pointer border border-border/60 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:border-primary/20 transition-all duration-300 bg-card rounded-2xl overflow-hidden"
              onClick={() => onArticleClick(article.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/10 shadow-sm">
                      <AvatarFallback className={`${avatarColors[index % avatarColors.length]} text-sm font-bold`}>
                        {article.author.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center">
                        <Quote className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                        {article.category === 'Politique' ? 'Éditorial' : 'Tribune'}
                      </span>
                    </div>
                    <h3 className="font-bold text-[15px] leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        {article.author.name} — {article.author.role}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
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
