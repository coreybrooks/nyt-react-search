var React = require("react");

//create the Results component
var Results = React.createClass({
    getIntialState: function() {

    },
    render: function() {
        return (
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading text-center">
                  <h3 className="panel-title">Results</h3>
                </div>
                {/*this panel will hold the results*/}
                <div className="panel-body" id="well-section">                  
                </div>    
              </div>
            </div>
          </div>
        );
    }
});

module.exports = Results;