'use client';

import { useState } from "react";
import dynamic from "next/dynamic";
import GPXExporter from "@/components/GPXExporter";
import RunStatsCard from "@/components/RunStatsCard";

const TraceMap = dynamic(() => import("@/components/Map"), {
  ssr: false, // désactive le rendu côté serveur pour Leaflet
});

export default function MapPage() {
  const [positions, setPositions] = useState([]);
  const [paceStr, setPaceStr] = useState("5:00");

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black px-4 lg:px-8">
  <main className="w-full max-w-[1400px] mx-auto py-8 flex flex-col gap-8">
    <h1 className="text-2xl text-center font-bold ">Créez votre tracé</h1>

        <TraceMap positions={positions} setPositions={setPositions} />


    {/* Section formulaire + stats */}
    <div className="flex flex-col lg:flex-row items-start justify-center space-x-8">
            <RunStatsCard points={positions} paceStr={paceStr} />

    <GPXExporter points={positions} paceStr={paceStr} setPaceStr={setPaceStr} />

    </div>

    {/* Carte */}
  </main>
</div>

  );
}
