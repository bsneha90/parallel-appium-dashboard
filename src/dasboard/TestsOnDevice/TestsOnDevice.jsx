import React, { Component } from 'react';
import Constants from '../../Constants';
import _ from 'lodash';
import { getParsedTests } from '../../utils/TestParser';
import {groupTestsByTestClass, getTestsWithLatestStatus, getCurrentRunningTest} from '../../utils/parser';
import {getDuration}  from '../../utils/helper';
import {
    ItemGrid,
    AppHeader,
    TextFileReader
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
import logo from '../../logo.svg';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Screenshot from '../../Screenshot.svg'
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Carousel from 'react-flex-carousel';
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
            currentRunningTest : null,
            screenShotModalOpen :false,
            selectedTestMethod :null,
            userScreenShotModelOpen: false
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

    handleClose = () =>{
        this.setState({
            screenShotModalOpen :false,
            selectedTestMethod:null,
            userScreenShotModelOpen:false
        })
    }

    handleOpenScreenshotModal = () =>{
        this.setState({
            screenShotModalOpen :true
        })
    }

    handleTestMethodUserScreenshotsClick =(test) =>{
        this.setState({
            userScreenShotModelOpen: true,
            selectedTestMethod: test
        })
    }

    handleTestMethodFailureScreenshotsClick =(test) =>{
        this.setState({
            screenShotModalOpen: true,
            selectedTestMethod: test
        })
    }
   
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
                       <Typography className="TestSummaryExpansionPanelItem">{`End time: ${test.endTime} `}</Typography>
                       <Typography className="TestSummaryExpansionPanelItem">
                           {`Duration: ${getDuration(test.endTime, test.startTime)} seconds`}
                       </Typography>
                   </div>
               </ExpansionPanelSummary>
               <Divider/>
               <div className="TestDetailExpansionPanelHeader">
               <h3 className="TestDetailExpansionPanelHeaderText">ADB Logs</h3> 
                  { test.testresult ==='Fail' && test.screenShotFailure && <IconButton className="TestDetailExpansionPanelHeaderFailureButton" 
                    onClick={() => this.handleTestMethodFailureScreenshotsClick(test)}>
                       <img src={Screenshot} className="TestDetailExpansionPanelHeaderScreenshotImage" />
                   </IconButton>}
                   &nbsp;
                   {test.screenPath && _.keys(test.screenPath).length>0 && <IconButton className="TestDetailExpansionPanelHeaderButton" 
                    onClick={() => this.handleTestMethodUserScreenshotsClick(test)}>
                       <img src={Screenshot} className="TestDetailExpansionPanelHeaderScreenshotImage" />
                   </IconButton>}
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
      const {testsGroupedByClass,selectedTest,currentRunningTest,selectedTestMethod, userScreenShotModelOpen,screenShotModalOpen} = this.state;
      const selectTestClassDetails = selectedTest && testsGroupedByClass[selectedTest]
      const deviceInfo =   selectTestClassDetails && getParsedDevice(selectTestClassDetails[0].deviceinfo.device,
            testsGroupedByClass[selectedTest][0].deviceinfo.hostName);
      const imagesToDisplay = selectedTestMethod && (screenShotModalOpen? [{url:selectedTestMethod.screenShotFailure, desc:'Failure'}] :
      _.map(selectedTestMethod.screenPath, (value,key) => { return {url : value, desc: key}}));
       return (
           <div>
               <Modal
                   aria-labelledby="simple-modal-title"
                   aria-describedby="simple-modal-description"
                   open={screenShotModalOpen || userScreenShotModelOpen}
                   onClose={this.handleClose}>
                   <div className="ScreenshotModalContainer">
                   <Carousel switcher={true}>
                     {_.map(imagesToDisplay, (img) =>{
                           return <div className="ScreenshotModalWrapper">
                               <img src={img.url} alt="Screenshot" className="ScreenshotImg" />
                               <span className="caption">{img.desc}</span>
                           </div>
                     })} 
                     </Carousel>
                   </div>
               </Modal>
               <div className="App">
                  <AppHeader/>
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
                               {`Host IP : ${deviceInfo.getHostName()}`}
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