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
          const headerHeight = 120;
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
        <div className="h-[3px] bg-gradient-to-r from-primary via-red-500 to-amber-500" />
        <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2 h-[88px]">
              <div className="h-10 w-[200px] bg-muted animate-pulse rounded" />
              <div className="flex gap-1">
                <div className="h-8 w-8 bg-muted rounded-full" />
                <div className="h-8 w-8 bg-muted rounded-full" />
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }

  return (
    <>
      {/* Top accent line */}
      <div className="h-[3px] bg-gradient-to-r from-primary via-red-500 to-amber-500" />

      <header className="sticky top-0 z-50 w-full">
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'bg-background/90 backdrop-blur-xl border-b border-border/30 shadow-lg shadow-black/[0.04] dark:shadow-black/25'
              : 'bg-background/70 backdrop-blur-md'
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Top meta bar */}
            <div className="flex items-center justify-between py-2 text-[11px] text-muted-foreground">
              <span className="hidden sm:block capitalize font-medium tracking-wide">
                {currentTime}
              </span>
              <span className="sm:hidden text-[11px] font-medium">{currentTime}</span>
              <div className="flex items-center gap-1">
                <div className="hidden sm:flex items-center gap-1.5 mr-3">
                  <TrendingUp className="h-3 w-3 text-primary/70" />
                  <span className="font-semibold text-foreground/80">Dakar 32°C</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-primary/8 transition-colors"
                  onClick={onSearchOpen}
                  aria-label="Rechercher"
                >
                  <Search className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-primary/8 transition-colors"
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

            {/* Logo + Navigation */}
            <div className="flex h-14 items-center justify-between border-t border-border/20">
              {/* Logo */}
              <a href="#a-la-une" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group">
                <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-md shadow-primary/10 group-hover:shadow-primary/20 transition-all duration-500">
                  <img
                    src="/img/logo-capitale-infos.jpg"
                    alt="Capitale Infos"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight leading-none text-foreground">
                    CAPITALE<span className="text-primary"> INFOS</span>
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-muted-foreground/70 mt-0.5">
                    Le Journal du Sénégal
                  </span>
                </div>
              </a>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navigation principale">
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
                      className="flex items-center gap-1.5 px-3 py-2 text-[12.5px] font-semibold text-muted-foreground transition-all duration-300 hover:text-foreground rounded-xl hover:bg-primary/[0.06] group/item"
                    >
                      <IconComp className="h-3.5 w-3.5 opacity-50 group-hover/item:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </nav>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 rounded-xl hover:bg-primary/8"
                onClick={() => setMobileOpen(true)}
                aria-label="Ouvrir le menu"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="15" y2="12" />
                  <line x1="3" y1="18" x2="18" y2="18" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════
          MOBILE MENU — Premium Full-Screen Design
          ═══════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-lg"
            onClick={() => setMobileOpen(false)}
            style={{ animation: 'fadeIn 200ms ease-out' }}
          />

          {/* Panel */}
          <div
            className="fixed top-0 right-0 bottom-0 w-[340px] max-w-[90vw] shadow-2xl flex flex-col overflow-hidden"
            style={{
              animation: 'slideInRight 350ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* ── HEADER with gradient ── */}
            <div className="relative flex-shrink-0 overflow-hidden bg-gradient-to-br from-primary via-red-700 to-red-800">
              {/* Decorative shapes */}
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/[0.06]" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/[0.04]" />
              <div className="absolute top-1/2 right-4 w-24 h-24 rounded-full bg-amber-500/[0.08] blur-2xl" />

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
                    <p className="text-lg font-black tracking-tight text-white">CAPITALE INFOS</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">
                      Le Journal du Sénégal
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-white/15" />
                  <p className="text-[10.5px] font-medium text-white/50 capitalize">{currentTime}</p>
                  <div className="h-px flex-1 bg-white/15" />
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
