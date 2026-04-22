'use client';

import { motion } from 'framer-motion';
import { Flame, Cloud, Droplets, Wind, Eye } from 'lucide-react';
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

      {/* Weather widget */}
      <Card className="border-border/60 overflow-hidden rounded-2xl shadow-sm">
        <CardHeader className="bg-gradient-to-br from-amber-500 to-orange-600 text-white pb-3 pt-4 px-5">
          <CardTitle className="text-base font-bold">Météo Dakar</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-4"
          >
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tight">32</span>
                <span className="text-xl text-muted-foreground font-light">°C</span>
              </div>
              <p className="text-sm font-medium text-muted-foreground mt-1">Ensoleillé</p>
            </div>
            <div className="text-6xl leading-none filter drop-shadow-sm">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 flex items-center justify-center">
                <svg className="h-10 w-10 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
            </div>
          </motion.div>
          <Separator className="mb-4" />
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-muted/50">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-[10px] text-muted-foreground font-medium">Humidité</span>
              <span className="text-sm font-bold">65%</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-muted/50">
              <Wind className="h-4 w-4 text-teal-500" />
              <span className="text-[10px] text-muted-foreground font-medium">Vent</span>
              <span className="text-sm font-bold">18 km/h</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-muted/50">
              <Eye className="h-4 w-4 text-amber-500" />
              <span className="text-[10px] text-muted-foreground font-medium">Visibilité</span>
              <span className="text-sm font-bold">10 km</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
