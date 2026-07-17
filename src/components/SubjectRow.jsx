import React from "react";

function SubjectRow({
  label,
  subjects,
  value,
  mark,
  onSubjectChange,
  onMarkChange,
}) {

  return (

    <div className="subject-row">

      <div className="subject-select">

        <label>{label}</label>

        <select
          value={value}
          onChange={(e)=>onSubjectChange(e.target.value)}
        >

          <option value="">Select Subject</option>

          {subjects.map((subject)=>(

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

        <label>Mark (%)</label>

        <input
          type="number"
          min="0"
          max="100"
          placeholder="0-100"
          value={mark}
          onChange={(e)=>onMarkChange(e.target.value)}
        />

      </div>

    </div>

  );

}

export default SubjectRow;