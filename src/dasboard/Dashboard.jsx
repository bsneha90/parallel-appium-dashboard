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
import { withStyles } from '@material-ui/core/styles';
import AppleSvgIcon from '../components/Icons/AppeSvgIcon'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckCircle from "@material-ui/icons/CheckCircle";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import HelpOutline from "@material-ui/icons/HelpOutline";
import { Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
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
import VisualSummary from '../components/VisualSummary/VisualSummary';
import EnvInfo from '../components/EnvInfo/EnvInfo';
import ScreenShotsSummary from '../components/ScreenShotsSummary/ScreenShotsSummary';
import DeviceList from '../components/DeviceList/DeviceList';
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

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
          testOnDevices : getTestGroupByEachDevice(props.testStatuses),
					data: [
						{
							"name": "passed",
							"value": 90,
						},
						{
							"name": "failed",
							"value": 25,
						},
						{
							"name": "skipped",
							"value": 25,
						},
					]
        }
				const { classes } = props;
				this.classes = classes;
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

				setTimeout(function() {
					this.setState({
          	testOnDevices : getTestGroupByEachDevice(this.props.testStatuses),
						data: [
							{
								"name": "passed",
								"value": 80,
							},
							{
								"name": "failed",
								"value": 15,
							},
							{
								"name": "skipped",
								"value": 5,
							},
						]
					});
				}.bind(this), 3000);

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
            <div className={this.classes.root}>
                <EnvInfo/>
                <Grid container spacing={16}>
									<Grid item xs={2}>
											<Grid item xs={12}>
											</Grid>
									</Grid>
									<Grid item xs={8}>
										<Grid container spacing={16}>
												<Grid item xs={6}>
													<Paper className={this.classes.paper} elevation={4}><VisualSummary data={this.state.data}/></Paper>
												</Grid>
												<Grid item xs={6}>
													<Paper className={this.classes.paper} elevation={4}><ScreenShotsSummary/></Paper>
												</Grid>
										</Grid>
										<Grid container spacing={16}>
												<Grid item xs={12}>
													<Paper className={this.classes.paperSm} elevation={4}><DeviceList devices={devices}/></Paper>
												</Grid>
										</Grid>
									</Grid>
									<Grid item xs={2}>
											<Grid item xs={12}>
											</Grid>
									</Grid>
								</Grid>
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

export default withStyles(styles)(withRouter(Dashboard));
