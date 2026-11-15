
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";

import { AcademicContext } from "../context/AcademicContextValue";

function ProgrammeCard({
  programme,
  isSaved = false,
  onToggleSave
}) {
  const { aps, studentMarks } = useContext(AcademicContext);

  const findStudentMark = (type, allowedSubjects = []) => {
    const results = Object.values(studentMarks);

    if (type === "mathematics") {
      const result = results.find(
        (item) => item.subject === "Mathematics"
      );

      return result ? Number(result.mark) : null;
    }

    if (type === "mathematicsOrLiteracy") {
      const result = results.find(
        (item) =>
          item.subject === "Mathematics" ||
          item.subject === "Mathematical Literacy"
      );

      return result ? Number(result.mark) : null;
    }

    if (type === "firstAdditionalLanguage") {
      const result = results.find(
        (item) =>
          item.subject &&
          item.subject.includes("First Additional Language")
      );

      return result ? Number(result.mark) : null;
    }

    if (type === "elective") {
      const result = results.find(
        (item) => allowedSubjects.includes(item.subject)
      );

      return result ? Number(result.mark) : null;
    }

    return null;
  };

  const hasResults =
    aps !== null &&
    Object.keys(studentMarks).length > 0;

  let eligibility = {
    text: "Complete Academic Profile",
    className: "eligibility-grey"
  };

  if (hasResults) {
    const apsPassed = aps >= programme.minAPS;

    const requirementResults = (
      programme.requirements || []
    ).map((requirement) => {
      const studentMark = findStudentMark(
        requirement.type,
        requirement.subjects || []
      );

      return (
        studentMark !== null &&
        studentMark >= requirement.minimumMark
      );
    });

    const subjectsPassed = requirementResults.every(
      (result) => result
    );

    const eligible = apsPassed && subjectsPassed;

    if (eligible) {
      eligibility = {
        text: "Eligible",
        className: "eligibility-green"
      };
    } else if (apsPassed) {
      eligibility = {
        text: "Not Eligible",
        className: "eligibility-red"
      };
    } else if (aps >= programme.minAPS - 2) {
      eligibility = {
        text: "Borderline",
        className: "eligibility-orange"
      };
    } else {
      eligibility = {
        text: "Not Eligible",
        className: "eligibility-red"
      };
    }
  }

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
          className={`programme-save-btn ${isSaved ? "saved" : ""}`}
          onClick={() => onToggleSave?.(programme.id)}
          aria-label={
            isSaved
              ? `Remove ${programme.name} from saved programmes`
              : `Save ${programme.name}`
          }
          aria-pressed={isSaved}
        >
          {isSaved ? (
            <BookmarkCheck size={18} />
          ) : (
            <Bookmark size={18} />
          )}

          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default ProgrammeCard;
