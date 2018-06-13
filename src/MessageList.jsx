import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const messages = this.props.msg;
    return(
    <div> 
      {messages.map((message, index) => ( //Each child in an array or iterator
        <Message key={index} msg={message} /> //should have a unique "key" prop
      ))}
    </div>)
  }
}
export default MessageList;

