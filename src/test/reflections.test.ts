import { describe, expect, it } from "vitest";
import { ARCHETYPES } from "@/lib/archetypes";
import { dailyRuler, drawArchetype, polarityReading } from "@/lib/reflections";

describe("Today’s Mirror weekday rules", () => {
  it.each([
    ["2026-11-15", "Sunday", "Sun", "creator"],
    ["2026-11-16", "Monday", "Moon", "guardian"],
    ["2026-11-17", "Tuesday", "Mars", "pioneer"],
    ["2026-11-18", "Wednesday", "Mercury", "translator"],
    ["2026-11-19", "Thursday", "Jupiter", "seeker"],
    ["2026-11-20", "Friday", "Venus", "harmonizer"],
    ["2026-11-21", "Saturday", "Saturn", "architect"],
  ])("maps %s to %s / %s / %s", (date, day, planet, archetype) => {
    expect(dailyRuler(new Date(`${date}T12:00:00Z`), 0)).toMatchObject({ date, day, planet, archetype });
  });
  it("uses the local day across midnight rather than the UTC weekday", () => {
    expect(dailyRuler(new Date("2026-11-18T23:30:00Z"), 120)).toMatchObject({ date: "2026-11-19", planet: "Jupiter", archetype: "seeker" });
    expect(dailyRuler(new Date("2026-11-18T00:30:00Z"), -120)).toMatchObject({ date: "2026-11-17", planet: "Mars", archetype: "pioneer" });
  });
  it("allows a draw from all twelve archetypes", () => {
    expect(Array.from({ length: 12 }, (_, i) => drawArchetype((i + 0.5) / 12)?.id)).toEqual(ARCHETYPES.map(a => a.id));
    expect(() => drawArchetype(1)).toThrow();
  });
});

describe("Polarity & Integration", () => {
  it.each([["pioneer", "harmonizer"], ["creator", "visionary"], ["anchor", "transformer"]])("supports the classic pair %s & %s in either order", (a, b) => {
    const reading = polarityReading(a, b);
    expect(reading?.first.id).toBe(a);
    expect(reading?.second.id).toBe(b);
    expect(polarityReading(b, a)?.tension).toBe(reading?.tension);
  });
  it("supports every distinct custom pair", () => {
    for (const a of ARCHETYPES) for (const b of ARCHETYPES) if (a.id !== b.id) {
      const reading = polarityReading(a.id, b.id);
      expect(reading).not.toBeNull();
      expect(reading?.first.id).toBe(a.id);
      expect(reading?.second.id).toBe(b.id);
    }
  });
  it("rejects identical or unknown voices", () => {
    expect(polarityReading("creator", "creator")).toBeNull();
    expect(polarityReading("missing", "harmonizer")).toBeNull();
  });
});