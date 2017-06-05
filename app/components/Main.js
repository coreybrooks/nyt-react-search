// include React
var React = require("react");

//include all of the sub-components
var Search = require("./children/Search.js");
var Results = require("./children/Results.js");
var Saved = require("./children/Saved.js");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

//Main component
var Main = React.createClass({

   //set initial state of any variables
   getInitialState: function() {
     return { searchTerm: "", startYear: "", endYear: "", results: [] };

   },
  //go back and create lifecycle events here
  componentDidUpdate: function(prevProps, prevState) {
      console.log("-------------------");
      console.log("prevProps: " + JSON.stringify(prevProps));
      console.log("prevState: " + JSON.stringify(prevState));
      if (prevState.searchTerm !== this.state.searchTerm) {
          console.log("componentDidUpdate triggered");
          helpers.runQuery(this.state.searchTerm, this.state.startYear, this.state.endYear).then(function(data) {
            console.log("data: " + JSON.stringify(data.data.response.docs[0].headline.main));
            this.setState({ results: data.data });
          }.bind(this));
     }
  },
  setTerms: function(search, start, end) {
    this.setState({searchTerm: search, startYear: start, endYear: end});
  },

  //component's render method
  render: function() {
      return (
          <div className="container">
            <div className="jumbotron">
              <h2>Corey's NYT React Searcher</h2>
            </div>
              <Search setTerms={this.setTerms} />
              <Results results={this.results} />
              <Saved />
          </div>
      );
  }
});

module.exports = Main;
