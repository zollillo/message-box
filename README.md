# Message Box 📬

Message Box is a React application that displays a list of email messages. The resulting output is akin to the common representation of such lists found in email client applications.  
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## Table of Contents

1. [Demo](#demo)  
2. [Getting Set Up](#getting-set-up)
3. [Project Structure](#project-structure)


## Demo

The following `gif` of a screen recording gives an idea of how the rendered list appears in the browser and of how the underlying React components are structured (visible in the open React Developer Tools):  

![screen recording ](https://dl.dropboxusercontent.com/u/19257460/message-box/message-unread.gif)


## Getting Set Up

In order to run the application, [Node and npm](https://docs.npmjs.com/getting-started/installing-node) need to be installed on your local machine (it is recommended to use Node >= 6 and npm >= 3).  

You then need to clone this repository locally:
```
git clone git@github.com:zollillo/message-box.git
```  

To install the necessary `npm` packages, please run the following command from within the project folder (installing the packages may take one or two minutes):
```
npm install
```  

Once the installation process has finished, you can run the application with:
```
npm start
```  

The app then runs in _development mode_ and is accessible in your browser at  http://localhost:3000/.  


## Project Structure

After cloning the repository and installing all dependencies, the structure of the project should look like the following outline:  

```
📁 message-box/
  📁 public/
      favicon.ico
      index.html
  📁 src/
      📁 components/
          Message.js
          MessageBox.js
          MessageList.js
      📁 css/
          index.css
          MessageBox.css
    helpers.js
    index.js
  .gitignore
  package.json
  README.md
```  

Since this project is based on [Create React App](https://github.com/facebookincubator/create-react-app), the following files are  mandatory, otherwise the project won't work (for more information about the  folder structure of a project built with Create React App see the [user guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#folder-structure)):  
* `public/index.html` &mdash; page template
* `src/index.js` &mdash; JavaScript entry point
