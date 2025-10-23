'use client';
import { useState } from "react";
import Input from "../components/Input";
import Button from "./Button";

export default function GPXExporter({ points, paceStr, setPaceStr, setPositions }) {
  const [trackName, setTrackName] = useState("Mon tracé");
  const [startTime, setStartTime] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const clearPositions = () => setPositions([]);

  // Parse "mm:ss" en minutes décimales
  const parsePace = (paceStr) => {
    const parts = paceStr.split(":").map(Number);
    if (parts.length === 1) return parts[0];
    return parts[0] + parts[1] / 60;
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const generateGPX = (name, points, paceStr) => {
    if (!points || points.length === 0) return "";
    const paceMin = parsePace(paceStr);

    const header = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<gpx version="1.1" creator="MonApp"
     xmlns="http://www.topografix.com/GPX/1/1"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.topografix.com/GPX/1/1 
                         http://www.topografix.com/GPX/1/1/gpx.xsd">
  <trk>
    <name>${name}</name>
    <trkseg>`;

    const start = new Date(startTime);
    let totalTimeSec = 0;

    const pointsXml = points
      .map(([lat, lng], i, arr) => {
        if (i > 0) {
          const [prevLat, prevLng] = arr[i - 1];
          const distKm = getDistance(prevLat, prevLng, lat, lng);
          totalTimeSec += distKm * paceMin * 60;
        }
        const timestamp = new Date(start.getTime() + totalTimeSec * 1000).toISOString();
        return `<trkpt lat="${lat}" lon="${lng}">
  <time>${timestamp}</time>
</trkpt>`;
      })
      .join("");

    const footer = `
    </trkseg>
  </trk>
</gpx>`;

    return header + pointsXml + footer;
  };

  const downloadGPX = () => {
    if (!points || points.length === 0) {
      alert("Aucun point à exporter !");
      return;
    }
    const gpxContent = generateGPX(trackName, points, paceStr);
    
    const blob = new Blob([gpxContent], { type: "application/gpx+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${trackName.replace(/\s/g, "_")}.gpx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-center p-3">
      <div className="w-full max-w-[1200px] flex flex-col gap-4  ">

        <label className="flex flex-col gap-1 ">
          <span className="font-semibold">Nom du parcours</span>
           <Input
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
        />
        </label>

       

        <label className="flex flex-col gap-1">
          <span className="font-semibold">Date et heure de début :</span>
          <Input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1">
        <span className="font-semibold">Allure moyenne (min/km)</span>
          <Input
            type="text"
            value={paceStr}
            onChange={(e) => setPaceStr(e.target.value)} 
          />
        </label>

        <div className="flex justify-between space-x-12 mt-2">
            <Button
          onClick={downloadGPX}
          className="bg-blue-400! font-semibold!"
        >
          Télécharger GPX
        </Button>

        <Button
          onClick={clearPositions}
          className="bg-gray-100! text-gray-800! font-semibold!"
        >
          Effacer le parcours
        </Button>
        </div>
      </div>
    </div>
  );
}
