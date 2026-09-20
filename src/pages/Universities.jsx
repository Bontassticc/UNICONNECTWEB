import React from "react";

import Navbar from "../components/Navbar";
import UniversityCard from "../components/UniversityCard";

import universities from "../data/universities";

function Universities() {
  return (
    <div>
      <Navbar />

      <section className="universities-page">

        <div className="universities-header">

          <h1>Explore Universities</h1>

          <p>
            Discover university programmes, APS requirements,
            and application information.
          </p>

        </div>

        <div className="universities-grid">

          {universities.length > 0 ? (
            universities.map((university) => (
              <UniversityCard
                key={university.id}
                university={university}
              />
            ))
          ) : (
            <div className="university-empty-state">

              <h2>No universities available</h2>

              <p>
                University information is currently unavailable.
                Please check again later.
              </p>

            </div>
          )}

        </div>

      </section>
    </div>
  );
}

export default Universities;