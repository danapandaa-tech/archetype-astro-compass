import { describe, expect, it } from "vitest";
import { ASSESSMENT_QUESTIONS, CALLING_IDS, calculateCalling, SHADOW_INVITATIONS } from "@/lib/assessment";

describe("Guided Calling Assessment", () => {
  it("requires exactly five answers", () => {
    expect(ASSESSMENT_QUESTIONS).toHaveLength(5);
    expect(() => calculateCalling(["hero", "hero", "hero", "hero"])).toThrow();
    expect(() => calculateCalling(Array(6).fill("hero"))).toThrow();
  });
  it("offers all twelve archetypes in each of the five dimensions", () => {
    for (const question of ASSESSMENT_QUESTIONS) expect(question.options.map(o => o.archetype)).toEqual(CALLING_IDS);
  });
  it("rejects invalid and unanswered choices", () => {
    expect(() => calculateCalling(["hero", "hero", "", "hero", "hero"])).toThrow();
    expect(() => calculateCalling(["hero", "hero", "unknown", "hero", "hero"])).toThrow();
  });
  it("assigns one point to each choice and selects the highest total", () => {
    const result = calculateCalling(["hero", "sage", "hero", "lover", "hero"]);
    expect(result.primary.id).toBe("hero");
    expect(result.primaryScore).toBe(3);
    expect(result.scores.sage).toBe(1);
    expect(result.scores.lover).toBe(1);
    expect(Object.values(result.scores).reduce((a, b) => a + b, 0)).toBe(5);
    expect(result.tied).toBe(false);
  });
  it("breaks a primary tie by the latest answer", () => {
    const result = calculateCalling(["hero", "lover", "hero", "sage", "lover"]);
    expect(result.primary.id).toBe("lover");
    expect(result.shadow.id).toBe("hero");
    expect(result.tied).toBe(true);
  });
  it("uses the gift answer when all five patterns tie", () => {
    const result = calculateCalling(["hero", "sage", "lover", "creator", "explorer"]);
    expect(result.primary.id).toBe("explorer");
    expect(result.shadow.id).toBe("creator");
  });
  it("uses the strongest remaining pattern as the shadow invitation", () => {
    const result = calculateCalling(["sage", "sage", "lover", "lover", "sage"]);
    expect(result.shadow.id).toBe("lover");
    expect(result.shadowSource).toBe("secondary");
  });
  it("breaks secondary ties by latest answer", () => {
    expect(calculateCalling(["hero", "sage", "hero", "lover", "hero"]).shadow.id).toBe("lover");
  });
  it.each(CALLING_IDS)("can reveal %s and a distinct balancing invitation", id => {
    const result = calculateCalling(Array(5).fill(id));
    expect(result.primary.id).toBe(id);
    expect(result.primaryScore).toBe(5);
    expect(result.shadow.id).toBe(SHADOW_INVITATIONS[id]);
    expect(result.shadow.id).not.toBe(id);
    expect(result.shadowSource).toBe("balance");
  });
  it("recalculates changed answers without accumulating old scores", () => {
    const answers = ["hero", "hero", "hero", "hero", "hero"];
    calculateCalling(answers);
    answers[4] = "lover";
    const result = calculateCalling(answers);
    expect(result.scores.hero).toBe(4);
    expect(result.scores.lover).toBe(1);
  });
});