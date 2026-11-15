
import { describe, it, expect } from "vitest";
import { calculateAPS } from "../utils/apsCalculator";

const subject = (name, mark) => ({
  subject: name,
  mark
});

describe("UniConnect APS Calculator", () => {
  it("calculates APS for seven academic subjects", () => {
    const results = {
      homeLanguage: subject("English Home Language", 85),
      firstAdditional: subject("isiZulu First Additional Language", 75),
      mathematics: subject("Mathematics", 65),
      lifeOrientation: subject("Life Orientation", 90),
      elective1: subject("Physical Sciences", 55),
      elective2: subject("Life Sciences", 45),
      elective3: subject("Geography", 35),
      elective4: subject("History", 82)
    };

    // 7 + 6 + 5 + 4 + 3 + 2 + 7 = 34
    expect(calculateAPS(results)).toBe(34);
  });

  it("excludes Life Orientation", () => {
    const results = {
      homeLanguage: subject("English Home Language", 80),
      lifeOrientation: subject("Life Orientation", 100)
    };

    expect(calculateAPS(results)).toBe(7);
  });

  it("handles APS point boundaries", () => {
    const results = {
      a: subject("Subject A", 80),
      b: subject("Subject B", 70),
      c: subject("Subject C", 60),
      d: subject("Subject D", 50),
      e: subject("Subject E", 40),
      f: subject("Subject F", 30),
      g: subject("Subject G", 29)
    };

    expect(calculateAPS(results)).toBe(28);
  });

  it("ignores empty subject slots", () => {
    const results = {
      homeLanguage: subject("English Home Language", 80),
      elective1: subject("", ""),
      elective2: subject("", null)
    };

    expect(calculateAPS(results)).toBe(7);
  });

  it("ignores invalid marks", () => {
    const results = {
      a: subject("Mathematics", 85),
      b: subject("Physical Sciences", -10),
      c: subject("Geography", 110),
      d: subject("History", "invalid")
    };

    expect(calculateAPS(results)).toBe(7);
  });

  it("returns zero for empty results", () => {
    const results = {
      homeLanguage: subject("", ""),
      mathematics: subject("", ""),
      elective1: subject("", "")
    };

    expect(calculateAPS(results)).toBe(0);
  });

  it("accepts numeric marks stored as strings", () => {
    const results = {
      mathematics: subject("Mathematics", "80"),
      geography: subject("Geography", "70")
    };

    expect(calculateAPS(results)).toBe(13);
  });
});
