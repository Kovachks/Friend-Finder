var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require("./app/routing/htmlRoutes.js")(app);

require("./app/routing/apiRoutes.js")(app);

app.use(express.static(__dirname + "/app/public"));
// app.use("/api/friends", apiRoutes);

// app.use("/", routes);

// app.use("/survey", routes);

// app.use("/api/new", apiRoutes);



app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT)
})
