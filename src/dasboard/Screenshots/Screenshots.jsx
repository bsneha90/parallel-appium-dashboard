import React, { Component } from 'react';
import {
    ItemGrid,
    AppHeader,
} from "../../components";
import './Screenshots.css'
import Pic1 from "../../1.jpeg";
import Pic2 from "../../2.jpeg";
import Pic3 from "../../3.jpeg";
import Pic4 from "../../4.jpeg";
//import { getTestStatuses } from '../../services/testStatuses'
//import {groupTestsByScreenPaths} from '../../utils/parser';

import { Grid } from 'material-ui';
class Screenshots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testStatuses: null,

        }
    }
    componentWillMount() {
       // getTestStatuses(this.getTestStatusesSuccessCallback)
    }
    getTestStatusesSuccessCallback = (data) => {
        // this.setState({
        //     testStatuses: groupTestsByScreenPaths(data),
        // })
    }
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
                        <div className="row">
                            <div className="column">
                                <img src={Pic1} />
                            </div>
                            <div className="column">
                                <img src={Pic2} />
                            </div>
                            <div className="column">
                                <img src={Pic3} />
                            </div>
                            <div className="column">
                                <img src={Pic4} />
                            </div>
                            <div className="column">
                                <img src={Pic1} />
                            </div>
                            <div className="column">
                                <img src={Pic2} />
                            </div>
                            <div className="column">
                                <img src={Pic3} />
                            </div>
                            <div className="column">
                                <img src={Pic4} />
                            </div>
                           
                        </div>
                    </div>
                </ItemGrid>
            </Grid>
        </div>
    }
}

export default Screenshots;