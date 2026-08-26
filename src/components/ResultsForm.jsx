import React, { useState, useContext, useEffect } from "react";
import { AcademicContext } from "../context/AcademicContext";

import SubjectRow from "./SubjectRow";
import subjects from "../data/subjects";

function ResultsForm({ onSubmit }) {

  const { studentMarks } = useContext(AcademicContext);


  // --------------------------------
  // Subject categories
  // --------------------------------

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


  // --------------------------------
  // Empty form
  // --------------------------------

  const emptyResults = {
    homeLanguage: {
      subject: "",
      mark: ""
    },

    firstAdditional: {
      subject: "",
      mark: ""
    },

    mathematics: {
      subject: "",
      mark: ""
    },

    lifeOrientation: {
      subject: "",
      mark: ""
    },

    elective1: {
      subject: "",
      mark: ""
    },

    elective2: {
      subject: "",
      mark: ""
    },

    elective3: {
      subject: "",
      mark: ""
    },

    elective4: {
      subject: "",
      mark: ""
    }
  };


  // --------------------------------
  // Form state
  // --------------------------------

  const [results, setResults] = useState(
    Object.keys(studentMarks).length > 0
      ? studentMarks
      : emptyResults
  );


  // --------------------------------
  // Keep form synced with Context
  // --------------------------------

  useEffect(() => {

    if (Object.keys(studentMarks).length > 0) {

      setResults(studentMarks);

    } else {

      setResults(emptyResults);

    }

  }, [studentMarks]);


  // --------------------------------
  // Update a result
  // --------------------------------

  const updateResult = (key, field, value) => {

    setResults(prev => ({
      ...prev,

      [key]: {
        ...prev[key],
        [field]: value
      }

    }));

  };


  // --------------------------------
  // Validate results
  // --------------------------------

  const validateResults = () => {

    const requiredFields = [
      {
        key: "homeLanguage",
        label: "Home Language"
      },

      {
        key: "firstAdditional",
        label: "First Additional Language"
      },

      {
        key: "mathematics",
        label: "Mathematics"
      }
    ];


    // Check required subjects
    for (const field of requiredFields) {

      const result = results[field.key];

      if (!result.subject) {

        alert(
          `Please select a ${field.label} subject.`
        );

        return false;

      }

      if (
        result.mark === "" ||
        result.mark === null ||
        result.mark === undefined
      ) {

        alert(
          `Please enter a mark for ${field.label}.`
        );

        return false;

      }

    }


    // --------------------------------
    // Check elective subjects
    // --------------------------------

    const electiveResults = [
      results.elective1,
      results.elective2,
      results.elective3,
      results.elective4
    ];

    const completedElectives = electiveResults.filter(
      elective => elective.subject && elective.mark !== ""
    );


    if (completedElectives.length < 3) {

      alert(
        "Please enter at least three elective subjects with their marks."
      );

      return false;

    }


    // --------------------------------
    // Check all entered marks
    // --------------------------------

    for (const [key, result] of Object.entries(results)) {

      if (
        result.mark !== "" &&
        result.mark !== null &&
        result.mark !== undefined
      ) {

        const mark = Number(result.mark);

        if (
          Number.isNaN(mark) ||
          mark < 0 ||
          mark > 100
        ) {

          alert(
            "Marks must be numbers between 0 and 100."
          );

          return false;

        }

      }

    }


    // --------------------------------
    // Check for duplicate subjects
    // --------------------------------

    const selectedSubjects = Object.values(results)
      .map(result => result.subject)
      .filter(subject => subject !== "");

    const uniqueSubjects = new Set(selectedSubjects);


    if (uniqueSubjects.size !== selectedSubjects.length) {

      alert(
        "You cannot select the same subject more than once."
      );

      return false;

    }


    return true;

  };


  // --------------------------------
  // Submit
  // --------------------------------

  const handleSubmit = (e) => {

    e.preventDefault();


    const isValid = validateResults();


    if (!isValid) {

      return;

    }


    onSubmit(results);

  };


  return (

    <form
      className="results-form"
      onSubmit={handleSubmit}
    >


      {/* Home Language */}

      <SubjectRow
        label="Home Language"
        subjects={homeLanguages}
        value={results.homeLanguage.subject}
        mark={results.homeLanguage.mark}

        onSubjectChange={(value) =>
          updateResult(
            "homeLanguage",
            "subject",
            value
          )
        }

        onMarkChange={(value) =>
          updateResult(
            "homeLanguage",
            "mark",
            value
          )
        }
      />


      {/* First Additional Language */}

      <SubjectRow
        label="First Additional Language"
        subjects={firstAdditionalLanguages}
        value={results.firstAdditional.subject}
        mark={results.firstAdditional.mark}

        onSubjectChange={(value) =>
          updateResult(
            "firstAdditional",
            "subject",
            value
          )
        }

        onMarkChange={(value) =>
          updateResult(
            "firstAdditional",
            "mark",
            value
          )
        }
      />


      {/* Mathematics */}

      <SubjectRow
        label="Mathematics"
        subjects={mathsSubjects}
        value={results.mathematics.subject}
        mark={results.mathematics.mark}

        onSubjectChange={(value) =>
          updateResult(
            "mathematics",
            "subject",
            value
          )
        }

        onMarkChange={(value) =>
          updateResult(
            "mathematics",
            "mark",
            value
          )
        }
      />


      {/* Life Orientation */}

      <SubjectRow
        label="Life Orientation"
        subjects={lifeOrientation}
        value={results.lifeOrientation.subject}
        mark={results.lifeOrientation.mark}

        onSubjectChange={(value) =>
          updateResult(
            "lifeOrientation",
            "subject",
            value
          )
        }

        onMarkChange={(value) =>
          updateResult(
            "lifeOrientation",
            "mark",
            value
          )
        }
      />


      {/* Elective 1 */}

      <SubjectRow
        label="Elective 1"
        subjects={electives}
        value={results.elective1.subject}
        mark={results.elective1.mark}

        onSubjectChange={(value) =>
          updateResult(
            "elective1",
            "subject",
            value
          )
        }

        onMarkChange={(value) =>
          updateResult(
            "elective1",
            "mark",
            value
          )
        }
      />


      {/* Elective 2 */}

      <SubjectRow
        label="Elective 2"
        subjects={electives}
        value={results.elective2.subject}
        mark={results.elective2.mark}

        onSubjectChange={(value) =>
          updateResult(
            "elective2",
            "subject",
            value
          )
        }

        onMarkChange={(value) =>
          updateResult(
            "elective2",
            "mark",
            value
          )
        }
      />


      {/* Elective 3 */}

      <SubjectRow
        label="Elective 3"
        subjects={electives}
        value={results.elective3.subject}
        mark={results.elective3.mark}

        onSubjectChange={(value) =>
          updateResult(
            "elective3",
            "subject",
            value
          )
        }

        onMarkChange={(value) =>
          updateResult(
            "elective3",
            "mark",
            value
          )
        }
      />


      {/* Elective 4 */}

      <SubjectRow
        label="Elective 4 (Optional)"
        subjects={electives}
        value={results.elective4.subject}
        mark={results.elective4.mark}

        onSubjectChange={(value) =>
          updateResult(
            "elective4",
            "subject",
            value
          )
        }

        onMarkChange={(value) =>
          updateResult(
            "elective4",
            "mark",
            value
          )
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