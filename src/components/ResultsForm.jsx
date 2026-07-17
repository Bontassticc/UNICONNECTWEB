
import React, { useState, useContext, useEffect } from "react";
import { AcademicContext } from "../context/AcademicContext";

import SubjectRow from "./SubjectRow";
import subjects from "../data/subjects";

function ResultsForm({ onSubmit }) {

  const { studentMarks } = useContext(AcademicContext);

  const homeLanguages = subjects.filter(subject =>
    subject.name.includes("Home Language")
  );

  const firstAdditionalLanguages = subjects.filter(subject =>
    subject.name.includes("First Additional Language")
  );

  const mathsSubjects = subjects.filter(subject =>
    subject.category === "Mathematics"
  );

  const lifeOrientation = subjects.filter(subject =>
    subject.name === "Life Orientation"
  );

  const electives = subjects.filter(subject =>
    subject.category === "Elective"
  );

  const emptyResults = {
    homeLanguage: { subject: "", mark: "" },
    firstAdditional: { subject: "", mark: "" },
    mathematics: { subject: "", mark: "" },
    lifeOrientation: { subject: "", mark: "" },
    elective1: { subject: "", mark: "" },
    elective2: { subject: "", mark: "" },
    elective3: { subject: "", mark: "" },
    elective4: { subject: "", mark: "" },
  };

  const [results, setResults] = useState(
    Object.keys(studentMarks).length > 0
      ? studentMarks
      : emptyResults
  );

  useEffect(() => {

    if (Object.keys(studentMarks).length > 0) {
      setResults(studentMarks);
    }

  }, [studentMarks]);
  const updateResult = (key, field, value) => {

    setResults(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));

  };

  return (

    <form
      className="results-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(results);
      }}
    >

      <SubjectRow
        label="Home Language"
        subjects={homeLanguages}
        value={results.homeLanguage.subject}
        mark={results.homeLanguage.mark}
        onSubjectChange={(value) =>
          updateResult("homeLanguage", "subject", value)
        }
        onMarkChange={(value) =>
          updateResult("homeLanguage", "mark", value)
        }
      />

      <SubjectRow
        label="First Additional Language"
        subjects={firstAdditionalLanguages}
        value={results.firstAdditional.subject}
        mark={results.firstAdditional.mark}
        onSubjectChange={(value) =>
          updateResult("firstAdditional", "subject", value)
        }
        onMarkChange={(value) =>
          updateResult("firstAdditional", "mark", value)
        }
      />

      <SubjectRow
        label="Mathematics"
        subjects={mathsSubjects}
        value={results.mathematics.subject}
        mark={results.mathematics.mark}
        onSubjectChange={(value) =>
          updateResult("mathematics", "subject", value)
        }
        onMarkChange={(value) =>
          updateResult("mathematics", "mark", value)
        }
      />

      <SubjectRow
        label="Life Orientation"
        subjects={lifeOrientation}
        value={results.lifeOrientation.subject}
        mark={results.lifeOrientation.mark}
        onSubjectChange={(value) =>
          updateResult("lifeOrientation", "subject", value)
        }
        onMarkChange={(value) =>
          updateResult("lifeOrientation", "mark", value)
        }
      />

      <SubjectRow
        label="Elective 1"
        subjects={electives}
        value={results.elective1.subject}
        mark={results.elective1.mark}
        onSubjectChange={(value) =>
          updateResult("elective1", "subject", value)
        }
        onMarkChange={(value) =>
          updateResult("elective1", "mark", value)
        }
      />

      <SubjectRow
        label="Elective 2"
        subjects={electives}
        value={results.elective2.subject}
        mark={results.elective2.mark}
        onSubjectChange={(value) =>
          updateResult("elective2", "subject", value)
        }
        onMarkChange={(value) =>
          updateResult("elective2", "mark", value)
        }
      />

      <SubjectRow
        label="Elective 3"
        subjects={electives}
        value={results.elective3.subject}
        mark={results.elective3.mark}
        onSubjectChange={(value) =>
          updateResult("elective3", "subject", value)
        }
        onMarkChange={(value) =>
          updateResult("elective3", "mark", value)
        }
      />

      <SubjectRow
        label="Elective 4"
        subjects={electives}
        value={results.elective4.subject}
        mark={results.elective4.mark}
        onSubjectChange={(value) =>
          updateResult("elective4", "subject", value)
        }
        onMarkChange={(value) =>
          updateResult("elective4", "mark", value)
        }
      />

      <button
        className="primary-btn"
        type="submit"
      >
        Save Academic Profile
      </button>

    </form>

  );

}

export default ResultsForm;