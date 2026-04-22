'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import {
  Menu,
  Search,
  Sun,
  Moon,
  TrendingUp,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'À la une', href: '#' },
  { label: 'Politique', href: '#politique' },
  { label: 'Économie', href: '#economie' },
  { label: 'Sport', href: '#sport' },
  { label: 'Culture', href: '#culture' },
  { label: 'Société', href: '#societe' },
  { label: 'Tech', href: '#tech' },
  { label: 'International', href: '#international' },
];

interface HeaderProps {
  onSearchOpen: () => void;
}

export function Header({ onSearchOpen }: HeaderProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

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

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    if (href !== '#') {
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  const isDark = resolvedTheme === 'dark';

  return (
    <>
      {/* Top accent bar */}
      <div className="h-[3px] bg-gradient-to-r from-primary via-red-600 to-amber-500" />

      <header className="sticky top-0 z-50 w-full transition-all duration-300">
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? 'bg-background/95 backdrop-blur-lg shadow-lg shadow-black/5 dark:shadow-black/20'
              : 'bg-background/80 backdrop-blur-md'
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-border/50 py-1.5 text-xs text-muted-foreground">
              <span className="hidden sm:block capitalize">{currentTime}</span>
              <span className="sm:hidden text-[11px]">22 Avril 2026</span>
              <div className="flex items-center gap-1">
                <div className="hidden sm:flex items-center gap-1.5 mr-3 text-[11px]">
                  <TrendingUp className="h-3 w-3 text-primary" />
                  <span className="font-medium">Dakar 32°C</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-primary/10"
                  onClick={onSearchOpen}
                  aria-label="Rechercher"
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-primary/10"
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  aria-label="Changer de thème"
                >
                  {isDark ? (
                    <Sun className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Logo + Navigation */}
            <div className="flex h-16 items-center justify-between">
              <a href="#" className="flex items-center gap-3 group">
                <div className="relative h-11 w-11 rounded-xl overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                  <img
                    src="/img/logo.png"
                    alt="Capitale Infos"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight leading-none text-foreground">
                    CAPITALE<span className="text-primary"> INFOS</span>
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
                    Le Journal du Sénégal
                  </span>
                </div>
              </a>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navigation principale">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="relative px-3 py-2 text-[13px] font-semibold text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-primary/5 group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-6" />
                  </a>
                ))}
              </nav>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 rounded-xl hover:bg-primary/10"
                onClick={() => setMobileOpen(true)}
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu - rendered with z-[9999] to be above everything */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            style={{ animation: 'fadeIn 200ms ease-out' }}
          />
          {/* Panel */}
          <div
            className="fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] bg-background shadow-2xl flex flex-col"
            style={{ animation: 'slideInRight 300ms ease-out' }}
          >
            {/* Panel header with gradient */}
            <div className="relative bg-gradient-to-br from-primary to-red-700 px-6 pt-8 pb-8 text-white flex-shrink-0">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl overflow-hidden ring-2 ring-white/30">
                    <img
                      src="/img/logo.png"
                      alt="Capitale Infos"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-black tracking-tight">CAPITALE INFOS</p>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                      Le Journal du Sénégal
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/70 capitalize">{currentTime}</p>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 h-9 w-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Menu links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Navigation mobile">
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left flex items-center gap-3 px-4 py-3.5 text-[15px] font-medium text-foreground hover:text-primary transition-all rounded-xl hover:bg-primary/5 group"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Panel footer */}
            <div className="flex-shrink-0 px-6 py-5 border-t border-border bg-card">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl hover:bg-primary/10"
                  onClick={() => {
                    setMobileOpen(false);
                    onSearchOpen();
                  }}
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl hover:bg-primary/10"
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                >
                  {isDark ? (
                    <Sun className="h-5 w-5 text-amber-400" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
