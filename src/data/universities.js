const universities = [

  {
    id: 1,

    name: "University of the Witwatersrand",

    shortName: "Wits",

    location: "Johannesburg",

    applications: "Open",

    description:
      "Wits University is one of South Africa’s leading research universities, known for excellence in science, engineering, and technology.",

    programmes: [

      {
        name: "BSc Computer Science",
        aps: 34,
        spaces: "Limited",
        faculty: "Science"
      },

      {
        name: "Bachelor of Engineering",
        aps: 36,
        spaces: "Few Remaining",
        faculty: "Engineering"
      }

    ]
  },

  {
    id: 2,

    name: "University of Cape Town",

    shortName: "UCT",

    location: "Cape Town",

    applications: "Open",

    description:
      "UCT is internationally recognised for academic excellence and competitive programme admissions.",

    programmes: [

      {
        name: "BSc Information Systems",
        aps: 36,
        spaces: "Limited",
        faculty: "Commerce"
      },

      {
        name: "BCom Data Science",
        aps: 35,
        spaces: "Available",
        faculty: "Commerce"
      }

    ]
  },

  {
    id: 3,

    name: "University of Pretoria",

    shortName: "UP",

    location: "Pretoria",

    applications: "Closing Soon",

    description:
      "UP offers a wide range of technology and engineering programmes with strong industry partnerships.",

    programmes: [

      {
        name: "BCom Informatics",
        aps: 30,
        spaces: "Available",
        faculty: "Economic and Management Sciences"
      },

      {
        name: "BSc IT",
        aps: 32,
        spaces: "Limited",
        faculty: "Science"
      }

    ]
  }

];

export default universities;