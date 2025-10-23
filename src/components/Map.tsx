'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Polyline, useMapEvents, Marker } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import Button from './Button';

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map({ positions, setPositions }) {
  const defaultCenter = [43.6, 7.0];

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPositions(prev => [...prev, [lat, lng]]);
      },
    });
    return null;
  }

  const clearPositions = () => setPositions([]);

  return (
<div className="w-full max-w-[1200px] mx-auto  relative">
  {/* Bouton Effacer */}
  <Button
    onClick={clearPositions}
    style={{
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 1000,
    }}
    color="#ff4d4d"
  >
    Effacer le tracé
  </Button>

  <MapContainer
    center={defaultCenter}
    zoom={12}
    style={{ width: '100%', minHeight: '250px' }}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      detectRetina={true}
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
