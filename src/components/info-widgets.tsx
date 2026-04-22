'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  Droplets,
  Wind,
  Eye,
  Sun,
  CloudSun,
  CloudRain,
  CloudLightning,
  Thermometer,
  MapPin,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  ChevronDown,
  Clock,
  Star,
  Moon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// ─── TYPES ───────────────────────────────────────────────────────────
interface DayForecast {
  day: string;
  icon: 'sun' | 'cloud-sun' | 'cloud' | 'cloud-rain' | 'cloud-lightning';
  label: string;
  high: number;
  low: number;
  humidity: number;
}

interface CityWeather {
  city: string;
  region: string;
  current: {
    temp: number;
    feelsLike: number;
    condition: string;
    icon: 'sun' | 'cloud-sun' | 'cloud' | 'cloud-rain' | 'cloud-lightning';
    humidity: number;
    wind: number;
    windDir: string;
    uv: number;
    visibility: number;
    pressure: number;
  };
  forecast: DayForecast[];
}

interface ExchangeRate {
  pair: string;
  rate: number;
  change: number;
  changePercent: number;
  flag: string;
  currency: string;
}

interface PrayerTime {
  name: string;
  nameAr: string;
  time: string;
  icon: typeof Moon;
  isNext?: boolean;
}

interface CityPrayer {
  city: string;
  date: string;
  hijriDate: string;
  prayers: PrayerTime[];
  nextPrayer: string;
}

// ─── DATA ────────────────────────────────────────────────────────────
const weatherData: Record<string, CityWeather> = {
  dakar: {
    city: 'Dakar',
    region: 'Cap-Vert',
    current: {
      temp: 32,
      feelsLike: 36,
      condition: 'Ensoleillé',
      icon: 'sun',
      humidity: 65,
      wind: 18,
      windDir: 'NO',
      uv: 9,
      visibility: 10,
      pressure: 1013,
    },
    forecast: [
      { day: 'Auj.', icon: 'sun', label: 'Ensoleillé', high: 33, low: 23, humidity: 60 },
      { day: 'Jeu', icon: 'cloud-sun', label: 'Partiellement nuageux', high: 31, low: 22, humidity: 68 },
      { day: 'Ven', icon: 'sun', label: 'Ensoleillé', high: 34, low: 24, humidity: 55 },
      { day: 'Sam', icon: 'cloud-rain', label: 'Pluies légères', high: 29, low: 21, humidity: 78 },
      { day: 'Dim', icon: 'cloud-sun', label: 'Éclaircies', high: 30, low: 22, humidity: 70 },
    ],
  },
  'saint-louis': {
    city: 'Saint-Louis',
    region: 'Saint-Louis',
    current: {
      temp: 30,
      feelsLike: 33,
      condition: 'Partiellement nuageux',
      icon: 'cloud-sun',
      humidity: 72,
      wind: 22,
      windDir: 'O',
      uv: 7,
      visibility: 9,
      pressure: 1011,
    },
    forecast: [
      { day: 'Auj.', icon: 'cloud-sun', label: 'Partiellement nuageux', high: 31, low: 22, humidity: 70 },
      { day: 'Jeu', icon: 'cloud', label: 'Nuageux', high: 28, low: 20, humidity: 80 },
      { day: 'Ven', icon: 'cloud-rain', label: 'Pluies', high: 27, low: 19, humidity: 85 },
      { day: 'Sam', icon: 'cloud-sun', label: 'Éclaircies', high: 29, low: 21, humidity: 75 },
      { day: 'Dim', icon: 'sun', label: 'Ensoleillé', high: 32, low: 23, humidity: 62 },
    ],
  },
  thies: {
    city: 'Thiès',
    region: 'Thiès',
    current: {
      temp: 34,
      feelsLike: 38,
      condition: 'Ensoleillé',
      icon: 'sun',
      humidity: 50,
      wind: 15,
      windDir: 'N',
      uv: 10,
      visibility: 12,
      pressure: 1015,
    },
    forecast: [
      { day: 'Auj.', icon: 'sun', label: 'Ensoleillé', high: 35, low: 24, humidity: 48 },
      { day: 'Jeu', icon: 'sun', label: 'Très ensoleillé', high: 36, low: 25, humidity: 42 },
      { day: 'Ven', icon: 'cloud-sun', label: "Nuages l'après-midi", high: 33, low: 23, humidity: 55 },
      { day: 'Sam', icon: 'sun', label: 'Ensoleillé', high: 34, low: 24, humidity: 50 },
      { day: 'Dim', icon: 'cloud-lightning', label: 'Orageux', high: 28, low: 22, humidity: 82 },
    ],
  },
  ziguinchor: {
    city: 'Ziguinchor',
    region: 'Casamance',
    current: {
      temp: 28,
      feelsLike: 32,
      condition: 'Nuageux',
      icon: 'cloud',
      humidity: 82,
      wind: 12,
      windDir: 'SO',
      uv: 5,
      visibility: 8,
      pressure: 1010,
    },
    forecast: [
      { day: 'Auj.', icon: 'cloud-rain', label: 'Pluies', high: 29, low: 22, humidity: 85 },
      { day: 'Jeu', icon: 'cloud-rain', label: 'Averses', high: 28, low: 21, humidity: 88 },
      { day: 'Ven', icon: 'cloud', label: 'Couvert', high: 27, low: 21, humidity: 84 },
      { day: 'Sam', icon: 'cloud-sun', label: 'Éclaircies', high: 30, low: 22, humidity: 75 },
      { day: 'Dim', icon: 'cloud-rain', label: 'Pluies orageuses', high: 26, low: 20, humidity: 90 },
    ],
  },
  kaolack: {
    city: 'Kaolack',
    region: 'Kaolack',
    current: {
      temp: 35,
      feelsLike: 40,
      condition: 'Très ensoleillé',
      icon: 'sun',
      humidity: 42,
      wind: 10,
      windDir: 'NE',
      uv: 11,
      visibility: 14,
      pressure: 1014,
    },
    forecast: [
      { day: 'Auj.', icon: 'sun', label: 'Très ensoleillé', high: 36, low: 25, humidity: 40 },
      { day: 'Jeu', icon: 'sun', label: 'Chaud et sec', high: 37, low: 26, humidity: 35 },
      { day: 'Ven', icon: 'cloud-sun', label: 'Nuages épars', high: 35, low: 24, humidity: 48 },
      { day: 'Sam', icon: 'sun', label: 'Ensoleillé', high: 36, low: 25, humidity: 42 },
      { day: 'Dim', icon: 'cloud-lightning', label: 'Orages isolés', high: 30, low: 23, humidity: 70 },
    ],
  },
};

const exchangeRates: ExchangeRate[] = [
  { pair: 'EUR/XOF', rate: 655.96, change: 0.12, changePercent: 0.018, flag: '🇪🇺', currency: 'Euro' },
  { pair: 'USD/XOF', rate: 617.45, change: -1.23, changePercent: -0.199, flag: '🇺🇸', currency: 'Dollar US' },
  { pair: 'GBP/XOF', rate: 782.30, change: 0.85, changePercent: 0.109, flag: '🇬🇧', currency: 'Livre Sterling' },
  { pair: 'MAD/XOF', rate: 64.12, change: -0.05, changePercent: -0.078, flag: '🇲🇦', currency: 'Dirham' },
  { pair: 'XOF/EUR', rate: 0.001524, change: 0, changePercent: 0, flag: '🇸🇳', currency: 'FCFA' },
];

const prayerData: Record<string, CityPrayer> = {
  dakar: {
    city: 'Dakar',
    date: '22 Avril 2026',
    hijriDate: '24 Chawwal 1447',
    prayers: [
      { name: 'Subh', nameAr: 'الفجر', time: '05:42', icon: Moon, isNext: false },
      { name: 'Tisbar', nameAr: 'الظهر', time: '13:08', icon: Sun, isNext: true },
      { name: 'Takussan', nameAr: 'العصر', time: '16:25', icon: CloudSun, isNext: false },
      { name: 'Timis', nameAr: 'المغرب', time: '19:10', icon: CloudSun, isNext: false },
      { name: 'Guéwé', nameAr: 'العشاء', time: '20:26', icon: Star, isNext: false },
    ],
    nextPrayer: 'Tisbar',
  },
  'saint-louis': {
    city: 'Saint-Louis',
    date: '22 Avril 2026',
    hijriDate: '24 Chawwal 1447',
    prayers: [
      { name: 'Subh', nameAr: 'الفجر', time: '05:38', icon: Moon },
      { name: 'Tisbar', nameAr: 'الظهر', time: '13:02', icon: Sun, isNext: true },
      { name: 'Takussan', nameAr: 'العصر', time: '16:18', icon: CloudSun },
      { name: 'Timis', nameAr: 'المغرب', time: '19:06', icon: CloudSun },
      { name: 'Guéwé', nameAr: 'العشاء', time: '20:22', icon: Star },
    ],
    nextPrayer: 'Tisbar',
  },
  thies: {
    city: 'Thiès',
    date: '22 Avril 2026',
    hijriDate: '24 Chawwal 1447',
    prayers: [
      { name: 'Subh', nameAr: 'الفجر', time: '05:44', icon: Moon },
      { name: 'Tisbar', nameAr: 'الظهر', time: '13:12', icon: Sun, isNext: true },
      { name: 'Takussan', nameAr: 'العصر', time: '16:28', icon: CloudSun },
      { name: 'Timis', nameAr: 'المغرب', time: '19:12', icon: CloudSun },
      { name: 'Guéwé', nameAr: 'العشاء', time: '20:28', icon: Star },
    ],
    nextPrayer: 'Tisbar',
  },
  ziguinchor: {
    city: 'Ziguinchor',
    date: '22 Avril 2026',
    hijriDate: '24 Chawwal 1447',
    prayers: [
      { name: 'Subh', nameAr: 'الفجر', time: '05:52', icon: Moon },
      { name: 'Tisbar', nameAr: 'الظهر', time: '13:22', icon: Sun, isNext: true },
      { name: 'Takussan', nameAr: 'العصر', time: '16:40', icon: CloudSun },
      { name: 'Timis', nameAr: 'المغرب', time: '19:20', icon: CloudSun },
      { name: 'Guéwé', nameAr: 'العشاء', time: '20:36', icon: Star },
    ],
    nextPrayer: 'Tisbar',
  },
  kaolack: {
    city: 'Kaolack',
    date: '22 Avril 2026',
    hijriDate: '24 Chawwal 1447',
    prayers: [
      { name: 'Subh', nameAr: 'الفجر', time: '05:46', icon: Moon },
      { name: 'Tisbar', nameAr: 'الظهر', time: '13:14', icon: Sun, isNext: true },
      { name: 'Takussan', nameAr: 'العصر', time: '16:32', icon: CloudSun },
      { name: 'Timis', nameAr: 'المغرب', time: '19:14', icon: CloudSun },
      { name: 'Guéwé', nameAr: 'العشاء', time: '20:30', icon: Star },
    ],
    nextPrayer: 'Tisbar',
  },
};

const cityList = [
  { id: 'dakar', label: 'Dakar' },
  { id: 'saint-louis', label: 'Saint-Louis' },
  { id: 'thies', label: 'Thiès' },
  { id: 'ziguinchor', label: 'Ziguinchor' },
  { id: 'kaolack', label: 'Kaolack' },
];

// ─── WEATHER ICON COMPONENT ──────────────────────────────────────────
function WeatherIcon({ type, className = 'h-6 w-6' }: { type: string; className?: string }) {
  switch (type) {
    case 'sun':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'cloud-sun':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="10" cy="8" r="4" />
          <path d="M10 2v1M10 13v1M3.5 5.5l.7.7M15.5 10.5l.7.7M2 8h1M17 8h1M4.5 11l-.7.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M18 17H9a4 4 0 01-.88-7.9A5.5 5.5 0 0116.9 9 4.5 4.5 0 0118 17z" fill="currentColor" opacity="0.9" />
        </svg>
      );
    case 'cloud':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 17H9a4 4 0 01-.88-7.9A5.5 5.5 0 0116.9 9 4.5 4.5 0 0118 17z" />
        </svg>
      );
    case 'cloud-rain':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 14H9a4 4 0 01-.88-7.9A5.5 5.5 0 0116.9 6 4.5 4.5 0 0118 14z" opacity="0.8" />
          <path d="M8 19v2M12 18v2M16 19v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
        </svg>
      );
    case 'cloud-lightning':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 13H9a4 4 0 01-.88-7.9A5.5 5.5 0 0116.9 5 4.5 4.5 0 0118 13z" opacity="0.7" />
          <path d="M13 16l-2 4h4l-2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
    default:
      return <Cloud className={className} />;
  }
}

// ─── WEATHER WIDGET ──────────────────────────────────────────────────
export function WeatherWidget() {
  const [selectedCity, setSelectedCity] = useState('dakar');
  const data = weatherData[selectedCity];

  return (
    <Card className="border-border/60 overflow-hidden rounded-2xl shadow-sm">
      <CardHeader className="bg-gradient-to-br from-amber-500 to-orange-600 text-white pb-3 pt-4 px-5">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2.5 text-base font-bold">
            <div className="h-7 w-7 rounded-lg bg-white/15 flex items-center justify-center">
              <Cloud className="h-4 w-4" />
            </div>
            Météo
          </CardTitle>
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="appearance-none bg-white/15 text-white text-[11px] font-semibold rounded-lg pl-2.5 pr-7 py-1.5 border border-white/20 cursor-pointer hover:bg-white/25 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              {cityList.map((c) => (
                <option key={c.id} value={c.id} className="text-gray-900">
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {/* Current weather */}
        <motion.div
          key={selectedCity}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground">{data.city}</span>
                <span className="text-[10px] text-muted-foreground/60">• {data.region}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tight">{data.current.temp}</span>
                <span className="text-xl text-muted-foreground font-light">°C</span>
              </div>
              <p className="text-sm font-medium text-foreground mt-1">{data.current.condition}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Ressenti <span className="font-semibold">{data.current.feelsLike}°C</span>
              </p>
            </div>
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-800/30 flex items-center justify-center shadow-inner">
              <WeatherIcon type={data.current.icon} className="h-12 w-12 text-amber-500" />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-muted/50 text-center">
              <Droplets className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-[9px] text-muted-foreground font-medium">Humidité</span>
              <span className="text-xs font-bold">{data.current.humidity}%</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-muted/50 text-center">
              <Wind className="h-3.5 w-3.5 text-teal-500" />
              <span className="text-[9px] text-muted-foreground font-medium">Vent</span>
              <span className="text-xs font-bold">{data.current.wind}</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-muted/50 text-center">
              <Thermometer className="h-3.5 w-3.5 text-red-500" />
              <span className="text-[9px] text-muted-foreground font-medium">UV</span>
              <span className="text-xs font-bold">{data.current.uv}</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-muted/50 text-center">
              <Eye className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-[9px] text-muted-foreground font-medium">Visibilité</span>
              <span className="text-xs font-bold">{data.current.visibility}</span>
            </div>
          </div>

          {/* 5-day forecast */}
          <Separator className="my-4" />
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Prévisions 5 jours</p>
          <div className="space-y-1.5">
            {data.forecast.map((day, i) => (
              <div
                key={day.day}
                className={`flex items-center justify-between px-2.5 py-2 rounded-xl transition-colors ${
                  i === 0 ? 'bg-primary/5 border border-primary/10' : 'hover:bg-muted/50'
                }`}
              >
                <span className={`text-xs font-semibold w-10 ${i === 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {day.day}
                </span>
                <div className="flex items-center gap-1.5">
                  <WeatherIcon type={day.icon} className="h-5 w-5 text-muted-foreground" />
                  <span className="text-[11px] text-muted-foreground hidden sm:inline w-24">{day.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold">{day.high}°</span>
                  <div className="w-12 h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 via-amber-400 to-red-400"
                      style={{ width: `${Math.min(((day.high - 15) / 30) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground font-medium">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}

// ─── EXCHANGE RATE WIDGET ────────────────────────────────────────────
export function ExchangeRateWidget() {
  const [lastUpdate] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  });

  return (
    <Card className="border-border/60 overflow-hidden rounded-2xl shadow-sm">
      <CardHeader className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white pb-3 pt-4 px-5">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2.5 text-base font-bold">
            <div className="h-7 w-7 rounded-lg bg-white/15 flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
            Devises
          </CardTitle>
          <div className="flex items-center gap-1.5 text-white/70 text-[10px] font-medium">
            <RefreshCw className="h-3 w-3" />
            {lastUpdate}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-0.5">
          {exchangeRates.slice(0, 4).map((rate) => (
            <div
              key={rate.pair}
              className="flex items-center justify-between py-2.5 px-2 rounded-xl hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{rate.flag}</span>
                <div>
                  <span className="text-xs font-bold block">{rate.pair}</span>
                  <span className="text-[10px] text-muted-foreground">{rate.currency}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-black block">{rate.rate.toFixed(2)}</span>
                <div className={`flex items-center justify-end gap-0.5 text-[10px] font-semibold ${
                  rate.change >= 0 ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  {rate.change >= 0 ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span>{rate.change >= 0 ? '+' : ''}{rate.change.toFixed(2)}</span>
                  <span className="text-muted-foreground ml-0.5">({rate.change >= 0 ? '+' : ''}{rate.changePercent.toFixed(2)}%)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mini bar chart visual */}
        <Separator className="my-3" />
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>En hausse</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span>En baisse</span>
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground font-medium">Source : BCEAO</span>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── PRAYER TIMES WIDGET ────────────────────────────────────────────
export function PrayerTimesWidget() {
  const [selectedCity, setSelectedCity] = useState('dakar');
  const data = prayerData[selectedCity];

  return (
    <Card className="border-border/60 overflow-hidden rounded-2xl shadow-sm">
      <CardHeader className="bg-gradient-to-br from-emerald-700 to-green-800 text-white pb-3 pt-4 px-5">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2.5 text-base font-bold">
            <div className="h-7 w-7 rounded-lg bg-white/15 flex items-center justify-center">
              <Moon className="h-4 w-4" />
            </div>
            Prières
          </CardTitle>
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="appearance-none bg-white/15 text-white text-[11px] font-semibold rounded-lg pl-2.5 pr-7 py-1.5 border border-white/20 cursor-pointer hover:bg-white/25 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              {cityList.map((c) => (
                <option key={c.id} value={c.id} className="text-gray-900">
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <motion.div
          key={selectedCity}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Date info */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-semibold text-muted-foreground">{data.date}</span>
            </div>
            <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">{data.hijriDate}</span>
          </div>

          {/* Next prayer banner */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 p-3.5 mb-4 text-white">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70 mb-1">Prochaine prière</p>
            <div className="flex items-center justify-between relative">
              <div>
                <span className="text-xl font-black">{data.nextPrayer}</span>
                <span className="text-xs text-white/60 ml-2 font-medium">
                  ({data.prayers.find(p => p.name === data.nextPrayer)?.nameAr})
                </span>
              </div>
              <span className="text-2xl font-black">
                {data.prayers.find(p => p.name === data.nextPrayer)?.time}
              </span>
            </div>
          </div>

          {/* Prayer list */}
          <div className="space-y-0.5">
            {data.prayers.map((prayer, i) => {
              const IconComp = prayer.icon;
              return (
                <div
                  key={prayer.name}
                  className={`flex items-center justify-between py-2.5 px-2.5 rounded-xl transition-colors ${
                    prayer.name === data.nextPrayer
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/30'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                      prayer.name === data.nextPrayer
                        ? 'bg-emerald-600 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <IconComp className="h-4 w-4" />
                    </div>
                    <div>
                      <span className={`text-xs font-bold block ${prayer.name === data.nextPrayer ? 'text-emerald-700 dark:text-emerald-400' : ''}`}>
                        {prayer.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-medium">{prayer.nameAr}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-black tabular-nums ${prayer.name === data.nextPrayer ? 'text-emerald-700 dark:text-emerald-400' : ''}`}>
                      {prayer.time}
                    </span>
                    {prayer.name === data.nextPrayer && (
                      <div className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
