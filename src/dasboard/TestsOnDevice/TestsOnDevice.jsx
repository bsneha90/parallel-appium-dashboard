import React, { Component } from 'react';
import Constants from '../../Constants';
import _ from 'lodash';
import { getParsedTests } from '../../utils/TestParser';
import {groupTestsByTestClass} from '../../utils/parser';
import {
    ItemGrid,
} from "../../components";
import ReactTable from "react-table";
import { Grid } from 'material-ui';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import './TestOnDevice.css'
import VirtualList from 'react-tiny-virtual-list';
import Divider from '@material-ui/core/Divider';
import classnames from 'classnames';
import CheckCircle from "@material-ui/icons/CheckCircle";
import ErrorOutline from "@material-ui/icons/ErrorOutline";

export default class TestsOnDevice extends Component {
    constructor(props){
        super(props);
        let data = this.getDeviceDataFromLocalstorage()
        const groupedTests = groupTestsByTestClass(data.tests)
        this.state={
            tests : getParsedTests(data.tests),
            testsGroupedByClass : groupedTests,
            selectedTest : _.keys(groupedTests)[0]
        }
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
        let selectedTestStatus;
        testsGroupedByClass[classAtIndex].forEach(test => {
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

   render(){
       const tableData = this.state.tests;
       const {testsGroupedByClass,selectedTest} = this.state;
       const classNames = _.keys(testsGroupedByClass)
        
       return (
           <div>
               <header className="App-header">
                   <h1 className="App-title">Parallel Appium Dashboard</h1>
               </header>
               <div className="TestsOnDevicesContainer">

                   {this.state.tests.length > 0 && <Grid container>
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

                           </div>
                       </ItemGrid>
                   </Grid>}
                   {this.state.tests.length === 0 && <p>No tests found</p>}
               </div>
           </div>)
   }

}