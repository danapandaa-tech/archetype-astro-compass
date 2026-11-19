import { ARCHETYPES } from "@/lib/archetypes";

// Weekday planets evoke the corresponding sign in the author’s cast.
export const DAILY_RULERS = [
  { day: "Sunday", planet: "Sun", archetype: "creator", symbol: "☉" },
  { day: "Monday", planet: "Moon", archetype: "guardian", symbol: "☽" },
  { day: "Tuesday", planet: "Mars", archetype: "pioneer", symbol: "♂" },
  { day: "Wednesday", planet: "Mercury", archetype: "translator", symbol: "☿" },
  { day: "Thursday", planet: "Jupiter", archetype: "seeker", symbol: "♃" },
  { day: "Friday", planet: "Venus", archetype: "harmonizer", symbol: "♀" },
  { day: "Saturday", planet: "Saturn", archetype: "architect", symbol: "♄" },
] as const;

export function dailyRuler(instant: Date, utcOffsetMinutes: number) {
  if (!Number.isFinite(instant.getTime()) || !Number.isFinite(utcOffsetMinutes)) throw new Error("Invalid day");
  const civil = new Date(instant.getTime() + utcOffsetMinutes * 60000);
  return { ...(DAILY_RULERS[civil.getUTCDay()] ?? DAILY_RULERS[0]), date: civil.toISOString().slice(0, 10) };
}

export function drawArchetype(random: number) {
  if (!Number.isFinite(random) || random < 0 || random >= 1) throw new Error("Invalid draw");
  return ARCHETYPES[Math.floor(random * ARCHETYPES.length)] ?? ARCHETYPES[0];
}

export const REFLECTIONS: Record<string, { morning: string; evening: string; voice: string; practice: string }> = Object.fromEntries(ARCHETYPES.map(a => [a.id, {
  morning: `Where can I embody this gift today: ${a.gift.toLowerCase()}?`,
  evening: `When did I recognise ${a.shadow.toLowerCase()}? How could I meet the developmental task tomorrow: ${a.developmentalTask.toLowerCase()}?`,
  voice: `Let me bring ${a.gift.toLowerCase()} into this moment.`,
  practice: a.developmentalTask,
}]));

export const CLASSIC_PAIRS = [
  { first: "pioneer", second: "harmonizer", axis: "Aries ↔ Libra", theme: "Initiative & relationship" },
  { first: "creator", second: "visionary", axis: "Leo ↔ Aquarius", theme: "Expression & collective possibility" },
  { first: "anchor", second: "transformer", axis: "Taurus ↔ Scorpio", theme: "Stability & transformation" },
] as const;

export function polarityReading(firstId: string, secondId: string) {
  const first = ARCHETYPES.find(a => a.id === firstId);
  const second = ARCHETYPES.find(a => a.id === secondId);
  if (!first || !second || firstId === secondId) return null;
  const a = REFLECTIONS[firstId];
  const b = REFLECTIONS[secondId];
  if (!a || !b) return null;
  const [left, right] = [first, second].sort((a, b) => a.id.localeCompare(b.id));
  if (!left || !right) return null;
  const phrase = (text: string) => text.replace(/[.!?]+$/, "").toLowerCase();
  return {
    first, second,
    tension: `${left.name} offers ${phrase(left.gift)}, while ${right.name} offers ${phrase(right.gift)}. The tension appears when either gift becomes the only acceptable priority. Notice a decision where making room for one seems to cost you the other.`,
    shadow: `When ${first.name} is denied, its shadow may return indirectly as ${first.shadow.toLowerCase()}. When ${second.name} is denied, watch for ${second.shadow.toLowerCase()}. These are possibilities to reflect on, not diagnoses: which response do you recognise under pressure?`,
    integration: `Make room for both through two small actions: ${a.practice} Then: ${b.practice} Let each have a voice before choosing; neither needs to run your whole day.`,
    firstVoice: a.voice, secondVoice: b.voice,
  };
}