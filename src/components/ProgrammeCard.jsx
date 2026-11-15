
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";

import { AcademicContext } from "../context/AcademicContextValue";
import { checkEligibility } from "../utils/checkEligibility";

function ProgrammeCard({
  programme,
  isSaved = false,
  onToggleSave
}) {
  const { aps, studentMarks } = useContext(AcademicContext);

  // Use the same eligibility logic as Programme Details.
  const eligibilityResult = checkEligibility(
    programme,
    aps,
    studentMarks
  );

  // Preserve the existing card wording for incomplete profiles.
  const eligibility = {
    text:
      eligibilityResult.status === "Incomplete"
        ? "Complete Academic Profile"
        : eligibilityResult.status,
    className: eligibilityResult.className
  };

  const applicationStatus =
    programme.applicationStatus || "Admissions Information";

  return (
    <div className="programme-card">
      <div className="programme-card-header">
        <span className="programme-university">
          {programme.university}
        </span>

        <span className="programme-status">
          {applicationStatus}
        </span>
      </div>

      <h2>{programme.name}</h2>

      <p className="programme-description">
        {programme.description ||
          `${programme.name} at ${programme.university}.`}
      </p>

      <div className="programme-details">
        <div>
          <strong>Field</strong>
          <p>{programme.field || "Not specified"}</p>
        </div>

        <div>
          <strong>APS Required</strong>
          <p>{programme.minAPS}</p>
        </div>

        <div className={eligibility.className}>
          {eligibility.text}
        </div>
      </div>

      <div className="programme-card-actions">
        <Link
          to={`/programmes/${programme.id}`}
          className="primary-btn"
        >
          View Details
        </Link>

        <button
          type="button"
          className={`programme-save-btn ${
            isSaved ? "saved" : ""
          }`}
          onClick={() => onToggleSave?.(programme.id)}
          aria-label={
            isSaved
              ? `Remove ${programme.name} from saved programmes`
              : `Save ${programme.name}`
          }
          aria-pressed={isSaved}
        >
          {isSaved ? (
            <BookmarkCheck size={18} aria-hidden="true" />
          ) : (
            <Bookmark size={18} aria-hidden="true" />
          )}

          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default ProgrammeCard;
