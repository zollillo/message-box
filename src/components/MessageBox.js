import React, { Component } from 'react';
import MessageList from './MessageList';
import '../css/MessageBox.css';


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
    // Otherwise, we fall back to use the XMLHttpRequest object.
    // For example, according to http://caniuse.com/#feat=fetch [as of 2017-01-07],
    // the Fetch API is not supported by Safari 10.
    // 👉 https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    if (self.fetch) {
      fetch(this.props.url)
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

  // Our component has been inserted in the DOM,
  // so we can request the data.
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

MessageBox.propTypes =  {
  url: React.PropTypes.string.isRequired
};


export default MessageBox;
