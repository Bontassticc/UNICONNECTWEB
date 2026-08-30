const programmes = [

  {
    id: 1,
    university: "University of Johannesburg",
    name: "BSc Computer Science",
    minAPS: 30,
    field: "Technology",

    requirements: [
      {
        type: "mathematics",
        minimumMark: 60,
        label: "Mathematics"
      },
      {
        type: "firstAdditionalLanguage",
        minimumMark: 50,
        label: "First Additional Language"
      }
    ]
  },


  {
    id: 2,
    university: "University of Pretoria",
    name: "BCom Informatics",
    minAPS: 28,
    field: "Technology",

    requirements: [
      {
        type: "mathematics",
        minimumMark: 50,
        label: "Mathematics"
      },
      {
        type: "firstAdditionalLanguage",
        minimumMark: 50,
        label: "First Additional Language"
      }
    ]
  },


  {
    id: 3,
    university: "Wits University",
    name: "Bachelor of Engineering",
    minAPS: 34,
    field: "Engineering",

    requirements: [
      {
        type: "mathematics",
        minimumMark: 60,
        label: "Mathematics"
      },
      {
        type: "elective",
        subjects: [
          "Physical Sciences"
        ],
        minimumMark: 60,
        label: "Physical Sciences"
      },
      {
        type: "firstAdditionalLanguage",
        minimumMark: 50,
        label: "First Additional Language"
      }
    ]
  },


  {
    id: 4,
    university: "Tshwane University of Technology",
    name: "Diploma in IT",
    minAPS: 22,
    field: "Technology",

    requirements: [
      {
        type: "mathematicsOrLiteracy",
        minimumMark: 40,
        label: "Mathematics or Mathematical Literacy"
      },
      {
        type: "firstAdditionalLanguage",
        minimumMark: 40,
        label: "First Additional Language"
      }
    ]
  },


  {
    id: 5,
    university: "University of Cape Town",
    name: "BSc Information Systems",
    minAPS: 32,
    field: "Technology",

    requirements: [
      {
        type: "mathematics",
        minimumMark: 60,
        label: "Mathematics"
      },
      {
        type: "firstAdditionalLanguage",
        minimumMark: 50,
        label: "First Additional Language"
      }
    ]
  },


  {
    id: 6,
    university: "UNISA",
    name: "Higher Certificate in Computing",
    minAPS: 18,
    field: "Technology",

    requirements: [
      {
        type: "mathematicsOrLiteracy",
        minimumMark: 40,
        label: "Mathematics or Mathematical Literacy"
      },
      {
        type: "firstAdditionalLanguage",
        minimumMark: 40,
        label: "First Additional Language"
      }
    ]
  }

];

export default programmes;