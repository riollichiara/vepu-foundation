"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [flight, setFlight] = useState("");
  const [date, setDate] = useState("");
  const [delta, setDelta] = useState("");
  const [error, setError] = useState("");

  // deterrenti minimi (come su mappa) — disattivabili con ?debug=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "1") return;
    const onCtx = (e: MouseEvent) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (k === "F12" || (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(k)) || (e.ctrlKey && k === "U")) {
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // non far partire la navigazione automatica
    setError("");

    const ok =
      flight.trim().toUpperCase() === "AB1108" &&
      date.trim() === "31-07-2011" &&
      delta.trim() === "234234";

    if (!ok) {
      setError("Parametri non corretti. Ricontrolla il numero volo, la data e il simbolo.");
      return;
    }

    router.push("/map");
  };

  const allFilled = flight.trim() !== "" && date.trim() !== "" && delta.trim() !== "";

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-black to-zinc-900 text-white">
      <section className="mx-auto max-w-5xl px-6 py-14">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Intercettazione Aerea Vepu Foundation
        </h1>
        <p className="mt-6 text-lg text-white/80 max-w-3xl">
          Dossier investigativo interattivo su un incidente aereo. Inserisci i parametri del volo per proseguire.
        </p>

        <form onSubmit={handleSearch} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Numero del volo</label>
            <input
              type="text"
              value={flight}
              onChange={(e) => setFlight(e.target.value)}
              className="rounded-xl bg-black/40 border border-white/15 px-4 py-3 focus:outline-none focus:border-cyan-500"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Data</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-xl bg-black/40 border border-white/15 px-4 py-3 focus:outline-none focus:border-cyan-500"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">/∆</label>
            <input
              type="text"
              value={delta}
              onChange={(e) => setDelta(e.target.value)}
              className="rounded-xl bg-black/40 border border-white/15 px-4 py-3 focus:outline-none focus:border-cyan-500"
              autoComplete="off"
            />
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={!allFilled}
              className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 font-semibold shadow-lg shadow-cyan-600/30 disabled:opacity-50"
            >
              cerca
            </button>
            {error && <p className="text-rose-400 mt-3">{error}</p>}
          </div>
        </form>
      </section>
    </main>
  );
}
