'use client';
import { getDistance, parsePace } from "@/utils/gpx";
import { useTranslations } from "next-intl";
import React, { useMemo, useEffect } from "react";

type Point = [number, number, number?];

interface RunStatsCardProps {
  points: Point[];
  paceStr: string;
  onDurationChange?: (durationSec: number) => void;
}

// Format hh:mm:ss
function formatDuration(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
}

export default function RunStatsCard({ points, paceStr, onDurationChange }: RunStatsCardProps) {
  const stats = useMemo(() => {
    if (!points || points.length < 2)
      return { distance: 0, duration: 0, elevation: 0 };

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

  // 🔹 Notifier le parent après le rendu
  useEffect(() => {
    if (onDurationChange) {
      onDurationChange(stats.duration);
    }
  }, [stats.duration, onDurationChange]);

  const t = useTranslations('runstats');

  return (
    <div className="p-3 -mt-2 w-full mx-auto">
      <h2 className="font-bold text-md mb-2">{t('title')}</h2>
      <div className="flex justify-between text-gray-500">
        <span>{t('distance')}</span>
        <span>{stats.distance.toFixed(2)} km</span>
      </div>
      <div className="flex justify-between text-gray-500">
        <span>{t('duration')}</span>
        <span>{formatDuration(stats.duration)}</span>
      </div>
      <div className="flex justify-between text-gray-500">
        <span>{t('altitude')}</span>
        <span>{stats.elevation.toFixed(0)} m</span>
      </div>
    </div>
  );
}
