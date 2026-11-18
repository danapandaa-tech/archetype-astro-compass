import { EclipticGeoMoon, SunPosition } from "astronomy-engine";

export const EXTENDED_READING_PRICE_GBP = 5;
export const FREE_READING_FEATURES = ["moon", "decan", "dayRuler", "lifePath"] as const;
export const SIGNS = [
  { key: "aries", archetype: "hero", glyph: "♈︎" },
  { key: "taurus", archetype: "ruler", glyph: "♉︎" },
  { key: "gemini", archetype: "jester", glyph: "♊︎" },
  { key: "cancer", archetype: "caregiver", glyph: "♋︎" },
  { key: "leo", archetype: "creator", glyph: "♌︎" },
  { key: "virgo", archetype: "sage", glyph: "♍︎" },
  { key: "libra", archetype: "lover", glyph: "♎︎" },
  { key: "scorpio", archetype: "magician", glyph: "♏︎" },
  { key: "sagittarius", archetype: "explorer", glyph: "♐︎" },
  { key: "capricorn", archetype: "ruler", glyph: "♑︎" },
  { key: "aquarius", archetype: "rebel", glyph: "♒︎" },
  { key: "pisces", archetype: "innocent", glyph: "♓︎" },
] as const;

export function lifePath(date: string): number {
  let total = date.replaceAll("-", "").split("").reduce((sum, digit) => sum + Number(digit), 0);
  while (total > 9) total = String(total).split("").reduce((sum, digit) => sum + Number(digit), 0);
  return total;
}

export function decanBlend(longitude: number) {
  const normalized = ((longitude % 360) + 360) % 360;
  const index = Math.floor(normalized / 30);
  const decan = Math.floor((normalized % 30) / 10);
  // Triplicity decans: successive signs of the same element, not adjacent signs.
  return { decan: decan + 1, sign: SIGNS[(index + decan * 4) % 12] ?? SIGNS[0] };
}

export function calculateProfile(dob: string, time = "", offset = 0) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) throw new Error("Invalid date");
  const civil = new Date(`${dob}T12:00:00Z`);
  if (!Number.isFinite(civil.getTime()) || civil.toISOString().slice(0, 10) !== dob) throw new Error("Invalid date");
  if (civil.getUTCFullYear() < 1900 || civil.getUTCFullYear() > new Date().getUTCFullYear() || civil.getTime() > Date.now() + 86400000) throw new Error("Invalid date");
  if (time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error("Invalid time");
  if (!Number.isFinite(offset) || offset < -12 || offset > 14) throw new Error("Invalid offset");
  const instant = new Date(new Date(`${dob}T${time || "12:00"}:00Z`).getTime() - offset * 3600000);
  const longitude = SunPosition(instant).elon;
  const moonLongitude = EclipticGeoMoon(instant).lon;
  return {
    sun: SIGNS[Math.floor(longitude / 30)] ?? SIGNS[0],
    moon: SIGNS[Math.floor(moonLongitude / 30)] ?? SIGNS[0],
    blend: decanBlend(longitude),
    dayIndex: civil.getUTCDay(),
    lifePath: lifePath(dob),
    timeKnown: Boolean(time),
  };
}

export type Profile = ReturnType<typeof calculateProfile>;