var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


var app = express();
var PORT = process.env.PORT || 3000;

var totalDifference = 0;

var newUser = [];

var totalDifferenceArray = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(__dirname + "/app/public"))

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "/app/public/home.html"))
})
app.get("/api/friends", function(req, res) {
	res.json(newUser);
})
app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "/app/public/survey.html"))
})
app.post("/api/new", function(req, res) {
	console.log("RESPONSE: " + res)
	totalDifferenceArray = [];
	var newUser2 = req.body;
	console.log(newUser2);
	newUser.push(newUser2);
	res.json(newUser2);
	console.log(newUser)
	for (var i = 0; i < newUser.length - 1; i += 1) {
		for (var g = 0; g < 10; g += 1) {
			totalDifference += Math.abs(newUser2.score[g] - newUser[i].score[g])
		}
	console.log("Total Difference: " + totalDifference);
	totalDifferenceArray.push(totalDifference);
	console.log("Total Difference Array: " + totalDifferenceArray);
	totalDifference = 0;
	}
	exports.closestUser = function(closeUserName, closeUserImage) {
		var closeUserValue = Math.min.apply(null, totalDifferenceArray);
		console.log("close User Value: " + closeUserValue)
		var closeUser = totalDifferenceArray.indexOf(closeUserValue)
		console.log("Closest user: " + closeUser);
		closeUserName = newUser[closeUser].name;
		closeUserImage = newUser[closeUser].photo;
		console.log("Name of Closest User " + newUser[closeUser].name)
		console.log("image of Closest User " + newUser[closeUser].photo)
	}	
})
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT)
})	