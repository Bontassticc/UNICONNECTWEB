import React from "react";
import { Link } from "react-router-dom";

import universities from "../data/universities";
import programmes from "../data/programmes";

function Features() {
  return (
    <>

      {/* ================= FEATURES ================= */}

      <section className="features">

        <div className="section-title">

          <h2>Why Choose UniConnect?</h2>

          <p>
            Everything you need to plan your university journey,
            all in one place.
          </p>

        </div>

        <div className="features-grid">

          <div className="feature-card">

            <h3>📊 APS Calculator</h3>

            <p>
              Calculate your Admission Point Score instantly using
              your Grade 12 results.
            </p>

          </div>

          <div className="feature-card">

            <h3>👤 Academic Profile</h3>

            <p>
              Save your academic information once and use it
              throughout UniConnect.
            </p>

          </div>

          <div className="feature-card">

            <h3>✅ Eligibility Checker</h3>

            <p>
              Instantly see which university programmes you qualify
              for.
            </p>

          </div>

          <div className="feature-card">

            <h3>🏛 Explore Universities</h3>

            <p>
              Browse South African universities and compare their
              programmes.
            </p>

          </div>

          <div className="feature-card">

            <h3>🎓 Programme Information</h3>

            <p>
              View APS requirements, subject requirements,
              application deadlines and career opportunities.
            </p>

          </div>

          <div className="feature-card">

            <h3>⭐ Smart Recommendations</h3>

            <p>
              Receive alternative programme suggestions if you
              don't qualify for your first choice.
            </p>

          </div>

        </div>

      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="how-it-works">

        <div className="section-title">

          <h2>How It Works</h2>

          <p>
            UniConnect helps you prepare for university in
            four simple steps.
          </p>

        </div>

        <div className="steps">

          <div className="step">

            <div className="step-number">1</div>

            <h3>Create Profile</h3>

            <p>Enter your personal and academic details.</p>

          </div>

          <div className="step">

            <div className="step-number">2</div>

            <h3>Enter Results</h3>

            <p>Save your Grade 12 subject marks.</p>

          </div>

          <div className="step">

            <div className="step-number">3</div>

            <h3>Calculate APS</h3>

            <p>Automatically calculate your APS score.</p>

          </div>

          <div className="step">

            <div className="step-number">4</div>

            <h3>Explore Programmes</h3>

            <p>Find programmes that match your results.</p>

          </div>

        </div>

      </section>

      {/* ================= QUICK STATS ================= */}

      <section className="quick-stats">

        <div className="stat-card">

          <h2>{universities.length}</h2>

          <p>Universities</p>

        </div>

        <div className="stat-card">

          <h2>{programmes.length}</h2>

          <p>Programmes</p>

        </div>

        <div className="stat-card">

          <h2>APS</h2>

          <p>Calculator</p>

        </div>

        <div className="stat-card">

          <h2>24/7</h2>

          <p>Eligibility Checker</p>

        </div>

      </section>

      {/* ================= FEATURED UNIVERSITIES ================= */}

      <section className="featured-universities">

        <div className="section-title">

          <h2>Featured Universities</h2>

          <p>
            Start exploring some of South Africa's leading
            universities.
          </p>

        </div>

        <div className="features-grid">

          {universities.map((university) => (

            <div
              className="feature-card"
              key={university.id}
            >

              <h3>{university.shortName}</h3>

              <p>{university.location}</p>

              <p>{university.programmes.length} Programmes</p>

            </div>

          ))}

        </div>

        <Link to="/universities">

          <button className="primary-btn">

            Explore All Universities

          </button>

        </Link>

      </section>

    </>
  );
}

export default Features;