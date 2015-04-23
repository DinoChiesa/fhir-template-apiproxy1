// routes.js
// ------------------------------------------------------------------
//
// routes of proxy.pathsuffix to template file.
//
// created: Wed Apr 22 12:19:53 2015
// last saved: <2015-April-23 10:16:47>

module.exports = {
  description: "a JS hash relating resource paths to handlebars template files.",
  stamp: "Wednesday, 22 April 2015, 12:26",
  routes : {
    "/Patient" : "patient.hbr",
    "/Provider" : "provider.hbr"
  }
};
