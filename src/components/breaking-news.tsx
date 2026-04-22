'use client';

import { trendingArticles } from '@/lib/data';

export function BreakingNews() {
  const headlines = trendingArticles.slice(0, 4);

  return (
    <div className="bg-gradient-to-r from-primary via-red-600 to-red-700 text-white overflow-hidden shadow-lg shadow-primary/20">
      <div className="mx-auto max-w-7xl flex items-center h-10">
        <div className="flex-shrink-0 bg-white/15 backdrop-blur-sm px-5 h-full flex items-center font-black text-[11px] uppercase tracking-widest z-10">
          <span className="inline-flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            En continu
          </span>
        </div>
        <div className="overflow-hidden flex-1 relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-primary to-transparent z-10" />
          <div className="animate-ticker whitespace-nowrap py-0 text-sm font-medium">
            {headlines.map((article, i) => (
              <span key={article.id} className="inline-block mr-4">
                <span className="text-white/90">{article.title}</span>
                {i < headlines.length - 1 && (
                  <span className="mx-6 text-white/30">◆</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
