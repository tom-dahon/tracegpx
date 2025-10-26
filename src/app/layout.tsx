import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="Q3AvoEcyxM-ZP5OPXf-rDv9neMkjkTT2Vs13s4iFjLw" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet"/>
      </head>
      <title>TraceGPX – Crée ton parcours de running GPS en 1 clic</title>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50!`}
      >
                      <NavBar/>

        {children}
      </body>
    </html>
  );
}
