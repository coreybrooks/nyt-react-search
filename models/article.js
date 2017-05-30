//require mongoose
var mongoose = require("mongoose");
//create schema class
var Schema = mongoose.Schema;

//create article schema
var ArticleSchema = new Schema({
    //title is a required string
    title: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    //data is a required date
    date: {
        type: Date,
        required: true
    },
    //url is a required string
    url: {
        type: String,
        required: true
    }
});

// create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

//export the model
module.exports = Article;