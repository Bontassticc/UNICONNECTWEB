
import { describe, it, expect } from "vitest";
import { checkEligibility } from "../utils/checkEligibility.js";

const subject = (name, mark) => ({
  subject: name,
  mark
});

const programme = {
  id: 1,
  name: "BSc Computer Science",
  minAPS: 34,
  requirements: [
    {
      type: "mathematics",
      minimumMark: 70
    },
    {
      type: "firstAdditionalLanguage",
      minimumMark: 60
    }
  ]
};

const qualifyingMarks = {
  mathematics: subject("Mathematics", 75),
  firstAdditional: subject(
    "English First Additional Language",
    65
  )
};

describe("UniConnect Programme Eligibility", () => {
  it("marks a qualifying student as Eligible", () => {
    const result = checkEligibility(
      programme,
      36,
      qualifyingMarks
    );

    expect(result.status).toBe("Eligible");
    expect(result.eligible).toBe(true);
    expect(result.apsPassed).toBe(true);
    expect(result.subjectsPassed).toBe(true);
    expect(result.className).toBe("eligibility-green");
  });

  it("marks a student as Borderline when APS is 1 point below", () => {
    const result = checkEligibility(
      programme,
      33,
      qualifyingMarks
    );

    expect(result.status).toBe("Borderline");
    expect(result.eligible).toBe(false);
    expect(result.subjectsPassed).toBe(true);
    expect(result.className).toBe("eligibility-orange");
  });

  it("marks a student as Borderline when APS is 2 points below", () => {
    const result = checkEligibility(
      programme,
      32,
      qualifyingMarks
    );

    expect(result.status).toBe("Borderline");
  });

  it("marks a student as Not Eligible when APS is more than 2 points below", () => {
    const result = checkEligibility(
      programme,
      31,
      qualifyingMarks
    );

    expect(result.status).toBe("Not Eligible");
    expect(result.apsPassed).toBe(false);
  });

  it("rejects a student who does not meet the Mathematics requirement", () => {
    const marks = {
      ...qualifyingMarks,
      mathematics: subject("Mathematics", 60)
    };

    const result = checkEligibility(
      programme,
      40,
      marks
    );

    expect(result.status).toBe("Not Eligible");
    expect(result.apsPassed).toBe(true);
    expect(result.subjectsPassed).toBe(false);
  });

  it("does not give Borderline when a compulsory subject fails", () => {
    const marks = {
      ...qualifyingMarks,
      mathematics: subject("Mathematics", 60)
    };

    const result = checkEligibility(
      programme,
      33,
      marks
    );

    expect(result.status).toBe("Not Eligible");
  });

  it("marks a student with no results as Incomplete", () => {
    const result = checkEligibility(
      programme,
      null,
      {}
    );

    expect(result.status).toBe("Incomplete");
    expect(result.hasResults).toBe(false);
    expect(result.className).toBe("eligibility-grey");
  });

  it("marks a student with no APS as Incomplete", () => {
    const result = checkEligibility(
      programme,
      null,
      qualifyingMarks
    );

    expect(result.status).toBe("Incomplete");
    expect(result.hasResults).toBe(false);
  });

  it("checks Mathematical Literacy when the programme allows it", () => {
    const literacyProgramme = {
      id: 2,
      name: "Example Diploma",
      minAPS: 24,
      requirements: [
        {
          type: "mathematicsOrLiteracy",
          minimumMark: 50
        }
      ]
    };

    const marks = {
      mathematics: subject("Mathematical Literacy", 65)
    };

    const result = checkEligibility(
      literacyProgramme,
      26,
      marks
    );

    expect(result.status).toBe("Eligible");
    expect(result.requirementResults[0].matchedSubject)
      .toBe("Mathematical Literacy");
  });

  it("checks elective subject requirements", () => {
    const scienceProgramme = {
      id: 3,
      name: "Example Science Programme",
      minAPS: 30,
      requirements: [
        {
          type: "elective",
          subjects: ["Physical Sciences", "Life Sciences"],
          minimumMark: 60
        }
      ]
    };

    const marks = {
      elective1: subject("Physical Sciences", 55),
      elective2: subject("Life Sciences", 75)
    };

    const result = checkEligibility(
      scienceProgramme,
      35,
      marks
    );

    expect(result.status).toBe("Eligible");
    expect(result.requirementResults[0].studentMark)
      .toBe(75);
    expect(result.requirementResults[0].matchedSubject)
      .toBe("Life Sciences");
  });

  it("ignores invalid marks when checking requirements", () => {
    const marks = {
      mathematics: subject("Mathematics", 110),
      firstAdditional: subject(
        "English First Additional Language",
        65
      )
    };

    const result = checkEligibility(
      programme,
      40,
      marks
    );

    expect(result.status).toBe("Not Eligible");
    expect(result.requirementResults[0].studentMark)
      .toBe(null);
  });

  it("returns detailed results for each compulsory subject", () => {
    const result = checkEligibility(
      programme,
      36,
      qualifyingMarks
    );

    expect(result.requirementResults).toHaveLength(2);

    expect(result.requirementResults[0].passed)
      .toBe(true);

    expect(result.requirementResults[0].studentMark)
      .toBe(75);

    expect(result.requirementResults[1].passed)
      .toBe(true);
  });
});
