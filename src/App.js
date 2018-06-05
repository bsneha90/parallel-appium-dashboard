import React, { Component } from 'react';
import './App.css';
import Dashboard from "./dasboard/Dashboard";
import { Device } from './models/device';
import { Test } from './models/testResult';
import { getCountMetricsOfTestResults } from './utils/parser'

import { getDevices } from './services/devices'
import { getTestStatuses } from './services/testStatuses'
const devicesOld = [new Device('device1', 'udid1-udid1-udid1-udid1-udid1', 'state', '1', 'ios'),
new Device('device2', 'udid2', 'Active', '2', 'ios'),
new Device('device3', 'udid4', 'Booted', '3', 'Android'),
new Device('device1', 'udid1', 'state', '1', 'ios'),
new Device('device2', 'udid2', 'state', '2', 'ios'),
new Device('device3', 'udid4', 'state', '3', 'Android'),
new Device('device1', 'udid1', 'state', '1', 'ios'),
new Device('device2', 'udid2', 'state', '2', 'ios'),
new Device('device3', 'udid4', 'state', '3', 'Android')]
const testResults = [
  new Test(devicesOld[0], 'Started', 'test case 1', ''),
  new Test(devicesOld[0], 'Completed', 'test case 2', 'Pass'),
  new Test(devicesOld[0], 'Completed', 'test case 3', 'Fail'),
  new Test(devicesOld[1], 'Started', 'test case 4', ''),
  new Test(devicesOld[2], 'Started', 'test case 5', '')
]


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testStatuses: getTestStatuses(),
      devices: getDevices()
    }
  }

  componentWillReceiveProps() {
    this.setState({
      testStatuses: getTestStatuses(),
      devices: getDevices()
    })
  }

  render() {
    const { testStatuses, devices } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Parallel Appium Dashboard</h1>
        </header>
        <Dashboard testStatuses={testStatuses}
          testCountMetrics={getCountMetricsOfTestResults(testStatuses)} />
      </div>
    );
  }
}

export default App;
