import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.addMsg = this.addMsg.bind(this);
    this.addUser = this.addUser.bind(this);
    // this.socket = new WebSocket("ws://localhost:3001/");
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/"); //
    console.log("componentDidMount <App />");
    // this.socket.onopen = () => {
    //   // this.socket.send("Connected to Server");
    // };

    this.socket.onmessage = (event) => {
      const value = JSON.parse(event.data);
      console.log(value)
      switch(value.type) {
        case "incomingMessage":
          this.setState((prevState) => ({
            currentUser: {name: value.username},
            messages: [...prevState.messages, value]
          }));
        break;
        case "incomingNotification":
          this.setState((prevState) => ({
            currentUser: {name: value.username},
            messages: [...prevState.messages, value]
          }));
          break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + value.type);
    }
      }
    

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }
  
  // keyPress = (event) => { if not using 'bind'
  addMsg(event) {
    if(event.key === 'Enter') {
      var msgData = {
        username: this.state.currentUser.name,
        content: event.target.value,
        type: "postMessage"
      }
      this.socket.send(JSON.stringify(msgData));
      event.target.value="";
    }
  }

  addUser(event) {
    if(event.key === 'Enter') {
      console.log(event.target.value);
      var notification = {
        username: event.target.value,
        content: `${this.state.currentUser.name} has changed their name to ${event.target.value}.`,
        type: "postNotification"
      }
      this.socket.send(JSON.stringify(notification));

      // this.setState({
      //   currentUser: {name: event.target.value}
      // });
    }
  }
  // keyPress(event) {
  //   console.log(event.target.value)
  //   console.log(event.key)
  //   event.preventDefault();
  //   if(event.key === 'Enter') {
  //     this.setState({
  //       messages: [...this.state.messages, {
  //       username: this.state.currentUser.name,
  //       content: event.target.value
  //       }]
  //     })
  //   } else {
  //     event.target.value += event.key;
  //   }
  // }

  render() {
    return (
      <div>
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList msg={this.state.messages}/>
        <ChatBar user={this.addUser} keyPress={this.addMsg} />
      </div>
    );
  }
}
export default App;
