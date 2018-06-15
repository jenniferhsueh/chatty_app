import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      connection: 0
    };
    this.addMsg = this.addMsg.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/"); 
    this.socket.onopen = () => {
    };

    this.socket.onmessage = (event) => {
      const value = JSON.parse(event.data);
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
        case "count":
          this.setState((prevState) => ({
            current: {name: value.username},
            messages: [...prevState.messages, value],
            connection: value.connection
          }))
          break;
        default:
          throw new Error("Unknown event type " + value.type);
      }
    }
  }
  
  addMsg(event) {
    if(event.key === 'Enter') {
      var msgData = {
        username: this.state.currentUser.name,
        content: event.target.value,
        type: "postMessage",
      }
      this.socket.send(JSON.stringify(msgData));
      event.target.value="";
    }
  }

  addUser(event) {
    if(event.key === "Enter") {
      if(event.target.value !== this.state.currentUser.name) {
        var notification = {
          username: event.target.value,
          content: `${this.state.currentUser.name} has changed their name to ${event.target.value}.`,
          type: "postNotification"
        }
        this.socket.send(JSON.stringify(notification));
      } else {
        return
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <h3>
          {this.state.connection} users online
        </h3>
        </nav>
        <MessageList msg={this.state.messages}/>
        <ChatBar user={this.addUser} keyPress={this.addMsg} />
      </div>
    );
  }
}
export default App;
