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

          {universities.map((university)=>(
            <UniversityCard
              key={university.id}
              university={university}
            />
          ))}

        </div>

      </section>

    </div>
  );
}

export default Universities;