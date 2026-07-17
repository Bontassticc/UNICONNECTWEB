import React, { useState } from "react";

import { calculateAPS } from "../utils/apsCalculator";
import { checkEligibility } from "../utils/eligibilityChecker";

import subjectsData from "../data/subjects";
import programmes from "../data/programmes";

import ResultsCard from "./ResultsCard";

function APSForm() {

  const [subjects, setSubjects] = useState([
    { name: "", mark: "" },
    { name: "", mark: "" },
    { name: "", mark: "" },
    { name: "", mark: "" },
    { name: "", mark: "" },
    { name: "", mark: "" },
  ]);

  const [apsScore, setApsScore] = useState(null);

  const [results, setResults] = useState([]);

  function handleChange(index, field, value){

    const updatedSubjects = [...subjects];

    updatedSubjects[index][field] = value;

    setSubjects(updatedSubjects);
  }

  function handleCalculate(){

    const score = calculateAPS(subjects);

    const emptyFields = subjects.some(
  (subject)=>
    subject.name === "" || subject.mark === ""
);

if(emptyFields){
  alert("Please complete all subject fields.");
  return;
}

    setApsScore(score);

    const eligibilityResults =
      checkEligibility(score, programmes);

    setResults(eligibilityResults);
  }

  return (
    <div className="calculator-container">

      <div className="calculator-card">

        <h2>APS Calculator</h2>

        <p>
          Enter your Grade 12 subjects and marks.
        </p>

        <div className="subjects-list">

          {subjects.map((subject, index)=>(
            <div className="subject-row" key={index}>

              <select
  value={subject.name}
  onChange={(e)=>
    handleChange(index, "name", e.target.value)
  }
>

  <option value="">
    Select Subject
  </option>

  {subjectsData.map((subjectName, i)=>(
    <option key={i} value={subjectName}>
      {subjectName}
    </option>
  ))}

</select>

              <input
                type="number"
                min="0"
                max="100"
                placeholder="Mark %"
                value={subject.mark}
                onChange={(e)=>
                  handleChange(index, "mark", e.target.value)
                }
              />

            </div>
          ))}

        </div>

        <button
          className="primary-btn"
          onClick={handleCalculate}
        >
          Calculate APS
        </button>

        {apsScore !== null && (

          <>

            <div className="aps-result">

              <h3>Your APS Score</h3>

              <div className="aps-score">
                {apsScore}
              </div>

            </div>

            <div className="results-section">

              <h2>Programme Eligibility</h2>

              <div className="results-grid">

                {results.map((programme, index)=>(
                  <ResultsCard
                    key={index}
                    programme={programme}
                  />
                ))}

              </div>

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default APSForm;