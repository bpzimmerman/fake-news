// require the node modules
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

// create the express app
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// sets up the express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static content for the app from the "public" directory
app.use(express.static("public"));

// import routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// sets up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// connect to Mongo DB
mongoose.connect("mongodb://localhost/fakenews");

// opens the local server
app.listen(PORT, function() {
  console.log(`Server listening on: http://localhost: ${PORT}`);
});