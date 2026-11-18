import { describe, expect, it } from "vitest";
import { calculateProfile, decanBlend, EXTENDED_READING_PRICE_GBP, FREE_READING_FEATURES, lifePath } from "@/lib/scanner";

describe("Free scanner and market-test offer", () => {
  it("prices the extended reading at £5", () => expect(EXTENDED_READING_PRICE_GBP).toBe(5));
  it("keeps the Moon archetype free", () => expect(FREE_READING_FEATURES).toContain("moon"));
  it("keeps the decan blend free", () => expect(FREE_READING_FEATURES).toContain("decan"));
  it("keeps the planetary day ruler free", () => expect(FREE_READING_FEATURES).toContain("dayRuler"));
  it("keeps Life Path numerology free", () => expect(FREE_READING_FEATURES).toContain("lifePath"));
  it("reduces birth-date digits to a single Life Path number", () => expect(lifePath("1990-07-15")).toBe(5));
  it("uses same-element signs for decan blends", () => {
    expect(decanBlend(15)).toEqual({ decan: 2, sign: expect.objectContaining({ key: "leo" }) });
    expect(decanBlend(25).sign.key).toBe("sagittarius");
  });
  it("returns Sun, Moon and birth weekday for a known date", () => {
    const result = calculateProfile("1990-07-15");
    expect(result.sun.key).toBe("cancer");
    expect(result.moon.key).toBe("aries");
    expect(result.dayIndex).toBe(0);
    expect(result.timeKnown).toBe(false);
  });
  it("rejects dates that roll into another month", () => expect(() => calculateProfile("1990-02-31")).toThrow());
  it("converts a supplied local time with its UTC offset", () => {
    expect(calculateProfile("1990-07-15", "14:00", 2)).toEqual(calculateProfile("1990-07-15", "12:00", 0));
  });
});