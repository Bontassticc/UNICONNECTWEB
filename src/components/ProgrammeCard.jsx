import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AcademicContext } from "../context/AcademicContext";


function ProgrammeCard({ programme }) {

  const { aps } = useContext(AcademicContext);

  let eligibility = {
  text: "Complete Academic Profile",
  className: "eligibility-grey"
};

if (aps !== null) {

  if (aps >= programme.apsRequirement) {

    eligibility = {
      text: "Eligible",
      className: "eligibility-green"
    };

  }

  else if (aps >= programme.apsRequirement - 2) {

    eligibility = {
      text: "Borderline",
      className: "eligibility-orange"
    };

  }

  else {

    eligibility = {
      text: "Not Eligible",
      className: "eligibility-red"
    };

  }

}

 


  return (
      <div className="programme-card">

      <div className="programme-card-header">

      <span className="programme-university">
      {programme.shortUniversity}
      </span>

      <span className="programme-status">
      {programme.applicationStatus}
      </span>

      </div>



      <h2>{programme.name}</h2>

      <p className="programme-description">
        {programme.description}
      </p>

      <div className="programme-details">

        <div>
          <strong>Faculty</strong>
          <p>{programme.faculty}</p>
        </div>

        <div>
          <strong>Duration</strong>
          <p>{programme.duration}</p>
        </div>

        <div>
          <strong>Campus</strong>
          <p>{programme.campus}</p>
        </div>

        <div>
          <strong>APS Required</strong>
          <p>{programme.apsRequirement}</p>
        </div>

        <div className={eligibility.className}>

    {eligibility.text}

</div>

      </div>



        <Link
           to={`/programmes/${programme.id}`} className="primary-btn"
>          View Details
         </Link>

    </div>
  );
}

export default ProgrammeCard;