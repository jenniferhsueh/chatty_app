import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input onKeyPress={this.props.user} className="chatbar-username" placeholder="User" />
        <input onKeyPress={this.props.keyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
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
