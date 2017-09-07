//Requiring relavent NPM's
var path = require("path");

//Exporting functions to server.js
module.exports = function(app) {

	//Loading the home.html page when the "/" path is hit
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/home.html"))
	})

	//Loading the survey.html page when the /survey path is hit
	app.get("/survey", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/survey.html"))
	})
}