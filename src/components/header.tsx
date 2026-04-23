'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import {
  Search,
  Sun,
  Moon,
  TrendingUp,
  X,
  ChevronRight,
  ChevronLeft,
  Newspaper,
  Landmark,
  BarChart3,
  Palette,
  Users,
  Globe,
  Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'À la une', href: '#a-la-une', action: 'scroll', icon: Newspaper },
  { label: 'Politique', href: '#rubriques', category: 'Politique', icon: Landmark },
  { label: 'Économie', href: '#rubriques', category: 'Économie', icon: BarChart3 },
  { label: 'Sport', href: '#rubriques', category: 'Sport', icon: TrendingUp },
  { label: 'Culture', href: '#rubriques', category: 'Culture', icon: Palette },
  { label: 'Société', href: '#rubriques', category: 'Société', icon: Users },
  { label: 'International', href: '#rubriques', category: 'International', icon: Globe },
  { label: 'Environnement', href: '#rubriques', category: 'Environnement', icon: Leaf },
];

interface HeaderProps {
  onSearchOpen: () => void;
}

export function Header({ onSearchOpen }: HeaderProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const now = new Date();
    setCurrentTime(
      now.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    );
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback((href: string, category?: string) => {
    setMobileOpen(false);
    if (category) {
      window.dispatchEvent(new CustomEvent('switch-category', { detail: category }));
    }
    if (href && href !== '#') {
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) {
          const headerHeight = 140;
          const y = el.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  if (!mounted) {
    return (
      <>
        {/* Red accent bar */}
        <div className="h-[2px] bg-primary" />

        {/* Skeleton header */}
        <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Meta bar skeleton */}
            <div className="flex items-center justify-between py-1.5">
              <div className="h-3.5 w-48 bg-muted animate-pulse rounded" />
              <div className="flex gap-1">
                <div className="h-7 w-7 bg-muted rounded-full" />
                <div className="h-7 w-7 bg-muted rounded-full" />
              </div>
            </div>
            {/* Logo area skeleton */}
            <div className="flex items-center justify-between py-3">
              <div className="h-10 w-[200px] bg-muted animate-pulse rounded" />
              <div className="h-8 w-8 bg-muted rounded-full lg:hidden" />
            </div>
            {/* Dark nav skeleton */}
            <div className="flex gap-2 py-2.5 bg-foreground/90 rounded-b-lg">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 w-16 bg-white/15 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </header>
      </>
    );
  }

  return (
    <>
      {/* ── Red accent bar (2px) ── */}
      <div className="h-[2px] bg-primary" />

      <header className="sticky top-0 z-50 w-full">
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'bg-background/90 backdrop-blur-xl shadow-lg shadow-black/[0.04] dark:shadow-black/25'
              : 'bg-background/70 backdrop-blur-md'
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* ═══════════════════════════════════════════════════
                TOP META BAR — compact
                ═══════════════════════════════════════════════════ */}
            <div className="flex items-center justify-between py-1.5 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="hidden sm:block capitalize font-medium tracking-wide">
                  {currentTime}
                </span>
                <span className="sm:hidden text-[11px] font-medium">{currentTime}</span>
                <div className="hidden md:flex items-center gap-1.5 text-[10px]">
                  <span className="h-3 w-px bg-border" />
                  <TrendingUp className="h-3 w-3 text-primary/70" />
                  <span className="font-semibold text-foreground/60">Dakar 32°C</span>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full hover:bg-primary/8 transition-colors"
                  onClick={onSearchOpen}
                  aria-label="Rechercher"
                >
                  <Search className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full hover:bg-primary/8 transition-colors"
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  aria-label="Changer de thème"
                >
                  {isDark ? (
                    <Sun className="h-3.5 w-3.5 text-amber-400" />
                  ) : (
                    <Moon className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════
                LOGO AREA — clean branding strip
                ═══════════════════════════════════════════════════ */}
            <div className="flex items-center justify-between py-3">
              <a
                href="#a-la-une"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0"
              >
                <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden shadow-md shadow-primary/10 group-hover:shadow-primary/20 transition-all duration-500">
                  <img
                    src="/img/logo-capitale-infos.jpg"
                    alt="Capitale Infos"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] sm:text-xl font-black tracking-tight leading-none text-foreground">
                    CAPITALE<span className="text-primary"> INFOS</span>
                  </span>
                  <span className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-[0.25em] text-muted-foreground/70 mt-0.5">
                    Le Journal du Sénégal
                  </span>
                </div>
              </a>

              {/* Mobile hamburger */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 rounded-xl hover:bg-primary/8"
                onClick={() => setMobileOpen(true)}
                aria-label="Ouvrir le menu"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="15" y2="12" />
                  <line x1="3" y1="18" x2="18" y2="18" />
                </svg>
              </Button>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════
              MAIN NAVIGATION BAR — Seneweb-inspired dark strip
              ═══════════════════════════════════════════════════ */}
          <nav
            className="bg-foreground text-white shadow-md"
            aria-label="Navigation principale"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Desktop nav (lg+) — horizontal links on dark bg */}
              <div className="hidden lg:flex items-center gap-0">
                {navLinks.map((link) => {
                  const IconComp = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href, link.category);
                      }}
                      className="relative flex items-center gap-1.5 px-3.5 py-3 text-[12.5px] font-semibold text-white/80 transition-all duration-300 hover:text-white hover:bg-white/[0.08] group/item"
                    >
                      <IconComp className="h-3.5 w-3.5 opacity-60 group-hover/item:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                      {/* Active indicator bar on hover */}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-hover/item:w-full transition-all duration-300 rounded-full" />
                    </a>
                  );
                })}
              </div>

              {/* Tablet nav (md-lg) — horizontal scroll on dark bg */}
              <div className="hidden md:flex lg:hidden items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
                {navLinks.map((link) => {
                  const IconComp = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href, link.category);
                      }}
                      className="relative flex items-center gap-1.5 px-3 py-2.5 text-[12px] font-semibold text-white/80 transition-all duration-300 hover:text-white hover:bg-white/[0.08] whitespace-nowrap group/item flex-shrink-0"
                    >
                      <IconComp className="h-3 w-3 opacity-60 group-hover/item:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>

              {/* Mobile nav — just show category pills on dark bg */}
              <div className="flex md:hidden items-center gap-1 overflow-x-auto scrollbar-none py-2">
                {navLinks.map((link) => {
                  const IconComp = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href, link.category);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-[10.5px] font-semibold text-white/70 transition-all duration-200 hover:text-white hover:bg-white/[0.08] whitespace-nowrap rounded-md group/item flex-shrink-0"
                    >
                      <IconComp className="h-2.5 w-2.5 opacity-50 group-hover/item:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          MOBILE MENU — Premium Full-Screen Design with dark header
          ═══════════════════════════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-lg"
            onClick={() => setMobileOpen(false)}
            style={{ animation: 'fadeIn 200ms ease-out' }}
          />

          {/* Slide-in panel */}
          <div
            className="fixed top-0 right-0 bottom-0 w-[340px] max-w-[90vw] shadow-2xl flex flex-col overflow-hidden"
            style={{
              animation: 'slideInRight 350ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* ── DARK HEADER matching the new nav style ── */}
            <div className="relative flex-shrink-0 overflow-hidden bg-foreground">
              {/* Subtle decorative shapes */}
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/[0.03]" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary/[0.08]" />
              <div className="absolute top-1/2 right-6 w-20 h-20 rounded-full bg-primary/[0.06] blur-2xl" />

              <div className="relative px-6 pt-12 pb-10">
                {/* Close button */}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-4 right-4 h-9 w-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
                  aria-label="Fermer le menu"
                >
                  <X className="h-4 w-4 text-white" />
                </button>

                {/* Logo + branding */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-12 w-12 rounded-xl overflow-hidden ring-2 ring-white/20 shadow-lg">
                    <img
                      src="/img/logo-capitale-infos.jpg"
                      alt="Capitale Infos"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-black tracking-tight text-white">
                      CAPITALE <span className="text-primary">INFOS</span>
                    </p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
                      Le Journal du Sénégal
                    </p>
                  </div>
                </div>

                {/* Date divider */}
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-white/10" />
                  <p className="text-[10.5px] font-medium text-white/40 capitalize">
                    {currentTime}
                  </p>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
              </div>
            </div>

            {/* ── MENU LINKS ── */}
            <nav className="flex-1 overflow-y-auto" aria-label="Navigation mobile">
              <div className="px-3 py-3 space-y-1">
                {navLinks.map((link, index) => {
                  const IconComp = link.icon;
                  return (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link.href, link.category)}
                      className="w-full text-left flex items-center gap-3.5 px-4 py-3 text-[14.5px] font-medium text-foreground/75 hover:text-primary transition-all duration-300 rounded-2xl hover:bg-primary/[0.06] group active:scale-[0.98]"
                      style={{ animationDelay: `${index * 40}ms` }}
                    >
                      {/* Icon with gradient background */}
                      <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-red-500/5 border border-primary/10 flex items-center justify-center group-hover:from-primary group-hover:to-red-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-400">
                        <IconComp className="h-[18px] w-[18px] text-primary/60 group-hover:text-white transition-colors duration-300" />
                      </div>

                      {/* Label */}
                      <span className="flex-1 font-semibold">{link.label}</span>

                      {/* Arrow */}
                      <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary/60 group-hover:translate-x-0.5 transition-all duration-300" />
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* ── FOOTER with actions ── */}
            <div className="flex-shrink-0 border-t border-border/30 bg-muted/20">
              <div className="px-4 py-4">
                {/* Quick actions */}
                <div className="flex items-center gap-2 mb-3">
                  <Button
                    variant="ghost"
                    className="flex-1 h-11 rounded-xl justify-start gap-3 text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    onClick={() => {
                      setMobileOpen(false);
                      onSearchOpen();
                    }}
                  >
                    <Search className="h-4 w-4" />
                    Rechercher
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-11 w-11 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  >
                    {isDark ? (
                      <Sun className="h-4 w-4 text-amber-400" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Theme label */}
                <p className="text-center text-[10px] text-muted-foreground/40 font-medium">
                  {isDark ? 'Mode sombre' : 'Mode clair'} · Capitale Infos © 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
