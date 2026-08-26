import React, { createContext, useEffect, useState } from "react";

export const AcademicContext = createContext();

const emptyProfile = {
  firstName: "",
  surname: "",
  school: "",
  province: "",
  grade: "12"
};

export function AcademicProvider({ children }) {

  const [studentProfile, setStudentProfile] = useState(() => {
    const savedProfile = localStorage.getItem("studentProfile");

    return savedProfile
      ? JSON.parse(savedProfile)
      : emptyProfile;
  });

  const [studentMarks, setStudentMarks] = useState(() => {
    const savedMarks = localStorage.getItem("studentMarks");

    return savedMarks
      ? JSON.parse(savedMarks)
      : {};
  });

  const [aps, setAPS] = useState(() => {
    const savedAPS = localStorage.getItem("studentAPS");

    return savedAPS
      ? Number(savedAPS)
      : null;
  });

  const [selectedProgramme, setSelectedProgramme] = useState(() => {
    const savedProgramme = localStorage.getItem("selectedProgramme");

    return savedProgramme
      ? JSON.parse(savedProgramme)
      : null;
  });


  // Save profile whenever it changes
  useEffect(() => {

    if (
      studentProfile.firstName ||
      studentProfile.surname ||
      studentProfile.school ||
      studentProfile.province
    ) {
      localStorage.setItem(
        "studentProfile",
        JSON.stringify(studentProfile)
      );
    }

  }, [studentProfile]);


  // Save marks whenever they change
  useEffect(() => {

    if (Object.keys(studentMarks).length > 0) {

      localStorage.setItem(
        "studentMarks",
        JSON.stringify(studentMarks)
      );

    }

  }, [studentMarks]);


  // Save APS whenever it changes
  useEffect(() => {

    if (aps !== null) {

      localStorage.setItem(
        "studentAPS",
        String(aps)
      );

    }

  }, [aps]);


  // Save selected programme whenever it changes
  useEffect(() => {

    if (selectedProgramme) {

      localStorage.setItem(
        "selectedProgramme",
        JSON.stringify(selectedProgramme)
      );

    }

  }, [selectedProgramme]);


  // Reset EVERYTHING
  const resetProfile = () => {

    setStudentProfile(emptyProfile);

    setStudentMarks({});

    setAPS(null);

    setSelectedProgramme(null);

    localStorage.removeItem("studentProfile");
    localStorage.removeItem("studentMarks");
    localStorage.removeItem("studentAPS");
    localStorage.removeItem("selectedProgramme");

  };


  return (

    <AcademicContext.Provider
      value={{

        studentProfile,
        setStudentProfile,

        studentMarks,
        setStudentMarks,

        aps,
        setAPS,

        selectedProgramme,
        setSelectedProgramme,

        resetProfile

      }}
    >

      {children}

    </AcademicContext.Provider>

  );

}