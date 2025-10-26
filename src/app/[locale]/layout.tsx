import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/NavBar";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

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
export const metadata: Metadata = {
  title: "TraceGpx – Create your GPX running route in one click",
  description:
    "TraceGpx lets you easily draw your running route on a map and download your GPX file for Strava, Garmin, and more.",
  openGraph: {
    title: "TraceGpx – Draw your running route",
    description:
      "Draw your route, download your GPX file, and share it easily.",
    url: "https://tracegpx.app",
    siteName: "TraceGpx",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TraceGpx interface preview",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

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
