var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

var newUser = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(__dirname + "/app/public"))

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "/app/public/home.html"))
})

app.get("/all", function(req, res) {
	res.json(newUser);
})

app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "/app/public/survey.html"))
})

app.post("/api/new", function(req, res) {
	var newUser2 = req.body;
	console.log(newUser2);
	newUser.push(newUser2);
	res.json(newUser2)
})

app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT)
})	