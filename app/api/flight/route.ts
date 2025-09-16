import crypto from "crypto";
import { FLIGHT_DETAILS, PASSENGERS, CREW } from "@/lib/data";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { password } = await request.json();
  const hash = crypto.createHash("sha256").update(String(password || "")).digest("hex");

  if (hash !== process.env.FLIGHT_PWD_HASH) {
    return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({ ok: true, details: FLIGHT_DETAILS, passengers: PASSENGERS, crew: CREW }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
