
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

  const universityCount = new Set(
    programmes.map((programme) => programme.university)
  ).size;

  const hasSearch = searchTerm.trim() !== "";

  return (
    <>
      <Navbar />

      <section className="programmes-page">

        {/* Page Introduction */}

        <div className="programmes-header">
          <span className="programmes-eyebrow">
            DISCOVER YOUR POSSIBILITIES
          </span>

          <h1>
            Explore <span>Programmes</span>
          </h1>

          <p>
            Discover university programmes, compare entry
            requirements and explore academic opportunities
            that match your matric results.
          </p>
        </div>

        {/* Search Panel */}

        <div className="programme-search-panel">

          <div className="programme-search-heading">
            <div>
              <h2>Find your next opportunity</h2>
              <p>
                Search by programme, university, field
                or qualification.
              </p>
            </div>

            <div className="programme-total">
              <strong>{programmes.length}</strong>
              <span>Programmes available</span>
            </div>
          </div>

          <div className="search-container">
            <label htmlFor="programme-search">
              Search programmes
            </label>

            <div className="programme-search-field">
              <span
                className="programme-search-icon"
                aria-hidden="true"
              >
                ⌕
              </span>

              <input
                id="programme-search"
                type="search"
                className="programme-search-input"
                placeholder="Try Computer Science, Wits, Business..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="programme-search-footer">
            <p aria-live="polite">
              {hasSearch
                ? `${filteredProgrammes.length} ${
                    filteredProgrammes.length === 1
                      ? "programme"
                      : "programmes"
                  } found`
                : `Explore programmes across ${universityCount} universities`}
            </p>

            {hasSearch && (
              <button
                type="button"
                className="programme-clear-search"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Results Heading */}

        <div className="programme-results-heading">
          <div>
            <h2>
              {hasSearch
                ? "Search Results"
                : "Available Programmes"}
            </h2>

            <p>
              {hasSearch
                ? "Programmes matching your search"
                : "Explore the academic opportunities available on UniConnect"}
            </p>
          </div>

          <span className="programme-results-total">
            {filteredProgrammes.length} results
          </span>
        </div>

        {/* Programme Cards */}

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
              We couldn't find any programmes matching
              "{searchTerm}".
            </p>

            <p>
              Try a programme name, university, field such
              as Technology, Business or Engineering,
              or a qualification such as Diploma.
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
