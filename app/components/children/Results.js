var React = require("react");
var helpers = require("./../utils/helpers");


//create the Results component
var Results = React.createClass({

  handleSave: function(event) {
    console.log("handleSave is working");
    helpers.saveHistory()

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
                  {this.props.results.map(function(data, i) {
                      return (                        
                        <div key={i}>
                          <hr></hr>
                          {/*display headline as link*/}
                          <h4><a href={data.web_url}><i className="fa fa-newspaper-o" aria-hidden="true"></i> {data.headline.main}</a><br/></h4>
                          <img
                          className="image"
                          //ternary expression to display the image if one is available or "sorry" message if not
                          src={data.multimedia.length ? "https://nytimes.com/" + data.multimedia[0].url: "http://www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png"} 
                          />
                          <p>{data.byline ? data.byline.original : ""}</p>                  
                          <p>Section: {data.section_name}</p>
                          {/*ternary expression to display date if one is available*/}
                          <p>Date: {data.pub_date ? data.pub_date.substring(0,10): "N/A"}</p>
                          <button 
                          id={data.headline}
                          className="btn btn-primary saveButton"
                          onClick={() => this.handleSave}>save
                          </button>
                        </div>
                      );
                    })}
                </div>    
              </div>
            </div>
          </div>
        );
    }
});

module.exports = Results;