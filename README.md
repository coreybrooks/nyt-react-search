# nyt-react-search

## Overview
This website is a complete MERN Stack application.  The application queries the NYT API to search for news articles related to the search term within the specified beginning and ending years.  

### Routing
The following request are routed with Express and Node.js for MongoDB communication
* /api/save GET route retrieves the saved documents from the articles collection in MongoDB using Mongoose.  The saved documents are returned the Main compent where they are dynamically rendered into the Results component
* /api/save POST route saves the selected article into the articles collection in MongoDB when the save button is clicked, which is then rendered into the Saved component
* /api/save DELETE route deletes the selected article from the articles collection when the delete button is clicked

### Components
* Main Component:  The Main component is the React parent component, it contains the Search, Results, and Saved children components.  The Results and Saved components are generated dynamically through {this.renderResults()} and {this.renderHistory()} respectively.  The Main component runs the getHistory when mounted to dynamically create the Saved component.  The Results component is rendered when the search term is entered in the Search component.
* Search Component: The searchTerm, startYear, and endYear form sections use a handleChange to update the corresponding state variables as variables are entered into the form.  When the submit button is clicked, the state variables are returned as props to the Main component through the this.props.setTerms function.  The Main function then uses the React helpers to send an API request to the NYT API using axios. 
* Saved Component:  The saved component is a functional component that returns a div with the saved article information including a delete button

The application is deployed on Heroku and be viewed here: [coreys-nyt-api-react](https://coreys-nyt-api-react.herokuapp.com/)