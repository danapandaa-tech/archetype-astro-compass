import { describe, expect, it } from "vitest";
import { ARCHETYPES, sunSign } from "@/lib/archetypes";
import { SIGNS, calculateProfile } from "@/lib/scanner";
import { ARCH } from "@/lib/scanner-copy";
import { CALLING_IDS } from "@/lib/assessment";

const CAST = [
  ["Aries", "pioneer", "The Pioneer", "03-21", "04-19"],
  ["Taurus", "anchor", "The Anchor", "04-20", "05-20"],
  ["Gemini", "translator", "The Translator", "05-21", "06-20"],
  ["Cancer", "guardian", "The Guardian", "06-21", "07-22"],
  ["Leo", "creator", "The Creator", "07-23", "08-22"],
  ["Virgo", "refiner", "The Refiner", "08-23", "09-22"],
  ["Libra", "harmonizer", "The Harmonizer", "09-23", "10-22"],
  ["Scorpio", "transformer", "The Transformer", "10-23", "11-21"],
  ["Sagittarius", "seeker", "The Seeker", "11-22", "12-21"],
  ["Capricorn", "architect", "The Architect", "12-22", "01-19"],
  ["Aquarius", "visionary", "The Visionary", "01-20", "02-18"],
  ["Pisces", "mystic", "The Mystic", "02-19", "03-20"],
] as const;

describe("Author’s published cast", () => {
  it.each(CAST)("maps %s only to %s with the exact book name", (sign, key, name) => {
    expect(ARCHETYPES.find(a => a.sign === sign)).toMatchObject({ id: key, name });
    expect(SIGNS.find(s => s.key === sign.toLowerCase())?.archetype).toBe(key);
    expect(ARCH[key]?.name).toBe(name);
  });
  it("uses twelve distinct keys with no Ruler or other substituted cast", () => {
    const expected = CAST.map(row => row[1]);
    expect(ARCHETYPES.map(a => a.id)).toEqual(expected);
    expect(new Set(SIGNS.map(s => s.archetype)).size).toBe(12);
    expect(Object.keys(ARCH)).toEqual(expected);
    expect(CALLING_IDS).toEqual(expected);
    expect(ARCHETYPES.some(a => a.id === "ruler")).toBe(false);
  });
  it("uses only gift, shadow and developmental task as interpretive fields", () => {
    for (const entry of ARCHETYPES) {
      expect(Object.keys(entry).sort()).toEqual(["dateRange", "developmentalTask", "gift", "glyph", "id", "name", "shadow", "sign"].sort());
      expect(entry.gift.length).toBeGreaterThan(0);
      expect(entry.shadow.length).toBeGreaterThan(0);
      expect(entry.developmentalTask.length).toBeGreaterThan(0);
    }
    for (const entry of Object.values(ARCH)) expect(Object.keys(entry).sort()).toEqual(["developmentalTask", "gift", "name", "shadow"]);
  });
  it.each(CAST)("uses both fixed %s book boundaries in the hint and scanner", (sign, key, _name, start, end) => {
    for (const date of [start, end]) {
      const [month, day] = date.split("-").map(Number);
      expect(sunSign(month ?? 0, day ?? 0)).toBe(sign);
      expect(calculateProfile(`2000-${date}`).sun.archetype).toBe(key);
      expect(calculateProfile(`2000-${date}`, "23:45", -12).sun.archetype).toBe(key);
    }
  });
  it("keeps Jan 1 and Dec 31 in Capricorn and leap day in Pisces", () => {
    expect(sunSign(1, 1)).toBe("Capricorn");
    expect(sunSign(12, 31)).toBe("Capricorn");
    expect(calculateProfile("2000-02-29").sun.archetype).toBe("mystic");
  });
});