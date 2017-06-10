var React = require("react");

const Saved = (props) => {
  const {title, date, url} = props.data;
  const {handleClick} = props;
        return (
          <div>
            <hr />
              <h4><a href={url}><i className="fa fa-newspaper-o" aria-hidden="true"></i> {title}</a><br/></h4>
              {/*ternary expression to display date if one is available*/}
              <p>Date: {date ? date.substring(0,10): "N/A"}</p>
              <button 
                className="btn btn-danger deleteButton"
                onClick={() => handleClick(props.data)}>Delete
              </button>
          </div>         
        );
}

module.exports = Saved;