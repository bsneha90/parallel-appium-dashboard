import React, { Component } from 'react';
import Constants from '../../Constants';
import _ from 'lodash';
import { getParsedTests } from '../../utils/TestParser';
import {groupTestsByTestClass, getTestsWithLatestStatus, getCurrentRunningTest} from '../../utils/parser';
import {
    ItemGrid,
    AppHeader,
    TextFileReader
} from "../../components";
import ReactTable from "react-table";
import { Grid } from 'material-ui';
import { withStyles } from '@material-ui/core/styles';
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
import logo from '../../logo.svg';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Screenshot from '../../Screenshot.svg'
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import EnvInfo from '../../components/EnvInfo/EnvInfo';
import DeviceInfo from '../../components/DeviceInfo/DeviceInfo';
import Tests from '../../components/Tests/Tests';

const styles = theme => ({
  root: {
    flexGrow: 1,
		padding: theme.spacing.unit * 2,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
		minHeight: "320px",
    marginTop: "8px",
  },
  paperSm: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: "8px",
    minHeight: '200px',
  }
});

const ExpansionPanelDetailsItem =(props) =>{
    return(
        <div className="TestDetailExpansionPanelItem">
                    <span className="TestDetailExpansionPanelItemTitle"><b>{props.title}</b></span>
                    <span className="TestDetailExpansionPanelItemDetail">{props.detail}</span>
        </div>
    )
}
class TestsOnDevice extends Component {
    constructor(props){
        super(props);
        let data = this.getDeviceDataFromLocalstorage()
        /*
        this.state={
            udid: data.udid,
            testsGroupedByClass : null,
            selectedTest : null,
            currentRunningTest : null,
            screenShotModalOpen :false,
        }
        */
    }

    componentWillMount(){
        /*
        const {udid} = this.state
        getTestStatusForDevice(udid,this.getTestStatusForDeviceSuccessCallback)
        */
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

    handleClose = () =>{
        this.setState({
            screenShotModalOpen :false
        })
    }

    handleOpenScreenshotModal = () =>{
        this.setState({
            screenShotModalOpen :true
        })
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
           return <ExpansionPanel className="TestExpansionPanel">
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
                        <Typography className="TestSummaryExpansionPanelItem">{`Start time: ${test.startTime} `}</Typography>
                        <Typography className="TestSummaryExpansionPanelItem">{`End time: ${test.startTime} `}</Typography>
                        <Typography className="TestSummaryExpansionPanelItem">{`Duration: 22m `}</Typography>
                   </div>
               </ExpansionPanelSummary>
               <Divider/>
               <div className="TestDetailExpansionPanelHeader">
               <h3 className="TestDetailExpansionPanelHeaderText">ADB Logs</h3> 
                   <IconButton className="TestDetailExpansionPanelHeaderButton" onClick={() => {this.setState({
                       screenShotModalOpen:true
                   })}}>
                       <img src={Screenshot} className="TestDetailExpansionPanelHeaderScreenshotImage" />
                   </IconButton>
               </div>
               <Divider/>
               <ExpansionPanelDetails>
                   <div className="TestDetailExpansionPanel">
                       <TextFileReader url="http://localhost:31338/humans.txt" />
                   </div>
               </ExpansionPanelDetails>
               <Divider />
           </ExpansionPanel>
        })
    }
    

  render(){
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <EnvInfo/>
        <Grid container spacing={16}>
          <Grid item xs={2}>
              <Grid item xs={12}>
              </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Paper className={classes.paperSm} elevation={4}>
                    <DeviceInfo/>
                    <Tests/>
                  </Paper>
                </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
              <Grid item xs={12}>
              </Grid>
          </Grid>
        </Grid>
      </div>
    )    
  }
}

export default withStyles(styles)(TestsOnDevice);
