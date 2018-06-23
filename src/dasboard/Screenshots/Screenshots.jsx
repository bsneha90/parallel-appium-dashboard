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
import { getTestStatuses } from '../../services/testStatuses'
import {groupTestsByScreenPaths} from '../../utils/parser';
import _ from 'lodash';
import { Grid, Divider } from 'material-ui';
class Screenshots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testStatuses: null,
            paths : null,
            selectedPath : null,
        }
    }
    componentWillMount() {
        getTestStatuses(this.getTestStatusesSuccessCallback)
    }
    getTestStatusesSuccessCallback = (data) => {
        let testsAndScreenPaths = groupTestsByScreenPaths(data)
        this.setState({
            testStatuses:testsAndScreenPaths.result,
            paths : testsAndScreenPaths.pathNames,
            selectedPath : testsAndScreenPaths && testsAndScreenPaths.pathNames.length > 0 && testsAndScreenPaths.pathNames[0],
        })
    }
    handlePathNameClick = (path) =>{
        this.setState({
            selectedPath:path
        })
    }

    
    render() {
        let {testStatuses,paths,selectedPath} = this.state
        const selectedPathDetails = testStatuses && testStatuses[selectedPath];
        console.log('selectedPathDetails',selectedPathDetails)
        console.log(paths)
        return <div>
            <div className="App">
                <AppHeader />
            </div>
            <Grid container>
                <ItemGrid xs={4} sm={4} md={4}>
                    <div className="TestsList">
                        <h3>Tests</h3>
                        <div className="TestsListContainer">
                          { _.map(paths, path => <div key={path} className="TestsListContainerItem" 
                            onClick={(e) => this.handlePathNameClick(path)}> {path} </div>)}
                        </div>
                    </div>
                </ItemGrid>
                <ItemGrid xs={8} sm={8} md={8}>
                    <div className="ScreenshotsContainer">
                        <h3>{selectedPath} Screenshots</h3>
                        <Divider/>
                        <div className="row">
                        { _.map(selectedPathDetails, detail => <div className="column">
                            <h3>{`${detail.testMethodName}`}</h3>
                              <div><b>Device Info</b></div>
                              <div>{detail.device.getName()}</div>
                              <div>{`${detail.device.getOS()}-V${detail.device.getOsVersion()}`}</div>
                             <img src={detail.screenShotPath} alt="Screenshot"/>
                            </div>)}
                        </div>
                    </div>
                </ItemGrid>
            </Grid>
        </div>
    }
}

export default Screenshots;