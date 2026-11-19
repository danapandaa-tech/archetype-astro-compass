import { describe, expect, it } from "vitest";
import { ASSESSMENT_QUESTIONS, CALLING_IDS, calculateCalling, SHADOW_INVITATIONS } from "@/lib/assessment";

describe("Guided Calling Assessment", () => {
  it("requires exactly five answers", () => {
    expect(ASSESSMENT_QUESTIONS).toHaveLength(5);
    expect(() => calculateCalling(["creator", "creator", "creator", "creator"])).toThrow();
    expect(() => calculateCalling(Array(6).fill("creator"))).toThrow();
  });
  it("offers all twelve archetypes in each of the five dimensions", () => {
    for (const question of ASSESSMENT_QUESTIONS) expect(question.options.map(o => o.archetype)).toEqual(CALLING_IDS);
  });
  it("rejects invalid and unanswered choices", () => {
    expect(() => calculateCalling(["creator", "creator", "", "creator", "creator"])).toThrow();
    expect(() => calculateCalling(["creator", "creator", "unknown", "creator", "creator"])).toThrow();
  });
  it("assigns one point to each choice and selects the highest total", () => {
    const result = calculateCalling(["creator", "architect", "creator", "harmonizer", "creator"]);
    expect(result.primary.id).toBe("creator");
    expect(result.primaryScore).toBe(3);
    expect(result.scores.architect).toBe(1);
    expect(result.scores.harmonizer).toBe(1);
    expect(Object.values(result.scores).reduce((a, b) => a + b, 0)).toBe(5);
    expect(result.tied).toBe(false);
  });
  it("breaks a primary tie by the latest answer", () => {
    const result = calculateCalling(["creator", "harmonizer", "creator", "architect", "harmonizer"]);
    expect(result.primary.id).toBe("harmonizer");
    expect(result.shadow.id).toBe("creator");
    expect(result.tied).toBe(true);
  });
  it("uses the gift answer when all five patterns tie", () => {
    const result = calculateCalling(["pioneer", "architect", "harmonizer", "creator", "seeker"]);
    expect(result.primary.id).toBe("seeker");
    expect(result.shadow.id).toBe("creator");
  });
  it("uses the strongest remaining pattern as the shadow invitation", () => {
    const result = calculateCalling(["architect", "architect", "harmonizer", "harmonizer", "architect"]);
    expect(result.shadow.id).toBe("harmonizer");
    expect(result.shadowSource).toBe("secondary");
  });
  it("breaks secondary ties by latest answer", () => {
    expect(calculateCalling(["creator", "architect", "creator", "harmonizer", "creator"]).shadow.id).toBe("harmonizer");
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
    const answers = ["creator", "creator", "creator", "creator", "creator"];
    calculateCalling(answers);
    answers[4] = "harmonizer";
    const result = calculateCalling(answers);
    expect(result.scores.creator).toBe(4);
    expect(result.scores.harmonizer).toBe(1);
  });
});