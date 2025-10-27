'use client';

import React, { useState, ChangeEvent, useEffect } from "react";
import Input from "../components/Input";
import Button from "./Button";
import { useTranslations } from "next-intl";
import { generateGPX } from "@/utils/gpx";
import { getLocalDateTime, toLocalDateTime } from "@/utils/date";
import { downloadFile } from "@/utils/download";

export type LatLng = [number, number];
export type GPXError = "NO_POINTS" | "INVALID_PACE" | "NO_TRACK_NAME" | "DATE_EXCEEDS_NOW" | null;

interface GPXExporterProps {
  points: LatLng[];
  paceStr: string;
  setPaceStr: React.Dispatch<React.SetStateAction<string>>;
  setPositions: React.Dispatch<React.SetStateAction<LatLng[]>>;
  duration: number; // en secondes
}

/** marge de sécurité en ms pour éviter rebonds */
const SAFETY_MARGIN_MS = 30 * 1000; // 30 secondes

export default function GPXExporter({
  points,
  paceStr,
  setPaceStr,
  setPositions,
  duration
}: GPXExporterProps) {
  const t = useTranslations("gpxexporter");

  const [trackName, setTrackName] = useState<string>(t("my_trace"));
  const [startTime, setStartTime] = useState<string>(getLocalDateTime());
  const [error, setError] = useState<GPXError>(null);
  const [resetKey, setResetKey] = useState<number>(0);

  // clear error automatically
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // ajuste automatiquement startTime en temps réel si ça dépasse maintenant
useEffect(() => {
  if (duration <= 0) return;

  const now = Date.now();
  const durationMs = duration * 1000;
  const startTimestamp = new Date(startTime).getTime();

  if (startTimestamp + durationMs > now - SAFETY_MARGIN_MS) {
    const adjustedStartTime = new Date(now - durationMs - SAFETY_MARGIN_MS);
    const adjustedStr = toLocalDateTime(adjustedStartTime);
    if (adjustedStr !== startTime) {
      setStartTime(adjustedStr);
    }
  }
}, [duration, startTime]);

  const clearPositions = (): void => {
    setPositions([]);
    setError(null);
    setTrackName("");
    setStartTime(getLocalDateTime());
    setPaceStr("");
    setResetKey(prev => prev + 1);
  };

  const validatePace = (): boolean => {
    if (!/^(\d+:\d+)$/.test(paceStr)) {
      setError("INVALID_PACE");
      return false;
    }
    return true;
  };

  const downloadGPXHandler = (): void => {
    if (!points || points.length === 0) { setError("NO_POINTS"); return; }
    if (!trackName.trim()) { setError("NO_TRACK_NAME"); return; }
    if (!validatePace()) return;

    const gpxContent = generateGPX(trackName, points, paceStr, new Date(startTime).toISOString());
    const filename = trackName.toLowerCase().endsWith(".gpx") ? trackName : `${trackName}.gpx`;
    downloadFile(gpxContent, filename);
    clearPositions();
  };

  const errorMessage = (): string => {
    switch (error) {
      case "NO_POINTS": return t("error_no_points");
      case "INVALID_PACE": return t("error_invalid_pace");
      case "NO_TRACK_NAME": return t("error_no_track_name");
      case "DATE_EXCEEDS_NOW": return t("error_date_exceeds_now");
      default: return "";
    }
  };

  return (
    <div className="flex justify-center p-3">
      <div className="w-full max-w-[1200px] flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-semibold">{t("route")}</span>
          <Input
            key={`track-${resetKey}`}
            value={trackName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTrackName(e.target.value)}
            className="transition-all duration-300"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">{t("start_date")}</span>
          <Input
            key={`start-${resetKey}`}
            type="datetime-local"
            value={startTime}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
            className="transition-all duration-300 cursor-pointer"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">{t("average_pace")}</span>
          <Input
            key={`pace-${resetKey}`}
            type="text"
            value={paceStr}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPaceStr(e.target.value)}
            placeholder="5:00"
            className="transition-all duration-300"
          />
        </label>

        <div className="flex md:flex-col justify-between md:space-y-2">
          <Button
            onClick={downloadGPXHandler}
            textColor="white"
            className="w-auto bg-strava font-semibold md:w-full"
          >
            {t("download_gpx")}
          </Button>

          <Button
            onClick={clearPositions}
            color="gray-100"
            textColor="gray-800"
            className="font-semibold w-auto md:w-full"
          >
            {t("clear_button")}
          </Button>
        </div>

        {error ? (
          <p className="text-red-600 text-sm h-5 -mt-2">{errorMessage()}</p>
        ) : (
          <p className="h-5 -mt-2" />
        )}
      </div>
    </div>
  );
}
