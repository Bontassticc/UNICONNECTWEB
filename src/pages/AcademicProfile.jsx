import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import ResultsForm from "../components/ResultsForm";
import { calculateAPS } from "../utils/apsCalculator";
import { AcademicContext } from "../context/AcademicContext";
import { useNavigate } from "react-router-dom";

function AcademicProfile() {

  const navigate = useNavigate();

  const {
    studentProfile,
    setStudentProfile,
    setStudentMarks,
    aps,
    setAPS,
    resetProfile
  } = useContext(AcademicContext);


  // -----------------------------
  // Profile input
  // -----------------------------

  const handleProfileChange = (field, value) => {

    setStudentProfile({
      ...studentProfile,
      [field]: value
    });

  };


  // -----------------------------
  // Results submission
  // -----------------------------

  const handleResultsSubmit = (results) => {

    // Check that all subjects have been completed
    const incompleteSubjects = Object.entries(results).filter(
      ([, result]) =>
        !result.subject ||
        result.mark === "" ||
        result.mark === null ||
        result.mark === undefined
    );

    if (incompleteSubjects.length > 0) {

      alert(
        "Please complete all required subjects and enter a mark for each subject before saving your results."
      );

      return;
    }


    // Calculate APS
    const calculatedAPS = calculateAPS(results);


    // Save results to Context
    setStudentMarks(results);

    // Save APS to Context
    setAPS(calculatedAPS);


    alert(
      `Profile saved successfully!\n\nAPS: ${calculatedAPS}`
    );

  };


  // -----------------------------
  // Reset profile
  // -----------------------------

  const handleReset = () => {

    const confirmReset = window.confirm(
      "Reset all saved academic information?"
    );

    if (confirmReset) {

      resetProfile();

      navigate("/");

    }

  };


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


          {/* -----------------------------
              Student Information
          ----------------------------- */}

          <div className="profile-card">

            <h2>Student Information</h2>

            <div className="profile-grid">

              <input
                placeholder="First Name"
                value={studentProfile.firstName}
                onChange={(e) =>
                  handleProfileChange(
                    "firstName",
                    e.target.value
                  )
                }
              />


              <input
                placeholder="Surname"
                value={studentProfile.surname}
                onChange={(e) =>
                  handleProfileChange(
                    "surname",
                    e.target.value
                  )
                }
              />


              <input
                placeholder="School"
                value={studentProfile.school}
                onChange={(e) =>
                  handleProfileChange(
                    "school",
                    e.target.value
                  )
                }
              />


              <input
                placeholder="Province"
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


          {/* -----------------------------
              Grade 12 Results
          ----------------------------- */}

          <div className="profile-card">

            <h2>Grade 12 Results</h2>

            <ResultsForm
              onSubmit={handleResultsSubmit}
            />

          </div>


          {/* -----------------------------
              Academic Snapshot
          ----------------------------- */}

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


          {/* -----------------------------
              University Count
          ----------------------------- */}

          <div className="summary-item">

            <span>Universities</span>

            <p>
              3 Available
            </p>

          </div>


          {/* -----------------------------
              Programme Count
          ----------------------------- */}

          <div className="summary-item">

            <span>Programmes</span>

            <p>
              6 Available
            </p>

          </div>


          {/* -----------------------------
              Reset
          ----------------------------- */}

          <button
            className="reset-btn"
            onClick={handleReset}
          >
            🔄 Reset Academic Profile
          </button>


        </div>

      </section>

    </>

  );

}

export default AcademicProfile;