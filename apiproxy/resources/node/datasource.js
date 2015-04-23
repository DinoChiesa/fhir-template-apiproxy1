// datasource.js
// ------------------------------------------------------------------
//
// just contrived data to illustrate the concept.
//
// created: Wed Apr 22 12:19:53 2015
// last saved: <2015-April-23 10:11:13>

module.exports = {

  "/Patient" : {
    description: "JS hash containing data for Patients",
    source: "contrived",
    stamp: "Wednesday, 22 April 2015, 12:26",
    datarows : [
      {
        name : "Fred",
        gender: "M",
        id: "5B0A3107-50D9-4A3D-8CAB-8A6A1558A022",
        dob : "2001-Apr-12"
      },
      {
        name : "Ethyl",
        gender: "F",
        id : "F4EC09FC-6AE8-4D86-90B9-803E6252B692",
        dob : "2005-May-22"
      },
      {
        name : "Marge",
        gender: "F",
        id: "BF3CD414-B6AF-4C2A-BDC0-8254E46AA93C",
        dob : "1943-January-13",
        deceased: true
      },
      {
        name : "Eric",
        gender: "M",
        id: "C01F97F4-9FDC-4AD5-BC01-54916FC23BDC",
        dob : "1973-Jun-04"
      }
    ]
  },

  "/Provider" : {
    description: "JS hash containing data for providers",
    source: "contrived",
    stamp: "Wednesday, 22 April 2015, 16:22",
    datarows : [
      {
        name : "Dr. Bob",
        id: "BFD0A3A8-D854-4FEF-87C3-EE4EC910F59B",
        specialties : [
          "Surgery", "Pediatric Surgery"
        ]
      },
      {
        name : "Dr. Sheila",
        id: "71A45A08-CD2B-42F1-9638-87F695D9C080",
        specialties : [
          "Psychiatry"
        ]
      }
      ]
  }

};
