import { createContext, useState } from "react";

export const AcademicContext = createContext();

export function AcademicProvider({ children }) {

  const [studentProfile, setStudentProfile] = useState({
    firstName: "",
    surname: "",
    school: "",
    province: "",
    grade: "12"
  });

  const [studentMarks, setStudentMarks] = useState({});

  const [aps, setAPS] = useState(null);

  const [selectedProgramme, setSelectedProgramme] = useState(null);

  const resetProfile = () => {

  setStudentProfile({
    firstName: "",
    surname: "",
    school: "",
    province: "",
    grade: "12"
  });

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