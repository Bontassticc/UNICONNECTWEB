
import { useContext } from "react";
import { Link } from "react-router-dom";

import { AcademicContext } from "../context/AcademicContextValue";

import universities from "../data/universities";
import programmes from "../data/programmes";

function Hero() {
  const { studentProfile, aps } = useContext(AcademicContext);

  const snapshotItems = [
    {
      label: "Student",
      value: studentProfile.firstName || "Guest",
      icon: "👤",
    },
    {
      label: "Current APS",
      value: aps ?? "--",
      icon: "🎓",
    },
    {
      label: "Universities",
      value: universities.length,
      icon: "🏛️",
    },
    {
      label: "Programmes",
      value: programmes.length,
      icon: "📚",
    },
  ];

  return (
    <section className="hero">
      <div className="hero-container">

        <div className="hero-content">
          <span className="hero-eyebrow">
            YOUR ACADEMIC JOURNEY STARTS HERE
          </span>

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

        <div className="hero-dashboard">
          <div className="snapshot-heading">
            <div>
              <span className="snapshot-label">YOUR OVERVIEW</span>
              <h3>Student Snapshot</h3>
            </div>

            <span className="snapshot-decoration">✦</span>
          </div>

          <p className="snapshot-description">
            A quick overview of your academic information and
            available study opportunities.
          </p>

          <div className="snapshot-grid">
            {snapshotItems.map((item) => (
              <div className="snapshot-item" key={item.label}>
                <div className="snapshot-icon">
                  {item.icon}
                </div>

                <div className="snapshot-details">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="snapshot-footer">
            <span>✦</span>
            Your academic journey, all in one place.
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
