const programmes = [
  // ==========================
  // WITS
  // ==========================

  {
    id: 1,
    universityId: 1,
    university: "University of the Witwatersrand",
    shortUniversity: "Wits",

    name: "BSc Computer Science",
    qualification: "Bachelor",
    faculty: "Science",

    duration: "3 Years",
    campus: "Braamfontein",

    apsRequirement: 34,

    requiredSubjects: [
      { subject: "Mathematics", minimum: 70 },
      { subject: "English Home Language", minimum: 60 }
    ],

    applicationStatus: "Open",
    applicationDeadline: "30 September",

    spacesAvailable: 18,
    totalSpaces: 120,

    careers: [
      "Software Developer",
      "AI Engineer",
      "Data Scientist",
      "Cybersecurity Analyst"
    ],

    description:
      "Develop advanced programming, software engineering, artificial intelligence and data science skills.",

    officialUrl: "#"
  },

  {
    id: 2,
    universityId: 1,
    university: "University of the Witwatersrand",
    shortUniversity: "Wits",

    name: "Bachelor of Engineering",
    qualification: "Bachelor",
    faculty: "Engineering",

    duration: "4 Years",
    campus: "Braamfontein",

    apsRequirement: 36,

    requiredSubjects: [
      { subject: "Mathematics", minimum: 70 },
      { subject: "Physical Sciences", minimum: 70 },
      { subject: "English Home Language", minimum: 60 }
    ],

    applicationStatus: "Open",
    applicationDeadline: "30 September",

    spacesAvailable: 10,
    totalSpaces: 100,

    careers: [
      "Mechanical Engineer",
      "Civil Engineer",
      "Electrical Engineer"
    ],

    description:
      "Professional engineering degree preparing students for a range of engineering disciplines.",

    officialUrl: "#"
  },

  // ==========================
  // UCT
  // ==========================

  {
    id: 3,
    universityId: 2,
    university: "University of Cape Town",
    shortUniversity: "UCT",

    name: "BSc Information Systems",
    qualification: "Bachelor",
    faculty: "Commerce",

    duration: "3 Years",
    campus: "Upper Campus",

    apsRequirement: 36,

    requiredSubjects: [
      { subject: "Mathematics", minimum: 70 },
      { subject: "English Home Language", minimum: 60 }
    ],

    applicationStatus: "Open",
    applicationDeadline: "31 July",

    spacesAvailable: 25,
    totalSpaces: 140,

    careers: [
      "Business Analyst",
      "Systems Analyst",
      "IT Consultant"
    ],

    description:
      "Combines business knowledge with technology to prepare students for digital transformation roles.",

    officialUrl: "#"
  },

  {
    id: 4,
    universityId: 2,
    university: "University of Cape Town",
    shortUniversity: "UCT",

    name: "BCom Data Science",
    qualification: "Bachelor",
    faculty: "Commerce",

    duration: "3 Years",
    campus: "Upper Campus",

    apsRequirement: 35,

    requiredSubjects: [
      { subject: "Mathematics", minimum: 75 },
      { subject: "English Home Language", minimum: 60 }
    ],

    applicationStatus: "Open",
    applicationDeadline: "31 July",

    spacesAvailable: 30,
    totalSpaces: 150,

    careers: [
      "Data Analyst",
      "Data Scientist",
      "Machine Learning Engineer"
    ],

    description:
      "Focuses on statistics, programming and data-driven decision making for modern industries.",

    officialUrl: "#"
  },

  // ==========================
  // UNIVERSITY OF PRETORIA
  // ==========================

  {
    id: 5,
    universityId: 3,
    university: "University of Pretoria",
    shortUniversity: "UP",

    name: "BCom Informatics",
    qualification: "Bachelor",
    faculty: "Economic and Management Sciences",

    duration: "3 Years",
    campus: "Hatfield",

    apsRequirement: 30,

    requiredSubjects: [
      { subject: "Mathematics", minimum: 60 },
      { subject: "English Home Language", minimum: 50 }
    ],

    applicationStatus: "Open",
    applicationDeadline: "30 June",

    spacesAvailable: 40,
    totalSpaces: 180,

    careers: [
      "Business Analyst",
      "Systems Developer",
      "IT Project Manager"
    ],

    description:
      "Combines business processes with information systems to prepare graduates for technology-driven organisations.",

    officialUrl: "#"
  },

  {
    id: 6,
    universityId: 3,
    university: "University of Pretoria",
    shortUniversity: "UP",

    name: "BSc Information Technology",
    qualification: "Bachelor",
    faculty: "Science",

    duration: "3 Years",
    campus: "Hatfield",

    apsRequirement: 32,

    requiredSubjects: [
      { subject: "Mathematics", minimum: 70 },
      { subject: "English Home Language", minimum: 50 }
    ],

    applicationStatus: "Open",
    applicationDeadline: "30 June",

    spacesAvailable: 28,
    totalSpaces: 120,

    careers: [
      "Software Developer",
      "Cloud Engineer",
      "Network Engineer"
    ],

    description:
      "Develop practical computing, networking and software development skills for the IT industry.",

    officialUrl: "#"
  }
];

export default programmes;