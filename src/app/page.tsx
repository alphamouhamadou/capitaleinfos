'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { BreakingNews } from '@/components/breaking-news';
import { HeroSection } from '@/components/hero-section';
import { LatestNews } from '@/components/latest-news';
import { CategorySection } from '@/components/category-section';
import { TrendingSidebar } from '@/components/trending-sidebar';
import { WeatherWidget, ExchangeRateWidget, PrayerTimesWidget } from '@/components/info-widgets';
import { OpinionSection } from '@/components/opinion-section';
import { NewsletterSection } from '@/components/newsletter-section';
import { Footer } from '@/components/footer';
import { ArticleDialog } from '@/components/article-dialog';
import { SearchDialog } from '@/components/search-dialog';
import { ArticlesProvider } from '@/lib/articles-context';

export default function Home() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
  };

  return (
    <ArticlesProvider>
    <div className="min-h-screen flex flex-col bg-background">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <BreakingNews />

      <main className="flex-1">
        <HeroSection onArticleClick={handleArticleClick} />

        <div className="section-divider mx-auto max-w-7xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-8">
              <LatestNews onArticleClick={handleArticleClick} />
              <div className="section-divider my-0" />
              <CategorySection onArticleClick={handleArticleClick} />
              <div className="section-divider my-0" />
              <OpinionSection onArticleClick={handleArticleClick} />
            </div>
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-5">
                <TrendingSidebar onArticleClick={handleArticleClick} />
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-5">
                  <WeatherWidget />
                  <ExchangeRateWidget />
                </div>
                <PrayerTimesWidget />
              </div>
            </div>
          </div>
        </div>

        <div className="section-divider mx-auto max-w-7xl mt-4" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NewsletterSection />
        </div>
      </main>

      <Footer />

      <ArticleDialog
        articleId={selectedArticleId}
        open={selectedArticleId !== null}
        onClose={() => setSelectedArticleId(null)}
        onArticleClick={handleArticleClick}
      />

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onArticleClick={handleArticleClick}
      />
    </div>
    </ArticlesProvider>
  );
}
