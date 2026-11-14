
import { Link } from "react-router-dom";
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

  const applicationStatus =
    university.applications || "Status unavailable";

  const statusClass =
    applicationStatus.toLowerCase() === "open"
      ? "status-open"
      : applicationStatus.toLowerCase() === "closing soon"
        ? "status-closing"
        : applicationStatus.toLowerCase() === "closed"
          ? "status-closed"
          : "status-unknown";

  return (
    <div className="university-card">

      {/* University Header */}

      <div className="university-top">
        <div className="university-identity">
          <h2>{university.shortName}</h2>
          <p>{university.location}</p>
        </div>

        <span
          className={`applications-status ${statusClass}`}
        >
          {applicationStatus}
        </span>
      </div>

      {/* University Information */}

      <div className="university-information">
        <h3>{university.name}</h3>

        <p className="university-description">
          {university.description}
        </p>
      </div>

      {/* Programme Previews */}

      <div className="university-programmes-section">
        <div className="university-programmes-heading">
          <h4>Explore Programmes</h4>
          <span>
            {universityProgrammes.length} available
          </span>
        </div>

        {universityProgrammes.length > 0 ? (
          <div className="programmes-preview">
            {universityProgrammes.map((programme) => (
              <Link
                to={`/programmes/${programme.id}`}
                className="programme-preview"
                key={programme.id}
                aria-label={`View details for ${programme.name} at ${university.name}`}
              >
                <div className="programme-preview-info">
                  <strong>{programme.name}</strong>
                  <p>{programme.field}</p>
                </div>

                <div className="programme-right">
                  <span>APS {programme.minAPS}</span>
                  <p>{programme.spaces || "Available"}</p>
                </div>
              </Link>
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

      <p className="university-status-note">
        Application statuses are illustrative. Confirm
        current dates with the university.
      </p>

    </div>
  );
}

export default UniversityCard;
