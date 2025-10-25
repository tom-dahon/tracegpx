'use client';

import { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Polyline,
  useMapEvents,
  Marker,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

interface MapProps {
  positions: [number, number][];
  setPositions: React.Dispatch<React.SetStateAction<[number, number][]>>;
}

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map({ positions, setPositions }: MapProps) {
  const defaultCenter: [number, number] = [43.6, 7.0];
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const mapRef = useRef<L.Map | null>(null);

  const removeLastPosition = () => {
  setPositions((prev) => prev.slice(0, -1));
};

  // Ajouter un marker sur clic
  function LocationMarker() {
    useMapEvents({
      click(e: L.LeafletMouseEvent) {
        const { lat, lng } = e.latlng;
        setPositions((prev) => [...prev, [lat, lng]]);
      },
    });
    return null;
  }

  // Récupération des suggestions d’adresses
  useEffect(() => {
    const controller = new AbortController();
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
            query
          )}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setSuggestions(data);
      } catch {
        // ignore abort
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const handleSelect = (item: any) => {
  const lat = parseFloat(item.lat);
  const lon = parseFloat(item.lon);

  setPositions([[lat, lon]]);
  setQuery(''); 
  setSuggestions([]); 

  if (mapRef.current) {
    mapRef.current.flyTo([lat, lon], 14, { duration: 1.5 });
  }
};

  const clearPositions = (): void => setPositions([]);

  return (
    <div className="w-full mx-auto relative">

      <button
  onClick={removeLastPosition}
  className="absolute top-2 right-3 z-[1000] bg-white  rounded-full p-2 shadow hover:bg-gray-100 cursor-pointer"
  title="Supprimer dernier marker"
>
  <ArrowUturnLeftIcon className="w-5 h-5 text-gray-700" />
</button>

      {/* 🔍 Barre de recherche */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[1000] w-80">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une adresse..."
          className="w-full px-4 py-2 rounded-xl bg-white border border-gray-300 shadow-sm text-sm focus:outline-none"
        />
        {suggestions.length > 0 && (
          <ul className="bg-white border border-gray-200 shadow-md rounded-b-xl max-h-48 overflow-y-auto text-sm">
            {suggestions.map((item, i) => (
              <li
                key={i}
                onClick={() => handleSelect(item)}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {item.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🗺️ Carte Leaflet */}
      <MapContainer
        center={defaultCenter}
        zoom={12}
        ref={mapRef}
        style={{
          width: '100%',
          minHeight: '250px',
          height: '35vh',
          borderRadius: '10px',
        }}
        className="md:h-[80vh]!"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
