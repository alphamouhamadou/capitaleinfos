'use client';

import { trendingArticles } from '@/lib/data';

export function BreakingNews() {
  const headlines = trendingArticles.slice(0, 4);

  return (
    <div className="relative overflow-hidden bg-foreground/[0.03] dark:bg-foreground/[0.04] border-b border-border/40">
      <div className="mx-auto max-w-7xl flex items-center h-9">
        {/* Label */}
        <div className="flex-shrink-0 flex items-center gap-2.5 pl-4 sm:pl-0 pr-4 sm:pr-5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            En continu
          </span>
          <div className="hidden sm:block w-px h-3.5 bg-border" />
        </div>

        {/* Ticker */}
        <div className="overflow-hidden flex-1 relative">
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background/80 dark:from-background/60 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background/80 dark:from-background/60 to-transparent z-10" />
          <div className="animate-ticker whitespace-nowrap py-0 text-[12.5px] font-medium text-foreground/70">
            {headlines.map((article, i) => (
              <span key={article.id} className="inline-block mr-4">
                <span className="text-foreground/90">{article.title}</span>
                {i < headlines.length - 1 && (
                  <span className="mx-5 text-primary/30">◆</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
