'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, useMapEvents } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { Marker } from "react-leaflet";

 const markerIcon = new L.Icon({
            iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            });

export default function Map() {
  const [positions, setPositions] = useState<[number, number][]>([]);

   

  const position = [43.6, 7.0]
  // Sous-composant pour gérer les clics sur la carte
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPositions((prev) => [...prev, [lat, lng]]);
      },
    });
    return null;
  }

  return (
    <div style={{ height: '600px', width: '1200px' }}>
      <MapContainer
        center={position} // par exemple : Côte d’Azur
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        {positions.length > 1 && <Polyline positions={positions} color="red" />}
        {positions.map((pos, i) => (
        <Marker key={i} position={pos} icon={markerIcon} />
        ))}
      </MapContainer>
    </div>
  );
}
