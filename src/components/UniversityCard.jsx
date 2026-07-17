import React from "react";

function UniversityCard({ university }) {

  return (
    <div className="university-card">

      <div className="university-top">

        <div>
          <h2>{university.shortName}</h2>
          <p>{university.location}</p>
        </div>

        <span className="applications-status">
          {university.applications}
        </span>

      </div>

      <h3>{university.name}</h3>

      <p className="university-description">
        {university.description}
      </p>

      <div className="programmes-preview">

        {university.programmes.map((programme, index)=>(
          <div
            className="programme-preview"
            key={index}
          >

            <div>
              <strong>{programme.name}</strong>
              <p>{programme.faculty}</p>
            </div>

            <div className="programme-right">
              <span>APS {programme.aps}</span>
              <p>{programme.spaces}</p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default UniversityCard;