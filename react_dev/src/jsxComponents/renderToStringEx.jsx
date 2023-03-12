import React from "react";
import ReactDOMServer from "react-dom/server"
class App2 extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <div>Hello</div>
    }
  };
  
  // Change code below this line
  const appString = ReactDOMServer.renderToString(<App2/>);
  console.log('App is '+appString);
  export default App2;