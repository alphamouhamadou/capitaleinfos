import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Capitale Infos — Le Journal du Sénégal",
  description:
    "Capitale Infos, votre source d'information en continu sur le Sénégal. Actualités politique, économique, sportive, culturelle et sociale.",
  keywords: [
    "Sénégal",
    "Dakar",
    "actualités",
    "nouvelles",
    "politique",
    "économie",
    "sport",
    "culture",
    "Afrique",
  ],
  authors: [{ name: "Capitale Infos" }],
  icons: {
    icon: "/img/logo.png",
  },
  openGraph: {
    title: "Capitale Infos — Le Journal du Sénégal",
    description:
      "Votre source d'information en continu sur le Sénégal. Actualités politique, économique, sportive, culturelle et sociale.",
    siteName: "Capitale Infos",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
