export function checkProgrammeEligibility(
  programme,
  studentMarks,
  studentAPS
) {

  // Check APS requirement
  const apsEligible =
    studentAPS !== null &&
    studentAPS >= programme.minAPS;


  // Check subject requirements
  const subjectResults = programme.requirements.map(
    requirement => {

      let matchingResults = [];


      // Mathematics specifically
      if (requirement.type === "mathematics") {

        matchingResults = Object.values(studentMarks)
          .filter(result =>
            result.subject === "Mathematics"
          );

      }


      // Mathematics OR Mathematical Literacy
      else if (
        requirement.type === "mathematicsOrLiteracy"
      ) {

        matchingResults = Object.values(studentMarks)
          .filter(result =>
            result.subject === "Mathematics" ||
            result.subject === "Mathematical Literacy"
          );

      }


      // First Additional Language
      else if (
        requirement.type === "firstAdditionalLanguage"
      ) {

        matchingResults = Object.values(studentMarks)
          .filter(result =>
            result.subject &&
            result.subject.includes(
              "First Additional Language"
            )
          );

      }


      // Home Language
      else if (
        requirement.type === "homeLanguage"
      ) {

        matchingResults = Object.values(studentMarks)
          .filter(result =>
            result.subject &&
            result.subject.includes(
              "Home Language"
            )
          );

      }


      // Specific elective subject
      else if (
        requirement.type === "elective"
      ) {

        matchingResults = Object.values(studentMarks)
          .filter(result =>
            requirement.subjects.includes(
              result.subject
            )
          );

      }


      // Check mark
      const matchingResult = matchingResults.find(
        result =>
          Number(result.mark) >=
          requirement.minimumMark
      );


      return {

        ...requirement,

        passed: Boolean(matchingResult),

        actualMark: matchingResult
          ? Number(matchingResult.mark)
          : null,

        subject: matchingResult
          ? matchingResult.subject
          : null

      };

    }
  );


  // Overall eligibility
  const subjectsEligible =
    subjectResults.every(
      requirement => requirement.passed
    );


  return {

    eligible:
      apsEligible && subjectsEligible,

    apsEligible,

    subjectsEligible,

    subjectResults

  };

}