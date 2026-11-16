
import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  UserRound,
  Calculator,
  GraduationCap,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { AcademicContext } from "../context/AcademicContextValue";
import universities from "../data/universities";
import programmes from "../data/programmes";

function Hero() {
  const { studentProfile, aps } = useContext(AcademicContext);

  const snapshotItems = [
    {
      label: "Student",
      value: studentProfile?.firstName || "Guest",
      Icon: UserRound,
    },
    {
      label: "Current APS",
      value: aps ?? "--",
      Icon: Calculator,
    },
    {
      label: "Universities",
      value: universities.length,
      Icon: GraduationCap,
    },
    {
      label: "Programmes",
      value: programmes.length,
      Icon: BookOpen,
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
            Your future starts with
            <span> UniConnect</span>
          </h1>

          <p>
            Navigate your journey to higher education with
            confidence. Calculate your APS, understand your
            eligibility, and discover university programmes
            that match your academic potential.
          </p>

          <div className="hero-buttons">
            <Link to="/profile" className="primary-btn">
              Complete Academic Profile
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <Link to="/universities" className="secondary-btn">
              Explore Universities
            </Link>
          </div>

          <div className="hero-supporting-text">
            <span className="hero-supporting-icon">
              <GraduationCap size={18} />
            </span>
            Helping South African students make informed
            decisions about their futures.
          </div>
        </div>

        <div className="hero-dashboard">
          <div className="snapshot-heading">
            <div>
              <span className="snapshot-label">
                YOUR OVERVIEW
              </span>
              <h3>Student Snapshot</h3>
            </div>

            <span className="snapshot-decoration">
              <Sparkles size={23} strokeWidth={1.7} />
            </span>
          </div>

          <p className="snapshot-description">
            Your academic information and study opportunities,
            all in one place.
          </p>

          <div className="snapshot-grid">
            {snapshotItems.map((item) => {
              const Icon = item.Icon;

              return (
                <div
                  className="snapshot-item"
                  key={item.label}
                >
                  <div className="snapshot-icon">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  <div className="snapshot-details">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="snapshot-footer">
            <Sparkles size={16} strokeWidth={1.8} />
            Your academic journey, all in one place.
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
