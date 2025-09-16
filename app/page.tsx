"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [flight, setFlight] = useState("");
const [date, setDate]   = useState("");
const [delta, setDelta] = useState("");
  const router = useRouter();

  const go = () => {
    const p = new URLSearchParams({ fn: flight, date, delta });
    router.push(`/map?${p.toString()}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Intercettazione Aerea Vepu Foundation</h1>
          <p className="text-white/60 mt-3 max-w-prose">Dossier investigativo interattivo su un incidente aereo. Inserisci i parametri del volo per proseguire.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm text-gray-200 tracking-wide">Numero del volo</label>
            <input value={flight} onChange={(e) => setFlight(e.target.value)} className="bg-black/40 border border-white/20 rounded-xl px-3 py-2 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="" autoComplete="off" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm text-gray-200 tracking-wide">Data</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} className="bg-black/40 border border-white/20 rounded-xl px-3 py-2 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="" autoComplete="off" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm text-gray-200 tracking-wide">/∆</label>
            <input value={delta} onChange={(e) => setDelta(e.target.value)} className="bg-black/40 border border-white/20 rounded-xl px-3 py-2 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="" autoComplete="off" />
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button onClick={go} className="px-5 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 font-semibold shadow-lg shadow-cyan-600/30">cerca</button>
        </div>
      </div>
    </main>
  );
}
