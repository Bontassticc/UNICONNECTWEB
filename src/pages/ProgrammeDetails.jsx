import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AcademicContext } from "../context/AcademicContext";
import Navbar from "../components/Navbar";
import programmes from "../data/programmes";

function ProgrammeDetails() {

  const navigate = useNavigate();

  const { aps, studentMarks } = useContext(AcademicContext);

  const { id } = useParams();

  const programme = programmes.find(
    (p) => p.id === Number(id)
  );


  // --------------------------------
  // Programme not found
  // --------------------------------

  if (!programme) {

    return (
      <>
        <Navbar />

        <section className="programme-details-page">

          <div className="details-card">

            <h2>Programme not found</h2>

            <p>
              Sorry, we could not find this programme.
            </p>

            <button
              className="back-btn"
              onClick={() => navigate("/programmes")}
            >
              ← Back to Programmes
            </button>

          </div>

        </section>
      </>
    );

  }


  // --------------------------------
  // Check if student has results
  // --------------------------------

  const hasResults =
    aps !== null &&
    Object.keys(studentMarks).length > 0;


  // --------------------------------
  // Check APS requirement
  // --------------------------------

  const apsPassed =
    hasResults &&
    aps >= programme.minAPS;


  // --------------------------------
  // Find student's mark
  // --------------------------------

  const findStudentMark = (
    type,
    allowedSubjects = []
  ) => {

    const results = Object.values(studentMarks);


    // Mathematics
    if (type === "mathematics") {

      const result = results.find(
        item =>
          item.subject === "Mathematics"
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
          item.subject.toLowerCase().includes(
            "first additional language"
          )
      );

      return result
        ? Number(result.mark)
        : null;
    }


    // Specific elective
    if (type === "elective") {

      const result = results.find(
        item =>
          allowedSubjects.includes(
            item.subject
          )
      );

      return result
        ? Number(result.mark)
        : null;
    }


    return null;

  };


  // --------------------------------
  // Evaluate requirements
  // --------------------------------

  const requirementResults =
    programme.requirements.map(
      (requirement) => {

        const studentMark =
          findStudentMark(
            requirement.type,
            requirement.subjects || []
          );


        const passed =
          studentMark !== null &&
          studentMark >= requirement.minimumMark;


        return {
          ...requirement,
          studentMark,
          passed
        };

      }
    );


  // --------------------------------
  // Check subject requirements
  // --------------------------------

  const subjectsPassed =
    requirementResults.every(
      requirement =>
        requirement.passed
    );


  // --------------------------------
  // Overall eligibility
  // --------------------------------

  const eligible =
    hasResults &&
    apsPassed &&
    subjectsPassed;


  return (
    <>

      <Navbar />


      <section className="programme-details-page">


        {/* --------------------------------
            Programme Header
        -------------------------------- */}

        <div className="programme-hero">

          <h1>
            {programme.name}
          </h1>

          <h3>
            {programme.university}
          </h3>

          <span className="status">
            {programme.field}
          </span>

        </div>


        <div className="details-grid">


          {/* --------------------------------
              Eligibility Check
          -------------------------------- */}

          <div className="details-card">

            <h2>
              Eligibility Check
            </h2>


            <p>

              <strong>Your APS:</strong>{" "}

              {hasResults
                ? aps
                : "Not calculated"
              }

            </p>


            <p>

              <strong>Required APS:</strong>{" "}

              {programme.minAPS}

            </p>


            {/* APS status */}

            <p>

              {!hasResults

                ? "⚠️ Complete your Academic Profile to check your eligibility."

                : apsPassed

                  ? "✅ APS Requirement Met"

                  : "❌ APS Requirement Not Met"

              }

            </p>


            <hr />


            <h3>
              Subject Requirements
            </h3>


            {requirementResults.map(
              (requirement, index) => (

                <div
                  className="requirement-item"
                  key={index}
                >

                  <strong>
                    {requirement.label}
                  </strong>


                  <p>
                    Required:{" "}
                    {requirement.minimumMark}%
                  </p>


                  <p>

                    Your Mark:{" "}

                    {requirement.studentMark !== null

                      ? `${requirement.studentMark}%`

                      : "--"

                    }

                  </p>


                  <p>

                    {!hasResults

                      ? "⚠️ Enter your results to check this requirement."

                      : requirement.studentMark === null

                        ? "⚠️ Subject result not found"

                        : requirement.passed

                          ? "✅ Requirement Met"

                          : "❌ Does not meet requirement"

                    }

                  </p>

                </div>

              )
            )}


            <hr />


            {/* --------------------------------
                Overall Result
            -------------------------------- */}

            <div className="eligibility-result">

              <h3>
                Overall Result
              </h3>


              {!hasResults

                ? (

                  <p>
                    ⚠️ Complete your Academic Profile
                    to check eligibility.
                  </p>

                )

                : eligible

                  ? (

                    <p>
                      🎉 You meet the current
                      requirements for this programme.
                    </p>

                  )

                  : (

                    <p>
                      ❌ You currently do not meet
                      all the requirements for this programme.
                    </p>

                  )

              }

            </div>

          </div>


          {/* --------------------------------
              Programme Overview
          -------------------------------- */}

          <div className="details-card">

            <h2>
              Programme Overview
            </h2>

            <p>
              {programme.name} at{" "}
              {programme.university} is a
              programme in the{" "}
              {programme.field} field.
            </p>

          </div>


          {/* --------------------------------
              Entry Requirements
          -------------------------------- */}

          <div className="details-card">

            <h2>
              Entry Requirements
            </h2>


            <p>

              <strong>APS Required:</strong>{" "}

              {programme.minAPS}

            </p>


            <h3>
              Required Subjects
            </h3>


            <ul>

              {programme.requirements.map(
                (requirement, index) => (

                  <li key={index}>

                    {requirement.label}
                    {" "}
                    ({requirement.minimumMark}%)

                  </li>

                )
              )}

            </ul>

          </div>


          {/* --------------------------------
              Programme Information
          -------------------------------- */}

          <div className="details-card">

            <h2>
              Programme Information
            </h2>


            <p>

              <strong>
                University:
              </strong>{" "}

              {programme.university}

            </p>


            <p>

              <strong>
                Field:
              </strong>{" "}

              {programme.field}

            </p>

          </div>


        </div>


        {/* --------------------------------
            Back Button
        -------------------------------- */}

        <button
          className="back-btn"
          onClick={() =>
            navigate("/programmes")
          }
        >
          ← Back to Programmes
        </button>


      </section>

    </>

  );

}

export default ProgrammeDetails;