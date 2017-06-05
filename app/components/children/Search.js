var React = require("react");

//create the Search component

var Search = React.createClass({ 

    getInitialState: function() {
        return{
          searchTerm: "",
          startYear: "",
          endYear: ""
        };
    },
    handleChange: function (event) {
      var newState={};
      newState[event.target.id]=event.target.value;
      this.setState(newState);
    },
    handleSubmit: function(event) {
      console.log("handleSubmit is working");
      event.preventDefault();

      //set the parent to have the new terms
      this.props.setTerms(this.state.searchTerm, this.state.startYear, this.state.endYear);
      this.setState({searchTerm: "", startYear: "", endYear: ""});
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
                    <form onSubmit={this.handleSubmit}>
                        {/*create the text box to capture the search term*/}  
                      <div className="form-group">
                        <label htmlFor="searchTerm">Topic</label>
                        <input 
                          value={this.state.searchTerm}
                          type="text" 
                          className="form-control"
                          id="searchTerm"
                          onChange={this.handleChange}
                          required
                        />
                      </div> 
                       {/*create the text box to capture the start year*/}
                      <div className="form-group">
                        <label htmlFor="startYear">Start Year</label>
                        <input 
                          value={this.state.startYear}
                          type="text" 
                          className="form-control" 
                          id="startYear"
                          onChange={this.handleChange}
                          />
                      </div> 
                       {/*create the text box to capture the end year*/}
                      <div className="form-group">
                        <label htmlFor="endYear">End Year</label>
                        <input 
                          value={this.state.endYear}
                          type="text" 
                          className="form-control" 
                          id="endYear"
                          onChange={this.handleChange}
                          />
                      </div> 
                      <button 
                      className="btn btn-primary"
                      type="submit"
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
