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
import { useTranslations } from 'next-intl';

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
  const defaultCenter: [number, number] = [48.8566, 2.3522];
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
  const t = useTranslations('map');

  return (
    <div className="w-full mx-auto relative">
  {/* Carte Leaflet */}
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

  {/* Barre + bouton pour desktop */}
  <div className="hidden md:flex absolute top-2 left-1/2 -translate-x-1/2 gap-2 items-center z-[900]">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={t('search') + '...'}
      className="w-80 px-4 py-2 rounded-xl bg-white border border-gray-300 shadow-sm text-sm focus:outline-none"
    />
    <button
      onClick={removeLastPosition}
      className="bg-white rounded-full p-2 shadow hover:bg-gray-100 cursor-pointer"
      title="Supprimer dernier marker"
    >
      <ArrowUturnLeftIcon className="w-5 h-5 text-gray-700" />
    </button>
  </div>

  {/* Barre + bouton pour mobile */}
  <div className="flex md:hidden flex-row gap-2 mt-2 items-center">
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder={t('search') + '...'}
    className="flex-1 px-4 py-2 rounded-xl bg-white border border-gray-300 shadow-sm text-sm focus:outline-none"
  />
  <button
    onClick={removeLastPosition}
    className="bg-white rounded-full p-2 shadow hover:bg-gray-100 cursor-pointer"
    title="Supprimer dernier marker"
  >
    <ArrowUturnLeftIcon className="w-5 h-5 text-gray-700" />
  </button>
</div>
</div>
  );
}
