var React = require("react");

//create the Results component
var Saved = React.createClass({
    getIntialState: function() {

    },
    render: function() {
        return (
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading text-center">
                  <h3 className="panel-title">Saved</h3>
                </div>
                {/*this panel will hold the results*/}
                <div className="panel-body" id="saved-well-section">                  
                </div> 
                <button className="btn btn-primary" id="get-saved">Get Saved</button>   
              </div>
            </div>
          </div>
        );
    }
});

module.exports = Saved;