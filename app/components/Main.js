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
     return { searchTerm: "", startYear: "", endYear: "", results: [], history: [] };

   },
   // get the latest history as soon as the page loads
   componentDidMount: function() {
     helpers.getHistory().then(function(res) {
       console.log(res);
       if (res !== this.state.history) {
         console.log("history response: " + JSON.stringify(res.data));
         this.setState({history : res.data})
       }
     }.bind(this));
   },
  //go back and create lifecycle events here
  componentDidUpdate: function(prevProps, prevState) {
      console.log("-------------------");
      console.log("prevProps: " + prevProps.searchTerm);
      console.log("prevState: " + prevState.searchTerm);
      if (prevState.searchTerm !== this.state.searchTerm) {
          console.log("componentDidUpdate triggered");
          helpers.runQuery(this.state.searchTerm, this.state.startYear, this.state.endYear).then(function(data) {
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
       console.log("article saved!");
       //get new history after new save
          helpers.getHistory().then(function(res) {
            console.log(res);
            if (res !== this.state.history) {
              console.log("history response: " + res.data);
              this.setState({history : res.data})
            }
          }.bind(this));
     }.bind(this));
  },
  deleteData: function(data) {
    console.log("deleteData is working");
    console.log("deleteData data: " + JSON.stringify(data));
    helpers.deleteHistory(data).then(function() {
      console.log("article deleted!");
         helpers.getHistory().then(function(res) {
            console.log(res);
            if (res !== this.state.history) {
              console.log("history response: " + JSON.stringify(res.data));
              this.setState({history : res.data})
            }
          }.bind(this));
    }.bind(this));
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
  renderHistory: function() {
    if (this.state.history === []) {
      return
    }
    else {
      return this.state.history.map(
        (data) => (
          <div key={data.title}>
            <Saved data={data} handleClick={this.deleteData}/>
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
                  {this.props.children}
            </div>
      );
  }
});

module.exports = Main;
