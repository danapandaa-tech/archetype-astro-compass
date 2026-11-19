export type Archetype = {
  id: string; name: string; sign: string; glyph: string; dateRange: string;
  gift: string; shadow: string; developmentalTask: string;
};

export const ARCHETYPE_KEYS = ["pioneer", "anchor", "translator", "guardian", "creator", "refiner", "harmonizer", "transformer", "seeker", "architect", "visionary", "mystic"] as const;

// Interpretive copy is companion wording, not a quotation from the book.
export const ARCHETYPES: Archetype[] = [
  { id: "pioneer", name: "The Pioneer", sign: "Aries", glyph: "♈︎", dateRange: "Mar 21–Apr 19", gift: "Initiative and courage to begin.", shadow: "Impulsiveness and pushing ahead without listening.", developmentalTask: "Begin with courage while respecting others’ pace." },
  { id: "anchor", name: "The Anchor", sign: "Taurus", glyph: "♉︎", dateRange: "Apr 20–May 20", gift: "Steadiness, patience and grounded presence.", shadow: "Inertia, possessiveness and resistance to change.", developmentalTask: "Stay grounded while making room for change." },
  { id: "translator", name: "The Translator", sign: "Gemini", glyph: "♊︎", dateRange: "May 21–Jun 20", gift: "Curiosity and connecting perspectives through language.", shadow: "Scattered attention and words detached from experience.", developmentalTask: "Listen deeply and bring clarity to what you communicate." },
  { id: "guardian", name: "The Guardian", sign: "Cancer", glyph: "♋︎", dateRange: "Jun 21–Jul 22", gift: "Emotional attunement and protective care.", shadow: "Overprotection and holding on too tightly.", developmentalTask: "Offer care with boundaries that allow growth." },
  { id: "creator", name: "The Creator", sign: "Leo", glyph: "♌︎", dateRange: "Jul 23–Aug 22", gift: "Creative expression and generous self-confidence.", shadow: "Dependence on applause and making everything personal.", developmentalTask: "Express yourself sincerely without needing approval." },
  { id: "refiner", name: "The Refiner", sign: "Virgo", glyph: "♍︎", dateRange: "Aug 23–Sep 22", gift: "Discernment and practical improvement.", shadow: "Perfectionism and relentless criticism.", developmentalTask: "Improve what matters while accepting imperfection." },
  { id: "harmonizer", name: "The Harmonizer", sign: "Libra", glyph: "♎︎", dateRange: "Sep 23–Oct 22", gift: "Balance, fairness and relational sensitivity.", shadow: "People-pleasing and avoiding necessary conflict.", developmentalTask: "Create harmony without silencing your own truth." },
  { id: "transformer", name: "The Transformer", sign: "Scorpio", glyph: "♏︎", dateRange: "Oct 23–Nov 21", gift: "Depth and the capacity for honest renewal.", shadow: "Control, fixation and withholding trust.", developmentalTask: "Meet change honestly without controlling others." },
  { id: "seeker", name: "The Seeker", sign: "Sagittarius", glyph: "♐︎", dateRange: "Nov 22–Dec 21", gift: "Exploration and the search for meaning.", shadow: "Restlessness and certainty that overlooks nuance.", developmentalTask: "Explore widely and live what experience teaches." },
  { id: "architect", name: "The Architect", sign: "Capricorn", glyph: "♑︎", dateRange: "Dec 22–Jan 19", gift: "Responsibility and building enduring structures.", shadow: "Rigidity and measuring worth through achievement.", developmentalTask: "Build with purpose while allowing rest and flexibility." },
  { id: "visionary", name: "The Visionary", sign: "Aquarius", glyph: "♒︎", dateRange: "Jan 20–Feb 18", gift: "Original perspective and imagining collective possibilities.", shadow: "Detachment and ideals disconnected from lived needs.", developmentalTask: "Bring your vision into relationship and practical action." },
  { id: "mystic", name: "The Mystic", sign: "Pisces", glyph: "♓︎", dateRange: "Feb 19–Mar 20", gift: "Intuition, compassion and sensitivity to connection.", shadow: "Escapism and losing personal boundaries.", developmentalTask: "Ground intuition in everyday life with clear boundaries." },
];

const SUN: [string, number, number][] = [
  ["Capricorn",1,19],["Aquarius",2,18],["Pisces",3,20],["Aries",4,19],["Taurus",5,20],["Gemini",6,20],
  ["Cancer",7,22],["Leo",8,22],["Virgo",9,22],["Libra",10,22],["Scorpio",11,21],["Sagittarius",12,21],["Capricorn",12,31],
];
export function sunSign(month: number, day: number): string {
  for (const [s, m, d] of SUN) if (month < m || (month === m && day <= d)) return s;
  return "Capricorn";
}
