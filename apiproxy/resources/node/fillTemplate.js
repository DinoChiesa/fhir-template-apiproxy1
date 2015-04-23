// fillTemplate.js
// ------------------------------------------------------------------
//
// Demonstrates filling a handlebars template with data from a
// datasource. The datasource is nothing more that a Javascript hash.
// It theoretically can be filled from "anywhere", like an XML payload,
// a REST webservice, a MySQL database, etc.
//
// created: Wed Apr 22 12:18:43 2015
// last saved: <2015-April-23 10:16:08>

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


// Define a few handlebars helpers, just for fun.
Handlebars.registerHelper("age", function() {
  var age = calcAge(this.dob);
  return age;
});

Handlebars.registerHelper("currenttime", function() {
  return dateFormat(new Date(), "Y-M-d\\TH:i:s.u");
});

function handleRequest(request, response) {
  var path = request.path, result,
      route = templateRoutes.routes[path];
  // lookup the template and dataModel based on the path.
  // TODO: parameterize these queries.
  response.header('Content-Type', 'text/xml');
  if ( ! route) {
    response.status(500).send("<error><message>cannot find template</message></error>");
    return;
  }
  result = route.template(dataModel[path]);
  response.status(200).send(result);
}

app.get('/Patient', jsonParser, handleRequest);
app.get('/Provider', jsonParser, handleRequest);

// default behavior
app.all(/^\/.*/, function(request, response) {
  response.header('Content-Type', 'application/json');
  response.status(404).send('{ "status" : "This is not the server you\'re looking for." }\n');
});


// load all the templates and only begin listening when that's complete
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
