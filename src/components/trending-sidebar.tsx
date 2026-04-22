'use client';

import { motion } from 'framer-motion';
import { Flame, Cloud, Droplets, Wind } from 'lucide-react';
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
      className="group flex gap-3 items-start cursor-pointer py-3 hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-colors"
      onClick={() => onClick(article.id)}
    >
      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-2xl font-black text-primary leading-none">
        {index}
      </span>
      <div className="min-w-0">
        <h4 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] font-medium uppercase text-primary">
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
    <aside className="space-y-6">
      {/* Trending */}
      <Card className="border-border overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground pb-3 pt-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <Flame className="h-5 w-5" />
            Les plus lus
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          {topArticles.map((article, index) => (
            <div key={article.id}>
              {index > 0 && <Separator className="my-0.5" />}
              <TrendingItem
                article={article}
                index={index + 1}
                onClick={onArticleClick}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weather widget */}
      <Card className="border-border overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground pb-3 pt-4">
          <CardTitle className="text-base">Météo Dakar</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between"
          >
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">32</span>
                <span className="text-lg text-muted-foreground">°C</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Soleil</p>
            </div>
            <div className="text-5xl leading-none">☀️</div>
          </motion.div>
          <Separator className="my-4" />
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col items-center gap-1">
              <Droplets className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Humidité</span>
              <span className="text-sm font-semibold">65%</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Wind className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Vent</span>
              <span className="text-sm font-semibold">18 km/h</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Cloud className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Nuages</span>
              <span className="text-sm font-semibold">10%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
