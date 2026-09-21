import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ResultsForm from "../components/ResultsForm";
import { calculateAPS } from "../utils/apsCalculator";
import { AcademicContext } from "../context/AcademicContext";
import { useNavigate } from "react-router-dom";
import universities from "../data/universities";

function AcademicProfile() {

  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);


  // --------------------------------
  // Login protection
  // --------------------------------

  useEffect(() => {

    const isLoggedIn =
      localStorage.getItem("uniConnectLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }

  }, [navigate]);


  const {
    studentProfile,
    setStudentProfile,
    setStudentMarks,
    aps,
    setAPS,
    resetProfile
  } = useContext(AcademicContext);


  // --------------------------------
  // Dynamic data counts
  // --------------------------------

  const universityCount = universities.length;

  const programmeCount = universities.reduce(
    (total, university) =>
      total + university.programmes.length,
    0
  );


  // --------------------------------
  // Profile input
  // --------------------------------

  const handleProfileChange = (field, value) => {

    setStudentProfile({
      ...studentProfile,
      [field]: value
    });

  };


  // --------------------------------
  // Results submission
  // --------------------------------

  const handleResultsSubmit = (results) => {

    const missingFields = [];


    // --------------------------------
    // Check student information
    // --------------------------------

    if (!studentProfile.firstName.trim()) {
      missingFields.push("First Name");
    }

    if (!studentProfile.surname.trim()) {
      missingFields.push("Surname");
    }

    if (!studentProfile.school.trim()) {
      missingFields.push("School");
    }

    if (!studentProfile.province.trim()) {
      missingFields.push("Province");
    }


    // --------------------------------
    // Check required subjects
    // --------------------------------

    if (
      !results.homeLanguage.subject ||
      results.homeLanguage.mark === ""
    ) {
      missingFields.push("Home Language");
    }

    if (
      !results.firstAdditional.subject ||
      results.firstAdditional.mark === ""
    ) {
      missingFields.push("First Additional Language");
    }

    if (
      !results.mathematics.subject ||
      results.mathematics.mark === ""
    ) {
      missingFields.push("Mathematics / Mathematical Literacy");
    }

    if (
      !results.lifeOrientation.subject ||
      results.lifeOrientation.mark === ""
    ) {
      missingFields.push("Life Orientation");
    }


    // --------------------------------
    // Check electives
    // --------------------------------

    const completedElectives = [
      results.elective1,
      results.elective2,
      results.elective3,
      results.elective4
    ].filter(
      elective =>
        elective.subject &&
        elective.mark !== ""
    );


    if (completedElectives.length < 3) {

      missingFields.push(
        "At least 3 elective subjects"
      );

    }


    // --------------------------------
    // Check mark ranges
    // --------------------------------

    for (const result of Object.values(results)) {

      if (result.mark === "") {
        continue;
      }

      const mark = Number(result.mark);

      if (mark < 0 || mark > 100) {

        setStatus({
          type: "error",
          message: "Please make sure all marks are between 0 and 100."
        });

        return;
      }

    }


    // --------------------------------
    // Stop if information is missing
    // --------------------------------

    if (missingFields.length > 0) {

      setStatus({
        type: "error",
        message: (
          <>
            <strong>
              Please complete the following before saving your academic profile:
            </strong>

            <ul>
              {missingFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </>
        )
      });

      return;
    }


    // --------------------------------
    // Calculate APS
    // --------------------------------

    const calculatedAPS = calculateAPS(results);


    // --------------------------------
    // Save results
    // --------------------------------

    setIsSaving(true);
    setStatus(null);

    setTimeout(() => {

      setStudentMarks(results);

      setAPS(calculatedAPS);

      setIsSaving(false);

      setStatus({
        type: "success",
        message: `Academic profile saved successfully. Your APS is ${calculatedAPS}.`
      });

    }, 500);

  };


  // --------------------------------
  // Reset profile
  // --------------------------------

  const handleReset = () => {

    const confirmReset = window.confirm(
      "Reset all saved academic information?"
    );

    if (confirmReset) {

      resetProfile();

      navigate("/");

    }

  };


  // --------------------------------
  // Page
  // --------------------------------

  return (

    <>

      <Navbar />


      <section className="profile-page">


        <div className="profile-header">

          <h1>Academic Profile</h1>

          <p>
            Complete your academic profile once. UniConnect will
            automatically use this information when checking
            programme eligibility.
          </p>

        </div>


        <div className="profile-dashboard">


          {/* Status Messages */}

          {isSaving && (
            <div className="profile-status loading">
              Saving your academic profile...
            </div>
          )}

          {status && !isSaving && (
            <div className={`profile-status ${status.type}`}>
              {status.message}
            </div>
          )}


          {/* Student Information */}

          <div className="profile-card">

            <h2>Student Information</h2>

            <div className="profile-grid">

              <div className="form-field">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={studentProfile.firstName}
                  onChange={(e) =>
                    handleProfileChange(
                      "firstName",
                      e.target.value
                    )
                  }
                />
              </div>


              <div className="form-field">
                <label htmlFor="surname">Surname</label>
                <input
                  id="surname"
                  type="text"
                  value={studentProfile.surname}
                  onChange={(e) =>
                    handleProfileChange(
                      "surname",
                      e.target.value
                    )
                  }
                />
              </div>


              <div className="form-field">
                <label htmlFor="school">School</label>
                <input
                  id="school"
                  type="text"
                  value={studentProfile.school}
                  onChange={(e) =>
                    handleProfileChange(
                      "school",
                      e.target.value
                    )
                  }
                />
              </div>


              <div className="form-field">
                <label htmlFor="province">Province</label>
                <input
                  id="province"
                  type="text"
                  value={studentProfile.province}
                  onChange={(e) =>
                    handleProfileChange(
                      "province",
                      e.target.value
                    )
                  }
                />
              </div>

            </div>

          </div>


          {/* Grade 12 Results */}

          <div className="profile-card">

            <h2>Grade 12 Results</h2>

            <ResultsForm
              onSubmit={handleResultsSubmit}
            />

          </div>


          {/* Academic Snapshot */}

          <h2>Academic Snapshot</h2>


          <div className="summary-item">

            <span>APS Score</span>

            <div className="aps-card">

              <h3>Your APS</h3>

              <h1>
                {aps ?? "--"}
              </h1>

              <p>

                {aps !== null
                  ? "Calculated from your latest Grade 12 results."
                  : "Enter your Grade 12 results to calculate your APS."
                }

              </p>

            </div>

          </div>


          {/* University Count */}

          <div className="summary-item">

            <span>Universities</span>

            <p>
              {universityCount} Available
            </p>

          </div>


          {/* Programme Count */}

          <div className="summary-item">

            <span>Programmes</span>

            <p>
              {programmeCount} Available
            </p>

          </div>


          {/* Reset */}

          <button
            className="reset-btn"
            onClick={handleReset}
          >
            Reset Academic Profile
          </button>


        </div>

      </section>

    </>

  );

}

export default AcademicProfile;