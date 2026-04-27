'use client';

import { motion } from 'framer-motion';
import { Flame, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useArticles, type Article } from '@/lib/articles-context';

interface TrendingSidebarProps {
  onArticleClick: (id: string) => void;
}

function TrendingItem({
  article,
  index,
  onClick,
}: {
  article: Article;
  index: number;
  onClick: (id: string) => void;
}) {
  return (
    <div
      className="group flex gap-3 items-start cursor-pointer py-3 px-2.5 -mx-2.5 rounded-xl hover:bg-muted/40 transition-all duration-300"
      onClick={() => onClick(article.id)}
    >
      {/* Rank number */}
      <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-black rounded-lg transition-all duration-300 ${
        index === 1
          ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-500/20'
          : index === 2
          ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white shadow-md shadow-slate-400/15'
          : index === 3
          ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-md shadow-amber-700/15'
          : 'bg-muted text-muted-foreground'
      }`}>
        {index}
      </span>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-[12.5px] leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {article.title}
        </h4>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[9.5px] font-bold uppercase text-primary/70 tracking-wide">
            {article.category}
          </span>
          <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/30" />
          <span className="text-[10px] text-muted-foreground/70">
            {new Date(article.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export function TrendingSidebar({ onArticleClick }: TrendingSidebarProps) {
  const { trendingArticles, loading } = useArticles();
  const topArticles = trendingArticles.slice(0, 5);

  if (loading) {
    return (
      <aside className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded-2xl" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <div className="w-8 h-8 bg-muted rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-muted rounded w-3/4" />
                <div className="h-2 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-border/40 overflow-hidden rounded-2xl shadow-sm bg-card/80 backdrop-blur-sm">
          <CardHeader className="relative overflow-hidden pb-3 pt-4 px-5 bg-gradient-to-r from-foreground to-foreground/90 text-white">
            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/5" />
            <div className="absolute -bottom-6 -right-8 w-24 h-24 rounded-full bg-white/[0.03]" />

            <CardTitle className="relative flex items-center gap-2.5 text-[13px] font-bold">
              <div className="h-7 w-7 rounded-lg bg-white/15 flex items-center justify-center">
                <Flame className="h-3.5 w-3.5" />
              </div>
              <span>LES PLUS LUS <span className="text-primary font-black tracking-wider">{'///'}</span></span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            {topArticles.map((article, index) => (
              <div key={article.id}>
                {index > 0 && <Separator className="my-0 opacity-40" />}
                <TrendingItem
                  article={article}
                  index={index + 1}
                  onClick={onArticleClick}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </aside>
  );
}
