import React, { Component } from 'react';
import { withStyles, Grid } from "material-ui";
import {
    ItemGrid,
    StatsCard
  } from "./components";
  import {Devices,
    InfoOutline} from "@material-ui/icons";
export default class Dashboard extends Component {
    render() {
        let {devices} = this.props;
        console.log(devices)
        return (
            <Grid container>
               {devices.map((device)=> <ItemGrid xs={20} sm={8} md={6}>
                <StatsCard
                    icon={Devices}
                    iconColor="orange"
                    title={`${device.getName()}, ${device.getUdid()}`}
                    description={`${device.getState()}`}
                    small={device.getOS()}
                    statIcon={InfoOutline}
                    statIconColor="info"
                    statLink={{ text: "Get result of tests...", href: "#pablo" }}
                />
               </ItemGrid>)}
            </Grid>
        );
    }
}