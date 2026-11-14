
import Navbar from "../components/Navbar";
import UniversityCard from "../components/UniversityCard";

import universities from "../data/universities";

function Universities() {
  const universityCount = universities.length;

  return (
    <>
      <Navbar />

      <section className="universities-page">

        {/* Page Introduction */}

        <div className="universities-header">

          <span className="universities-eyebrow">
            EXPLORE HIGHER EDUCATION
          </span>

          <h1>
            Explore <span>Universities</span>
          </h1>

          <p>
            Discover South African universities, explore
            their programmes and compare academic entry
            requirements to find opportunities that
            match your goals.
          </p>

        </div>

        {/* University Listing Introduction */}

        {universityCount > 0 && (
          <div className="universities-listing-header">

            <div>
              <h2>Discover Institutions</h2>

              <p>
                Explore the universities currently
                featured on UniConnect.
              </p>
            </div>

            <span className="universities-count">
              {universityCount}{" "}
              {universityCount === 1
                ? "University"
                : "Universities"}
            </span>

          </div>
        )}

        {/* University Cards */}

        {universityCount > 0 ? (
          <div className="universities-grid">
            {universities.map((university) => (
              <UniversityCard
                key={university.id}
                university={university}
              />
            ))}
          </div>
        ) : (
          <div
            className="university-empty-state"
            role="status"
          >
            <h2>No universities available</h2>

            <p>
              University information is currently
              unavailable. Please check again later.
            </p>
          </div>
        )}

      </section>
    </>
  );
}

export default Universities;
