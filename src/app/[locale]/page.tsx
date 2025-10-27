'use client';

import { useState } from "react";
import dynamic from "next/dynamic";
import GPXExporter from "@/components/GPXExporter";
import RunStatsCard from "@/components/RunStatsCard";

// Dynamically import the map component (Leaflet cannot run on SSR)
const TraceMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

// ----------------------------
// Component
// ----------------------------
export default function HomePage() {
  // State: list of coordinates [latitude, longitude]
  const [positions, setPositions] = useState<[number, number][]>([]);

  // State: current pace in "min:sec/km" format
  const [paceStr, setPaceStr] = useState<string>("5:00");

  const [durationSec, setDurationSec] = useState(0);


  return (
    <main className="w-full px-4 lg:px-8 py-4 font-sans mx-auto flex flex-col gap-8">
      <section className="flex flex-col md:flex-row gap-4 md:items-start">
        
        {/* Map section */}
        <div className="md:w-2/3 lg:w-4/5">
          <TraceMap positions={positions} setPositions={setPositions} />
        </div>

        {/* Sidebar: statistics and export tools */}
        <aside className="flex flex-col justify-center gap-4 md:w-1/3 lg:w-1/5">
          <RunStatsCard points={positions} paceStr={paceStr} onDurationChange={setDurationSec} />
          <GPXExporter
            points={positions}
            paceStr={paceStr}
            setPaceStr={setPaceStr}
            setPositions={setPositions}
            duration={durationSec}
          />
        </aside>
      </section>
    </main>
  );
}
