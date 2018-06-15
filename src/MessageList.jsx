import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const messages = this.props.msg;
    return(
    <div> 
      {messages.map((message, index) => (
        <Message key={index} msg={message} /> 
      ))}
    </div>)
  }
}

export default MessageList;

