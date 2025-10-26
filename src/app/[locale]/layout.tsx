import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/NavBar";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import fr from "../../../messages/fr.json";
import en from "../../../messages/en.json";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TraceGpx – Crée ton parcours GPX de running en 1 clic",
  description:
    "TraceGpx te permet de tracer facilement ton parcours de course à pied sur carte et de télécharger ton fichier GPX pour Strava, Garmin, etc.",
  openGraph: {
    title: "TraceGpx – Tracer ton parcours de running",
    description: "Trace ton itinéraire, télécharge ton fichier GPX et partage-le facilement.",
    url: "https://tracegpx.vercel.app",
    siteName: "TraceGpx",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aperçu de l’interface TraceGpx",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

// Mapping des messages
const messages = { fr, en };

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html>
      <head>
        <meta name="google-site-verification" content="Q3AvoEcyxM-ZP5OPXf-rDv9neMkjkTT2Vs13s4iFjLw" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-1835B48Q2B" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1835B48Q2B');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50`}>
        {/* NextIntlClientProvider est un Client Component, pas de problème ici */}
        <NextIntlClientProvider>
          <NavBar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
