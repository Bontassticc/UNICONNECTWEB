import React, { useState } from "react";
import { useContext } from "react";
import { AcademicContext } from "../context/AcademicContext";
import Navbar from "../components/Navbar";
import ProgrammeCard from "../components/ProgrammeCard";
import programmes from "../data/programmes";

function Programmes() {

    const {

     studentMarks,

     aps

     } = useContext(AcademicContext);
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
            Browse university programmes and discover where your matric results can take you.
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

          {filteredProgrammes.map((programme) => (
            <ProgrammeCard
              key={programme.id}
              programme={programme}
            />
          ))}

        </div>

      </section>
    </>
  );
}

export default Programmes;