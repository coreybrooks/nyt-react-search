// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// API material mostly from week6 6.3/activities/05-NYTSearch

var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
var numResults = 5;
// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(searchTerm, startYear, endYear) {   
    
    console.log("searchTerm: " + searchTerm);
    console.log("startYear: " + startYear);
    console.log("endYear: " + endYear)

    var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=";

    var queryURL = queryURLBase + searchTerm;

    if (parseInt(startYear)) {
        queryURL = queryURL + "&begin_date=" + startYear + "0101";
    }

    // If the user provides a startYear -- the endYear will be included in the queryURL
    if (parseInt(endYear)) {
        queryURL = queryURL + "&end_date=" + endYear + "0101";
    }

    console.log("queryURL: " + queryURL);


    return axios.get(queryURL).then(function(response) {
         console.log("response" + response);
         return response;
    });
  },

  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    return axios.get("/api/saved");
  },

  // This function posts new searches to our database.
  saveHistory: function(data) {
    console.log("helpers saveHistory is working");
    console.log("helper data: " + data);
    var newData = {
        title: data.headline.main,
        date: data.pub_date,
        url: data.web_url,
    }
    return axios.post("/api/saved", newData);
  },
  deleteHistory: function(data) {
    console.log("helpers deleteHistory is working");
    console.log("helper data: " + JSON.stringify(data));
        var deleteData = {
        title: data.title,
        date: data.date,
        url: data.url,
    }
        console.log("var deleteData: " + JSON.stringify(deleteData));

    return axios.delete("/api/saved", {
      data: deleteData
    });
    
    },

};

// We export the API helper
module.exports = helper;
