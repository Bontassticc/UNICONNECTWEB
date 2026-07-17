import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ResultsForm from "../components/ResultsForm";

import { AcademicContext } from "../context/AcademicContext";

function MyResults() {
  const navigate = useNavigate();

  const { setStudentMarks } = useContext(AcademicContext);

  const handleSubmit = (results) => {
    console.log(results);

    setStudentMarks(results);

    navigate("/programmes");
  };

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
      </section>
    </>
  );
}

export default MyResults;