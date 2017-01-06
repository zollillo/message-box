import React, { Component } from 'react';
import '../css/App.css';

class Message extends Component {
  render() {
    return (
      <div className="message">
        <div className="message-name">{this.props.name}</div>
        <div className="message-subject">{this.props.subject}</div>
        <div className="message-body">{this.props.children}</div>
      </div>
    )
  }
}

const messages = [
  {
    "id": "fe125307-9bc1-5312-8461-777a0bd724bd",
    "date": "2015-11-25T06:40:19.217Z",
    "name": "Remo Checcucci",
    "email": "goz@epost.de",
    "read": false,
    "status": "SENT",
    "subject": "Similique non ullam quam porro quod.",
    "body": "aperiam"
  },
  {
    "id": "39b94221-eeeb-563a-88ec-b95b1db04bbf",
    "date": "2016-07-25T09:11:37.280Z",
    "name": "Antonino Conte",
    "email": "nohe@epost.de",
    "read": false,
    "status": "DRAFT",
    "subject": "Minima atque dolore provident eum aspernatur molestiae.",
    "body": "Ut occaecati non pariatur animi. Quisquam excepturi error eum quis ut. Voluptatum cum ducimus alias atque ad eligendi quas nemo."
  }
];

class MessageList extends Component {
  render() {
    console.table(this.props.messages);

    const messageNodes = this.props.messages.map(message => <Message key={message.id} name={message.name} subject={message.subject} />);

    return (
      <div className="message-list">
        {messageNodes}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App message-box">
        <h2>Messages</h2>
        <MessageList messages={messages}/>
      </div>
    );
  }
}

export default App;
