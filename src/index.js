import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TestsOnDevice from './dasboard/TestsOnDevice/TestsOnDevice'
import Screenshots from './dasboard/Screenshots/Screenshots'
import { Switch, Route,Router } from 'react-router'
import { createBrowserHistory } from "history";
import Constants from './Constants';
const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path={Constants.ROUTES.TESTS_ON_DEVICES} component={TestsOnDevice} />
            <Route path={Constants.ROUTES.DISTRIBUTED_TESTS_SCREENSHOTS} component={Screenshots} />
        </Switch>
    </Router>, document.getElementById('root'));
