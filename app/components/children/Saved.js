var React = require("react");

const Saved = (props) => {
  const {title, date, url} = props.data;
  const {handleClick} = props;
        return (
          <div>
              <div className="row">
                <div className="col-md-12">
                  <div className="panel panel-default">
                    <div className="panel-heading text-center">
                      <h3 className="panel-title">Saved</h3>
                    </div>
                    {/*this panel will hold the results*/}
                    <div className="panel-body" id="saved-well-section">
                      <hr />
                        <h4><a href={url}><i className="fa fa-newspaper-o" aria-hidden="true"></i> {title}</a><br/></h4>
                        {/*<img
                          className="image"
                          //ternary expression to display the image if one is available or "sorry" message if not
                          src={multimedia.length ? "https://nytimes.com/" + multimedia[0].url: "http://www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png"} 
                        />
                        <p>{byline ? byline.original : ""}</p>
                        <p>Section: {section_name}</p>*/}
                        {/*ternary expression to display date if one is available*/}
                        <p>Date: {date ? date.substring(0,10): "N/A"}</p>
                        <button 
                          className="btn btn-danger deleteButton"
                          onClick={() => handleClick(props.data)}>Delete
                        </button>
                    </div> 
                  </div>
                </div>
              </div>
          </div>         
        );
}

module.exports = Saved;