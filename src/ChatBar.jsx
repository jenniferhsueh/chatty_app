import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.user.name} />
        <input onKeyPress={this.props.keyPressProp} value={this.props.messages} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

// $('div').on('click', function(event) {
//   do soethign event
// });

// $('div').on('keypress', callback)

// function callback(event) {

// }


export default ChatBar;
