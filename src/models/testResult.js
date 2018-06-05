export class Test{
    constructor(device, status, testCaseName, testResult){
        this.device =device;
        this.status =status;
        this.testCaseName = testCaseName;
        this.result =this.result;
    }

    getDevice(){
        return this.device;
    }
    getStatus(){
        return this.status;
    }
    getTestCaseName(){
        return this.testCaseName;
    }
    getTestResult(){
        return this.status;
    }
}

// "map": {
//     "testresult": "UnKnown",
//     "testcasename": "sliderTest",
//     "deviceinfo": {
//       "device": {
//         "udid": "emulator-5554",
//         "name": "Android Android SDK built for x86_64\n",
//         "state": "Not Supported",
//         "osVersion": "6.0",
//         "os": "android",
//         "deviceType": "Not Supported",
//         "brand": "Android",
//         "apiLevel": "23",
//         "isDevice": false,
//         "deviceModel": "Android SDK built for x86_64\n",
//         "screenSize": " 1440x2560",
//         "available": false
//       },
//       "port": 61795,
//       "hostName": "127.0.0.1",
//       "localDevice": true,
//       "available": false
//     },
//     "status": "Started"
//   }