var React = require("react");

//create the Search component

var Search = React.createClass({ 

    getInitialState: function() {
        return{};
    },

    handleClick: function() {
         console.log("run-search click is working within component");
    },

    render: function() {          
       return ( 
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title text-center">Search</h3>
                  </div>
                  <div className="panel-body text-center">
                    <form role="form">
                        {/*create the text box to capture the search term*/}  
                      <div className="form-group">
                        <label htmlFor="searchTerm">Topic</label>
                        <input type="text" className="form-control" id="search-term"></input>
                      </div> 
                       {/*create the text box to capture the start year*/}
                      <div className="form-group">
                        <label htmlFor="startYear">Start Year</label>
                        <input type="text" className="form-control" id="start-year"></input>
                      </div> 
                       {/*create the text box to capture the end year*/}
                      <div className="form-group">
                        <label htmlFor="endYear">End Year</label>
                        <input type="text" className="form-control" id="end-year"></input>
                      </div> 
                      <button 
                      id="run-search"
                      className="btn btn-primary"
                      onClick={this.handleClick}
                      >Search</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>         
         );
    }
 });

 module.exports = Search;
