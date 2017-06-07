//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

//requiring Article model
var Article = require("./models/article.js");
// set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

//Initialze Express
var app = express();

//set an initial port
var PORT = process.env.PORT || 8080;

//use morgan and body-parser with our app
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//handlebars setup
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//make public a static dir
app.use(express.static("public"));

//database configuration with mongoose
mongoose.connect("mongodb://localhost/nytreact");

var db = mongoose.connection;

//show any mongoose errors
db.on("error", function(error) {
    console.log("mongoose error: " + error);
});

//once logged into the db through mongoose, log a success message
db.once("open", function() {
    console.log("mongooose connection was successful");
});

//*********** routes *************

//route to get all saved articles from the database
app.get("/api/saved", function(req, res) {
    console.log("get route is working");
    Article.find({}).exec(function(error, doc) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(doc);
            res.json(doc);
        }
    });
});

//post route to save articles to database
app.post("/api/saved", function(req, res) {
    console.log("api/saved post is working");
    console.log("req.body: " + JSON.stringify(req.body));
   
   /* var newData = {
        title: req.body.headline.main,
        data: req.body.pub_date,
        url: req.body.web_url
    }
    console.log(JSON.stringify(newData)); */
    
    
    var newArticle = new Article(req.body);

    //save the new article in the database
    newArticle.save(function(error, doc) {
        if (error) {
            res.send(error);
        }
        else {
            //send doc to browser if successfully saved
           res.send(doc);
        }
    });
});

//delete route to delete articles from the database
app.delete("/api/saved", function(req,res) {
    console.log("delete route is working");
    console.log("req.body: " + req.body);
    Article.deleteOne({
        title: req.body.title
    }).then(console.log("collection deleted"));
});

//load the main page
app.get("/", function(req,res) {
  //missing the class for this section?
  console.log("hello");
    
});

//listen on PORT
app.listen(PORT, function() {
    console.log("app is listening on PORT: " + PORT);
});