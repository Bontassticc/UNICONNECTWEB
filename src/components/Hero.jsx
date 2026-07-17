import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AcademicContext } from "../context/AcademicContext";
import universities from "../data/universities";
import programmes from "../data/programmes";
import AcademicProfile from "../pages/AcademicProfile";

function Hero() {

  const { studentProfile, aps } = useContext(AcademicContext);

  return (

    <section className="hero">

      {/* HERO CONTAINER STARTS HERE */}
      <div className="hero-container">

        {/* LEFT SIDE */}
        <div className="hero-content">

          <h1>
            Your Future Starts With
            <span> UniConnect</span>
          </h1>

          <p>
            Helping South African students calculate APS scores,
            check university eligibility, and discover the right
            academic opportunities with confidence.
          </p>

          <div className="hero-buttons">

            <Link to="/profile">
              <button className="primary-btn">
                Complete Academic Profile
              </button>
            </Link>

            <Link to="/universities">
              <button className="secondary-btn">
                Explore Universities
              </button>
            </Link>

          </div>

        </div>

        {/* RIGHT SIDE STARTS HERE */}
        <div className="hero-dashboard">

          <h3>Student Snapshot</h3>

          <div className="snapshot-item">

            <span>👤 Student</span>

            <strong>
              {studentProfile.firstName || "Guest"}
            </strong>

          </div>

          <div className="snapshot-item">

            <span>APS</span>

            <strong>
              {aps ?? "--"}
            </strong>

          </div>

          <div className="snapshot-item">

            <span>Universities</span>

            <strong>
              {universities.length}
            </strong>

          </div>

          <div className="snapshot-item">

            <span>Programmes</span>

            <strong>
              {programmes.length}
            </strong>

          </div>

        </div>
        {/* RIGHT SIDE ENDS HERE */}

      </div>
      {/* HERO CONTAINER ENDS HERE */}

    </section>

  );
}

export default Hero;