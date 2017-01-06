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
  constructor() {
    super();

    // In order to have access to 'this' as a reference to
    // our actual component from within our custom methods,
    // we need to bind each custom method to the component.
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
      <div className="App message-box">
        <h2>Messages</h2>
        <MessageList messages={this.state.messages}/>
      </div>
    );
  }
}

export default App;
