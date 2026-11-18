export type Archetype = {
  id: string; name: string; sign: string; glyph: string;
  desire: string; shadow: string; question: string;
  calls: string; tests: string; attention: string;
};

export const ARCHETYPES: Archetype[] = [
  { id: "innocent", name: "The Innocent", sign: "Aries", glyph: "♈\uFE0E", desire: "Safety, new beginnings", shadow: "Denial of harm, naïve optimism", question: "What are you afraid to see?",
    calls: "You still believe a fresh start is possible, and that belief is not foolish — it is fuel. The call is to begin again with open eyes, not closed ones.",
    tests: "The Innocent who looks away. The one who keeps the peace by refusing to notice what is already broken.",
    attention: "If you let yourself see one hard thing clearly today, what would it be?" },
  { id: "orphan", name: "The Orphan", sign: "Cancer", glyph: "♋\uFE0E", desire: "Belonging, connection", shadow: "Victimhood, clinging", question: "Where do you already belong?",
    calls: "You know what it is to stand outside the window. That knowing makes you kind to others who are still out there. The call is to notice the doors already open to you.",
    tests: "The Orphan who holds the wound as identity, gripping people too tightly in fear they will leave.",
    attention: "Who has already made room for you that you have not fully let in?" },
  { id: "hero", name: "The Hero", sign: "Leo", glyph: "♌\uFE0E", desire: "Courage, mastery", shadow: "Arrogance, needing enemies", question: "What are you really fighting?",
    calls: "Something in you rises when things get hard. You want to meet the moment fully. The call is to aim that fire at what truly matters.",
    tests: "The Hero who needs a dragon to feel alive, turning every person and problem into an opponent.",
    attention: "If there were no one to defeat, what would you still want to master?" },
  { id: "caregiver", name: "The Caregiver", sign: "Virgo", glyph: "♍\uFE0E", desire: "To protect and serve", shadow: "Martyrdom, control through helping", question: "Who are you when no one needs you?",
    calls: "You notice the small things others miss — the tired face, the unmet need. Your care is precise and real. The call is to include yourself in it.",
    tests: "The Caregiver who helps in order to be needed, and quietly keeps score.",
    attention: "What would you do with an hour that belonged only to you?" },
  { id: "explorer", name: "The Explorer", sign: "Sagittarius", glyph: "♐\uFE0E", desire: "Freedom, discovery", shadow: "Restlessness, never arriving", question: "What are you running toward — or from?",
    calls: "You keep maps of places you haven't been. You feel restless when the road is straight. The call is not to settle — it is to trust that the search itself is home.",
    tests: "The Explorer who never lands. The one who mistakes movement for growth and runs from every intimacy that asks for stillness.",
    attention: "What would change if you stopped looking for the next thing and let this moment be the destination?" },
  { id: "rebel", name: "The Rebel", sign: "Aquarius", glyph: "♒\uFE0E", desire: "Revolution, change", shadow: "Destruction without vision", question: "What are you building, not just breaking?",
    calls: "You see the rules that others take for granted, and you see where they fail people. The call is to turn that clarity into something new.",
    tests: "The Rebel who only knows how to say no, tearing down without a picture of what comes next.",
    attention: "What is one thing you want to exist that does not exist yet?" },
  { id: "lover", name: "The Lover", sign: "Libra", glyph: "♎\uFE0E", desire: "Intimacy, harmony", shadow: "Losing self in another", question: "What do you love that loves you back?",
    calls: "You are moved by beauty and by closeness. You know how to make a room feel warmer. The call is to love without disappearing.",
    tests: "The Lover who bends until there is no shape left, keeping harmony at the cost of truth.",
    attention: "Where are you saying yes when part of you means no?" },
  { id: "creator", name: "The Creator", sign: "Pisces", glyph: "♓\uFE0E", desire: "Imagination, expression", shadow: "Escapism, creative paralysis", question: "What are you afraid to make?",
    calls: "Images, songs, half-built worlds — they move through you whether you ask or not. The call is to give one of them a body in the real world.",
    tests: "The Creator who lives in the dream so fully that nothing is ever finished, or even started.",
    attention: "What small, imperfect thing could you make this week?" },
  { id: "jester", name: "The Jester", sign: "Gemini", glyph: "♊\uFE0E", desire: "Joy, spontaneity", shadow: "Cruelty disguised as wit, avoidance", question: "What truth are you hiding in your humor?",
    calls: "You can find the light in almost anything, and you help others breathe. The call is to let your joy be honest, not a hiding place.",
    tests: "The Jester who jokes the moment it gets real, or uses wit as a blade.",
    attention: "What would you say if you could not make it funny?" },
  { id: "sage", name: "The Sage", sign: "Capricorn", glyph: "♑\uFE0E", desire: "Wisdom, truth", shadow: "Dogmatism, cold detachment", question: "What do you know that you are afraid to live?",
    calls: "You want to understand how things really work. Patience and depth come naturally to you. The call is to let knowing become living.",
    tests: "The Sage who watches from the tower, certain and untouched, mistaking distance for clarity.",
    attention: "Which piece of your own wisdom are you not yet acting on?" },
  { id: "magician", name: "The Magician", sign: "Scorpio", glyph: "♏\uFE0E", desire: "Transformation, power", shadow: "Manipulation, shadow without light", question: "What are you trying to change — and what are you avoiding changing?",
    calls: "You sense the hidden currents beneath events, and you know change is possible at the root. The call is to transform yourself first.",
    tests: "The Magician who works others like levers, and keeps their own depths locked away.",
    attention: "What in you is ready to end so something else can begin?" },
  { id: "ruler", name: "The Ruler", sign: "Taurus", glyph: "♉\uFE0E", desire: "Order, prosperity", shadow: "Tyranny, rigidity", question: "What would you build if no one was watching?",
    calls: "You know how to make things steady, lasting and good to live in. The call is to build from your values, not your fears.",
    tests: "The Ruler who holds on so tightly that nothing can grow, confusing control with care.",
    attention: "What could you loosen your grip on and still feel safe?" },
];

const SUN: [string, number, number][] = [
  ["Capricorn",1,19],["Aquarius",2,18],["Pisces",3,20],["Aries",4,19],["Taurus",5,20],["Gemini",6,20],
  ["Cancer",7,22],["Leo",8,22],["Virgo",9,22],["Libra",10,22],["Scorpio",11,21],["Sagittarius",12,21],["Capricorn",12,31],
];
export function sunSign(month: number, day: number): string {
  for (const [s, m, d] of SUN) if (month < m || (month === m && day <= d)) return s;
  return "Capricorn";
}
