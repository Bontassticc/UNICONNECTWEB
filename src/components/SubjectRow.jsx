
function SubjectRow({
  label,
  subjects,
  value,
  mark,
  onSubjectChange,
  onMarkChange,
}) {
  const fieldId = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="subject-row">

      {/* Subject Category */}
      <div className="subject-category">
        <label htmlFor={`${fieldId}-subject`}>
          {label}
        </label>
      </div>

      {/* Subject Selection */}
      <div className="subject-select">
        <select
          id={`${fieldId}-subject`}
          value={value}
          onChange={(e) =>
            onSubjectChange(e.target.value)
          }
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

      {/* Mark Input */}
      <div className="subject-mark">
        <label
          className="subject-mobile-label"
          htmlFor={`${fieldId}-mark`}
        >
          Mark (%)
        </label>

        <input
          id={`${fieldId}-mark`}
          type="number"
          min="0"
          max="100"
          placeholder="0–100"
          value={mark}
          onChange={(e) =>
            onMarkChange(e.target.value)
          }
        />
      </div>

    </div>
  );
}

export default SubjectRow;
