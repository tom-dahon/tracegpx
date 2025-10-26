'use client';

import React, { useState, ChangeEvent, useEffect } from "react";
import Input from "../components/Input";
import Button from "./Button";
import { useTranslations } from "next-intl";
import { generateGPX } from "@/utils/gpx";
import { getLocalDateTime } from "@/utils/date";
import { downloadFile } from "@/utils/download";

export type LatLng = [number, number];
export type GPXError = "NO_POINTS" | "INVALID_PACE" | "NO_TRACK_NAME" | null;

interface GPXExporterProps {
  points: LatLng[];
  paceStr: string;
  setPaceStr: React.Dispatch<React.SetStateAction<string>>;
  setPositions: React.Dispatch<React.SetStateAction<LatLng[]>>;
}

/**
 * GPXExporter component allows exporting a GPX file for the current route
 */
export default function GPXExporter({
  points,
  paceStr,
  setPaceStr,
  setPositions,
}: GPXExporterProps) {
  const t = useTranslations("gpxexporter");

  // Track name state
  const [trackName, setTrackName] = useState<string>(t("my_trace"));
  // Start time state
  const [startTime, setStartTime] = useState<string>(getLocalDateTime());
  // Error state
  const [error, setError] = useState<GPXError>(null);
  // Key to force re-render for smooth reset animation
  const [resetKey, setResetKey] = useState<number>(0);

  // Automatically clear error after 4 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  /** Clears all points and resets all states */
  const clearPositions = (): void => {
    setPositions([]);
    setError(null);
    setTrackName("");
    setStartTime(getLocalDateTime());
    setPaceStr("");
    setResetKey(prev => prev + 1); // force re-render for animation
  };

  /** Validate pace string format mm:ss */
  const validatePace = (): boolean => {
    if (!/^(\d+:\d+)$/.test(paceStr)) {
      setError("INVALID_PACE");
      return false;
    }
    return true;
  };

  /** Download GPX file */
  const downloadGPX = (): void => {
  if (!points || points.length === 0) {
    setError("NO_POINTS");
    return;
  }

  if (!trackName.trim()) {
    setError("NO_TRACK_NAME");
    return;
  }

  if (!validatePace()) return;

  const gpxContent = generateGPX(trackName, points, paceStr, startTime);

  const filename = trackName.toLowerCase().endsWith(".gpx")
    ? trackName
    : `${trackName}.gpx`;

  downloadFile(gpxContent, filename);

  clearPositions();
};


  /** Return localized error message */
  const errorMessage = (): string => {
    switch (error) {
      case "NO_POINTS": return t("error_no_points");
      case "INVALID_PACE": return t("error_invalid_pace");
      case "NO_TRACK_NAME": return t("error_no_track_name");
      default: return "";
    }
  };

  return (
    <div className="flex justify-center p-3">
      <div className="w-full max-w-[1200px] flex flex-col gap-4">

        {/* Track name input */}
        <label htmlFor="trackName" className="flex flex-col gap-1">
          <span className="font-semibold">{t("route")}</span>
          <Input
            key={`track-${resetKey}`} // force re-render for smooth reset
            value={trackName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTrackName(e.target.value)}
            className="transition-all duration-300"
          />
        </label>

        {/* Start date and time input */}
        <label htmlFor="startTime" className="flex flex-col gap-1">
          <span className="font-semibold">{t("start_date")}</span>
          <Input
            key={`start-${resetKey}`} // force re-render for smooth reset
            type="datetime-local"
            value={startTime}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
            className="transition-all duration-300 cursor-pointer"
          />
        </label>

        {/* Average pace input */}
        <label className="flex flex-col gap-1">
          <span className="font-semibold">{t("average_pace")}</span>
          <Input
            key={`pace-${resetKey}`} // force re-render for smooth reset
            type="text"
            value={paceStr}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPaceStr(e.target.value)}
            className="transition-all duration-300"
            placeholder="5:00"
          />
        </label>

        {/* Error message */}
        {error ? (
          <p className="text-red-600 text-sm h-3 -mt-2">{errorMessage()}</p>
        ) : (
          <p className="h-3 -mt-2" />
        )}

        {/* Action buttons */}
        <div className="flex md:flex-col justify-between md:space-y-2">
          <Button
            onClick={downloadGPX}
            color="strava"
            textColor="white"
            className="w-auto font-semibold md:w-full"
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
      </div>
    </div>
  );
}
