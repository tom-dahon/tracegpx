'use client';
import React, { useMemo } from "react";

// Fonction utilitaire pour calculer la distance entre 2 points en km
function getDistance(lat1, lon1, lat2, lon2) {
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
}

// Parse "mm:ss" en minutes décimales
function parsePace(paceStr) {
  const parts = paceStr.split(":").map(Number);
  if (parts.length === 1) return parts[0];
  return parts[0] + parts[1] / 60;
}

// Format hh:mm:ss
function formatDuration(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
}

export default function RunStatsCard({ points, paceStr }) {
  const stats = useMemo(() => {
    if (!points || points.length < 2) return { distance: 0, duration: 0, elevation: 0 };

    let distance = 0;
    let elevation = 0;

    for (let i = 1; i < points.length; i++) {
      const [lat1, lon1, ele1] = points[i - 1];
      const [lat2, lon2, ele2] = points[i];
      distance += getDistance(lat1, lon1, lat2, lon2);
      if (ele1 != null && ele2 != null) {
        const gain = ele2 - ele1;
        if (gain > 0) elevation += gain;
      }
    }

    const paceMin = parsePace(paceStr);
    const durationSec = distance * paceMin * 60;

    return { distance, duration: durationSec, elevation };
  }, [points, paceStr]);

  return (
    <div className="p-3 -mt-2 w-full max-w-sm">
      <h2 className="font-bold text-lg mb-2">Run Stats</h2>
      <div className="flex justify-between">
        <span>Distance</span>
        <span>{stats.distance.toFixed(2)} km</span>
      </div>
      <div className="flex justify-between">
        <span>Duration</span>
        <span>{formatDuration(stats.duration)}</span>
      </div>
      
    </div>
  );
}
