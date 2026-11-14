
import programmes from "../data/programmes";
import { checkEligibility } from "./checkEligibility";

export function getAlternativeProgrammes(
  currentProgramme,
  aps,
  studentMarks
) {
  if (!currentProgramme) {
    return [];
  }

  const currentEligibility = checkEligibility(
    currentProgramme,
    aps,
    studentMarks
  );

  // Don't recommend alternatives without academic results
  // or when the student already meets the requirements.
  if (
    !currentEligibility.hasResults ||
    currentEligibility.status === "Eligible"
  ) {
    return [];
  }

  return programmes
    .filter(
      (programme) =>
        programme.id !== currentProgramme.id &&
        programme.field === currentProgramme.field
    )
    .map((programme) => ({
      ...programme,
      eligibility: checkEligibility(
        programme,
        aps,
        studentMarks
      )
    }))
    .filter(
      (programme) =>
        programme.eligibility.status === "Eligible"
    )
    .sort((a, b) => {
      // Prioritise similar qualifications
      const aSameQualification =
        a.qualification === currentProgramme.qualification
          ? 1
          : 0;

      const bSameQualification =
        b.qualification === currentProgramme.qualification
          ? 1
          : 0;

      if (aSameQualification !== bSameQualification) {
        return bSameQualification - aSameQualification;
      }

      // Then prioritise programmes with higher APS requirements
      return b.minAPS - a.minAPS;
    })
    .slice(0, 3);
}
