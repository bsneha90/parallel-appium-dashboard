import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TestsOnDevice from './dasboard/TestsOnDevice/TestsOnDevice'
import { Switch, Route,Router } from 'react-router'
import { createBrowserHistory } from "history";
const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/testsOnDevice" component={TestsOnDevice} />
        </Switch>
    </Router>, document.getElementById('root'));
