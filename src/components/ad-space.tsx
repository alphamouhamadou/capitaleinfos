'use client';

import { useState } from 'react';
import { Megaphone, Info } from 'lucide-react';

interface AdSpaceProps {
  format: 'leaderboard' | 'rectangle' | 'banner' | 'half-page' | 'mobile-banner';
  label?: string;
  className?: string;
}

const formatConfig = {
  leaderboard: {
    width: '100%',
    maxWidth: '728px',
    height: '90px',
    label: 'Bannière 728x90',
    mobile: 'mobile-banner',
  },
  rectangle: {
    width: '100%',
    maxWidth: '300px',
    height: '250px',
    label: 'Rectangle 300x250',
    mobile: 'rectangle',
  },
  banner: {
    width: '100%',
    maxWidth: '728px',
    height: '120px',
    label: 'Bannière 728x120',
    mobile: 'mobile-banner',
  },
  'half-page': {
    width: '100%',
    maxWidth: '300px',
    height: '600px',
    label: 'Demi-page 300x600',
    mobile: 'rectangle',
  },
  'mobile-banner': {
    width: '100%',
    maxWidth: '320px',
    height: '50px',
    label: 'Mobile 320x50',
    mobile: 'mobile-banner',
  },
};

const sampleAds = [
  {
    bg: 'from-emerald-500 to-teal-600',
    icon: '🏦',
    title: 'BCEAO',
    subtitle: 'Votre partenaire financier de confiance',
  },
  {
    bg: 'from-red-600 to-red-700',
    icon: '📱',
    title: 'Orange Sonatel',
    subtitle: 'La meilleure connexion internet du Sénégal',
  },
  {
    bg: 'from-blue-600 to-indigo-700',
    icon: '✈️',
    title: 'Air Sénégal',
    subtitle: 'Vol direct Dakar-Paris dès 250 000 FCFA',
  },
  {
    bg: 'from-amber-500 to-orange-600',
    icon: '🏠',
    title: 'Immobilier SN',
    subtitle: 'Trouvez votre maison idéale au Sénégal',
  },
  {
    bg: 'from-purple-600 to-violet-700',
    icon: '🎓',
    title: 'Université Cheikh Anta Diop',
    subtitle: 'Inscriptions ouvertes pour la rentrée 2026',
  },
  {
    bg: 'from-rose-500 to-pink-600',
    icon: '🚗',
    title: 'Toyota Sénégal',
    subtitle: 'Nouveau Land Cruiser 2026 - Disponible maintenant',
  },
];

function getAdContent(format: string) {
  // Deterministic "random" based on format string
  const index = format.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % sampleAds.length;
  return sampleAds[index];
}

export function AdSpace({ format, label, className = '' }: AdSpaceProps) {
  const [dismissed, setDismissed] = useState(false);
  const config = formatConfig[format];
  const ad = getAdContent(format);
  const isMobileFormat = format === 'mobile-banner';

  if (dismissed) return null;

  return (
    <div
      className={`relative w-full flex justify-center ${isMobileFormat ? 'lg:hidden' : ''} ${className}`}
    >
      <div
        className="relative w-full overflow-hidden rounded-xl border border-border/60 shadow-sm group cursor-pointer transition-all hover:shadow-md"
        style={{
          maxWidth: config.maxWidth,
          height: config.height,
          minHeight: config.height,
        }}
      >
        {/* Ad content */}
        <div className={`absolute inset-0 bg-gradient-to-r ${ad.bg} flex items-center justify-center`}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-2 right-2 w-16 h-16 bg-white/5 rounded-full" />

          {/* Content */}
          <div className="relative flex items-center gap-4 px-6">
            <span className={`text-4xl ${isMobileFormat ? 'text-2xl' : 'text-5xl'} drop-shadow-lg`}>
              {ad.icon}
            </span>
            <div className="text-white">
              <p className={`font-black tracking-tight ${isMobileFormat ? 'text-sm' : 'text-lg sm:text-xl'}`}>
                {ad.title}
              </p>
              {!isMobileFormat && (
                <p className="text-white/80 text-xs sm:text-sm mt-0.5 font-medium">{ad.subtitle}</p>
              )}
            </div>
          </div>

          {/* CTA button (desktop only) */}
          {!isMobileFormat && (
            <div className="absolute bottom-3 right-4">
              <div className="bg-white/20 backdrop-blur-sm text-white text-[11px] font-bold px-4 py-1.5 rounded-lg hover:bg-white/30 transition-colors">
                En savoir plus
              </div>
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDismissed(true);
          }}
          className="absolute top-1.5 right-1.5 h-6 w-6 rounded-md bg-black/20 hover:bg-black/40 text-white/70 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          aria-label="Fermer la publicité"
        >
          <span className="text-xs font-bold">&times;</span>
        </button>

        {/* Ad label */}
        <div className="absolute bottom-1.5 left-2 flex items-center gap-1">
          <Info className="h-2.5 w-2.5 text-white/30" />
          <span className="text-[8px] text-white/30 font-medium uppercase tracking-wider">
            Publicité
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR AD COMPONENT ────────────────────────────────────────────
export function SidebarAd({ className = '' }: { className?: string }) {
  return <AdSpace format="rectangle" className={className} />;
}

// ─── IN-CONTENT AD COMPONENT ─────────────────────────────────────────
export function InContentAd({ className = '' }: { className?: string }) {
  return <AdSpace format="banner" className={className} />;
}

// ─── TOP BANNER AD COMPONENT ─────────────────────────────────────────
export function TopBannerAd({ className = '' }: { className?: string }) {
  return <AdSpace format="leaderboard" className={className} />;
}

// ─── MOBILE STICKY AD ────────────────────────────────────────────────
export function MobileStickyAd() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <AdSpace format="mobile-banner" />
      <button
        onClick={() => setVisible(false)}
        className="absolute -top-6 right-3 bg-foreground/80 text-background text-[10px] font-bold px-2 py-0.5 rounded-t-md hover:bg-foreground transition-colors"
      >
        Fermer
      </button>
    </div>
  );
}
