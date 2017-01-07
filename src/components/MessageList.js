import React, { Component } from 'react';
import Message from './Message';

class MessageList extends Component {
  render() {
    // console.table(this.props.messages);

    const messageNodes = this.props.messages.map(message => <Message key={message.id} content={message} />);

    return (
      <div className="message-list">
        {messageNodes}
      </div>
    );
  }
}

// Make sure the data that is provided for our prop is valid.
MessageList.propTypes =  {
  messages: React.PropTypes.array.isRequired
};


export default MessageList;
