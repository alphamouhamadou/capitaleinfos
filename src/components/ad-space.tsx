'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Info } from 'lucide-react';

interface AdBanner {
  id: string;
  image: string;
  alt: string;
  advertiser: string;
  link: string;
}

// ─── AD INVENTORY ────────────────────────────────────────────────────
const leaderboardAds: AdBanner[] = [
  {
    id: 'leader-1',
    image: '/img/ads/ad-dakar-city.png',
    alt: 'Capitale Infos - Ville de Dakar',
    advertiser: 'Dakar Smart City',
    link: '#',
  },
  {
    id: 'leader-2',
    image: '/img/ads/ad-telecom.png',
    alt: 'Orange Sonatel - Télécommunications',
    advertiser: 'Orange Sonatel',
    link: '#',
  },
  {
    id: 'leader-3',
    image: '/img/ads/ad-airline.png',
    alt: 'Air Sénégal - Vol Dakar-Paris',
    advertiser: 'Air Sénégal',
    link: '#',
  },
  {
    id: 'leader-4',
    image: '/img/ads/ad-banking.png',
    alt: 'BCEAO - Banque Centrale',
    advertiser: 'BCEAO',
    link: '#',
  },
];

const rectangleAds: AdBanner[] = [
  {
    id: 'rect-1',
    image: '/img/ads/ad-education.png',
    alt: 'UCAD - Université Cheikh Anta Diop',
    advertiser: 'Université Cheikh Anta Diop',
    link: '#',
  },
  {
    id: 'rect-2',
    image: '/img/ads/ad-auto.png',
    alt: 'Toyota Sénégal',
    advertiser: 'Toyota Sénégal',
    link: '#',
  },
];

const mobileAds: AdBanner[] = [
  {
    id: 'mobile-1',
    image: '/img/ads/ad-immobilier.png',
    alt: 'Immobilier SN',
    advertiser: 'Immobilier SN',
    link: '#',
  },
  {
    id: 'mobile-2',
    image: '/img/ads/ad-banking.png',
    alt: 'BCEAO - Banque Centrale',
    advertiser: 'BCEAO',
    link: '#',
  },
];

// ─── AD SPACE COMPONENT ──────────────────────────────────────────────
interface AdSpaceProps {
  format: 'leaderboard' | 'rectangle' | 'half-page' | 'mobile-banner';
  position?: number;
  className?: string;
}

export function AdSpace({ format, position = 0, className = '' }: AdSpaceProps) {
  const [dismissed, setDismissed] = useState(false);

  const ads = format === 'rectangle' || format === 'half-page'
    ? rectangleAds
    : format === 'mobile-banner'
      ? mobileAds
      : leaderboardAds;

  const ad = ads[position % ads.length];

  if (dismissed) return null;

  const isMobile = format === 'mobile-banner';
  const isVertical = format === 'rectangle' || format === 'half-page';

  const wrapperClass = isMobile
    ? 'lg:hidden'
    : '';

  const sizeClass = isVertical
    ? 'aspect-[9/16]'
    : 'aspect-[4/3] sm:aspect-[16/9]';

  const maxHeightClass = format === 'half-page'
    ? 'max-h-[600px]'
    : isVertical
      ? 'max-h-[400px]'
      : 'max-h-[200px] sm:max-h-[250px]';

  return (
    <div className={`relative w-full flex justify-center ${wrapperClass} ${className}`}>
      <a
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="relative w-full overflow-hidden rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-shadow group block"
      >
        <div className={`relative w-full ${sizeClass} ${maxHeightClass}`}>
          <Image
            src={ad.image}
            alt={ad.alt}
            fill
            className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-500"
            sizes={isVertical ? '300px' : '(max-width: 640px) 100vw, 728px'}
            priority={position === 0}
          />

          {/* Gradient overlay for advertiser name */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/40 to-transparent flex items-center px-2.5">
            <span className="text-[9px] text-white/80 font-semibold uppercase tracking-wider">
              {ad.advertiser}
            </span>
          </div>

          {/* Publicité label */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-between px-2.5">
            <div className="flex items-center gap-1">
              <Info className="h-2.5 w-2.5 text-white/50" />
              <span className="text-[8px] text-white/50 font-medium uppercase tracking-wider">
                Publicité
              </span>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDismissed(true);
          }}
          className="absolute top-1.5 right-1.5 h-6 w-6 rounded-md bg-black/30 hover:bg-black/60 text-white/70 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          aria-label="Fermer la publicité"
        >
          <span className="text-xs font-bold leading-none">&times;</span>
        </button>
      </a>
    </div>
  );
}

// ─── PRESET COMPONENTS ───────────────────────────────────────────────
export function TopBannerAd({ className = '' }: { className?: string }) {
  return <AdSpace format="leaderboard" position={0} className={className} />;
}

export function MidBannerAd({ className = '' }: { className?: string }) {
  return <AdSpace format="leaderboard" position={1} className={className} />;
}

export function BottomBannerAd({ className = '' }: { className?: string }) {
  return <AdSpace format="leaderboard" position={2} className={className} />;
}

export function SidebarAd({ position = 0, className = '' }: { position?: number; className?: string }) {
  return <AdSpace format="rectangle" position={position} className={className} />;
}

export function MobileStickyAd() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="relative">
        <div className="absolute -top-6 right-3 z-10">
          <button
            onClick={() => setVisible(false)}
            className="bg-foreground/80 text-background text-[10px] font-bold px-2.5 py-1 rounded-t-md hover:bg-foreground transition-colors flex items-center gap-1"
          >
            Fermer
            <span className="text-xs">&times;</span>
          </button>
        </div>
        <AdSpace format="mobile-banner" position={1} />
      </div>
    </div>
  );
}
