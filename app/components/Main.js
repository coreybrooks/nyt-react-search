// include React
var React = require("react");

//include all of the sub-components
var Search = require("./children/Search.js");
var Results = require("./children/Results.js");
var Saved = require("./children/Saved.js");

//Main component
var Main = React.createClass({

   //set initial state of any variables
   getIntialState: function() {

   },
  //go back and create lifecycle events here

  //component's render method
  render: function() {
      return (
          <div className="container">
            <div className="jumbotron">
              <h2>Corey's NYT React Searcher</h2>
            </div>
              <Search />
              <Results />
              <Saved />
          </div>
      );
  }
});

module.exports = Main;
