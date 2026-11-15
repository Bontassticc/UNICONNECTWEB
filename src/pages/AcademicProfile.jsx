
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Landmark, BookOpen } from "lucide-react";

import Navbar from "../components/Navbar";
import ResultsForm from "../components/ResultsForm";
import { calculateAPS } from "../utils/apsCalculator";
import { AcademicContext } from "../context/AcademicContextValue";
import universities from "../data/universities";
import programmes from "../data/programmes";

function AcademicProfile() {
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Login protection
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

  // Dynamic data counts
  const universityCount = universities.length;
  const programmeCount = programmes.length;

  // Profile input
  const handleProfileChange = (field, value) => {
    setStudentProfile({
      ...studentProfile,
      [field]: value
    });
  };

  // Results submission
  const handleResultsSubmit = (results) => {
    const missingFields = [];

    // Check student information
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

    // Check required subjects
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

    // Check electives
    const completedElectives = [
      results.elective1,
      results.elective2,
      results.elective3,
      results.elective4
    ].filter(
      (elective) =>
        elective.subject &&
        elective.mark !== ""
    );

    if (completedElectives.length < 3) {
      missingFields.push("At least 3 elective subjects");
    }

    // Check mark ranges
    for (const result of Object.values(results)) {
      if (result.mark === "") {
        continue;
      }

      const mark = Number(result.mark);

      if (mark < 0 || mark > 100 || Number.isNaN(mark)) {
        setStatus({
          type: "error",
          message: "Please make sure all marks are between 0 and 100."
        });

        return;
      }
    }

    // Stop if information is missing
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

    // Calculate APS
    const calculatedAPS = calculateAPS(results);

    // Save results
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

  // Reset profile
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
          <span className="profile-eyebrow">
            YOUR STUDENT DASHBOARD
          </span>

          <h1>
            Academic <span>Profile</span>
          </h1>

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
            <div
              className={`profile-status ${status.type}`}
              role="status"
              aria-live="polite"
            >
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
                    handleProfileChange("firstName", e.target.value)
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
                    handleProfileChange("surname", e.target.value)
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
                    handleProfileChange("school", e.target.value)
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
                    handleProfileChange("province", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Grade 12 Results */}
          <div className="profile-card">
            <h2>Grade 12 Results</h2>

            <ResultsForm onSubmit={handleResultsSubmit} />
          </div>

          {/* Academic Snapshot */}
          <div className="academic-snapshot">
            <div className="snapshot-header">
              <div>
                <h2>Academic Snapshot</h2>
                <p>
                  A quick overview of your academic progress
                  and opportunities on UniConnect.
                </p>
              </div>
            </div>

            <div className="snapshot-grid">
              {/* APS Card */}
              <div className="snapshot-card snapshot-aps">
                <div className="snapshot-card-top">
                  <span className="snapshot-label">
                    Your APS Score
                  </span>

                  <span className="snapshot-icon" aria-hidden="true">
                    <GraduationCap size={22} strokeWidth={2} />
                  </span>
                </div>

                <div className="snapshot-value">
                  {aps ?? "--"}
                </div>

                <p>
                  {aps !== null
                    ? "Calculated from your saved Grade 12 results."
                    : "Save your Grade 12 results to calculate your APS."}
                </p>
              </div>

              {/* Universities Card */}
              <div className="snapshot-card">
                <div className="snapshot-card-top">
                  <span className="snapshot-label">
                    Universities
                  </span>

                  <span className="snapshot-icon" aria-hidden="true">
                    <Landmark size={22} strokeWidth={2} />
                  </span>
                </div>

                <div className="snapshot-value">
                  {universityCount}
                </div>

                <p>Institutions to explore</p>
              </div>

              {/* Programmes Card */}
              <div className="snapshot-card">
                <div className="snapshot-card-top">
                  <span className="snapshot-label">
                    Programmes
                  </span>

                  <span className="snapshot-icon" aria-hidden="true">
                    <BookOpen size={22} strokeWidth={2} />
                  </span>
                </div>

                <div className="snapshot-value">
                  {programmeCount}
                </div>

                <p>Programmes to discover</p>
              </div>
            </div>

            <p className="snapshot-note">
              APS requirements may differ between universities.
              Explore individual programmes to check your eligibility.
            </p>
          </div>

          {/* Reset */}
          <button
            type="button"
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
