// Requiring relevant NPM's
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require('fs')


//Creating variable in which to use Express
var app = express();

//Requirements for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Object which will store user submitted data (contains a placeholder for first match)
var newUser = [{ name: 'George Stenson',
  photo: 'https://tstmasterassets.s3.amazonaws.com/assets/redesign/people/stock/person-2-24923d4cee72cf21a0b661ba3921b99c.jpg',
  score: [ '1', '5', '2', '3', '4', '3', '1', '3', '1', '5' ] }];

//Variable for storing the difference between submitted scores
var totalDifference = 0;

//Variable for storing the total differences between the users submission and all data stored in the API
var totalDifferenceArray = [];

// Exporting files for use in server.js
module.exports = function(app){

	//app.get function for displaying newUser JSON onject at the /api/friends route
	app.get("/api/friends", function(req, res) {
		res.json(newUser);
	});

	//Grabbing any data posted to the api/friends and further expanding on it with the below functions
	app.post("/api/friends", function(req, res) {

		//Reseting the difference array to empty after every submission
		totalDifferenceArray = [];

		//Creating variable to store the users submission
		var newUser2 = req.body;

		//Pushing user submission to the consolidated user array
		newUser.push(newUser2);

		//Writing JSON object to the friends.js file
		fs.writeFile("app/data/friends.js", JSON.stringify(newUser, null, 2))

		//Beginning loop to find the difference between each individual answer for each unique user
		for (var i = 0; i < newUser.length - 1; i += 1) {
			
			//Looping through the score array 10 times.  Once for each question
			for (var g = 0; g < 10; g += 1) {

				//Calculating the absolute value difference between the user submission and the score being it is being compared to
				totalDifference += Math.abs(newUser2.score[g] - newUser[i].score[g])
			}

			//Pushing the total difference to the total difference array
			totalDifferenceArray.push(totalDifference);

			//Reseting the total difference back to 0 after the completion of the loop
			totalDifference = 0;
		}

		//Finding the lowest total difference in the Total Difference Array
		var closeUserValue = Math.min.apply(null, totalDifferenceArray);

		//Finding the index of the closest user in the Total Difference Array
		var closeUser = totalDifferenceArray.indexOf(closeUserValue)

		//Creating a variable to store the closest user name
		var closeUserName = newUser[closeUser].name;

		//Creating a varibale to store the closest users photo
		var closeUserImage = newUser[closeUser].photo;

		//Creating empty variable to store the closest users data
		var closeUserData = [];

		//Pushing the closest users name and image to the above defined variable (line 67-line 80 is possibly reduntent code)
		closeUserData.push(closeUserName);
		closeUserData.push(closeUserImage);

		//Exporting the closest user back to the survey.html page after the .done ajax call
		res.json(closeUserData);
	})
	
}
