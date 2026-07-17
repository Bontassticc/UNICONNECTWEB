import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { AcademicContext } from "../context/AcademicContext";
import Navbar from "../components/Navbar";
import programmes from "../data/programmes";

function ProgrammeDetails() {

  const navigate = useNavigate();
  const { aps, studentMarks } = useContext(AcademicContext);

  const { id } = useParams();

  const programme = programmes.find(
    (p) => p.id === Number(id)
  );

  if (!programme) {
    return <h2>Programme not found.</h2>;
  }

  const apsPassed = aps !== null && aps >= programme.apsRequirement;


  const subjectResults = programme.requiredSubjects.map((required) => {

  const studentSubject = Object.values(studentMarks).find(
    (item) => item.subject === required.subject
  );

  const studentMark = studentSubject
    ? Number(studentSubject.mark)
    : null;

  return {
    ...required,
    studentMark,
    passed:
      studentMark !== null &&
      studentMark >= required.minimum
  };

});
  

  return (
    <>
      <Navbar />

      <section className="programme-details-page">

        <div className="programme-hero">

          <h1>{programme.name}</h1>

          <h3>{programme.university}</h3>

          <span className="status">
            {programme.applicationStatus}
          </span>

        </div>

        <div className="details-grid">

          <div className="details-card">

  <h2>Eligibility Check</h2>

  <p>

    <strong>Your APS:</strong>{" "}
    {aps ?? "Not calculated"}

  </p>

  <p>

    <strong>Required APS:</strong>{" "}
    {programme.apsRequirement}

  </p>

  <p>

    {apsPassed ? "✅ APS Requirement Met" : "❌ APS Requirement Not Met"}

  </p>

  <hr />

  <h3>Required Subjects</h3>

  {subjectResults.map(subject => (

    <div key={subject.subject}>

      <strong>{subject.subject}</strong>

      <p>

        Required: {subject.minimum}%

      </p>

      <p>

        Your Mark: {subject.studentMark ?? "--"}%

      </p>

      <p>

        {subject.passed ? "✅ Pass" : "❌ Does not meet requirement"}

      </p>

    </div>

  ))}

</div>

          <div className="details-card">

            <h2>Programme Overview</h2>

            <p>{programme.description}</p>

          </div>

          <div className="details-card">

            <h2>Entry Requirements</h2>

            <p><strong>APS Required:</strong> {programme.apsRequirement}</p>

            <h3>Required Subjects</h3>

            <ul>

              {programme.requiredSubjects.map((subject) => (

                <li key={subject.subject}>
                  {subject.subject} ({subject.minimum}%)
                </li>

              ))}

            </ul>

          </div>

          <div className="details-card">

            <h2>Programme Information</h2>

            <p><strong>Faculty:</strong> {programme.faculty}</p>

            <p><strong>Duration:</strong> {programme.duration}</p>

            <p><strong>Campus:</strong> {programme.campus}</p>

            <p><strong>Deadline:</strong> {programme.applicationDeadline}</p>

          </div>

          <div className="details-card">

            <h2>Career Opportunities</h2>

            <ul>

              {programme.careers.map((career) => (

                <li key={career}>
                  {career}
                </li>

              ))}

            </ul>

          </div>

        </div>

         <button
         className="back-btn"
         onClick={() => navigate("/programmes")}
>
        ← Back to Programmes
         </button>

        

      </section>

    </>
  );
}

export default ProgrammeDetails;