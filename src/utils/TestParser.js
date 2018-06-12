import { Test } from "../models/test";
import Constants from "../Constants";
import { getParsedDevice } from "./DeviceParser";
export const getParsedTests= (tests) =>{
    let parsedTests =[]
    if(tests)
        tests.forEach(test => {
            parsedTests.push(
                new Test(
                    test.testcasename,
                     Constants.TEST_RESULTS[test.testresult],
                      getParsedDevice(test.deviceinfo.device)
                )
            )
        });
    return parsedTests;
}