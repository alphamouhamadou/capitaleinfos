'use client';

import { useArticles } from '@/lib/articles-context';

export function BreakingNews() {
  const { trendingArticles } = useArticles();
  const headlines = trendingArticles.slice(0, 4);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white shadow-md shadow-red-600/15">
      <div className="mx-auto max-w-7xl flex items-center h-10">
        {/* Label */}
        <div className="flex-shrink-0 flex items-center gap-2.5 pl-4 sm:pl-0 pr-4 sm:pr-5 relative z-10">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
            En continu
          </span>
          <div className="hidden sm:block w-px h-4 bg-white/25" />
        </div>

        {/* Ticker */}
        <div className="overflow-hidden flex-1 relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-red-600 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-red-700 to-transparent z-10" />
          <div className="animate-ticker whitespace-nowrap py-0 text-[13px] font-medium">
            {headlines.map((article, i) => (
              <span key={article.id} className="inline-block mr-4">
                <span className="text-white/90">{article.title}</span>
                {i < headlines.length - 1 && (
                  <span className="mx-6 text-white/25 text-[10px]">◆</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
