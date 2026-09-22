import React from "react";

import programmes from "../data/programmes";

function UniversityCard({ university }) {

  const universityNameMap = {
    Wits: "Wits University",
    UNISA: "UNISA"
  };

  const programmeUniversityName =
    universityNameMap[university.shortName] || university.name;

  const universityProgrammes = programmes.filter(
    (programme) =>
      programme.university === programmeUniversityName
  );

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

      {universityProgrammes.length > 0 ? (

        <div className="programmes-preview">

          {universityProgrammes.map((programme) => (

            <div
              className="programme-preview"
              key={programme.id}
            >

              <div>
                <strong>{programme.name}</strong>
                <p>{programme.field}</p>
              </div>

              <div className="programme-right">
                <span>APS {programme.minAPS}</span>
                <p>
                  {programme.spaces || "Available"}
                </p>
              </div>

            </div>

          ))}

        </div>

      ) : (

        <div className="university-programmes-empty">

          <p>
            No programme information is currently available.
          </p>

        </div>

      )}

    </div>
  );
}

export default UniversityCard;