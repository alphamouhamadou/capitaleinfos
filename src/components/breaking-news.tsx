'use client';

import { trendingArticles } from '@/lib/data';

export function BreakingNews() {
  const headlines = trendingArticles.slice(0, 4);

  return (
    <div className="bg-primary text-primary-foreground overflow-hidden">
      <div className="mx-auto max-w-7xl flex items-center">
        <div className="flex-shrink-0 bg-primary-foreground/20 px-4 py-2 font-bold text-xs uppercase tracking-wider z-10">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-foreground" />
            </span>
            En continu
          </span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker whitespace-nowrap py-2">
            {headlines.map((article, i) => (
              <span key={article.id} className="inline-block">
                <span className="font-semibold">{article.title}</span>
                {i < headlines.length - 1 && (
                  <span className="mx-8 text-primary-foreground/50">●</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
