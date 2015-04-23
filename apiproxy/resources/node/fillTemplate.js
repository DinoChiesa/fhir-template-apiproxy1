// fillTemplate.js
// ------------------------------------------------------------------
//
// Demonstrates filling a handlebars template with data from a
// datasource. The datasource is nothing more that a Javascript hash.
// It theoretically can be filled from "anywhere", like an XML payload,
// a REST webservice, a MySQL database, etc.
//
// The handlebars template is provided by the operator. This demo shows
// a Patient and a Provider template. These are NOT FHIR compliant today.
// Just an illustration of the concept.
//
// created: Wed Apr 22 12:18:43 2015
// last saved: <2015-April-23 11:06:11>

var fs = require('fs'),
    async = require('async'),
    express = require('express'),
    Handlebars = require('handlebars'),
    bodyParser = require('body-parser'),
    //apigee = require('apigee-access'),
    calcAge = require('./calcAge'),
    dateFormat = require('./dateFormat'),
    templateRoutes = require('./routes.js');

var version = 'Wednesday, 22 April 2015, 16:46',
    dataModel = getDataModel('whatever');

var app = express(),
    jsonParser = bodyParser.json();

function getDataModel(modelName) {
  // This fn could return data from *anywhere*. For example it could
  // vary where it gets the data, based on the modelName parameter.
  var defaultDatasourceFilename = './datasource.js';
  var dataSource = require(defaultDatasourceFilename);
  return dataSource;
}

function loadOneTemplate(key, cb) {
  var filename = templateRoutes.routes[key];
  fs.readFile(filename, 'utf8', function(e, template) {
    var obj;
    if (e) throw e;
    console.log("read %s template file", filename);
    // replace the route with a hash
    obj = {
      filename: filename, template : Handlebars.compile(template)
    };
    templateRoutes.routes[key] = obj;
    cb(null, obj);
  });
}

function copyHash(obj) {
  var copy = {};
  if (null !== obj && typeof obj == "object") {
    Object.keys(obj).forEach(function(attr){copy[attr] = obj[attr];});
  }
  return copy;
}

// Define a few handlebars helpers, just for fun.
Handlebars.registerHelper("age", function() {
  var age = calcAge(this.dob);
  return age;
});

Handlebars.registerHelper("currenttime", function() {
  return dateFormat(new Date(), "Y-M-d\\TH:i:s.u");
});


function convertWildcardToRegex(wildcard) {
  // build a regex from a wildcard string; it replaces % with .*
  var re0 = new RegExp('%', 'g');
  var re1 = new RegExp(wildcard.replace(re0, '.*'));
  return re1;
}

function retrieveData(resourcePath, name, id, specialty) {
  // This function currently retrieves and filters data from just one
  // kind of datasource: a JS hash containing an array of elements
  // called 'datarows'.
  //
  // Later we can extend this fn to retrieve data from different sources
  // - eg RDBMS and HBase - based on the resourcePath. Or perhaps it
  // would be more correct to select the datasource based on the
  // template itself.

  var filteredData = copyHash(dataModel[resourcePath]);
  if (id) {
    filteredData.datarows = filteredData.datarows.filter(function(item) {
      return item.id == id;
    });
  }

  if (name) {
    if (name.indexOf('%') > -1) {
      // pattern match - use regexp
      re1 = convertWildcardToRegex(name);
      filteredData.datarows = filteredData.datarows.filter(function(item) {
        return re1.test(item.name);
      });
    }
    else {
      // exact match
      filteredData.datarows = filteredData.datarows.filter(function(item) {
        return item.name == name;
      });
    }
  }

  // allow query of specialty only for Provider
  if (resourcePath === '/Provider') {
    if (specialty) {
      if (specialty.indexOf('%') > -1) {
        // pattern match - use regexp
        re1 = convertWildcardToRegex(specialty);
        filteredData.datarows = filteredData.datarows.filter(function(item) {
          var found = item.specialties.filter(function(spec){
                return re1.test(spec);
              });
          return (found.length>0);
        });
      }
      else {
        // exact match
        filteredData.datarows = filteredData.datarows.filter(function(item) {
          return item.specialties.indexOf(specialty) > -1;
        });
      }
    }
  }
  return filteredData;
}


function handleRequest(request, response) {
  var path = request.path,
      route = templateRoutes.routes[path],
      retrievedData,
      result,
      id = request.query.id,
      name = request.query.name,
      specialty = request.query.specialty,
      re1;

  // lookup the template and dataModel based on the path.
  response.header('Content-Type', 'text/xml');
  if ( ! route) {
    response.status(500).send("<error><message>cannot find template</message></error>");
    return;
  }

  retrievedData = retrieveData(path, name, id, specialty);
  result = route.template(retrievedData);
  response.status(200).send(result);
}


app.get('/Patient', jsonParser, handleRequest);
app.get('/Provider', jsonParser, handleRequest);

// default behavior
app.all(/^\/.*/, function(request, response) {
  response.header('Content-Type', 'application/json');
  response.status(404).send('{ "error": true, "status" : "There\'s nothing here by that name." }\n');
});


// Load all the templates, begin listening for requests when finished.
var keys = Object.keys(templateRoutes.routes);
async.mapSeries(keys, loadOneTemplate, function(e, routesdata) {
  // ignore routesdata
  if (e) {
    console.log('error while loading templates: ', e);
    process.exit(1);
  }

  port = process.env.PORT || 5950;
  app.listen(port, function() {
    console.log( 'fillTemplate version: ' + version + ', LISTENING');
  });

});
