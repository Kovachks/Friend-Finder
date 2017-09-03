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

var routes = require("./app/routing/htmlRoutes.js");

app.use("/", routes);


app.get("/api/friends", function(req, res) {
	res.json(newUser);
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
	var closeUserValue = Math.min.apply(null, totalDifferenceArray);
	console.log("close User Value: " + closeUserValue)
	var closeUser = totalDifferenceArray.indexOf(closeUserValue)
	console.log("Closest user: " + closeUser);
	var closeUserName = newUser[closeUser].name;
	var closeUserImage = newUser[closeUser].photo;
	var closeUserData = [];
	closeUserData.push(closeUserName);
	closeUserData.push(closeUserImage);
	console.log("Closest User Name/Image: " + closeUserData)
	console.log("Name of Closest User " + closeUserData[0])
	console.log("image of Closest User " + closeUserData[1])
	module.exports = closeUserData;
})
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT)
})	