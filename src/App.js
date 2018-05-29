import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from "./Dashboard";
import { Device } from './models/device';
const devices = [new Device('device1','udid1-udid1-udid1-udid1-udid1','state', '1','ios'),
      new Device('device2','udid2','Active', '2','ios'),
      new Device('device3','udid4','Booted', '3','Android'),
      new Device('device1','udid1','state', '1','ios'),
      new Device('device2','udid2','state', '2','ios'),
      new Device('device3','udid4','state', '3','Android'),
      new Device('device1','udid1','state', '1','ios'),
      new Device('device2','udid2','state', '2','ios'),
      new Device('device3','udid4','state', '3','Android')]
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Parallel Appium Dashboard</h1>
        </header>
        <Dashboard devices={devices}/>
      </div>
    );
  }
}

export default App;
