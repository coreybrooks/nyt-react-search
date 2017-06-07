// Include the React library
var React = require("react");

// Include the react-router module
var router = require("react-router");

// Include the Route component for displaying individual routes
var Route = router.Route;

// Include the Router component to contain all our Routes
// Here where we can pass in some configuration as props
var Router = router.Router;

// Include the hashHistory prop to handle routing client side without a server
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
var hashHistory = router.hashHistory;

 var renderResults = function() {
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
  }
  var renderHistory = function() {
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
  }

// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;
var renderResults = renderResults();
var renderHistory = renderHistory();

// Reference the high-level components
var Main = require("../components/Main");
var Results = require("../components/children/Results");
var Saved = require("../components/children/Saved");
var Search = require("../components/children/Search");


// Export the Routes
module.exports = (

  // The high level component is the Router component
  <Router history={hashHistory}>
    <Route path="/" component={Main}>

      {/* If user selects Info or Chat show the appropriate component */}
      <Route path="results" component={renderResults} />
      <Route path="saved" component={renderHistory} />
      <Route path="search" component={Search} />

      {/* If user selects any other path... we get the Info Route */}
      <IndexRoute component={Search} />

    </Route>
  </Router>

);
