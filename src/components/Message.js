import React, { Component } from 'react';
import classNames from 'classnames';
import { formatDate } from '../helpers.js';

class Message extends Component {
  constructor(props) {
    super(props);

    // We need to bind 'this' in order to have a reference to
    // our component from within our custom method.
    this.markMessageAsRead = this.markMessageAsRead.bind(this);

    this.state = {
      isDraft: this.props.content.status === 'DRAFT',
      isUnread: !this.props.content.read
    };
  }


  markMessageAsRead() {
    if (this.state.isUnread) {
      this.setState((prevState, props) => ({
        isUnread: !prevState.isUnread
      }));
    }
    return;
  }


  render() {
    const message = this.props.content;
    const classes = classNames({
      'message': true,
      'unread': this.state.isUnread
    });
    return (
      <div className={classes} onClick={this.markMessageAsRead}>
        <div className="message-cell message-name">
          {message.name}
          <span className="message-email">{message.email}</span>
        </div>
        <div className="message-cell message-content">
          <span className="message-subject">{message.subject}</span>
          <span className="message-body">{message.body}</span>
        </div>
        <div className="message-cell message-date">
          {this.state.isDraft ? <mark>Entwurf</mark> : formatDate(message.date)}
        </div>
      </div>
    )
  }
}

// Make sure the data that is provided for our prop is valid.
Message.propTypes =  {
  content: React.PropTypes.object.isRequired
};


export default Message;
