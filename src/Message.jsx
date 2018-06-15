import React, {Component} from 'react';

class Message extends Component {
  notificationOrMsg() {
    if (this.props.msg.type === "incomingMessage") {
      return (
      <div className="message">
        <span className="message-username">{this.props.msg.username}</span>
        <span className="message-content">{this.props.msg.content}</span>
      </div>
      )
      } else {
        return (
        <div className="message system">{this.props.msg.content}</div>
      ) 
      }
    }

  render() {
    return (
      this.notificationOrMsg()
    )
  }
}
export default Message;

