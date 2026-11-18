import { ARCHETYPES } from "@/lib/archetypes";

// This ritual uses its own editorial mapping, not the birth scanner's sign map.
export const DAILY_RULERS = [
  { day: "Sunday", planet: "Sun", archetype: "hero", symbol: "☉" },
  { day: "Monday", planet: "Moon", archetype: "orphan", symbol: "☽" },
  { day: "Tuesday", planet: "Mars", archetype: "innocent", symbol: "♂" },
  { day: "Wednesday", planet: "Mercury", archetype: "jester", symbol: "☿" },
  { day: "Thursday", planet: "Jupiter", archetype: "explorer", symbol: "♃" },
  { day: "Friday", planet: "Venus", archetype: "lover", symbol: "♀" },
  { day: "Saturday", planet: "Saturn", archetype: "sage", symbol: "♄" },
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

export const REFLECTIONS: Record<string, { morning: string; evening: string; voice: string; practice: string }> = {
  innocent: { morning: "Where can I begin with hope today without ignoring what needs care?", evening: "When did openness help me today? What truth did I avoid, and how could I meet it kindly tomorrow?", voice: "I need room to trust and begin again, even when the outcome is uncertain.", practice: "Take one small first step, and name one real risk before you take it." },
  orphan: { morning: "Who or what already offers me belonging? How can I receive that support today?", evening: "Where did I feel outside the circle? Did I ask for connection, or wait for someone to guess?", voice: "I need to belong without having to hide my vulnerability.", practice: "Ask someone you trust for one specific form of support." },
  hero: { morning: "What deserves my courage today, and what does not need to become a battle?", evening: "Where did I act bravely? Where did proving myself get in the way of listening?", voice: "I need to act with courage and know my effort serves something worthwhile.", practice: "Meet one difficult task directly, then leave space for another person’s approach." },
  caregiver: { morning: "How can I offer care today while keeping one promise to myself?", evening: "Which act of care felt freely given? Where did I hope being useful would earn me love?", voice: "I need to care and be cared for, not only to be needed.", practice: "Offer help with a clear limit, and give yourself the same kindness." },
  explorer: { morning: "What unfamiliar perspective could widen my world without making me abandon what matters?", evening: "What did I discover today? Was I moving toward something meaningful, or away from discomfort?", voice: "I need freedom to discover what is true for me through experience.", practice: "Try one unfamiliar route or idea, then return to a commitment you value." },
  rebel: { morning: "Which rule deserves a question today? What better possibility can I offer alongside my no?", evening: "Where did I challenge something honestly? Did I build a possibility or only express opposition?", voice: "I need to question what no longer serves us and make room for change.", practice: "Challenge one unhelpful convention and propose a workable alternative." },
  lover: { morning: "What can I meet with warmth today while staying truthful about my own needs?", evening: "Where did closeness feel mutual? When did I trade an honest no for temporary harmony?", voice: "I need intimacy and beauty without losing the shape of myself.", practice: "Express affection and one honest preference in the same conversation." },
  creator: { morning: "What small, imperfect expression wants a place in the real world today?", evening: "What did I bring into form? What did perfectionism persuade me to postpone?", voice: "I need to give imagination a real form, even before it feels perfect.", practice: "Make a rough version of something and stop before polishing away its life." },
  jester: { morning: "Where could honest play loosen tension today without making someone’s feelings smaller?", evening: "What brought genuine joy? When did a joke keep me from saying something real?", voice: "I need room for play, surprise, and truths that certainty can miss.", practice: "Make room for play, then say the serious thing without hiding it in a joke." },
  sage: { morning: "Which piece of wisdom can I live today rather than simply explain?", evening: "What did experience teach me that theory could not? Where did certainty close a conversation?", voice: "I need understanding that stays curious and becomes lived wisdom.", practice: "Ask a sincere question, then act on one thing you already know." },
  magician: { morning: "What is ready to change in me, rather than in someone I wish I could control?", evening: "Where did I allow a real shift? Where did I try to manage another person’s response?", voice: "I need space for deep change without turning people into instruments.", practice: "Change one of your own habits before asking anyone else to change." },
  ruler: { morning: "What can I make steadier today, and where could loosening control allow growth?", evening: "What did I build or protect? When did structure serve life, and when did it restrict it?", voice: "I need trustworthy structure that supports life rather than contains it.", practice: "Create one clear agreement and leave the method open to collaboration." },
};

export const CLASSIC_PAIRS = [
  { first: "innocent", second: "lover", axis: "Aries ↔ Libra", theme: "Self & relationship" },
  { first: "hero", second: "rebel", axis: "Leo ↔ Aquarius", theme: "Personal courage & collective change" },
  { first: "ruler", second: "magician", axis: "Taurus ↔ Scorpio", theme: "Stability & transformation" },
] as const;

const CLASSIC_READINGS: Record<string, { tension: string; shadow: string; integration: string }> = {
  "innocent:lover": {
    tension: "The Innocent wants to begin from an unguarded yes to life; the Lover wants to listen, negotiate, and preserve connection. A new impulse can feel like abandonment to the Lover, while endless accommodation can feel like a loss of vitality to the Innocent.",
    shadow: "Deny the Innocent and harmony can become self-erasure: no independent desire is allowed to disturb the bond. Deny the Lover and independence can become naïve disregard for the effect your choices have on others.",
    integration: "Name what you want before negotiating it. Then ask what the other person needs. Choose one small action that honours both an independent wish and a shared agreement; closeness need not cancel a beginning.",
  },
  "hero:rebel": {
    tension: "The Hero commits personal courage to a worthy task; the Rebel asks whether the task, the rules, and the definition of worth should change. One wants to rise to the challenge; the other wants to question who set it.",
    shadow: "Deny the Rebel and courage can defend a system that deserves to be questioned. Deny the Hero and critique can become a shelter from responsibility: everything is opposed, but nothing is undertaken.",
    integration: "Choose a change that matters beyond your own recognition. Question one rule, propose a better one, and take responsibility for a concrete first step. Let courage serve renewal rather than applause.",
  },
  "ruler:magician": {
    tension: "The Ruler wants dependable foundations; the Magician senses when those foundations need transformation. One protects continuity, while the other makes room for endings and unfamiliar possibilities.",
    shadow: "Deny the Magician and stability hardens into control, preserving what no longer gives life. Deny the Ruler and transformation becomes upheaval without support, or power exercised without accountability.",
    integration: "Identify one foundation to protect and one habit to release. Give an experiment a clear time, boundary, and review point. A trustworthy container can make deep change possible rather than prevent it.",
  },
};

export function polarityReading(firstId: string, secondId: string) {
  const first = ARCHETYPES.find(a => a.id === firstId);
  const second = ARCHETYPES.find(a => a.id === secondId);
  if (!first || !second || firstId === secondId) return null;
  const a = REFLECTIONS[firstId];
  const b = REFLECTIONS[secondId];
  if (!a || !b) return null;
  const classic = CLASSIC_READINGS[`${firstId}:${secondId}`] ?? CLASSIC_READINGS[`${secondId}:${firstId}`];
  return {
    first, second,
    tension: classic?.tension ?? `${first.name} reaches for ${first.desire.toLowerCase()}, while ${second.name} reaches for ${second.desire.toLowerCase()}. The tension appears when either need becomes the only acceptable priority. Notice a decision where making room for one seems to cost you the other.`,
    shadow: classic?.shadow ?? `When ${first.name} is denied, its need may return indirectly as ${first.shadow.toLowerCase()}. When ${second.name} is denied, watch for ${second.shadow.toLowerCase()}. These are possibilities to reflect on, not diagnoses: which response do you recognise under pressure?`,
    integration: classic?.integration ?? `Make room for both through two small actions: ${a.practice} Then: ${b.practice} Let each have a voice before choosing; neither needs to run your whole day.`,
    firstVoice: a.voice, secondVoice: b.voice,
  };
}