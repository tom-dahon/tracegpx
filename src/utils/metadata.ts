import { Metadata } from "next";

export const metadataFr: Metadata = {
  title: "TraceGpx – Créez votre parcours de course en un clic",
  description: "TraceGpx vous permet de dessiner facilement votre parcours de course sur une carte et de télécharger votre fichier GPX pour Strava, Garmin, et plus.",
  openGraph: {
    title: "TraceGpx – Dessinez votre parcours de course",
    description: "Dessinez votre parcours, téléchargez votre fichier GPX et partagez-le facilement.",
    url: "https://tracegpx.app",
    siteName: "TraceGpx",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Aperçu de l'interface TraceGpx" }
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export const metadataEn: Metadata = {
  title: "TraceGpx – Create your GPX running route in one click",
  description: "TraceGpx lets you easily draw your running route on a map and download your GPX file for Strava, Garmin, and more.",
  openGraph: {
    title: "TraceGpx – Draw your running route",
    description: "Draw your route, download your GPX file, and share it easily.",
    url: "https://tracegpx.app",
    siteName: "TraceGpx",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "TraceGpx interface preview" }
    ],
    locale: "en_US",
    type: "website",
  },
};