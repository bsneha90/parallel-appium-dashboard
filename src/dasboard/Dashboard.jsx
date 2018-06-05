import React, { Component } from 'react';
import { Grid, SvgIcon } from "material-ui";
import {
    ItemGrid,
    StatsCard,
    Table,
} from "../components";
import {
    Devices,
    InfoOutline,
    Android
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


export default class Dashboard extends Component {
    constructor(props){
        super(props)
        console.log(' getDevices()', getDevices())
        this.state={
            testOnDevices : getTestGroupByEachDevice(props.testStatuses),
            devices : getDevices()
        }
    }

    componentWillReceiveProps(props, nextProps){
        this.setState={
            testOnDevices : getTestGroupByEachDevice(props.testStatuses),
            devices : getDevices()
        }
    }
    render() {
        let { testResults, testCountMetrics,testOnDevices } = this.props;
        let {devices} = this.state;

        let { countOfPass, countOfFail, countOfUnknown } = testCountMetrics;
        const totalCnt = countOfPass + countOfFail + countOfUnknown;
        const percentage = 100/totalCnt;
        const passColor = '#1ABB9C'
        const failColor = '#E74C3C'
        const unknownColor = '#3498DB'
        const pieCharData = [{value:countOfPass, color:passColor },
            {value:countOfFail, color:failColor },
            {value:countOfUnknown, color:unknownColor }]
        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={8} md={6}>
                        <div className='CardContainer'>
                            <div className="PieChartContainer">
                                <h3>Metrics</h3></div>
                            <Divider />
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
                                            <ListItemText primary="Pending" />
                                        </ListItem>
                                    </List>
                                </div>
                                <div className="PieChartProgress">
                                    <p className='PieChartItemHeader'>Progress</p>
                                    <List className="PieChartIndexList">
                                        <ListItem>
                                            <ListItemText primary={`${countOfPass * percentage}%`} />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText primary={`${countOfFail * percentage}%`} />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText primary={`${countOfUnknown * percentage}%`}/>
                                        </ListItem>
                                    </List>
                                </div>
                            </div>
                        </div>
                    </ItemGrid>
                    <ItemGrid xs={12} sm={8} md={6}>
                        <div className='CardContainer'>
                            <div className="RunInfoContainer">
                                <h3>Run Info</h3>
                            </div>
                            <Divider />
                        </div>
                    </ItemGrid>
                </Grid>
                <div className="DeviceInformationContainer">
                <Grid container>
                {devices.map((device) => {
                        const icon = device.getOS() === 'Android' ? Android : AppleSvgIcon;
                        const iconColor = device.getOS() === 'Android' ? 'green' :'gray'
                        return <ItemGrid xs={12} sm={6} md={4}>
                            <StatsCard
                                icon={icon}
                                iconColor={iconColor}
                                title={`${device.getName()}, ${device.getUdid()}`}
                                description={`${device.getState()}`}
                                small={device.getOS()}
                                statIcon={InfoOutline}
                                statIconColor="info"
                                statLink={{ text: "Get result of tests...", href: "#pablo" }}
                            />
                        </ItemGrid>
                    })}
                </Grid>
                </div>
            </div>
        );
    }
}