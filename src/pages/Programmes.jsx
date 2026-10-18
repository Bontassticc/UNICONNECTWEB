
import { useState } from "react";

import Navbar from "../components/Navbar";
import ProgrammeCard from "../components/ProgrammeCard";

import programmes from "../data/programmes";

function Programmes() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProgrammes = programmes.filter((programme) => {
    const search = searchTerm.trim().toLowerCase();

    const name = programme.name?.toLowerCase() || "";
    const university = programme.university?.toLowerCase() || "";
    const field = programme.field?.toLowerCase() || "";
    const qualification = programme.qualification?.toLowerCase() || "";

    return (
      name.includes(search) ||
      university.includes(search) ||
      field.includes(search) ||
      qualification.includes(search)
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
  <label htmlFor="programme-search">
    Search programmes
  </label>

  <input
    id="programme-search"
    type="text"
    className="programme-search-input"
    placeholder="Search by programme, university, field or qualification..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  {searchTerm.trim() !== "" && (
    <p className="search-results-count" aria-live="polite">
      {filteredProgrammes.length}{" "}
      {filteredProgrammes.length === 1
        ? "programme"
        : "programmes"}{" "}
      found
    </p>
  )}
</div>


        {filteredProgrammes.length > 0 ? (
          <div className="programmes-grid">
            {filteredProgrammes.map((programme) => (
              <ProgrammeCard
                key={programme.id}
                programme={programme}
              />
            ))}
          </div>
        ) : (
          <div className="programme-empty-state" role="status">
            <h2>No programmes found</h2>

            <p>
              We couldn't find any programmes matching "{searchTerm}".
            </p>

            <p>
              Try a programme name, university, field such as Technology,
              Business or Engineering, or a qualification such as Diploma.
            </p>

            <button
              type="button"
              className="primary-btn"
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default Programmes;
