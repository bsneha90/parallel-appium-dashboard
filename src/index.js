import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Switch, Route,Router } from 'react-router'
import { createBrowserHistory } from "history";
import Constants from './Constants';
const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
      <App/>
    </Router>, document.getElementById('root'));
