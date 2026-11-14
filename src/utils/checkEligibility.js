
export function checkEligibility(programme, aps, studentMarks) {
  const results = Object.values(studentMarks || {}).filter(
    (item) =>
      item &&
      item.subject &&
      item.mark !== "" &&
      item.mark !== null &&
      item.mark !== undefined &&
      Number.isFinite(Number(item.mark)) &&
      Number(item.mark) >= 0 &&
      Number(item.mark) <= 100
  );

  const hasResults =
    aps !== null &&
    aps !== undefined &&
    Number.isFinite(Number(aps)) &&
    results.length > 0;

  const findStudentMark = (type, allowedSubjects = []) => {
    let matchingResults = [];

    if (type === "mathematics") {
      matchingResults = results.filter(
        (item) => item.subject === "Mathematics"
      );
    }

    if (type === "mathematicsOrLiteracy") {
      matchingResults = results.filter(
        (item) =>
          item.subject === "Mathematics" ||
          item.subject === "Mathematical Literacy"
      );
    }

    if (type === "firstAdditionalLanguage") {
      matchingResults = results.filter(
        (item) =>
          item.subject.toLowerCase().includes(
            "first additional language"
          )
      );
    }

    if (type === "elective") {
      matchingResults = results.filter(
        (item) => allowedSubjects.includes(item.subject)
      );
    }

    const bestResult = matchingResults.sort(
      (a, b) => Number(b.mark) - Number(a.mark)
    )[0];

    return bestResult
      ? {
          mark: Number(bestResult.mark),
          subject: bestResult.subject
        }
      : null;
  };

  const requirementResults = (programme.requirements || []).map(
    (requirement) => {
      const studentResult = findStudentMark(
        requirement.type,
        requirement.subjects || []
      );

      const studentMark = studentResult?.mark ?? null;

      return {
        ...requirement,
        studentMark,
        matchedSubject: studentResult?.subject || null,
        passed:
          studentMark !== null &&
          studentMark >= requirement.minimumMark
      };
    }
  );

  const apsPassed = hasResults && Number(aps) >= programme.minAPS;

  const subjectsPassed = requirementResults.every(
    (requirement) => requirement.passed
  );

  const eligible = hasResults && apsPassed && subjectsPassed;

  let status = "Incomplete";
  let className = "eligibility-grey";

  if (hasResults) {
    if (eligible) {
      status = "Eligible";
      className = "eligibility-green";
    } else if (
      subjectsPassed &&
      Number(aps) < programme.minAPS &&
      Number(aps) >= programme.minAPS - 2
    ) {
      status = "Borderline";
      className = "eligibility-orange";
    } else {
      status = "Not Eligible";
      className = "eligibility-red";
    }
  }

  return {
    hasResults,
    apsPassed,
    subjectsPassed,
    eligible,
    requirementResults,
    status,
    className
  };
}
