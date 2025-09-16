"use client";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import Modal from "./Modal";
import DetailsPanel from "./DetailsPanel";
import type { CrewMember, FlightDetails, Passenger } from "@/lib/data";
import type { Icon } from "leaflet";

 // solo tipo, ok per SSR

// react-leaflet (client only)
const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer    = dynamic(() => import("react-leaflet").then(m => m.TileLayer),    { ssr: false });
const Polyline     = dynamic(() => import("react-leaflet").then(m => m.Polyline),     { ssr: false });
const Marker       = dynamic(() => import("react-leaflet").then(m => m.Marker),       { ssr: false });
const Popup        = dynamic(() => import("react-leaflet").then(m => m.Popup),        { ssr: false });
const CircleMarker = dynamic(() => import("react-leaflet").then(m => m.CircleMarker), { ssr: false });

// Coordinate
const LHR: [number, number] = [51.47, -0.4543];
const KIN: [number, number] = [17.935, -76.7875];
const CEPRANO: [number, number] = [41.521736, 13.487096];
const TRIANGLE = {
  miami: [25.7617, -80.1918] as [number, number],
  sanJuan: [18.4655, -66.1057] as [number, number],
  bermuda: [32.3078, -64.7505] as [number, number],
};

export default function MapView() {
  // leaflet client-only, niente "any"
  const [leafletReady, setLeafletReady] = useState(false);
const [planeIcon, setPlaneIcon] = useState<Icon | null>(null);


  useEffect(() => {
    let mounted = true;
    (async () => {
      const L = await import("leaflet");
      if (!mounted) return;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    const ic = new L.Icon({
  iconUrl: "/plane-icon.png",
  iconSize: [32, 32],
});
setPlaneIcon(ic as unknown as Icon);

    })();
    return () => { mounted = false; };
  }, []);

  const center = useMemo(() => [35, -20] as [number, number], []);
  const straight = useMemo(() => [LHR, KIN] as [typeof LHR, typeof KIN], []);
  const diverted = useMemo(
    () => [LHR, TRIANGLE.bermuda, CEPRANO] as [typeof LHR, typeof TRIANGLE.bermuda, typeof CEPRANO],
    []
  );

  // modali + dati protetti
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [details, setDetails] = useState<FlightDetails | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);

  const handleUnlock = async () => {
    setPwdError("");
    try {
      const r = await fetch("/api/flight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd.trim() }),
      });
      if (!r.ok) throw new Error("bad");
      const json = await r.json();
      setUnlocked(true);
      setDetails(json.details);
      setPassengers(json.passengers);
      setCrew(json.crew);
      setPwd("");
    } catch {
      setUnlocked(false);
      setPwdError("Password errata");
    }
  };

  // deterrenti anti-inspect
  useEffect(() => {
    const onCtx = (e: MouseEvent) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (k === "F12" || (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(k)) || (e.ctrlKey && k === "U")) {
        e.preventDefault(); e.stopPropagation();
      }
    };
    window.addEventListener("contextmenu", onCtx);
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("contextmenu", onCtx);
      window.removeEventListener("keydown", onKey, true);
    };
  }, []);

  return (
    <section className="h-[calc(100vh-0px)] w-full relative">
      {leafletReady && (
        <MapContainer center={center} zoom={3} className="h-full w-full z-0" worldCopyJump>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

          {/* rotta prevista (LHR -> KIN) */}
          <Polyline positions={straight} pathOptions={{ color: "#22d3ee", weight: 3, dashArray: "5 6" }} />

          {/* deviazione (LHR -> Bermuda -> Ceprano) */}
          <Polyline positions={diverted} pathOptions={{ color: "#f472b6", weight: 4 }} />

          {/* triangolo delle Bermuda */}
          <Polyline
            positions={[TRIANGLE.miami, TRIANGLE.sanJuan, TRIANGLE.bermuda, TRIANGLE.miami]}
            pathOptions={{ color: "#fbbf24", weight: 2, dashArray: "6 8", opacity: 0.6 }}
          />

          <Marker position={LHR}><Popup>Partenza: London Heathrow (LHR)</Popup></Marker>
          <Marker position={KIN}><Popup>Destinazione prevista: Kingston (KIN), Giamaica</Popup></Marker>

          <Marker position={CEPRANO} icon={planeIcon ?? undefined}>
            <Popup>
              <div className="space-y-1">
                <div className="font-semibold">Luogo dell&apos;incidente</div>
                <div className="text-sm text-zinc-300">
                  Si prega di recarsi sul posto per ulteriori analisi da portare in laboratorio.
                </div>
                <div className="text-xs opacity-70 mt-1">{CEPRANO[0]}, {CEPRANO[1]}</div>
              </div>
            </Popup>
          </Marker>

          <CircleMarker center={TRIANGLE.bermuda} radius={6} pathOptions={{ color: "#ef4444", fillOpacity: 0.5 }} />
        </MapContainer>
      )}

      {/* Back & Dettagli */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <Link
  href="/"
  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20"
>
  ← Indietro
</Link>

      </div>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDetailsOpen(true)}
          className="px-4 py-2 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-500 font-semibold shadow-lg shadow-fuchsia-600/30"
        >
          dettagli volo
        </button>
      </div>

      {/* Modale protetta */}
      <Modal open={detailsOpen} onClose={() => setDetailsOpen(false)} title="Area protetta">
        {!unlocked ? (
          <div className="max-w-md">
            <p className="text-white/80 mb-4">
              Questa sezione è protetta. Inserire la password per sbloccare i dettagli e la lista passeggeri.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="bg-black/40 border border-white/20 rounded-xl px-3 py-2 text-white w-full"
                placeholder=""
                autoComplete="off"
              />
              <button
                onClick={handleUnlock}
                disabled={!pwd.trim()}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-semibold disabled:opacity-50"
              >
                Sblocca
              </button>
            </div>
            {pwdError && <p className="text-red-400 text-sm mt-2">{pwdError}</p>}
            <p className="text-xs text-white/50 mt-4">Nota: i dati arrivano dal server solo dopo verifica password.</p>
          </div>
        ) : (
          <DetailsPanel details={details!} passengers={passengers} crew={crew} />
        )}
      </Modal>
    </section>
  );
}
