// Redux
// Define ADD, addMessage(), messageReducer(), and store here:

const ADD = "ADD"
const addMessage = (message) => {
  return { type: ADD, message: message }
}
const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD: {

      return [...state, action.message]
    }
    default: {
      return state
    }

  }
}
const store = Redux.createStore(messageReducer)
///////////////////////////////////////////////////////////////////////////////////////

//React
class DisplayMessages extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: '',
        messages: []
      }
      
    }
    // Add handleChange() and submitMessage() methods here
    //Local state handeler
    handleChange(event) {
        this.setState({
          input: event.target.value,
          messages: this.state.messages
        });
      }
      //Local messages handeler
      submitMessage() {
        // Change code below this line
        this.setState({
          input: '',
          messages: [...this.state.messages, this.state.input]
        });
      }
    render() {
      return (
        <div>
          <h2>Type in a new Message:</h2>
          { /* Render an input, button, and ul below this line */ }
          
  <input onChange={this.handleChange.bind(this)} value={this.state.input}/>
  <button onClick={this.submitMessage.bind(this)} >Submit</button>
  
  <ul>
  {/*Local list message handeler*/} 
  {this.state.messages.map((x, i)=>{
              return <li key={i}>{x}</li>
            })}
  </ul>
  
          { /* Change code above this line */ }
        </div>
      );
    }
  };