"use client";
import { CrewMember, FlightDetails, Passenger } from "@/lib/data";

export default function DetailsPanel({
  details,
  passengers,
  crew,
}: {
  details: FlightDetails;
  passengers: Passenger[];
  crew: CrewMember[];
}) {
  return (
    <div className="space-y-4">
      {/* DETTAGLI VOLO */}
      <section>
        <h4 className="text-xl font-semibold mb-2">Dettagli volo</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-white/60">Numero</div>
            <div className="font-medium">{details.flightNumber}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-white/60">Data</div>
            <div className="font-medium">{details.date}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-white/60">Origine</div>
            <div className="font-medium">
              {details.origin.city} – {details.origin.airport}
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-white/60">Destinazione</div>
            <div className="font-medium">
              {details.destination.city} – {details.destination.airport}
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-white/60">Anomalia</div>
            <div className="font-medium">{details.incident.location}</div>
          </div>
        </div>
      </section>

      {/* PASSEGGERI */}
      <section>
        <h4 className="text-xl font-semibold mb-2">
          Passeggeri ({passengers.length})
        </h4>

        {/* Contenitore scrollabile con header sticky */}
        <div className="max-h-80 overflow-y-auto rounded-xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 sticky top-0 z-10">
              <tr>
                <th className="text-left p-2">Nome</th>
                <th className="text-left p-2">Età</th>
                <th className="text-left p-2">Naz.</th>
                <th className="text-left p-2">Posto</th>
              </tr>
            </thead>
            <tbody>
              {passengers.map((p, i) => (
                <tr
                  key={i}
                  className="border-t border-white/10 focus:bg-transparent focus:outline-none"
                  tabIndex={-1} // evita focus automatico
                >
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.age}</td>
                  <td className="px-4 py-2">{p.nat}</td>
                  <td className="px-4 py-2 font-bold">{p.seat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* EQUIPAGGIO */}
      <section>
        <h4 className="text-xl font-semibold mb-2">Equipaggio ({crew.length})</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {crew.map((c, i) => (
            <li
              key={i}
              className="bg-white/5 rounded-xl p-3 flex items-center justify-between"
            >
              <span>
                {c.name} — {c.age} — {c.nat}
              </span>
              <span className="px-2 py-1 rounded-lg bg-white/10">{c.role}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}


