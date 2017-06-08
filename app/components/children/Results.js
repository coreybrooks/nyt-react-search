var React = require("react");

const Results = (props) => {
  const {web_url, headline, multimedia, byline, section_name, pub_date} = props.data;
  const {handleClick} = props;
  
    renderResults => {
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
 
        return (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <div className="panel panel-default">
                    <div className="panel-heading text-center">
                      <h3 className="panel-title">Results</h3>
                   </div>
                   <div className="panel panel-body">

                  <hr />
                  {/*display headline as link*/}
                  <h4><a href={web_url}><i className="fa fa-newspaper-o" aria-hidden="true"></i> {headline.main}</a><br/></h4>
                  <img
                    className="image"
                    //ternary expression to display the image if one is available or "sorry" message if not
                    src={multimedia.length ? "https://nytimes.com/" + multimedia[0].url: "http://www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png"} 
                  />
                  <p>{byline && byline.original.length>1 ? byline.original : ""}</p>                  
                  <p>Section: {section_name ? section_name: "N/A"}</p>
                  {/*ternary expression to display date if one is available*/}
                  <p>Date: {pub_date ? pub_date.substring(0,10): "N/A"}</p>
                  <button 
                    className="btn btn-primary saveButton"
                    onClick={() => handleClick(props.data)}>save
                  </button>
                   </div>
                 </div>
                </div>
              </div>
             </div>
        );
    }
module.exports = Results;