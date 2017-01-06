import React from 'react';
import ReactDOM from 'react-dom';
import MessageBox from './components/MessageBox';
import './css/index.css';

const pathToRessource = 'https://gist.githubusercontent.com/luhmann/4e97da5387cec529d32ddc99784107d8/raw/bb5ce07243a9415cc9d12451ba733e23b04c58a8/mails.json';

ReactDOM.render(
  <MessageBox url={pathToRessource}/>,
  document.getElementById('root')
);
