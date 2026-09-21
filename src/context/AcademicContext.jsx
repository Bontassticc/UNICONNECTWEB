import React, {
  createContext,
  useEffect,
  useRef,
  useState
} from "react";

export const AcademicContext = createContext();

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


  // --------------------------------
  // Get all saved users
  // --------------------------------

  const getUsers = () => {

    const savedUsers =
      localStorage.getItem("uniConnectUsers");

    return savedUsers
      ? JSON.parse(savedUsers)
      : {};

  };


  // --------------------------------
  // Save all users
  // --------------------------------

  const saveUsers = (users) => {

    localStorage.setItem(
      "uniConnectUsers",
      JSON.stringify(users)
    );

  };


  // --------------------------------
  // Load a user's academic data
  // --------------------------------

  const loadUserData = (email) => {

    if (!email) {
      return;
    }

    isLoadingUser.current = true;

    const users = getUsers();

    let userData = users[email];


    // --------------------------------
    // Migrate existing prototype data
    // --------------------------------
    //
    // This prevents the current user's
    // existing profile from being lost
    // when we switch to account-based data.
    //

    if (!userData) {

      const oldProfile =
        localStorage.getItem("studentProfile");

      const oldMarks =
        localStorage.getItem("studentMarks");

      const oldAPS =
        localStorage.getItem("studentAPS");

      const oldProgramme =
        localStorage.getItem("selectedProgramme");


      if (
        oldProfile ||
        oldMarks ||
        oldAPS ||
        oldProgramme
      ) {

        userData = {
          profile: oldProfile
            ? JSON.parse(oldProfile)
            : emptyProfile,

          marks: oldMarks
            ? JSON.parse(oldMarks)
            : {},

          aps: oldAPS
            ? Number(oldAPS)
            : null,

          selectedProgramme: oldProgramme
            ? JSON.parse(oldProgramme)
            : null
        };

      } else {

        userData = {
          ...emptyAcademicData
        };

      }


      users[email] = userData;

      saveUsers(users);

      // Remove old shared prototype data
// so it cannot be assigned to another user.
localStorage.removeItem("studentProfile");
localStorage.removeItem("studentMarks");
localStorage.removeItem("studentAPS");
localStorage.removeItem("selectedProgramme");

    }


    // --------------------------------
    // Load into React state
    // --------------------------------

    setStudentProfile(
      userData.profile || emptyProfile
    );

    setStudentMarks(
      userData.marks || {}
    );

    setAPS(
      userData.aps ?? null
    );

    setSelectedProgramme(
      userData.selectedProgramme || null
    );


    activeEmailRef.current = email;


    // Allow state updates to finish
    // before saving changes again.

    setTimeout(() => {
      isLoadingUser.current = false;
    }, 0);

  };


  // --------------------------------
  // Load current logged-in user
  // --------------------------------

  useEffect(() => {

    const email =
      localStorage.getItem("uniConnectUserEmail");

    if (email) {
      loadUserData(email);
    }

  }, []);


  // --------------------------------
  // Listen for login/logout changes
  // --------------------------------

  useEffect(() => {

    const handleUserChange = () => {

      const isLoggedIn =
        localStorage.getItem("uniConnectLoggedIn") === "true";

      const email =
        localStorage.getItem("uniConnectUserEmail");


      if (isLoggedIn && email) {

        loadUserData(email);

      } else {

        // Clear the current user's data
        // from the active React session.

        isLoadingUser.current = true;

        setStudentProfile(emptyProfile);
        setStudentMarks({});
        setAPS(null);
        setSelectedProgramme(null);

        activeEmailRef.current = null;

        setTimeout(() => {
          isLoadingUser.current = false;
        }, 0);

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

  }, []);


  // --------------------------------
  // Save profile whenever it changes
  // --------------------------------

  useEffect(() => {

    const email = activeEmailRef.current;

    if (
      !email ||
      isLoadingUser.current
    ) {
      return;
    }


    const users = getUsers();

    const existingUser =
      users[email] || {
        ...emptyAcademicData
      };


    users[email] = {
      ...existingUser,
      profile: studentProfile
    };


    saveUsers(users);

  }, [studentProfile]);


  // --------------------------------
  // Save marks whenever they change
  // --------------------------------

  useEffect(() => {

    const email = activeEmailRef.current;

    if (
      !email ||
      isLoadingUser.current
    ) {
      return;
    }


    const users = getUsers();

    const existingUser =
      users[email] || {
        ...emptyAcademicData
      };


    users[email] = {
      ...existingUser,
      marks: studentMarks
    };


    saveUsers(users);

  }, [studentMarks]);


  // --------------------------------
  // Save APS whenever it changes
  // --------------------------------

  useEffect(() => {

    const email = activeEmailRef.current;

    if (
      !email ||
      isLoadingUser.current
    ) {
      return;
    }


    const users = getUsers();

    const existingUser =
      users[email] || {
        ...emptyAcademicData
      };


    users[email] = {
      ...existingUser,
      aps
    };


    saveUsers(users);

  }, [aps]);


  // --------------------------------
  // Save selected programme
  // --------------------------------

  useEffect(() => {

    const email = activeEmailRef.current;

    if (
      !email ||
      isLoadingUser.current
    ) {
      return;
    }


    const users = getUsers();

    const existingUser =
      users[email] || {
        ...emptyAcademicData
      };


    users[email] = {
      ...existingUser,
      selectedProgramme
    };


    saveUsers(users);

  }, [selectedProgramme]);


  // --------------------------------
  // Reset current user's profile
  // --------------------------------

  const resetProfile = () => {

    const email = activeEmailRef.current;

    setStudentProfile(emptyProfile);
    setStudentMarks({});
    setAPS(null);
    setSelectedProgramme(null);


    if (!email) {
      return;
    }


    const users = getUsers();

    users[email] = {
      ...emptyAcademicData
    };


    saveUsers(users);

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