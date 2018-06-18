import React, { Component } from 'react';
import Constants from '../../Constants';
import _ from 'lodash';
import { getParsedTests } from '../../utils/TestParser';
import {groupTestsByTestClass, getTestsWithLatestStatus, getCurrentRunningTest} from '../../utils/parser';
import {
    ItemGrid,
} from "../../components";
import ReactTable from "react-table";
import { Grid } from 'material-ui';
import { getParsedDevice } from '../../utils/DeviceParser';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import './TestOnDevice.css'
import VirtualList from 'react-tiny-virtual-list';
import Divider from '@material-ui/core/Divider';
import classnames from 'classnames';
import CheckCircle from "@material-ui/icons/CheckCircle";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Schedule from "@material-ui/icons/Schedule";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import {getTestStatusForDevice} from '../../services/testStatuses'
const ExpansionPanelDetailsItem =(props) =>{
    return(
        <div className="TestDetailExpansionPanelItem">
                    <span className="TestDetailExpansionPanelItemTitle"><b>{props.title}</b></span>
                    <span className="TestDetailExpansionPanelItemDetail">{props.detail}</span>
        </div>
    )
}
export default class TestsOnDevice extends Component {
    constructor(props){
        super(props);
        let data = this.getDeviceDataFromLocalstorage()
        this.state={
            udid: data.udid,
            testsGroupedByClass : null,
            selectedTest : null,
            currentRunningTest : null
        }
    }

    componentWillMount(){
        const {udid} = this.state
        getTestStatusForDevice(udid,this.getTestStatusForDeviceSuccessCallback)
    }

    getTestStatusForDeviceSuccessCallback = (data) =>{
        let groupedTests = groupTestsByTestClass(data);
        let currentRunningTest = getCurrentRunningTest(data);
        this.setState({
            currentRunningTest,
            testsGroupedByClass:groupedTests,
            selectedTest :  _.keys(groupedTests)[0]
        })
    }

    getDeviceDataFromLocalstorage (){
        return JSON.parse(localStorage.getItem(Constants.LOCALSTORAGE.DEVICE_TESTS))
    }

    getTestsInAClassAsArray(testsGroupedByClass){
      return  _.map(testsGroupedByClass, (value, key) => key)
    }

    handleClassSelect = (classSelected) =>{
        this.setState ({
            selectedTest:classSelected
        })
    }

    renderItem = (classAtIndex) =>{
       const {testsGroupedByClass,selectedTest} = this.state;
       console.log(testsGroupedByClass);
        let selectedTestStatus;
        console.log(getTestsWithLatestStatus(testsGroupedByClass[classAtIndex]),'asasf')
        testsGroupedByClass[classAtIndex].forEach(test => {
            console.log('test',test)
            if (test.testresult === Constants.TEST_RESULTS.Fail)
                selectedTestStatus = Constants.TEST_RESULTS.Fail
            else
                selectedTestStatus = Constants.TEST_RESULTS.Pass
        });
        return <div key={classAtIndex} onClick={(event) => this.handleClassSelect(classAtIndex)}
            className={classnames('TestClassListItem', {
                'TestClassListItemSelected': classAtIndex === selectedTest,
            })}>
            <div className='TestClassListItemLabel' > {`${classAtIndex}`} </div>
            {selectedTestStatus === Constants.TEST_RESULTS.Pass &&
                <CheckCircle style={{ color: Constants.PASS_COLOR, flex: 1, paddingTop: '1ch' }} />
            }
            {selectedTestStatus === Constants.TEST_RESULTS.Fail &&
                <ErrorOutline style={{ color: Constants.FAIL_COLOR, flex: 1, paddingTop: '1ch' }} />
            }
        </div>
    }

    renderItems = () =>{
        const {testsGroupedByClass,selectedTest} = this.state;
        const items = _.map(testsGroupedByClass, (value,key) =>{
            return this.renderItem(key);
        })
        return items
    }

    /*{"_id":"5b15a6bdf8337e5fa8ea96e3","testresult":"Pass","testcasename":"sliderTest"
    ,"testClassName":"SliderTest1","deviceinfo":{"available":false,"hostName":"127.0.0.1"
    ,"chromeDriverPort":0,"localDevice":true,"device":{"deviceType":"iOS 11.0","osVersion":"11.0"
    ,"os":"iOS","name":"iPhone X","isDevice":false,"available":true,"deviceModel":"Not Supported"
    ,"state":"Booted","udid":"8409ACC6-584C-4903-A7D3-1C887E8A9EC8","brand":"Not Supported"
    ,"apiLevel":"Not Supported"},"port":60523},"status":"Started"}
    */

    renderTestClassDetails =  () => {
        const {testsGroupedByClass,selectedTest} = this.state;
       return _.map(getTestsWithLatestStatus(testsGroupedByClass[selectedTest]), (test)=>{
           return <ExpansionPanel>
               <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                   <Typography >
                       {test.testresult === Constants.TEST_RESULTS.Pass &&
                           <CheckCircle style={{ color: Constants.PASS_COLOR, marginRight: '1vh' }} />}
                       {test.testresult === Constants.TEST_RESULTS.Fail &&
                           <ErrorOutline style={{ color: Constants.FAIL_COLOR, marginRight: '1vh' }} />}
                       {test.testresult === Constants.TEST_RESULTS.Skip &&
                           <HelpOutline style={{ color: Constants.SKIP_COLOR, marginRight: '1vh' }} />}
                   </Typography>
                   <div className="TestSummaryExpansionPanel">
                        <Typography className="TestSummaryExpansionPanelItem">{test.testMethodName}</Typography>
                        <Typography className="TestSummaryExpansionPanelItem">{`Status : ${test.status}`}</Typography>
                        <Typography className="TestSummaryExpansionPanelItem">{`Run Time : ${test.startTime} - ${test.endTime} `}</Typography>
                   </div>
               </ExpansionPanelSummary>
               <Divider/>
               <ExpansionPanelDetails>
                   <div className="TestDetailExpansionPanel">
                       <p>Log comes here (To be implemented) </p>
                       <p>Screen shot model popup link comes here  (To be implemented)</p>
                   </div>
               </ExpansionPanelDetails>
           </ExpansionPanel>
        })
    }
    

   render(){
      const {testsGroupedByClass,selectedTest,currentRunningTest} = this.state;
      const deviceInfo =   selectedTest && getParsedDevice(testsGroupedByClass[selectedTest][0].deviceinfo.device);
       return (
           <div>
               <div className="App">
                   <header className="App-header">
                       <h1 className="App-title">Parallel Appium Dashboard</h1>
                   </header>
               </div>
               <div className="TestsOnDevicesContainer">
               {selectedTest &&  <div className="DeviceInfoWrapper">
                   <Paper elevation={4} className="DeviceInfoContainer">
                       <Typography variant="headline" component="h3" className="DeviceInfoHeader">
                           {`${deviceInfo.getName()} `}
                       </Typography>
                       <div className="DeviceInfoDetails">
                            <Typography component="p" className="DeviceIdDetails" >
                               {`ID - ${deviceInfo.getUdid()}`}
                           </Typography>
                           <Typography component="p" className="DeviceDetails2" >
                               {`Version : ${deviceInfo.getOsVersion()}`}
                           </Typography>
                           <Typography component="p" className="DeviceDetails3" >
                               {`Host - 127.0.0.1`}
                           </Typography>
                       </div>
                   </Paper> 
                   <Paper elevation={4} className="DeviceInfoContainer">
                       <Typography variant="headline" component="h6" className="DeviceInfoHeader">
                            Running Test
                       </Typography>
                       <div className="DeviceInfoDetails">
                            <Typography component="p" className="DeviceIdDetails" >
                               Test class: {currentRunningTest? currentRunningTest.testClassName: 'None'}
                           </Typography>
                           <Typography component="p" className="DeviceIdDetails" >
                              Test method: {currentRunningTest? currentRunningTest.testMethodName: 'None'}
                           </Typography>
                       </div>
                   </Paper> 
                   </div>}
                   {selectedTest && <Grid container>
                       <ItemGrid xs={4} sm={4} md={4}>
                           <div className="TestClassesList">
                               <h3>Tests</h3>
                               <div className="TestClassesListItemsContainer">
                                   <div> {this.renderItems()} </div>
                               </div>
                           </div>
                       </ItemGrid>
                       <ItemGrid xs={8} sm={8} md={8}>
                           <div className="TestClassDetails">
                            <h3>Test Methods</h3>
                            <div className="TestClassDetailsItemsWrapper">
                               {this.renderTestClassDetails()}
                            </div>
                           </div>
                       </ItemGrid>
                   </Grid>}
                   {selectedTest===undefined && <div>No tests found</div>}
               </div>
              
           </div>)
   }

}