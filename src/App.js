import React, { Component } from 'react';
import './App.css';
import Dashboard from "./dasboard/Dashboard";

import { getCountMetricsOfTestResults } from './utils/parser'
import logo from './logo.svg';
import { getDevices } from './services/devices'
import { getTestStatuses } from './services/testStatuses'
import {getEnvInfo} from './services/envInfo'
import {AppHeader} from './components'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Switch, Route,Router } from 'react-router';
import Constants from './Constants';
import TestsOnDevice from './dasboard/TestsOnDevice/TestsOnDevice';
import Screenshots from './dasboard/Screenshots/Screenshots';

const theme = createMuiTheme({
  typography: {
   	fontFamily: [
      'Source Sans Pro',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','), 
  }
});

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
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <AppHeader/>
          <Switch>
            <Route exact path="/" render={() => <Dashboard testStatuses={testStatuses} devices ={devices} envInfo={envInfo} testCountMetrics={getCountMetricsOfTestResults(testStatuses)} />
            } />
            <Route path={Constants.ROUTES.TESTS_ON_DEVICES} component={TestsOnDevice} />
            <Route path={Constants.ROUTES.DISTRIBUTED_TESTS_SCREENSHOTS} component={Screenshots} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
