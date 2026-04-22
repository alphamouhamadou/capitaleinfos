import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Rss,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const categoryLinks = [
  'Politique',
  'Économie',
  'Sport',
  'Culture',
  'Société',
  'Technologie',
  'International',
  'Environnement',
];

const infoLinks = [
  'À propos',
  'Contact',
  'Mentions légales',
  'Politique de confidentialité',
  'Conditions d\'utilisation',
];

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Rss, label: 'RSS', href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/img/logo.png"
                alt="Capitale Infos"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-lg font-black text-white tracking-tight">
                  CAPITALE INFOS
                </p>
                <p className="text-[10px] font-medium uppercase tracking-widest text-primary">
                  Le Journal du Sénégal
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Capitale Infos est votre source d&apos;information en continu sur le
              Sénégal. Nous couvrons l&apos;actualité politique, économique,
              sportive, culturelle et sociale avec rigueur et indépendance.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Rubriques
            </h3>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Informations
            </h3>
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Suivez-nous
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-sm text-slate-400 mb-2">Newsletter</p>
              <p className="text-xs text-slate-500">
                Inscrivez-vous pour recevoir les dernières nouvelles
                directement dans votre boîte de réception.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Capitale Infos. Tous droits réservés.
          </p>
          <p>
            Dakar, Sénégal
          </p>
        </div>
      </div>
    </footer>
  );
}
