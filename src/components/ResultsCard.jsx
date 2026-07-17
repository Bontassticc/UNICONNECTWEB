import React from "react";

function ResultsCard({ programme }) {

  function getStatusClass(){

    if(programme.status === "Eligible"){
      return "eligible";
    }

    if(programme.status === "Borderline"){
      return "borderline";
    }

    return "not-eligible";
  }

  return (
    <div className="results-card">

      <div className="results-top">

        <h3>{programme.name}</h3>

        <span className={getStatusClass()}>
          {programme.status}
        </span>

      </div>

      <p>{programme.university}</p>

      <div className="results-info">

        <div>
          <strong>Minimum APS</strong>
          <p>{programme.minAPS}</p>
        </div>

        <div>
          <strong>Field</strong>
          <p>{programme.field}</p>
        </div>

      </div>

    </div>
  );
}

export default ResultsCard;