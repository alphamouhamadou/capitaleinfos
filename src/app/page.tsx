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
import { TopBannerAd, InContentAd, MobileStickyAd } from '@/components/ad-space';

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
    <div className="min-h-screen flex flex-col bg-background">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <BreakingNews />

      <main className="flex-1">
        {/* ── TOP BANNER AD (after breaking news) ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <TopBannerAd />
        </div>

        <HeroSection onArticleClick={handleArticleClick} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* ── MAIN CONTENT COLUMN ── */}
            <div className="lg:col-span-8">
              <LatestNews onArticleClick={handleArticleClick} />

              {/* ── IN-CONTENT AD (between Latest News & Categories) ── */}
              <div className="py-4">
                <InContentAd />
              </div>

              <CategorySection onArticleClick={handleArticleClick} />

              {/* ── IN-CONTENT AD (between Categories & Opinions) ── */}
              <div className="py-4">
                <InContentAd />
              </div>

              <OpinionSection onArticleClick={handleArticleClick} />
            </div>

            {/* ── SIDEBAR COLUMN ── */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                <TrendingSidebar onArticleClick={handleArticleClick} />
                <WeatherWidget />
                <ExchangeRateWidget />
                <PrayerTimesWidget />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ── BOTTOM BANNER AD (before newsletter) ── */}
          <div className="py-6">
            <TopBannerAd />
          </div>
          <NewsletterSection />
        </div>
      </main>

      <Footer />

      {/* ── MOBILE STICKY AD (bottom bar) ── */}
      <MobileStickyAd />

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
  );
}
