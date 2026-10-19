
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
  profile: { ...emptyProfile },
  marks: {},
  aps: null,
  selectedProgramme: null
};

export function AcademicProvider({ children }) {
  const [studentProfile, setStudentProfile] = useState({
    ...emptyProfile
  });
  const [studentMarks, setStudentMarks] = useState({});
  const [aps, setAPS] = useState(null);
  const [selectedProgramme, setSelectedProgramme] = useState(null);

  // Block saving until the current account has finished loading.
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const activeEmailRef = useRef(
    localStorage.getItem("uniConnectUserEmail")
  );

  const getUsers = useCallback(() => {
    const savedUsers = localStorage.getItem("uniConnectUsers");
    return savedUsers ? JSON.parse(savedUsers) : {};
  }, []);

  const saveUsers = useCallback((users) => {
    localStorage.setItem("uniConnectUsers", JSON.stringify(users));
  }, []);

  const loadUserData = useCallback(
    (email) => {
      if (!email) return;

      setIsLoadingUser(true);

      const users = getUsers();
      let userData = users[email];

      // Migrate data from the older storage format when needed.
      if (!userData) {
        const oldProfile = localStorage.getItem("studentProfile");
        const oldMarks = localStorage.getItem("studentMarks");
        const oldAPS = localStorage.getItem("studentAPS");
        const oldProgramme = localStorage.getItem("selectedProgramme");

        if (oldProfile || oldMarks || oldAPS || oldProgramme) {
          userData = {
            profile: oldProfile
              ? JSON.parse(oldProfile)
              : { ...emptyProfile },
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

      // Restore all saved information before enabling saving.
      setStudentProfile({
        ...emptyProfile,
        ...(userData.profile || {})
      });
      setStudentMarks(userData.marks || {});
      setAPS(userData.aps ?? null);
      setSelectedProgramme(userData.selectedProgramme ?? null);

      activeEmailRef.current = email;

      // React applies these state updates together. The save effects
      // will run with the restored values, not the initial empty values.
      setIsLoadingUser(false);
    },
    [getUsers, saveUsers]
  );

  // Load the current account on startup.
  useEffect(() => {
    const email = localStorage.getItem("uniConnectUserEmail");

    if (!email) {
      activeEmailRef.current = null;
      return undefined;
    }

    const timerId = setTimeout(() => {
      loadUserData(email);
    }, 0);

    return () => clearTimeout(timerId);
  }, [loadUserData]);

  // Respond to login and logout events.
  useEffect(() => {
    const handleUserChange = () => {
      const isLoggedIn =
        localStorage.getItem("uniConnectLoggedIn") === "true";

      const email = localStorage.getItem("uniConnectUserEmail");

      if (isLoggedIn && email) {
        loadUserData(email);
      } else {
        // Stop save effects before clearing the account's information.
        setIsLoadingUser(true);
        activeEmailRef.current = null;

        setStudentProfile({ ...emptyProfile });
        setStudentMarks({});
        setAPS(null);
        setSelectedProgramme(null);

        setIsLoadingUser(false);
      }
    };

    window.addEventListener(
      "uniConnectUserChanged",
      handleUserChange
    );

    return () => {
      window.removeEventListener(
        "uniConnectUserChanged",
        handleUserChange
      );
    };
  }, [loadUserData]);

  // Save profile details.
  useEffect(() => {
    const email = activeEmailRef.current;

    if (!email || isLoadingUser) return;

    const users = getUsers();
    const existingUser = users[email] || {
      ...emptyAcademicData
    };

    users[email] = {
      ...existingUser,
      profile: studentProfile
    };

    saveUsers(users);
  }, [studentProfile, isLoadingUser, getUsers, saveUsers]);

  // Save matric marks.
  useEffect(() => {
    const email = activeEmailRef.current;

    if (!email || isLoadingUser) return;

    const users = getUsers();
    const existingUser = users[email] || {
      ...emptyAcademicData
    };

    users[email] = {
      ...existingUser,
      marks: studentMarks
    };

    saveUsers(users);
  }, [studentMarks, isLoadingUser, getUsers, saveUsers]);

  // Save APS.
  useEffect(() => {
    const email = activeEmailRef.current;

    if (!email || isLoadingUser) return;

    const users = getUsers();
    const existingUser = users[email] || {
      ...emptyAcademicData
    };

    users[email] = {
      ...existingUser,
      aps
    };

    saveUsers(users);
  }, [aps, isLoadingUser, getUsers, saveUsers]);

  // Save the selected programme.
  useEffect(() => {
    const email = activeEmailRef.current;

    if (!email || isLoadingUser) return;

    const users = getUsers();
    const existingUser = users[email] || {
      ...emptyAcademicData
    };

    users[email] = {
      ...existingUser,
      selectedProgramme
    };

    saveUsers(users);
  }, [
    selectedProgramme,
    isLoadingUser,
    getUsers,
    saveUsers
  ]);

  // Reset the current user's academic data when explicitly requested.
  const resetProfile = useCallback(() => {
    const email = activeEmailRef.current;

    if (!email) return;

    setIsLoadingUser(true);

    const users = getUsers();

    users[email] = {
      ...emptyAcademicData,
      profile: { ...emptyProfile },
      marks: {}
    };

    saveUsers(users);

    setStudentProfile({ ...emptyProfile });
    setStudentMarks({});
    setAPS(null);
    setSelectedProgramme(null);

    setIsLoadingUser(false);
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

