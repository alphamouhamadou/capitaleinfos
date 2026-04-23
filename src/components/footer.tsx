'use client';

import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Rss,
  MapPin,
  Phone,
  Mail,
  Heart,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const categoryLinks = [
  'Politique',
  'Économie',
  'Sport',
  'Culture',
  'Société',
  'International',
  'Environnement',
];

const infoLinks = [
  { label: 'À propos', href: '#a-la-une' },
  { label: 'Contact', href: 'mailto:contact@capitaleinfos.sn' },
  { label: 'Mentions légales', href: '#' },
  { label: 'Politique de confidentialité', href: '#' },
  { label: "Conditions d'utilisation", href: '#' },
];

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100092013974494', color: 'hover:bg-blue-600' },
  
];

export function Footer() {
  const handleCategoryClick = (category: string) => {
    window.dispatchEvent(new CustomEvent('switch-category', { detail: category }));
    setTimeout(() => {
      const el = document.querySelector('#rubriques');
      if (el) {
        const headerHeight = 140;
        const y = el.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="relative overflow-hidden">
      {/* ── Dark top banner matching header nav ── */}
      <div className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg overflow-hidden ring-1 ring-white/20 shadow-lg">
                <img
                  src="/img/logo-capitale-infos.jpg"
                  alt="Capitale Infos"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[15px] font-black tracking-tight text-white leading-none">
                  CAPITALE <span className="text-primary">INFOS</span>
                </p>
                <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/40 mt-0.5">
                  Le Journal du Sénégal
                </p>
              </div>
            </div>
            <p className="text-[11.5px] text-white/50 text-center sm:text-right max-w-sm leading-relaxed">
              Votre source d&apos;information en continu — Actualité politique, économique, sportive et culturelle du Sénégal avec rigueur et indépendance.
            </p>
          </div>
        </div>
      </div>

      {/* ── Main footer area ── */}
      <div className="relative bg-black text-white">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Brand info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="text-[12px] text-white/55 leading-relaxed mb-4">
                Capitale Infos couvre l&apos;actualité politique, économique,
                sportive, culturelle et sociale avec rigueur et indépendance.
              </p>
              <div className="space-y-1.5 text-[11px] text-white/40">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-primary" />
                  <span>Dakar, Sénégal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-primary" />
                  <span>+221 77 814 19 04</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-primary" />
                  <span>contact@capitaleinfos.com</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-[10px] font-bold mb-4 uppercase tracking-[0.2em] text-white/35">
                Rubriques
              </h3>
              <ul className="space-y-2">
                {categoryLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleCategoryClick(link)}
                      className="text-[12px] text-white/50 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="h-0.5 w-0.5 rounded-full bg-primary/30 group-hover:bg-primary group-hover:w-1 group-hover:h-1 transition-all duration-300" />
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-[10px] font-bold mb-4 uppercase tracking-[0.2em] text-white/35">
                Informations
              </h3>
              <ul className="space-y-2">
                {infoLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[12px] text-white/50 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="h-0.5 w-0.5 rounded-full bg-primary/30 group-hover:bg-primary group-hover:w-1 group-hover:h-1 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-[10px] font-bold mb-4 uppercase tracking-[0.2em] text-white/35">
                Suivez-nous
              </h3>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white/60 ${social.color} hover:text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:scale-105`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
              <div className="mt-6 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[11.5px] text-white/70 font-semibold mb-1">Newsletter</p>
                <p className="text-[10.5px] text-white/40 leading-relaxed">
                  Inscrivez-vous pour recevoir les dernières nouvelles
                  directement dans votre boîte de réception.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <Separator className="my-6 bg-white/10" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10.5px] text-white/35">
            <p className="flex items-center gap-1.5">
              © {new Date().getFullYear()} Capitale Infos. Tous droits réservés.
              <span className="hidden sm:inline">Fait avec</span>
              <Heart className="h-2.5 w-2.5 text-primary hidden sm:inline" />
              <span className="hidden sm:inline">à Dakar</span>
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white/70 transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-white/70 transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-white/70 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
