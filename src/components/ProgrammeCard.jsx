import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AcademicContext } from "../context/AcademicContext";

function ProgrammeCard({ programme }) {

  const { aps, studentMarks } = useContext(AcademicContext);


  // --------------------------------
  // Find student's mark
  // --------------------------------

  const findStudentMark = (type, allowedSubjects = []) => {

    const results = Object.values(studentMarks);


    // Mathematics
    if (type === "mathematics") {

      const result = results.find(
        item => item.subject === "Mathematics"
      );

      return result
        ? Number(result.mark)
        : null;
    }


    // Mathematics OR Mathematical Literacy
    if (type === "mathematicsOrLiteracy") {

      const result = results.find(
        item =>
          item.subject === "Mathematics" ||
          item.subject === "Mathematical Literacy"
      );

      return result
        ? Number(result.mark)
        : null;
    }


    // First Additional Language
    if (type === "firstAdditionalLanguage") {

      const result = results.find(
        item =>
          item.subject &&
          item.subject.includes("First Additional Language")
      );

      return result
        ? Number(result.mark)
        : null;
    }


    // Specific elective
    if (type === "elective") {

      const result = results.find(
        item =>
          allowedSubjects.includes(item.subject)
      );

      return result
        ? Number(result.mark)
        : null;
    }


    return null;
  };


  // --------------------------------
  // Determine eligibility
  // --------------------------------

  let eligibility = {
    text: "Complete Academic Profile",
    className: "eligibility-grey"
  };


  if (aps !== null) {

    // Check APS
    const apsPassed = aps >= programme.minAPS;


    // Check subjects
    const requirementResults = programme.requirements.map(
      requirement => {

        const studentMark = findStudentMark(
          requirement.type,
          requirement.subjects || []
        );

        return (
          studentMark !== null &&
          studentMark >= requirement.minimumMark
        );

      }
    );


    const subjectsPassed =
      requirementResults.every(result => result);


    const eligible =
      apsPassed && subjectsPassed;


    // --------------------------------
    // Display result
    // --------------------------------

    if (eligible) {

      eligibility = {
        text: "Eligible",
        className: "eligibility-green"
      };

    }

    else if (apsPassed) {

      eligibility = {
        text: "Not Eligible",
        className: "eligibility-red"
      };

    }

    else if (aps >= programme.minAPS - 2) {

      eligibility = {
        text: "Borderline",
        className: "eligibility-orange"
      };

    }

    else {

      eligibility = {
        text: "Not Eligible",
        className: "eligibility-red"
      };

    }

  }


  return (

    <div className="programme-card">


      <div className="programme-card-header">

        <span className="programme-university">
          {programme.university}
        </span>

        <span className="programme-status">
          {programme.applicationStatus}
        </span>

      </div>


      <h2>{programme.name}</h2>


      <p className="programme-description">
        {programme.description ||
          `${programme.name} at ${programme.university}.`
        }
      </p>


      <div className="programme-details">


        <div>
          <strong>Field</strong>
          <p>{programme.field}</p>
        </div>


        <div>
          <strong>APS Required</strong>
          <p>{programme.minAPS}</p>
        </div>


        <div className={eligibility.className}>
          {eligibility.text}
        </div>


      </div>


      <Link
        to={`/programmes/${programme.id}`}
        className="primary-btn"
      >
        View Details
      </Link>


    </div>

  );

}

export default ProgrammeCard;