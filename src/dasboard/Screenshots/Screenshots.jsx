import React, { Component } from 'react';
import {
    ItemGrid,
    AppHeader,
} from "../../components";
import './Screenshots.css'

import { Grid } from 'material-ui';
class Screenshots extends Component {
    render() {
        return <div>
            <div className="App">
                <AppHeader />
            </div>
            <Grid container>
                <ItemGrid xs={4} sm={4} md={4}>
                    <div className="TestsList">
                        <h3>Tests</h3>
                        <div className="TestsListContainer">
                           some
                        </div>
                    </div>
                </ItemGrid>
                <ItemGrid xs={8} sm={8} md={8}>
                    <div className="ScreenshotsContainer">
                        <h3>Screenshots</h3>
                        <div className="ScreenshotsWrapper">
                            detail
                        </div>
                    </div>
                </ItemGrid>
            </Grid>
        </div>
    }
}

export default Screenshots;