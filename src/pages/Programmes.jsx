import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ProgrammeCard from "../components/ProgrammeCard";
import programmes from "../data/programmes";

function Programmes() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProgrammes = programmes.filter((programme) => {
    const search = searchTerm.toLowerCase();

    return (
      programme.name.toLowerCase().includes(search) ||
      programme.university.toLowerCase().includes(search) ||
      programme.faculty.toLowerCase().includes(search) ||
      programme.qualification.toLowerCase().includes(search)
    );
  });

  return (
    <>
      <Navbar />

      <section className="programmes-page">

        <div className="programmes-header">
          <h1>Explore Programmes</h1>

          <p>
            Browse university programmes and discover where your matric
            results can take you.
          </p>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a programme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="programmes-grid">

          {filteredProgrammes.length > 0 ? (
            filteredProgrammes.map((programme) => (
              <ProgrammeCard
                key={programme.id}
                programme={programme}
              />
            ))
          ) : (
            <div className="programme-empty-state">
              <h2>No programmes found</h2>

              <p>
                We couldn't find any programmes matching "{searchTerm}".
              </p>

              <p>
                Try searching for a different programme, university,
                or qualification.
              </p>
            </div>
          )}

        </div>

      </section>
    </>
  );
}

export default Programmes;