// Requiring relevant NPM's
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Creating variable in which to use Express
var app = express();

//Creating variable to store port information which will be used when establishing connection to the node server
var PORT = process.env.PORT || 3000;

//Requirements for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Establishing connection to the exported portions of the htmlroutes javascript file
require("./app/routing/htmlRoutes.js")(app);

//Establishing connection to exported portions of the apiroutes javascript file
require("./app/routing/apiRoutes.js")(app);

//Setting static directory in order to load CSS
app.use(express.static(__dirname + "/app/public"));

//Starting a node server which will listen on port 3000 of a localhost
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT)
})
