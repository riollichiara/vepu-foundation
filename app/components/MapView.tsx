"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";

// Carico MapContainer e TileLayer solo lato client
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);

/** Forza il ricalcolo delle dimensioni dopo il mount */
function AutoResize() {
  const map = useMap();
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        map.invalidateSize();
      } catch {}
    }, 50);
    return () => clearTimeout(id);
  }, [map]);
  return null;
}

export default function MapView() {
  // piccolo guard: renderizza solo sul client
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[20, 0]}
        zoom={3}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
        worldCopyJump
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* forza il resize appena la mappa è pronta */}
        <AutoResize />
      </MapContainer>
    </div>
  );
}
