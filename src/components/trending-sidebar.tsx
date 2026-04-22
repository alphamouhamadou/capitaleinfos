'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { trendingArticles, type Article } from '@/lib/data';

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
      className="group flex gap-3 items-start cursor-pointer py-3.5 hover:bg-muted/60 rounded-xl px-3 -mx-3 transition-all duration-200"
      onClick={() => onClick(article.id)}
    >
      <span className={`flex-shrink-0 w-9 h-9 flex items-center justify-center text-lg font-black leading-none rounded-xl transition-colors ${
        index <= 3
          ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
          : 'bg-muted text-muted-foreground'
      }`}>
        {index}
      </span>
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-[13px] leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h4>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] font-bold uppercase text-primary/80">
            {article.category}
          </span>
          <span className="text-[10px] text-muted-foreground">
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
  const topArticles = trendingArticles.slice(0, 5);

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      {/* Trending */}
      <Card className="border-border/60 overflow-hidden rounded-2xl shadow-sm">
        <CardHeader className="bg-gradient-to-r from-primary to-red-600 text-white pb-3 pt-4 px-5">
          <CardTitle className="flex items-center gap-2.5 text-base font-bold">
            <div className="h-7 w-7 rounded-lg bg-white/15 flex items-center justify-center">
              <Flame className="h-4 w-4" />
            </div>
            Les plus lus
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2.5">
          {topArticles.map((article, index) => (
            <div key={article.id}>
              {index > 0 && <Separator className="my-0.5 opacity-50" />}
              <TrendingItem
                article={article}
                index={index + 1}
                onClick={onArticleClick}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}
