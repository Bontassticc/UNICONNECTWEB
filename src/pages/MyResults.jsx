
import { useContext, useState } from "react";

import Navbar from "../components/Navbar";
import ResultsForm from "../components/ResultsForm";

import { AcademicContext } from "../context/AcademicContext";
import { calculateAPS } from "../utils/apsCalculator";

function MyResults() {
  const {
    setStudentMarks,
    aps,
    setAPS
  } = useContext(AcademicContext);

  const [submittedAPS, setSubmittedAPS] = useState(null);

  const handleSubmit = (results) => {
    const calculatedAPS = calculateAPS(results);

    setStudentMarks(results);
    setAPS(calculatedAPS);
    setSubmittedAPS(calculatedAPS);
  };

  const displayedAPS =
    submittedAPS !== null ? submittedAPS : aps;

  return (
    <>
      <Navbar />

      <section className="results-page">
        <div className="results-header">
          <h1>My Results</h1>

          <p>
            Enter your Grade 12 results below to build your academic profile.
          </p>
        </div>

        <ResultsForm onSubmit={handleSubmit} />

        {displayedAPS !== null && (
          <section
            className="aps-result"
            aria-live="polite"
          >
            <h2>Your APS Score</h2>

            <p>
              Your calculated APS is:
              {" "}
              <strong>{displayedAPS}</strong>
            </p>

            <p>
              You can now use this score when exploring programmes.
            </p>
          </section>
        )}
      </section>
    </>
  );
}

export default MyResults;
