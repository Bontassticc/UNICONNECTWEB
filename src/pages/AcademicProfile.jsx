import React, {useContext,useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import ResultsForm from "../components/ResultsForm";
import { calculateAPS } from "../utils/apsCalculator";
import { AcademicContext } from "../context/AcademicContext";
import { useNavigate } from "react-router-dom";

function AcademicProfile() {

    const navigate = useNavigate();

const { resetProfile } = useContext(AcademicContext);

    useEffect(() => {

  const savedProfile = localStorage.getItem("studentProfile");
  const savedMarks = localStorage.getItem("studentMarks");
  const savedAPS = localStorage.getItem("studentAPS");

  if (savedProfile) {
    setStudentProfile(JSON.parse(savedProfile));
    setProfile(JSON.parse(savedProfile));
  }

  if (savedMarks) {
    setStudentMarks(JSON.parse(savedMarks));
  }

  if (savedAPS) {
    setAPS(Number(savedAPS));
  }

}, []);

  const {
    studentProfile,
    setStudentProfile,
    studentMarks,
    setStudentMarks,
    aps,
    setAPS
  } = useContext(AcademicContext);

  const [profile, setProfile] = useState(
    studentProfile || {
      firstName: "",
      surname: "",
      school: "",
      province: "",
      grade: "12"
    }
  );

  const handleProfileChange = (field, value) => {
    setProfile({
      ...profile,
      [field]: value
    });
  };


const handleResultsSubmit = (results) => {

  // Calculate APS
  const calculatedAPS = calculateAPS(results);

  // Save profile
  setStudentProfile(profile);

  // Save results
  setStudentMarks(results);

  // Save APS
  setAPS(calculatedAPS);

  // Save everything to localStorage
  localStorage.setItem(
    "studentProfile",
    JSON.stringify(profile)
  );

  localStorage.setItem(
    "studentMarks",
    JSON.stringify(results)
  );

  localStorage.setItem(
    "studentAPS",
    calculatedAPS
  );

  alert(`Profile saved successfully!\n\nAPS: ${calculatedAPS}`);

};




  return (
    <>
      <Navbar />

      <section className="profile-page">

        <div className="profile-header">

          <h1>Academic Profile</h1>

          <p>
            Complete your academic profile once. UniConnect will
            automatically use this information when checking
            programme eligibility.
          </p>

        </div>

<div className="profile-dashboard">
        <div className="profile-card">

          <h2>Student Information</h2>

          <div className="profile-grid">

            <input
              placeholder="First Name"
              value={profile.firstName}
              onChange={(e) =>
                handleProfileChange("firstName", e.target.value)
              }
            />

            <input
              placeholder="Surname"
              value={profile.surname}
              onChange={(e) =>
                handleProfileChange("surname", e.target.value)
              }
            />

            <input
              placeholder="School"
              value={profile.school}
              onChange={(e) =>
                handleProfileChange("school", e.target.value)
              }
            />

            <input
              placeholder="Province"
              value={profile.province}
              onChange={(e) =>
                handleProfileChange("province", e.target.value)
              }
            />

          </div>

        </div>

        <div className="profile-card">

          <h2>Grade 12 Results</h2>

          <ResultsForm
            onSubmit={handleResultsSubmit}
          />

        </div>

        <h2>Academic Snapshot</h2>

<div className="summary-item">

    <span>APS Score</span>

  <div className="aps-card">

    <h3>Your APS</h3>

    <h1>{aps ?? "--"}</h1>

    <p>
        Calculated from your latest Grade 12 results.
    </p>

</div>

</div>

<div className="summary-item">

    <span>Universities</span>

    <p>3 Available</p>

</div>

<div className="summary-item">

    <span>Programmes</span>

    <p>6 Available</p>

</div>

<button
  className="reset-btn"
 onClick={() => {

    const confirmReset = window.confirm(
      "Reset all saved academic information?"
    );

    if (confirmReset){

        resetProfile();

        navigate("/");

    }

  }}
>
  🔄 Reset Academic Profile
</button>
        </div>

      </section>

    </>
  );
}

export default AcademicProfile;