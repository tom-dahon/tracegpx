'use client';

import { useState } from "react";
import dynamic from "next/dynamic";
import GPXExporter from "@/components/GPXExporter";
import RunStatsCard from "@/components/RunStatsCard";
import NavBar from "@/components/NavBar";

const TraceMap = dynamic(() => import("@/components/Map"), {
  ssr: false, // désactive le rendu côté serveur pour Leaflet
});

export default function Home() {
  // Typage TS du state positions
  const [positions, setPositions] = useState<[number, number][]>([]);
  const [paceStr, setPaceStr] = useState("5:00");

  return (
    <div className="min-h-screen font-sans dark:bg-black px-4 lg:px-8">
      <main className="w-full mx-auto py-8 flex flex-col gap-8">

        <div className="flex flex-col md:flex-row space-x-4 gap-4 md:items-start">
          <div className="md:w-2/3 lg:w-4/5"><TraceMap positions={positions} setPositions={setPositions} /></div>

        {/* Section formulaire + stats */}
        <div className="flex flex-col justify-center space-x-8 md:w-1/3 lg:w-1/5">
          <RunStatsCard points={positions} paceStr={paceStr} />

          <GPXExporter
            points={positions}
            paceStr={paceStr}
            setPaceStr={setPaceStr}
            setPositions={setPositions} // fonctionne correctement maintenant
          />
        </div>
        </div>

      </main>
    </div>
  );
}
