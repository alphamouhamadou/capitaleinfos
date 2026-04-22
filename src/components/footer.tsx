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
  'Technologie',
  'International',
  'Environnement',
];

const infoLinks = [
  'À propos',
  'Contact',
  'Mentions légales',
  'Politique de confidentialité',
  "Conditions d'utilisation",
];

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: '#', color: 'hover:bg-blue-600' },
  { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:bg-sky-500' },
  { icon: Instagram, label: 'Instagram', href: '#', color: 'hover:bg-pink-600' },
  { icon: Youtube, label: 'YouTube', href: '#', color: 'hover:bg-red-600' },
  { icon: Rss, label: 'RSS', href: '#', color: 'hover:bg-amber-500' },
];

export function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/[0.03] rounded-full -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/[0.02] rounded-full translate-y-1/2" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-11 w-11 rounded-xl overflow-hidden ring-2 ring-white/10">
                <img
                  src="/img/logo.png"
                  alt="Capitale Infos"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-black text-white tracking-tight">
                  CAPITALE INFOS
                </p>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-primary">
                  Le Journal du Sénégal
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Capitale Infos est votre source d&apos;information en continu sur le
              Sénégal. Nous couvrons l&apos;actualité politique, économique,
              sportive, culturelle et sociale avec rigueur et indépendance.
            </p>
            {/* Contact info */}
            <div className="space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary/70" />
                <span>Dakar, Sénégal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary/70" />
                <span>+221 33 800 00 00</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary/70" />
                <span>contact@capitaleinfos.sn</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
              Rubriques
            </h3>
            <ul className="space-y-2.5">
              {categoryLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-primary transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
              Informations
            </h3>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-primary transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
              Suivez-nous
            </h3>
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center ${social.color} transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-xl bg-slate-800/50 border border-slate-800">
              <p className="text-sm text-slate-300 font-semibold mb-1">Newsletter</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Inscrivez-vous pour recevoir les dernières nouvelles
                directement dans votre boîte de réception.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800/80" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} Capitale Infos. Tous droits réservés.
            <span className="hidden sm:inline">Fait avec</span>
            <Heart className="h-3 w-3 text-primary hidden sm:inline" />
            <span className="hidden sm:inline">à Dakar</span>
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
