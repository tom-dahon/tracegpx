import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/NavBar";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

// ----------------------------
// Fonts
// ----------------------------
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ----------------------------
// SEO metadata
// ----------------------------
type Params = { params: { locale: string } };

export async function generateMetadata({params}: Params) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'metadata'});
 
  return {
    title: t("title"), // "TraceGpx – Créez votre parcours de course en un clic"
  description: t("description"), 
  // "TraceGpx vous permet de dessiner facilement votre parcours de course sur une carte et de télécharger votre fichier GPX pour Strava, Garmin, et plus.",
  openGraph: {
    title: t("og.title"), // "TraceGpx – Dessinez votre parcours de course"
    description: t("og.description"), 
    // "Dessinez votre parcours, téléchargez votre fichier GPX et partagez-le facilement."
    url: "https://tracegpx.app",
    siteName: "TraceGpx",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: t("og.alt"), // "Aperçu de l'interface TraceGpx"
      },
    ],
    locale: locale,
    type: "website",
  }
}
}

// ----------------------------
// Types
// ----------------------------
interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// ----------------------------
// Root layout
// ----------------------------
export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  // Validate locale and handle 404 if not supported
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        {/* SEO and verification */}
        <meta
          name="google-site-verification"
          content="Q3AvoEcyxM-ZP5OPXf-rDv9neMkjkTT2Vs13s4iFjLw"
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1835B48Q2B"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1835B48Q2B');
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900`}
      >
        <NextIntlClientProvider>
          <NavBar />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
