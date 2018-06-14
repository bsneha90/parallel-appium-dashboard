import React, { Component } from 'react';
import './App.css';
import Dashboard from "./dasboard/Dashboard";
import { Device } from './models/device';
import { Test } from './models/testResult';
import { getCountMetricsOfTestResults } from './utils/parser'

import { getDevices } from './services/devices'
import { getTestStatuses } from './services/testStatuses'
import {getEnvInfo} from './services/envInfo'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testStatuses: null,
      devices: null,
      envInfo:null,
    }
  }

  componentWillMount(){
    getTestStatuses(this.getTestStatusesSuccessCallback)
    getDevices(this.getDevicesSuccessCallback)
    getEnvInfo(this.getEnvInfoSuccessCallback)

  }

  componentWillReceiveProps() {
    getTestStatuses(this.getTestStatusesSuccessCallback)
    getDevices(this.getDevicesSuccessCallback)
  }

  getTestStatusesSuccessCallback = (data) =>{
    this.setState({
      testStatuses: data,
    })
  }
  getDevicesSuccessCallback = (data) =>{
    this.setState({
      devices :data
    })
  }

  getEnvInfoSuccessCallback = (data) =>{
    this.setState({
      envInfo :data[0]
    })
  }


  render() {
    const { testStatuses, devices,envInfo } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Parallel Appium Dashboard</h1>
        </header>
        <Dashboard testStatuses={testStatuses} devices ={devices} envInfo={envInfo}
          testCountMetrics={getCountMetricsOfTestResults(testStatuses)} />
      </div>
    );
  }
}

export default App;
