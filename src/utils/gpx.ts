// utils/gpx.ts
import { v4 as uuidv4 } from "uuid";

// Parse "mm:ss" into decimal minutes
export const parsePace = (paceStr: string): number => {
  const [min, sec = 0] = paceStr.split(":").map(Number);
  return min + sec / 60;
};

// Calculate distance between two points (Haversine)
export const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat/2)**2 +
    Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Generate GPX content
export const generateGPX = (
  name: string,
  points: [number, number][],
  paceStr: string,
  startTime: string
): string => {
  if (!points.length) return "";

  const paceMin = parsePace(paceStr);
  const start = new Date(startTime);
  let totalTimeSec = 0;

  const pointsXml = points.map(([lat, lng], i, arr) => {
    if (i > 0) {
      const [prevLat, prevLng] = arr[i-1];
      totalTimeSec += getDistance(prevLat, prevLng, lat, lng) * paceMin * 60;
    }
    const timestamp = new Date(start.getTime() + totalTimeSec*1000).toISOString();
    return `<trkpt lat="${lat}" lon="${lng}"><time>${timestamp}</time></trkpt>`;
  }).join("");

  // Add a unique suffix to the track name to avoid Strava conflicts
  const uniqueName = `${name} - ${uuidv4()}`;

  return `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<gpx version="1.1" creator="TraceGPX"
 xmlns="http://www.topografix.com/GPX/1/1"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://www.topografix.com/GPX/1/1 
                     http://www.topografix.com/GPX/1/1/gpx.xsd">
<trk>
  <name>${uniqueName}</name>
  <trkseg>${pointsXml}</trkseg>
</trk>
</gpx>`;
};
