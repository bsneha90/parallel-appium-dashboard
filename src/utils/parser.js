import _ from 'lodash';
import Constants from '../Constants';


const getLatestTestStatusForEachTest = (teststatuses) => {
    let latestPassTestStatus = [];
    let latestFailTestStatus = [];
    let latestUnknownTestStatus = [];
    let groupTestCases = _.groupBy(teststatuses, (t) => {
        return t.testresult;
    });
    console.log(groupTestCases);
    latestPassTestStatus = groupTestCases['Pass'];
    latestFailTestStatus = groupTestCases['Fail'];
   
    ('Skip' in groupTestCases) && groupTestCases['Skip'].forEach(testCase => {
        console.log(testCase);
        let elementInPass = latestPassTestStatus.filter((tc) => tc.testcasename === testCase.testcasename
            && tc.deviceinfo.device.udid === testCase.deviceinfo.device.udid);
        let elementInFail = latestFailTestStatus ? latestFailTestStatus.filter((tc) => tc.testcasename === testCase.testcasename
            && tc.deviceinfo.device.udid === testCase.deviceinfo.device.udid) : []
        if (elementInPass.length === 0 && elementInFail.length === 0) {
            latestUnknownTestStatus.push(testCase);
        }

    });
    return {
        passTestCases: latestPassTestStatus?latestPassTestStatus:[] ,
        failTestCases: latestFailTestStatus? latestFailTestStatus :[],
        unKnownTestCases: latestUnknownTestStatus ? latestUnknownTestStatus :[]
    }

}

export const getTestsWithLatestStatus = (tests) =>{
    const latestTestStatus = getLatestTestStatusForEachTest(tests);
    const {passTestCases,unKnownTestCases,failTestCases} = latestTestStatus
    return passTestCases.concat(unKnownTestCases).concat(failTestCases);
}

export const getCurrentRunningTest = (tests) =>{
    let runningTest =null
    if(tests)
    {
        const runningTests=  tests && getTestsWithLatestStatus(tests).filter(t=> t.status === Constants.TEST_STARTED_STATUS);
        if(runningTests && runningTests.length>0)
            runningTest = runningTests[0];
        
    }
    
    return runningTest;
}

export const getTestGroupByEachDevice = (teststatuses) => {
   const latestTestStatus = getLatestTestStatusForEachTest(teststatuses);
   const {passTestCases,unKnownTestCases,failTestCases} = latestTestStatus

   const r = _.groupBy(passTestCases.concat(unKnownTestCases).concat(failTestCases), (t) =>{
        return t.deviceinfo.device.udid
    })
    return r;
}

export const getCountMetricsOfTestResults = (teststatuses) => {
   let latestTestStatus = getLatestTestStatusForEachTest(teststatuses);
   const countOfPass = latestTestStatus.passTestCases.length;
   const countOfFail = latestTestStatus.failTestCases.length;
   const countOfUnknown = latestTestStatus.unKnownTestCases.length;
   return {
       countOfPass,
       countOfFail,
       countOfUnknown
   }
}

export const groupTestsByTestClass = (tests) =>{
    let groupTestCases = _.groupBy(tests, (t) => {
        return t.testClassName;
    });

    return groupTestCases;
}

export const groupTestsByScreenPaths = (tests) =>{
    let testsWithLatestStatus = tests.filter(t=>t.status ==='Completed');
    

    return testsWithLatestStatus;
}