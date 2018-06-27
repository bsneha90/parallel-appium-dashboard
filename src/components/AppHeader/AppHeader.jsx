import React from 'react';
import logo from '../../logo.svg';

export default function AppHeader(params) {
    return (<header className="App-header">
        <a href="/">
            <img src={logo} className="App-logo" alt="Parallel Appium Dashboard" />
            <h1 className="App-title">ATD Dashboard</h1>
        </a>
    </header>)
}


