'use client';

import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { type Article } from '@/lib/articles-context';
import { useArticles } from '@/lib/articles-context';

interface OpinionSectionProps {
  onArticleClick: (id: string) => void;
}

const avatarGradients = [
  'bg-gradient-to-br from-primary to-red-600 text-white',
  'bg-gradient-to-br from-amber-500 to-orange-600 text-white',
  'bg-gradient-to-br from-emerald-500 to-teal-600 text-white',
];

export function OpinionSection({ onArticleClick }: OpinionSectionProps) {
  const { articles } = useArticles();
  const opinionArticles: Article[] = articles.filter(
    (a) =>
      a.category === 'Environnement' || a.category === 'Politique'
  ).slice(0, 3);
  return (
    <section id="opinions" className="py-8 scroll-mt-28">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-7">
        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/50">
          Opinions
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border via-border/60 to-transparent" />
      </div>

      <div className="space-y-4">
        {opinionArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
              duration: 0.45,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Card
              className="group cursor-pointer border border-border/40 hover:shadow-xl hover:shadow-black/[0.05] dark:hover:shadow-black/20 hover:border-primary/15 transition-all duration-400 bg-card rounded-2xl overflow-hidden"
              onClick={() => onArticleClick(article.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <Avatar className="h-11 w-11 ring-2 ring-primary/10 shadow-sm shadow-primary/5">
                      <AvatarFallback className={`${avatarGradients[index % avatarGradients.length]} text-xs font-bold`}>
                        {article.author.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    {/* Label */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-5 w-5 rounded-md bg-primary/8 flex items-center justify-center">
                        <Quote className="h-2.5 w-2.5 text-primary" />
                      </div>
                      <span className="text-[9px] font-bold text-primary uppercase tracking-[0.15em]">
                        {article.category === 'Politique' ? 'Éditorial' : 'Tribune'}
                      </span>
                    </div>

                    {/* Title & excerpt */}
                    <h3 className="font-bold text-[14px] leading-snug mb-1.5 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-[12.5px] text-muted-foreground/80 line-clamp-2 mb-3 leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Author & arrow */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-muted-foreground/70">
                        {article.author.name} — {article.author.role}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-1 transition-all duration-400" />
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
