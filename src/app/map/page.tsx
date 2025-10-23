"use client";
import dynamic from "next/dynamic";

const TraceMap = dynamic(() => import("@/components/Map"), {
  ssr: false, // désactive le rendu côté serveur pour Leaflet
});

export default function MapPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main >
        <h1>Créer votre tracé</h1>
        <TraceMap />
      </main>
    </div>
  );
}