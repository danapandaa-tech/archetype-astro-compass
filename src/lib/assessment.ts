import { ARCHETYPES, ARCHETYPE_KEYS } from "@/lib/archetypes";

export const CALLING_IDS = ARCHETYPE_KEYS;
export type CallingId = typeof CALLING_IDS[number];
export type AssessmentQuestion = { dimension: string; question: string; options: { archetype: CallingId; text: string }[] };

function options(texts: string[]) {
  return CALLING_IDS.map((archetype, i) => ({ archetype, text: texts[i] ?? "" }));
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  { dimension: "The crossroad · Fire & direction", question: "At this crossroad, what are you most hungry to bring into your life?", options: options(ARCHETYPES.map(a => a.gift)) },
  { dimension: "The threshold · Saturn & shadow", question: "Which challenge keeps asking for your attention?", options: options(ARCHETYPES.map(a => a.shadow)) },
  { dimension: "The inner weather · Moon & feeling", question: "Which quality would most support your emotional climate right now?", options: options(ARCHETYPES.map(a => a.gift)) },
  { dimension: "The unknown · Mutable skies", question: "When the next step is uncertain, what practice are you drawn toward?", options: options(ARCHETYPES.map(a => a.developmentalTask)) },
  { dimension: "The offering · Sun & expression", question: "What gift are you being asked to embody now?", options: options(ARCHETYPES.map(a => a.gift)) },
];

// Complementary sign axes offer a balancing invitation, not a diagnosis.
export const SHADOW_INVITATIONS: Record<CallingId, CallingId> = {
  pioneer: "harmonizer", anchor: "transformer", translator: "seeker", guardian: "architect", creator: "visionary", refiner: "mystic",
  harmonizer: "pioneer", transformer: "anchor", seeker: "translator", architect: "guardian", visionary: "creator", mystic: "refiner",
};

function isCallingId(value: unknown): value is CallingId {
  return typeof value === "string" && CALLING_IDS.some(id => id === value);
}

export function calculateCalling(answers: readonly string[]) {
  if (answers.length !== ASSESSMENT_QUESTIONS.length || !answers.every(isCallingId)) throw new Error("Answer all five questions with a valid choice.");
  const scores = Object.fromEntries(CALLING_IDS.map(id => [id, 0])) as Record<CallingId, number>;
  const lastChosen = Object.fromEntries(CALLING_IDS.map(id => [id, -1])) as Record<CallingId, number>;
  answers.forEach((value, i) => {
    if (!isCallingId(value)) return;
    scores[value] += 1;
    lastChosen[value] = i;
  });
  // Equal weight; ties favour the latest answer, starting with the embodied gift.
  const ranked = [...CALLING_IDS].sort((a, b) => scores[b] - scores[a] || lastChosen[b] - lastChosen[a]);
  const primaryId = ranked[0] ?? "pioneer";
  const runnerUp = ranked[1] ?? "harmonizer";
  const shadowId = scores[runnerUp] > 0 ? runnerUp : SHADOW_INVITATIONS[primaryId];
  const primary = ARCHETYPES.find(a => a.id === primaryId);
  const shadow = ARCHETYPES.find(a => a.id === shadowId);
  if (!primary || !shadow) throw new Error("Unknown archetype.");
  return {
    primary, shadow, scores, primaryScore: scores[primaryId],
    tied: scores[primaryId] === scores[runnerUp],
    shadowSource: scores[runnerUp] > 0 ? "secondary" as const : "balance" as const,
    invitation: `Notice when ${primary.name.toLowerCase()} slips into ${primary.shadow.toLowerCase()}. Invite ${shadow.name.toLowerCase()} to make room for ${shadow.gift.toLowerCase()}. Developmental task: ${shadow.developmentalTask}`,
  };
}

export type CallingResult = ReturnType<typeof calculateCalling>;