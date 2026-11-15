
import { useEffect, useState } from "react";
import { Bookmark, Search } from "lucide-react";

import Navbar from "../components/Navbar";
import ProgrammeCard from "../components/ProgrammeCard";

import programmes from "../data/programmes";

import {
  getSavedProgrammes,
  toggleSavedProgramme
} from "../utils/savedProgrammes";

function Programmes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [savedIds, setSavedIds] = useState(
    () => getSavedProgrammes()
  );

  useEffect(() => {
    const refreshSaved = () => {
      setSavedIds(getSavedProgrammes());
    };

    window.addEventListener(
      "uniConnectSavedChanged",
      refreshSaved
    );

    window.addEventListener(
      "uniConnectUserChanged",
      refreshSaved
    );

    window.addEventListener("storage", refreshSaved);

    return () => {
      window.removeEventListener(
        "uniConnectSavedChanged",
        refreshSaved
      );

      window.removeEventListener(
        "uniConnectUserChanged",
        refreshSaved
      );

      window.removeEventListener("storage", refreshSaved);
    };
  }, []);

  const handleToggleSave = (programmeId) => {
    const updated = toggleSavedProgramme(programmeId);

    if (updated === null) {
      window.alert(
        "Please log in to save programmes to your account."
      );
      return;
    }

    setSavedIds(updated);
  };

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

  const savedProgrammes = programmes.filter((programme) =>
    savedIds.includes(programme.id)
  );

  const universityCount = new Set(
    programmes.map((programme) => programme.university)
  ).size;

  const hasSearch = searchTerm.trim() !== "";

  return (
    <>
      <Navbar />

      <section className="programmes-page">

        <div className="programmes-header">
          <span className="programmes-eyebrow">
            DISCOVER YOUR POSSIBILITIES
          </span>

          <h1>
            Explore <span>Programmes</span>
          </h1>

          <p>
            Discover university programmes, compare entry
            requirements and save opportunities that
            interest you.
          </p>
        </div>

        {/* Tab navigation */}
        <div
          className="programme-tabs"
          role="tablist"
          aria-label="Programme views"
        >
          <button
            type="button"
            role="tab"
            id="programmes-all-tab"
            aria-selected={activeTab === "all"}
            aria-controls="programmes-all-panel"
            className={`programme-tab ${
              activeTab === "all" ? "active" : ""
            }`}
            onClick={() => setActiveTab("all")}
          >
            <Search size={18} />
            All Programmes
          </button>

          <button
            type="button"
            role="tab"
            id="programmes-saved-tab"
            aria-selected={activeTab === "saved"}
            aria-controls="programmes-saved-panel"
            className={`programme-tab ${
              activeTab === "saved" ? "active" : ""
            }`}
            onClick={() => setActiveTab("saved")}
          >
            <Bookmark size={18} />
            Saved Programmes
            <span className="programme-tab-count">
              {savedProgrammes.length}
            </span>
          </button>

          <div
            className={`programme-tab-indicator ${
              activeTab === "saved" ? "right" : ""
            }`}
            aria-hidden="true"
          />
        </div>

        {/* Sliding panels */}
        <div className="programme-tab-viewport">
          <div
            className={`programme-tab-track ${
              activeTab === "saved" ? "show-saved" : ""
            }`}
          >

            {/* ALL PROGRAMMES */}
            <div
              className="programme-tab-panel"
              id="programmes-all-panel"
              role="tabpanel"
              aria-labelledby="programmes-all-tab"
              inert={activeTab !== "all"}
            >
              <div className="programme-search-panel">
                <div className="programme-search-heading">
                  <div>
                    <h2>Find your next opportunity</h2>
                    <p>
                      Search by programme, university,
                      field or qualification.
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
                      onChange={(e) =>
                        setSearchTerm(e.target.value)
                      }
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

              {filteredProgrammes.length > 0 ? (
                <div className="programmes-grid">
                  {filteredProgrammes.map((programme) => (
                    <ProgrammeCard
                      key={programme.id}
                      programme={programme}
                      isSaved={savedIds.includes(programme.id)}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>
              ) : (
                <div
                  className="programme-empty-state"
                  role="status"
                >
                  <h2>No programmes found</h2>

                  <p>
                    We couldn't find any programmes matching
                    "{searchTerm}".
                  </p>

                  <p>
                    Try a programme name, university,
                    field or qualification.
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
            </div>

            {/* SAVED PROGRAMMES */}
            <div
              className="programme-tab-panel"
              id="programmes-saved-panel"
              role="tabpanel"
              aria-labelledby="programmes-saved-tab"
              inert={activeTab !== "saved"}
            >
              <div className="programme-results-heading">
                <div>
                  <h2>Your Saved Programmes</h2>
                  <p>
                    Revisit the programmes you've bookmarked
                    for your academic journey.
                  </p>
                </div>

                <span className="programme-results-total">
                  {savedProgrammes.length} saved
                </span>
              </div>

              {savedProgrammes.length > 0 ? (
                <div className="programmes-grid">
                  {savedProgrammes.map((programme) => (
                    <ProgrammeCard
                      key={programme.id}
                      programme={programme}
                      isSaved={true}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>
              ) : (
                <div className="programme-saved-empty">
                  <Bookmark size={36} />

                  <h2>No saved programmes yet</h2>

                  <p>
                    Explore programmes and bookmark
                    the opportunities that interest you.
                    They'll appear here for easy access.
                  </p>

                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() => setActiveTab("all")}
                  >
                    Explore Programmes
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </section>
    </>
  );
}

export default Programmes;
