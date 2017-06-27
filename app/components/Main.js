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
        <div>
          {/*Header*/} 
          <div className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand" href="#">Corey's NYT | React Project</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                      <ul className="social">
                          <li><a href="https://github.com/coreybrooks"><i className=" fa fa-github"></i></a></li>
                          <li><a href="https://www.linkedin.com/in/corey-brooks"><i className="fa fa-linkedin"></i></a></li>
                      </ul>
                  </ul>
                </div>
            </div>
          </div>

            <div className="container">  
              <div className="jumbotron">
                <h2>Corey's NYT API Searcher | Built with React</h2>
              </div>
             
              <Search setTerms={this.setTerms} />
              
              {/*section to dynamically create results component*/}
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

              {/*section to dynamically create saved component*/}
              <div className="row">
                <div className="col-md-12">
                  <div className="panel panel-default">
                    <div className="panel-heading text-center">
                      <h3 className="panel-title">Saved</h3>
                    </div>
                    {/*this panel will hold the results*/}
                    <div className="panel-body" id="saved-well-section">   
                      {this.renderHistory()}               
                    </div> 
                  </div>
                </div>
              </div>
            </div>

            {/*Footer*/}
             <div className="footer navbar navbar-default">
               <div className="container-fluid">
                 <p className="text-center"> Copyright © 2017 Corey Brooks</p>
               </div>
             </div>

        </div>
      );
  }
});

module.exports = Main;
