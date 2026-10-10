import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export const dynamic = "force-dynamic";

type LocationPayload = {
  latitude?: unknown;
  longitude?: unknown;
};

export async function POST(request: Request) {
  let payload: LocationPayload;

  try {
    payload = await request.json() as LocationPayload;
  } catch {
    return NextResponse.json({ error: "Invalid location data." }, { status: 400 });
  }

  const latitude = payload.latitude;
  const longitude = payload.longitude;

  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return NextResponse.json({ error: "Invalid location data." }, { status: 400 });
  }

  const url = new URL(`${env.geoApiBaseUrl.replace(/\/+$/, "")}/communes`);
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  url.searchParams.set("fields", "codeRegion,codeDepartement");
  url.searchParams.set("format", "json");

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Location lookup failed." }, { status: 502 });
    }

    const results = await response.json() as Array<{
      codeDepartement?: string;
      codeRegion?: string;
    }>;
    const commune = results[0];

    if (!commune?.codeRegion) {
      return NextResponse.json({ error: "No matching region." }, { status: 404 });
    }

    return NextResponse.json({
      departmentCode: commune.codeDepartement ?? null,
      regionCode: commune.codeRegion,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Location lookup failed." }, { status: 502 });
  }
}
