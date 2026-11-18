import { ARCHETYPES } from "@/lib/archetypes";

export const CALLING_IDS = ["innocent", "orphan", "hero", "caregiver", "explorer", "rebel", "lover", "creator", "jester", "sage", "magician", "ruler"] as const;
export type CallingId = typeof CALLING_IDS[number];
export type AssessmentQuestion = { dimension: string; question: string; options: { archetype: CallingId; text: string }[] };

function options(texts: string[]) {
  return CALLING_IDS.map((archetype, i) => ({ archetype, text: texts[i] ?? "" }));
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  { dimension: "The crossroad · Fire & desire", question: "At this crossroad, what are you most hungry for?", options: options([
    "A fresh beginning I can believe in.", "A place where I do not have to earn my belonging.", "The courage to meet a challenge that matters.", "A way to care that includes my own needs.", "Room to explore beyond the life I already know.", "Permission to question a rule that no longer fits.", "Closeness that feels mutual and honest.", "A real outlet for what I imagine.", "More play, lightness, and spontaneous joy.", "A clearer understanding of what is true.", "A deep change, not another surface adjustment.", "A steady foundation for what I want to build.",
  ]) },
  { dimension: "The threshold · Saturn & shadow", question: "Which challenge keeps asking for your attention?", options: options([
    "Seeing a hard truth without losing hope.", "Asking for support instead of expecting rejection.", "Acting without needing to prove or defeat anything.", "Saying no before helping turns into resentment.", "Staying present when I want to leave again.", "Building an alternative instead of only saying no.", "Staying myself when I want to keep the peace.", "Making something imperfect instead of postponing it.", "Saying the serious thing without hiding in humour.", "Living what I know instead of watching from a distance.", "Changing myself instead of managing others.", "Loosening control without abandoning responsibility.",
  ]) },
  { dimension: "The inner weather · Moon & feeling", question: "What best describes your emotional climate right now?", options: options([
    "Tender hope; I want to trust life again.", "A longing to be included and understood.", "A rising determination to meet the moment.", "Concern for others, with a need for replenishment.", "Restlessness and curiosity about what lies beyond.", "Frustration with limits that feel unfair or outdated.", "A heightened desire for intimacy and beauty.", "A full inner world waiting to become tangible.", "A need to breathe, laugh, and feel alive.", "Quiet questioning and a wish for clarity.", "An intense sense that something is ending or changing.", "A wish for steadiness amid too many moving parts.",
  ]) },
  { dimension: "The unknown · Mutable skies", question: "When the next step is uncertain, what do you tend to do?", options: options([
    "Look for a hopeful opening and try to begin.", "Reach for connection and a sense of shared ground.", "Find something concrete I can tackle.", "Make sure people are looked after.", "Explore another route or unfamiliar possibility.", "Question whether the existing rules still apply.", "Listen for what keeps relationships in balance.", "Imagine what might exist that does not yet.", "Play with possibilities and loosen the tension.", "Gather information and look for a deeper explanation.", "Look beneath the surface for what needs to shift.", "Create a plan, boundary, or reliable structure.",
  ]) },
  { dimension: "The offering · Sun & expression", question: "What gift are you being asked to embody now?", options: options([
    "Hope with open eyes.", "The courage to belong and receive support.", "Strength in service of something worthwhile.", "Generous care with clear boundaries.", "Freedom that brings me toward discovery, not escape.", "Change with a constructive vision.", "Love that makes room for honesty and selfhood.", "Imagination made real, however imperfectly.", "Joy that does not avoid the truth.", "Wisdom that becomes lived experience.", "Transformation with integrity.", "Leadership that supports growth rather than control.",
  ]) },
];

// An editorial balancing invitation, not an astrological opposition or diagnosis.
export const SHADOW_INVITATIONS: Record<CallingId, CallingId> = {
  innocent: "sage", orphan: "hero", hero: "caregiver", caregiver: "explorer",
  explorer: "ruler", rebel: "creator", lover: "rebel", creator: "ruler",
  jester: "sage", sage: "jester", magician: "innocent", ruler: "magician",
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
  const primaryId = ranked[0] ?? "innocent";
  const runnerUp = ranked[1] ?? "sage";
  const shadowId = scores[runnerUp] > 0 ? runnerUp : SHADOW_INVITATIONS[primaryId];
  const primary = ARCHETYPES.find(a => a.id === primaryId);
  const shadow = ARCHETYPES.find(a => a.id === shadowId);
  if (!primary || !shadow) throw new Error("Unknown archetype.");
  return {
    primary, shadow, scores, primaryScore: scores[primaryId],
    tied: scores[primaryId] === scores[runnerUp],
    shadowSource: scores[runnerUp] > 0 ? "secondary" as const : "balance" as const,
    invitation: `Notice when ${primary.name.toLowerCase()} slips into ${primary.shadow.toLowerCase()}. Invite ${shadow.name.toLowerCase()} to make room for ${shadow.desire.toLowerCase()}. Ask yourself: “${shadow.question}”`,
  };
}

export type CallingResult = ReturnType<typeof calculateCalling>;