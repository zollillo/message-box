# Message Box 📬

Message Box is a React application that displays a list of email messages. The resulting output is akin to the common representation of such lists found in email client applications.  

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and uses ES6 syntax.


## Table of Contents

* [Demo](#demo)  
* [Getting Set Up](#getting-set-up)
* [Project Structure](#project-structure)
* [Message Data](#message-data)
* [Message Box UI](#message-box-ui)
* [Interaction](#interaction)

## Demo

The following `gif` of a screen recording gives an idea of how the rendered list appears in the browser and of how the underlying React components are structured (visible in the open React Developer Tools):  

![screen recording ](https://dl.dropboxusercontent.com/u/19257460/message-box/message-unread.gif)


## Getting Set Up

In order to run the application, [Node and npm](https://docs.npmjs.com/getting-started/installing-node) need to be installed on your local machine (it is recommended to use Node >= 6 and npm >= 3).  

You then need to clone this repository locally:
```
git clone git@github.com:zollillo/message-box.git
```  

To install the necessary `npm` packages, please run the following command from within the project folder (installing the packages may take one or two minutes 😇):
```
npm install
```  

Once the installation process has finished, you can run the application with:
```
npm start
```  

The app then runs in _development mode_ and is accessible in your browser at  `http://localhost:3000/`.  


## Project Structure

After cloning the repository and installing all dependencies, the structure of the project should look like the following outline:  

```
message-box/
  .gitignore
  node_modules/   /* content not shown */
  package.json
  public/
    favicon.ico
    index.html
  README.md
  src/
    components/
      Message.js
      MessageBox.js
      MessageList.js
    css/
      index.css
      MessageBox.css
    helpers.js
    index.js
```  

Since this project is based on [Create React App](https://github.com/facebookincubator/create-react-app), the following files are  mandatory, otherwise the project won't work (for more information about the  folder structure of a project built with Create React App see the [user guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#folder-structure)):  
* `public/index.html` &mdash; page template
* `src/index.js` &mdash; JavaScript entry point  


## Message Data

The `JSON` data set that holds our messages describes an array of message objects with the following properties:  

```
[
  {
    "id": "1234abc",
    "date": "2016-02-18T13:52:22.343Z",
    "name": "Jane Doe",
    "email": "jane.doe@abc.de",
    "read": false,
    "status": "DRAFT",
    "subject": "Lorem ipsum",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
  },
  ...
]
```

The application fetches the data using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). We provide the URL to our `mails.json` file as a property to our top component `MessageBox` (see below). This makes it easy to change the URL or replace it with a different endpoint.  
Fetching the data happens from within React's lifecycle method `componentDidMount()`, which gets called once the component is in the DOM. In this case, we use `componentDidMount()` to set the state of the `MessageBox` component by getting the message data.  


## Message Box UI

The `JSON` data (see above) provides a set of messages that the message box ui displays in a list. The following sections describe the structure of the ui components, the markup and layout, as well as the interaction.

### Components
The message box with its list of messages is created by composing multiple React components into one that will be rendered into the page template. The outermost parent component is the `MessageBox` component. Inside of this `MessageBox` component exists another component called `MessageList`. Finally, the `MessageList` component renders out a `Message` component for each message item in the `JSON` data set. The message data is passed via properties in order to access and use it inside the components to show the values and change state (e.g. mark an unread message as read on click).  

The following screenshot illustrates the component structure when inspected with React Developer Tools:  

![component structure](https://dl.dropboxusercontent.com/u/19257460/message-box/mb-component-structure.png "Component structure in React dev tools")  

### Markup & Layout
Both the `MessageBox` and the `MessageList` component are merely composed of one `<div>` element.  
Each `Message` component, however, comprises several `<div>` and `<span>` elements layed out using the [Flexbox layout](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). This allows for aligning the content of each message in a row-oriented, table-cell-like fashion. The horizontal width is divided between three _message cells_ (`<div>` elements):  

* 25% to display the name and the email address
* 65% to display the subject and the body (overflowing text is truncated)
* 10% to display the date  

The `<span>` elements help to apply CSS styling such as `::before` and `::after` pseudo elements for enclosing the email address with the characters `<` and `>` (` <jane.doe@abc.de>`) and for coloring the message body text differently than the message subject.  

Using  [React and JSX](https://facebook.github.io/react/docs/conditional-rendering.html#inline-if-else-with-conditional-operator), it is possible to conditionally render elements inline. This allows us to display either the `date` of the email or the word `Entwurf` (= German word for 'draft') depending on the `status` property of the message. The `date` is formatted using [Moment.js](http://momentjs.com/) to make the [ISO 8601](https://www.w3.org/TR/NOTE-datetime) date format more readable.  

Inside the `Message` component:
```
<div className="message-cell message-date">
  {this.state.isDraft ? <mark>Entwurf</mark> : formatDate(message.date)}
</div>
```

Similarly, a CSS class of `unread` is dynamically applied if the value of the message's `read` property is `false` which results in highlighting the entire message row in __bold font__.  


The screenshot below shows the HTML markup/DOM tree inspected with Chrome Developer Tools (please also refer to the [Demo](#demo) to see the rendered page):  

![html markup](https://dl.dropboxusercontent.com/u/19257460/message-box/mb-html-structure.png "HTML markup in Chrome dev tools")  


### Interaction

The message properties `status` and `read` constitute the state of the `Message` component:  

```
class Message extends Component {
  constructor(props) {
    super(props);

    // ...

    this.state = {
      isDraft: this.props.content.status === 'DRAFT',
      isUnread: !this.props.content.read
    };
  }

  // ...
}
```

Over time, the keys and values of the component's `state object` can change, and responding to those changes, the component can re-render itself to represent the current or correct state in the ui.  

It is possible to click on the messages, and as [demonstrated above](#demo), this changes the state of __unread messages__ so that the bold font highlighting is disabled.  

The `onClick` handler of the `Message` component:

```
markMessageAsRead() {
  if (this.state.isUnread) {
    this.setState((prevState, props) => ({
      isUnread: !prevState.isUnread
    }));
  }
  return;
}
```

Note that in this case, the changes are not persistent, since the application doesn't update values in the `JSON` file, i.e. reloading the page results in delivering the original data.  

<br/>

-----  

Tested in
* Chrome 55.0.2883.95 (64-bit)
* Firefox 50.1.0
* Safari 10.0.2
