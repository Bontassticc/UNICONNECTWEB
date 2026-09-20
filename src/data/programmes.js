const programmes = [

  // ==========================================
  // UNIVERSITY OF JOHANNESBURG
  // ==========================================

  {
    id: 1,
    university: "University of Johannesburg",
    name: "BSc Computer Science",
    qualification: "Bachelor of Science",
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
    id: 7,
    university: "University of Johannesburg",
    name: "BCom Business Management",
    qualification: "Bachelor of Commerce",
    minAPS: 28,
    field: "Business",

    requirements: [
      {
        type: "mathematicsOrLiteracy",
        minimumMark: 50,
        label: "Mathematics or Mathematical Literacy"
      },
      {
        type: "firstAdditionalLanguage",
        minimumMark: 50,
        label: "First Additional Language"
      }
    ]
  },

  {
    id: 8,
    university: "University of Johannesburg",
    name: "BCom Marketing Management",
    qualification: "Bachelor of Commerce",
    minAPS: 28,
    field: "Business",

    requirements: [
      {
        type: "mathematicsOrLiteracy",
        minimumMark: 50,
        label: "Mathematics or Mathematical Literacy"
      },
      {
        type: "firstAdditionalLanguage",
        minimumMark: 50,
        label: "First Additional Language"
      }
    ]
  },


  // ==========================================
  // UNIVERSITY OF PRETORIA
  // ==========================================

  {
    id: 2,
    university: "University of Pretoria",
    name: "BCom Informatics",
    qualification: "Bachelor of Commerce",
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
    id: 9,
    university: "University of Pretoria",
    name: "BCom Accounting",
    qualification: "Bachelor of Commerce",
    minAPS: 30,
    field: "Business",

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
    id: 10,
    university: "University of Pretoria",
    name: "BSc Computer Science",
    qualification: "Bachelor of Science",
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


  // ==========================================
  // WITS UNIVERSITY
  // ==========================================

  {
    id: 3,
    university: "Wits University",
    name: "Bachelor of Engineering",
    qualification: "Bachelor of Engineering",
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
    id: 11,
    university: "Wits University",
    name: "BSc Computer Science",
    qualification: "Bachelor of Science",
    minAPS: 36,
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
    id: 12,
    university: "Wits University",
    name: "Bachelor of Commerce",
    qualification: "Bachelor of Commerce",
    minAPS: 36,
    field: "Business",

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


  // ==========================================
  // TSHWANE UNIVERSITY OF TECHNOLOGY
  // ==========================================

  {
    id: 4,
    university: "Tshwane University of Technology",
    name: "Diploma in IT",
    qualification: "Diploma",
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
    id: 13,
    university: "Tshwane University of Technology",
    name: "Diploma in Business Information Technology",
    qualification: "Diploma",
    minAPS: 24,
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
    id: 14,
    university: "Tshwane University of Technology",
    name: "Diploma in Retail Business Management",
    qualification: "Diploma",
    minAPS: 24,
    field: "Business",

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


  // ==========================================
  // UNIVERSITY OF CAPE TOWN
  // ==========================================

  {
    id: 5,
    university: "University of Cape Town",
    name: "BSc Information Systems",
    qualification: "Bachelor of Science",
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
    id: 15,
    university: "University of Cape Town",
    name: "BCom",
    qualification: "Bachelor of Commerce",
    minAPS: 34,
    field: "Business",

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
    id: 16,
    university: "University of Cape Town",
    name: "BSc Computer Science",
    qualification: "Bachelor of Science",
    minAPS: 35,
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


  // ==========================================
  // UNISA
  // ==========================================

  {
    id: 6,
    university: "UNISA",
    name: "Higher Certificate in Computing",
    qualification: "Higher Certificate",
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
  },

  {
    id: 17,
    university: "UNISA",
    name: "Bachelor of Commerce in Business Informatics",
    qualification: "Bachelor of Commerce",
    minAPS: 21,
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
    id: 18,
    university: "UNISA",
    name: "Bachelor of Science in Computing",
    qualification: "Bachelor of Science",
    minAPS: 20,
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
  }

];

export default programmes;