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
            this.setState({ results: data.data.response.docs});
          }.bind(this));
     }
  },
  setTerms: function(search, start, end) {
    this.setState({searchTerm: search, startYear: start, endYear: end});
  },
  saveData: function(data) {
     console.log("saveData click is working");
     console.log("data: " + (data));
     helpers.saveHistory(data).then(function() {
       console.log("saveData then promise triggered");
     });
  },
  renderResults: function() {
    if (this.state.results === "") {
      return
    }
    else {
    return this.state.results.map(
        (data) => (
          <div key={data.headline.main} >
             <Results data={data} handleClick={this.saveData}/>
          </div>
        )
    );
    }
  },

  //component's render method
  render: function() {
      return (
          <div className="container">
            <div className="jumbotron">
              <h2>Corey's NYT React Searcher</h2>
            </div>
             
              <Search setTerms={this.setTerms} />

              <div className="row">
                <div className="col-md-12">
                  <div className="panel panel-default">
                    <div className="panel-heading text-center">
                      <h3 className="panel-title">Results</h3>
                   </div>
                   <div className="panel panel-body">
                     {this.renderResults()} 
                   </div>
                 </div>
                </div>
              </div>

              <Saved />
          </div>
      );
  }
});

module.exports = Main;
