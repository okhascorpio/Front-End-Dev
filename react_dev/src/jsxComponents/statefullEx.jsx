class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: 'freeCodeCamp'
      }
    }
    render() {
      // Change code below this line
         const name = this.state.firstName;
      // Change code above this line
      return (
        <div>
          { /* Change code below this line */ }
          <h1>This way: {this.state.firstName}</h1>
          <h2>Or this: {name}</h2>
          { /* Change code above this line */ }
        </div>
      );
    }
  };