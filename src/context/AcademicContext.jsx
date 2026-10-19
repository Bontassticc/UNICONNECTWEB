
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import { AcademicContext } from "./AcademicContextValue";

const emptyProfile = {
  firstName: "",
  surname: "",
  school: "",
  province: "",
  grade: "12"
};

const emptyAcademicData = {
  profile: emptyProfile,
  marks: {},
  aps: null,
  selectedProgramme: null
};

export function AcademicProvider({ children }) {
  const [studentProfile, setStudentProfile] = useState(emptyProfile);
  const [studentMarks, setStudentMarks] = useState({});
  const [aps, setAPS] = useState(null);
  const [selectedProgramme, setSelectedProgramme] = useState(null);

  const activeEmailRef = useRef(
    localStorage.getItem("uniConnectUserEmail")
  );

  const isLoadingUser = useRef(false);

  const getUsers = useCallback(() => {
    const savedUsers = localStorage.getItem("uniConnectUsers");
    return savedUsers ? JSON.parse(savedUsers) : {};
  }, []);

  const saveUsers = useCallback((users) => {
    localStorage.setItem("uniConnectUsers", JSON.stringify(users));
  }, []);

  const loadUserData = useCallback((email) => {
    if (!email) return;

    isLoadingUser.current = true;

    const users = getUsers();
    let userData = users[email];

    if (!userData) {
      const oldProfile = localStorage.getItem("studentProfile");
      const oldMarks = localStorage.getItem("studentMarks");
      const oldAPS = localStorage.getItem("studentAPS");
      const oldProgramme = localStorage.getItem("selectedProgramme");

      if (oldProfile || oldMarks || oldAPS || oldProgramme) {
        userData = {
          profile: oldProfile ? JSON.parse(oldProfile) : { ...emptyProfile },
          marks: oldMarks ? JSON.parse(oldMarks) : {},
          aps: oldAPS ? Number(oldAPS) : null,
          selectedProgramme: oldProgramme
            ? JSON.parse(oldProgramme)
            : null
        };
      } else {
        userData = {
          ...emptyAcademicData,
          profile: { ...emptyProfile },
          marks: {}
        };
      }

      users[email] = userData;
      saveUsers(users);

      localStorage.removeItem("studentProfile");
      localStorage.removeItem("studentMarks");
      localStorage.removeItem("studentAPS");
      localStorage.removeItem("selectedProgramme");
    }

    setStudentProfile(userData.profile || { ...emptyProfile });
    setStudentMarks(userData.marks || {});
    setAPS(userData.aps ?? null);
    setSelectedProgramme(userData.selectedProgramme || null);

    activeEmailRef.current = email;

    setTimeout(() => {
      isLoadingUser.current = false;
    }, 0);
  }, [getUsers, saveUsers]);

  // Load the current logged-in user
  useEffect(() => {
    const email = localStorage.getItem("uniConnectUserEmail");

    if (!email) return undefined;

    const timerId = setTimeout(() => {
      loadUserData(email);
    }, 0);

    return () => clearTimeout(timerId);
  }, [loadUserData]);

  // Listen for login/logout changes
  useEffect(() => {
    const handleUserChange = () => {
      const isLoggedIn =
        localStorage.getItem("uniConnectLoggedIn") === "true";

      const email = localStorage.getItem("uniConnectUserEmail");

      if (isLoggedIn && email) {
        loadUserData(email);
      } else {
        isLoadingUser.current = true;

        setStudentProfile({ ...emptyProfile });
        setStudentMarks({});
        setAPS(null);
        setSelectedProgramme(null);

        activeEmailRef.current = null;

        setTimeout(() => {
          isLoadingUser.current = false;
        }, 0);
      }
    };

    window.addEventListener("uniConnectUserChanged", handleUserChange);

    return () => {
      window.removeEventListener("uniConnectUserChanged", handleUserChange);
    };
  }, [loadUserData]);

  // Save profile
  useEffect(() => {
    const email = activeEmailRef.current;

    if (!email || isLoadingUser.current) return;

    const users = getUsers();
    const existingUser = users[email] || {
      ...emptyAcademicData
    };

    users[email] = {
      ...existingUser,
      profile: studentProfile
    };

    saveUsers(users);
  }, [studentProfile, getUsers, saveUsers]);

  // Save marks
  useEffect(() => {
    const email = activeEmailRef.current;

    if (!email || isLoadingUser.current) return;

    const users = getUsers();
    const existingUser = users[email] || {
      ...emptyAcademicData
    };

    users[email] = {
      ...existingUser,
      marks: studentMarks
    };

    saveUsers(users);
  }, [studentMarks, getUsers, saveUsers]);

  // Save APS
  useEffect(() => {
    const email = activeEmailRef.current;

    if (!email || isLoadingUser.current) return;

    const users = getUsers();
    const existingUser = users[email] || {
      ...emptyAcademicData
    };

    users[email] = {
      ...existingUser,
      aps
    };

    saveUsers(users);
  }, [aps, getUsers, saveUsers]);

  // Save selected programme
  useEffect(() => {
    const email = activeEmailRef.current;

    if (!email || isLoadingUser.current) return;

    const users = getUsers();
    const existingUser = users[email] || {
      ...emptyAcademicData
    };

    users[email] = {
      ...existingUser,
      selectedProgramme
    };

    saveUsers(users);
  }, [selectedProgramme, getUsers, saveUsers]);

  // Reset current user's academic data
  const resetProfile = useCallback(() => {
    const email = activeEmailRef.current;

    setStudentProfile({ ...emptyProfile });
    setStudentMarks({});
    setAPS(null);
    setSelectedProgramme(null);

    if (!email) return;

    const users = getUsers();

    users[email] = {
      ...emptyAcademicData,
      profile: { ...emptyProfile },
      marks: {}
    };

    saveUsers(users);
  }, [getUsers, saveUsers]);

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
