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
    <footer className="relative overflow-hidden">
      {/* Top gradient separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Background */}
      <div className="relative bg-foreground/[0.03] dark:bg-foreground/[0.02]">
        {/* Decorative blurs */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/[0.03] rounded-full -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/[0.02] rounded-full translate-y-1/2 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-xl overflow-hidden shadow-md shadow-primary/10">
                  <img
                    src="/img/logo-capitale-infos.jpg"
                    alt="Capitale Infos"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[15px] font-black text-foreground tracking-tight">
                    CAPITALE INFOS
                  </p>
                  <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-primary">
                    Le Journal du Sénégal
                  </p>
                </div>
              </div>
              <p className="text-[12.5px] text-muted-foreground/70 leading-relaxed mb-5">
                Capitale Infos est votre source d&apos;information en continu sur le
                Sénégal. Nous couvrons l&apos;actualité politique, économique,
                sportive, culturelle et sociale avec rigueur et indépendance.
              </p>
              <div className="space-y-2 text-[11px] text-muted-foreground/50">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-primary/50" />
                  <span>Dakar, Sénégal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-primary/50" />
                  <span>+221 33 800 00 00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-primary/50" />
                  <span>contact@capitaleinfos.sn</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-[10px] font-bold mb-5 uppercase tracking-[0.2em] text-foreground/40">
                Rubriques
              </h3>
              <ul className="space-y-2.5">
                {categoryLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[12.5px] text-muted-foreground/60 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="h-0.5 w-0.5 rounded-full bg-primary/30 group-hover:bg-primary group-hover:w-1 group-hover:h-1 transition-all duration-300" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-[10px] font-bold mb-5 uppercase tracking-[0.2em] text-foreground/40">
                Informations
              </h3>
              <ul className="space-y-2.5">
                {infoLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[12.5px] text-muted-foreground/60 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="h-0.5 w-0.5 rounded-full bg-primary/30 group-hover:bg-primary group-hover:w-1 group-hover:h-1 transition-all duration-300" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-[10px] font-bold mb-5 uppercase tracking-[0.2em] text-foreground/40">
                Suivez-nous
              </h3>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-9 h-9 rounded-xl bg-muted/60 border border-border/30 flex items-center justify-center ${social.color} transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:scale-105`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
              <div className="mt-8 p-4 rounded-2xl bg-muted/30 border border-border/30">
                <p className="text-[12px] text-foreground/70 font-semibold mb-1">Newsletter</p>
                <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
                  Inscrivez-vous pour recevoir les dernières nouvelles
                  directement dans votre boîte de réception.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <Separator className="my-8 bg-border/40" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10.5px] text-muted-foreground/50">
            <p className="flex items-center gap-1.5">
              © {new Date().getFullYear()} Capitale Infos. Tous droits réservés.
              <span className="hidden sm:inline">Fait avec</span>
              <Heart className="h-2.5 w-2.5 text-primary/60 hidden sm:inline" />
              <span className="hidden sm:inline">à Dakar</span>
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-foreground/70 transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-foreground/70 transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-foreground/70 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
