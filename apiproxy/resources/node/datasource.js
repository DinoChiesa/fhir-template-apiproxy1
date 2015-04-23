// datasource.js
// ------------------------------------------------------------------
//
// just contrived data to illustrate the concept.
//
// created: Wed Apr 22 12:19:53 2015
// last saved: <2015-April-23 10:54:30>

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
        name : "Dr. Hubert",
        id: "FA1271A8-B279-409B-8565-44EA5FDF495D",
        specialties : [
          "Surgery", "Craniofacial Surgery"
        ]
      },
      {
        name : "Dr. Louise",
        id: "326ABA94-6794-4581-9769-13E82F897EC3",
        specialties : [
          "Dermatology"
        ]
      },
      {
        name : "Dr. Bill",
        id: "81C0B9C1-C8A0-4A46-9B92-B98D7A4D61EE",
        specialties : [
          "Gynecology", "Obstetrics"
        ]
      },
      {
        name : "Dr. Dave",
        id: "A9805FFA-3C7E-4C58-836A-BD8F74867FBF",
        specialties : [
          "Cardiology"
        ]
      },
      {
        name : "Dr. Helen",
        id: "6BC84C25-3DD3-42BB-8343-B0F78F2DF66B",
        specialties : [
          "Ophthalmology", "Ophthalmic Plastic & Reconstructive Surgery"
        ]
      },

      {
        name : "Dr. Sheila",
        id: "71A45A08-CD2B-42F1-9638-87F695D9C080",
        specialties : [
          "Psychiatry"
        ]
      },
      {
        name : "Dr. Shirley",
        id: "D5A65707-3FE7-4572-BFC7-D37F59BD3734",
        specialties : [
          "Thoracic Surgery", "Surgery"
        ]
      },
      {
        name : "Dr. Sheldon",
        id: "4948C23F-1773-4C23-9436-0EB60A647721",
        specialties : [
          "Neurology", "Neuropathology"
        ]
      },
      {
        name : "Dr. Martha",
        id: "5C0EC9A6-1434-43F2-87FA-35DD57B160B9",
        specialties : [
          "Psychiatry", "Addiction Psychiatry"
        ]
      },
      {
        name : "Dr. Willa",
        id: "C0372F44-AD48-4563-844B-309B2AF91C39",
        specialties : [
          "Family Medicine", "Family Practice", "Sports Medicine"
        ]
      }
      ]
  }

};
