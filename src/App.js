import React, { Component } from 'react';
import './App.css';
import Dashboard from "./dasboard/Dashboard";
import { Device } from './models/device';
import { Test } from './models/testResult';
import { getCountMetricsOfTestResults } from './utils/parser'

import { getDevices } from './services/devices'
import { getTestStatuses } from './services/testStatuses'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testStatuses: null,
      devices: getDevices()
    }
  }

  componentWillMount(){
    getTestStatuses(this.getTestStatusesSuccessCallback)
  }

  componentWillReceiveProps() {
    this.setState({
      testStatuses: getTestStatuses(),
      devices: getDevices()
    })
  }

  getTestStatusesSuccessCallback = (data) =>{
    this.setState({
      testStatuses: data,
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
