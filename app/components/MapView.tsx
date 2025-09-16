"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Carichiamo i componenti di react-leaflet SOLO sul client
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);

export default function MapView() {
  // piccolo guard per essere sicuri di essere lato client
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
        whenReady={(e) => {
          setTimeout(() => {
            try {
              e.target.invalidateSize();
            } catch {}
          }, 50);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}
