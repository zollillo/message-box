# Message Box 📬

Message Box is a React application that displays a list of email messages. The resulting output is akin to the common representation of such lists found in email client applications.  
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## Table of Contents

* [Demo](#demo)  
* [Getting Set Up](#getting-set-up)
* [Project Structure](#project-structure)
* [Message Data](#message-data)
* [Message Box UI](#message-box-ui)


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

The JSON data set that holds our messages describes an array of message objects with the following properties:  

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

### Components
The message box with its list of messages is created by composing multiple React components into one that will be rendered into the page template. The outermost parent component is the `MessageBox` component. Inside of this `MessageBox` component exists another component called `Message-List`. Finally, the `MessageList` component renders out a `Message` component for each message item in the `JSON` data set.  

The following screenshot illustrates the component structure when inspected in the React Developer Tools:  

![component structure](https://dl.dropboxusercontent.com/u/19257460/message-box/mb-component-structure.png "Component structure in react dev tools")  

### Markup & Layout
![html markup](https://dl.dropboxusercontent.com/u/19257460/message-box/mb-html-structure.png "HTML markup in dev tools")  


### Interaction
