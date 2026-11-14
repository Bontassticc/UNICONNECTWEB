
import { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { AcademicContext } from "../context/AcademicContextValue";
import { checkEligibility } from "../utils/checkEligibility";
import { getAlternativeProgrammes } from "../utils/getAlternativeProgrammes";

import Navbar from "../components/Navbar";
import programmes from "../data/programmes";

function ProgrammeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { aps, studentMarks } = useContext(AcademicContext);

  const programme = programmes.find(
    (p) => p.id === Number(id)
  );

  if (!programme) {
    return (
      <>
        <Navbar />
        <section className="programme-details-page">
          <div className="details-card">
            <h2>Programme not found</h2>
            <p>Sorry, we could not find this programme.</p>
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

  const eligibility = checkEligibility(
    programme,
    aps,
    studentMarks
  );

  const {
    hasResults,
    apsPassed,
    subjectsPassed,
    requirementResults,
    status,
    className
  } = eligibility;

  const alternatives = getAlternativeProgrammes(
    programme,
    aps,
    studentMarks
  );

  const showAlternatives =
    hasResults && status !== "Eligible";

  return (
    <>
      <Navbar />

      <section className="programme-details-page">

        {/* Programme Header */}

        <div className="programme-hero">
          <h1>{programme.name}</h1>
          <h3>{programme.university}</h3>
          <span className="status">{programme.field}</span>
        </div>

        {/* Main Two-Column Layout */}

        <div className="programme-details-layout">

          {/* LEFT: Eligibility */}

          <div className="details-card eligibility-panel">

            <div className="eligibility-panel-header">
              <div>
                <h2>Eligibility Check</h2>
                <p>
                  See how your academic results compare
                  with the listed entry requirements.
                </p>
              </div>

              <span className={className}>
                {hasResults
                  ? status
                  : "Incomplete"}
              </span>
            </div>

            {/* APS Summary */}

            <div className="aps-summary">
              <div>
                <span>Your APS</span>
                <strong>
                  {hasResults ? aps : "--"}
                </strong>
              </div>

              <div>
                <span>Required APS</span>
                <strong>{programme.minAPS}</strong>
              </div>
            </div>

            <p className="aps-feedback">
              {!hasResults
                ? "Complete your Academic Profile to check eligibility."
                : apsPassed
                  ? "✓ APS Requirement Met"
                  : "✗ APS Requirement Not Met"}
            </p>

            {/* Subject Requirements */}

            <div className="eligibility-subjects">
              <h3>Subject Requirements</h3>

              {requirementResults.map((requirement, index) => {
                const mark = requirement.studentMark;

                const progress =
                  mark !== null
                    ? Math.min(
                        (mark / requirement.minimumMark) * 100,
                        100
                      )
                    : 0;

                return (
                  <div
                    className="subject-check-card"
                    key={index}
                  >
                    <div className="subject-check-header">
                      <strong>{requirement.label}</strong>

                      <span
                        className={
                          !hasResults || mark === null
                            ? "subject-check-pending"
                            : requirement.passed
                              ? "subject-check-passed"
                              : "subject-check-failed"
                        }
                      >
                        {!hasResults || mark === null
                          ? "Not checked"
                          : requirement.passed
                            ? "✓ Met"
                            : "✗ Not Met"}
                      </span>
                    </div>

                    <div className="subject-check-marks">
                      <span>
                        Your mark:{" "}
                        <strong>
                          {mark !== null
                            ? `${mark}%`
                            : "Not entered"}
                        </strong>
                      </span>

                      <span>
                        Required:{" "}
                        <strong>
                          {requirement.minimumMark}%
                        </strong>
                      </span>
                    </div>

                    <div
                      className="subject-progress-track"
                      role="progressbar"
                      aria-label={`${requirement.label} progress toward minimum mark`}
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className={
                          requirement.passed
                            ? "subject-progress-fill passed"
                            : "subject-progress-fill failed"
                        }
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {requirement.matchedSubject &&
                      requirement.matchedSubject !==
                        requirement.label && (
                        <p className="matched-subject">
                          Subject used:{" "}
                          {requirement.matchedSubject}
                        </p>
                      )}
                  </div>
                );
              })}
            </div>

            {/* Overall Result */}

            <div className="eligibility-result">
              <h3>Overall Result</h3>

              <div className={className}>
                {hasResults
                  ? status
                  : "Complete Academic Profile"}
              </div>

              {!hasResults ? (
                <p>
                  Complete your Academic Profile
                  to check eligibility.
                </p>
              ) : status === "Eligible" ? (
                <p>
                  You meet the listed academic requirements
                  for this programme.
                </p>
              ) : status === "Borderline" ? (
                <p>
                  You meet the listed subject requirements,
                  but your APS is within two points below
                  the listed minimum. Borderline is a
                  UniConnect guidance category, not an
                  official university admission status.
                </p>
              ) : (
                <>
                  <p>
                    You currently do not meet all the listed
                    academic requirements for this programme.
                  </p>

                  {!apsPassed && (
                    <p>
                      Your APS is below the required
                      score of {programme.minAPS}.
                    </p>
                  )}

                  {!subjectsPassed && (
                    <p>
                      One or more subject requirements
                      have not been met or have missing marks.
                    </p>
                  )}
                </>
              )}

              <p className="eligibility-disclaimer">
                Eligibility is based on UniConnect's stored
                programme information and does not guarantee
                admission. Confirm current requirements with
                the university.
              </p>
            </div>
          </div>

          {/* RIGHT: Programme Information */}

          <div className="programme-info-column">

            <div className="details-card">
              <h2>Programme Overview</h2>

              <p>
                {programme.name} at {programme.university}{" "}
                is a programme in the {programme.field} field.
              </p>

              <p>
                <strong>Qualification:</strong>{" "}
                {programme.qualification || "Not specified"}
              </p>
            </div>

            <div className="details-card">
              <h2>Entry Requirements</h2>

              <p>
                <strong>APS Required:</strong>{" "}
                {programme.minAPS}
              </p>

              <h3>Required Subjects</h3>

              <ul>
                {(programme.requirements || []).map(
                  (requirement, index) => (
                    <li key={index}>
                      {requirement.label}{" "}
                      ({requirement.minimumMark}%)
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="details-card">
              <h2>Programme Information</h2>

              <p>
                <strong>University:</strong>{" "}
                {programme.university}
              </p>

              <p>
                <strong>Field:</strong>{" "}
                {programme.field}
              </p>

              <p>
                <strong>Qualification:</strong>{" "}
                {programme.qualification || "Not specified"}
              </p>
            </div>

          </div>
        </div>

        {/* Alternative Programme Recommendations */}

        {showAlternatives && (
          <div className="details-card alternatives-section">
            <h2>Explore Alternative Programmes</h2>

            <p>
              Your academic journey doesn't have to end
              with one programme. Explore other opportunities
              in the {programme.field} field based on your
              academic results.
            </p>

            {alternatives.length > 0 ? (
              <div className="alternatives-grid">
                {alternatives.map((alternative) => (
                  <div
                    key={alternative.id}
                    className="programme-card alternative-card"
                  >
                    <span className="programme-university">
                      {alternative.university}
                    </span>

                    <h3>{alternative.name}</h3>

                    <p>
                      <strong>Qualification:</strong>{" "}
                      {alternative.qualification}
                    </p>

                    <p>
                      <strong>Required APS:</strong>{" "}
                      {alternative.minAPS}
                    </p>

                    <div className="eligibility-green">
                      Eligible
                    </div>

                    <Link
                      to={`/programmes/${alternative.id}`}
                      className="primary-btn"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>
                We couldn't find an eligible alternative
                in this field using the programmes currently
                available on UniConnect. You can still
                explore other fields and universities.
              </p>
            )}

            <p className="eligibility-disclaimer">
              Recommendations are based on the programme
              information currently stored in UniConnect.
              Always confirm official admission requirements
              with the university.
            </p>
          </div>
        )}

        <button
          className="back-btn"
          onClick={() => navigate("/programmes")}
        >
          ← Back to Programmes
        </button>

      </section>
    </>
  );
}

export default ProgrammeDetails;
