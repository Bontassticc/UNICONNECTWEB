import React from "react";

function SubjectRow({
  label,
  subjects,
  value,
  mark,
  onSubjectChange,
  onMarkChange,
}) {

  // Create unique IDs for each subject row
  const fieldId = label.toLowerCase().replace(/\s+/g, "-");

  return (

    <div className="subject-row">

      <div className="subject-select">

        <label htmlFor={`${fieldId}-subject`}>
          {label}
        </label>

        <select
          id={`${fieldId}-subject`}
          value={value}
          onChange={(e) => onSubjectChange(e.target.value)}
        >

          <option value="">Select Subject</option>

          {subjects.map((subject) => (

            <option
              key={subject.id}
              value={subject.name}
            >

              {subject.name}

            </option>

          ))}

        </select>

      </div>


      <div className="subject-mark">

        <label htmlFor={`${fieldId}-mark`}>
          Mark (%)
        </label>

        <input
          id={`${fieldId}-mark`}
          type="number"
          min="0"
          max="100"
          placeholder="0-100"
          value={mark}
          onChange={(e) => onMarkChange(e.target.value)}
        />

      </div>

    </div>

  );

}

export default SubjectRow;