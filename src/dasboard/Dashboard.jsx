import React, { Component } from 'react';
import { Grid } from "material-ui";
import {
    ItemGrid,
    StatsCard,
    RegularCard
} from "../components";
import {
    Android,
    ArrowForward
} from "@material-ui/icons";
import AppleSvgIcon from '../components/Icons/AppeSvgIcon'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckCircle from "@material-ui/icons/CheckCircle";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import HelpOutline from "@material-ui/icons/HelpOutline";
import { Divider } from '@material-ui/core';
import './Dashboard.css'
import PieChart from 'react-minimal-pie-chart';
import { getTestGroupByEachDevice } from '../utils/parser';
import { getDevices } from '../services/devices';
import {setItem} from '../utils/LocalstorageHelper'
import Constants from '../Constants';
import {
    withRouter
  } from 'react-router-dom'
import Screenshot from '../Screenshot.svg'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
const passColor = Constants.PASS_COLOR
const failColor = Constants.FAIL_COLOR
const unknownColor = Constants.SKIP_COLOR
const RunnerInfoItem =(props) =>{
        return(
            <div className="RunInfoItem">
                        <span className="RunInfoTitle">{props.title}</span>
                        <span className="RunInfoDetail">{props.detail}</span>
            </div>
        )
}
class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
            testOnDevices : getTestGroupByEachDevice(props.testStatuses),
        }
    }

    componentWillReceiveProps(props, nextProps){
        let result = getTestGroupByEachDevice(props.testStatuses)
        this.setState({
            testOnDevices : result
        })
    }

    handleDeviceOnClick = (data) =>{
       setItem(Constants.LOCALSTORAGE.DEVICE_TESTS, JSON.stringify(data));
       this.props.history.push(Constants.ROUTES.TESTS_ON_DEVICES);
    }

    handleScreenshotsOnClick = () =>{
        this.props.history.push(Constants.ROUTES.DISTRIBUTED_TESTS_SCREENSHOTS);
     }

    renderRunInfo = () =>{
        let {envInfo}= this.props;
        return(
            <div className="RunInfoWrapper">
            {envInfo && <div>
                    <RunnerInfoItem title="Runner" detail={envInfo.Runner}/>
                    <RunnerInfoItem title="Selenium Version" detail={envInfo.SeleniumVersion}/>
                    <RunnerInfoItem title="Appium Vesrion" detail={envInfo.AppiumServer}/>
                    <RunnerInfoItem title="Appium Client Version" detail={envInfo.AppiumClient}/>
                    <RunnerInfoItem title="No of devices" detail={envInfo['Total Devices']}/>
            </div>}
           </div>
        )
    }

   

    render() {
        let { testCountMetrics,devices,envInfo } = this.props;
        let {testOnDevices} = this.state;
        
        console.log(devices,'testOnDevices')
        let { countOfPass, countOfFail, countOfUnknown } = testCountMetrics;
        const totalCnt = countOfPass + countOfFail + countOfUnknown;
        const percentage = 100/totalCnt;
       
        const pieCharData = [{value:countOfPass, color:passColor },
            {value:countOfFail, color:failColor },
            {value:countOfUnknown, color:unknownColor }]
        const isParallelRunner = false//envInfo ? (envInfo.Runner === 'parallel' ? true : false) :true;
        let itemGridCounter = isParallelRunner ? 12 : 8;
        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={6} md={6}>
                        <div className='CardContainer'>
                       
                            <div className="PieChartContainer">
                                <h3>Metrics</h3></div>
                            <Divider />
                            { testOnDevices ==null && <div className="PieChartContainerNoTests">No tests found</div>}
                            { testOnDevices && <div>
                            <div className="PieChartWrapper">
                                <div className="PieChart">
                                    <p className='PieChartItemHeader'>Chart</p>
                                    <PieChart
                                        animate
                                        lineWidth={50}
                                        paddingAngle={1}
                                        data={pieCharData}
                                        style={{width:'60%', padding:'5px'}}
                                    />
                                </div>
                                <div className="PieChartIndex">
                                    <p className='PieChartItemHeader'>Status</p>
                                    <List className="PieChartIndexList">
                                        <ListItem>
                                            <ListItemIcon>
                                                <CheckCircle style={{ color: passColor }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Pass" />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemIcon style={{ color: failColor }}>
                                                <ErrorOutline />
                                            </ListItemIcon >
                                            <ListItemText primary="Fail" />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemIcon style={{ color: unknownColor }}>
                                                <HelpOutline />
                                            </ListItemIcon >
                                            <ListItemText primary="Skip" />
                                        </ListItem>
                                    </List>
                                </div>
                                <div className="PieChartProgress">
                                    <p className='PieChartItemHeader'>Progress</p>
                                    <List className="PieChartIndexList">
                                        <ListItem>
                                            <ListItemText primary={`${(countOfPass * percentage).toFixed(2)}%`} />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText primary={`${(countOfFail * percentage).toFixed(2)}%`} />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText primary={`${(countOfUnknown * percentage).toFixed(2)}%`}/>
                                        </ListItem>
                                    </List>
                                </div>
                            </div>
                            </div>}
                        </div>
                    </ItemGrid>
                    <ItemGrid xs={itemGridCounter} sm={itemGridCounter/2} md={itemGridCounter/2}>
                        <div className='CardContainer'>
                            <div className="RunInfoContainer">
                                <h3>Runner Info</h3>
                                <Divider/>
                                {this.renderRunInfo()}
                                
                            </div>
                            <Divider />
                        </div>
                    </ItemGrid>
                   {!isParallelRunner && <ItemGrid xs={itemGridCounter/2} sm={itemGridCounter/4} md={itemGridCounter/4}>
                        <div className='CardContainer'>
                            <div className="RunInfoContainer">
                                <h3>Screenshot(s) per test</h3>
                                <Divider/>
                                <Button className="ScreenshotImageButton" >
                                    <img src={Screenshot} className="ScreenshotImage" onClick={this.handleScreenshotsOnClick}/>
                                </Button>
                               
                            </div>
                            <Divider />
                        </div>
                    </ItemGrid>}
                </Grid>
                <div className="DeviceInformationContainer">
                <h1>Devices</h1>
                <Grid container>
                { devices ==null && <div className="DeviceInformationContainerNoDevices">No devices found</div>}
                {devices && devices.map((device) => {
                        const icon = device.getOS() === 'Android' ? Android : AppleSvgIcon;
                        const iconColor = device.getOS() === 'Android' ? 'green' :'gray'
                        const testsRunOnDevice = testOnDevices && (device.getUdid() in testOnDevices) && testOnDevices[device.getUdid()];
                        const passCnt = testsRunOnDevice ? testsRunOnDevice.filter((t) => t.testresult === 'Pass').length : 0;
                        const failCnt = testsRunOnDevice ?testsRunOnDevice.filter((t) => t.testresult === 'Fail').length : 0;
                        const skipCnt = testsRunOnDevice ?testsRunOnDevice.filter((t) => t.testresult === 'Skip').length :0 ;
                        
                        console.log(testsRunOnDevice);
                        return <ItemGrid xs={12} sm={6} md={4}>
                            <StatsCard
                                icon={icon}
                                iconColor={iconColor}
                                title={`${device.getName()}, ${device.getUdid()}`}
                                small={<Small device={device}/>}
                                statIconColor="info"
                                statText={<StatText passCnt={passCnt} failCnt= {failCnt} skipCnt={skipCnt} 
                                    onClick = {() => this.handleDeviceOnClick({udid : device.getUdid()})}/>}
                            />
                        </ItemGrid>
                    })}
                </Grid>
                </div>
            </div>
        );
    }
}

const StatText = (props) =>{
    let {passCnt, failCnt, skipCnt, onClick} = props
    return(
        <button className='statbutton' onClick={onClick} >
        <div style={{marginTop:'3px', display:'flex'}}>
             <div style={{flex:1, display:'flex'}}>
                <div style={{flex:1}}> <CheckCircle style={{ color: passColor}} className="statbuttonResultIcon" /> 
                <span className ="statbuttonResultIconLabel">{passCnt} </span>
                </div>
                <div style={{flex:1}}>  <ErrorOutline style={{ color: failColor}} className="statbuttonResultIcon"/>
                <span className ="statbuttonResultIconLabel">{failCnt} </span>
                </div>
                <div style={{flex:1}}> <HelpOutline style={{ color: unknownColor}} className="statbuttonResultIcon"/>
                <span className ="statbuttonResultIconLabel">{skipCnt} </span>
              </div>
             
             </div>
            <div style={{flex:1, alignItems:'flex-end', justifyItems:'end'}}> <ArrowForward style={{float:'right'}} /> </div>
        </div>
        </button>
    );
}

const Small = (props) => {
    let {device} = props;
    return (<div className="DeviceStatsSmallWrapper">
        <div className="DeviceStatsSmallItem">
            {`Host Machine IP : ${device.getHostName()}`}
        </div>
        <div className="DeviceStatsSmallItem">
            {`Version : ${device.getOsVersion()}`}
        </div>
    </div>) }

export default withRouter(Dashboard);