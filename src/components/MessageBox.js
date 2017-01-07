import React, { Component } from 'react';
import classNames from 'classnames';
import '../css/MessageBox.css';
import {formatDate} from '../helpers';

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

class MessageBox extends Component {
  constructor() {
    super();

    // We need to bind 'this' in order to have a reference to
    // our component from within our custom method.
    this.fetchData = this.fetchData.bind(this);

    // Initial state
    this.state = {
      messages: []
    }
  }


  fetchData() {
    // Is the Fetch API supported by the current browser?
    // Then we use it for fetching the JSON data.
    // 👉 https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    if (self.fetch) {
      fetch(this.props.url)
      // fetch(pathToRessource)
        // When fetch() returns the promise containing our response stream,
        // we read its JSON using json() which in turn also
        // returns a promise delivering the JSON data for us to use to set the component's state.
        .then(response => {
          if (response.ok) {
            response.json()
              .then(data => this.setState({messages: data}));
          } else {
            console.log('Network response was not ok.');
          }
        })
        .catch(error => {
          console.log(`There has been a problem with your fetch operation: ${error.message}`);
        });

    // Otherwise, we fall back to use the XMLHttpRequest object.
    } else {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            const data = JSON.parse(xhr.responseText);
            this.setState({messages: data});
          } else {
            console.log(`Request was not ok: ${xhr.status}`);
          }
        }
      };
      xhr.open('GET', this.props.url, true);
      xhr.send(null);
    }
  }


  componentDidMount() {
    this.fetchData();
  }


  render() {
    return (
      <div className="message-box">
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}

export default MessageBox;
