import axios from 'axios'
export const  getTestStatuses =  (successCallback, errorCallback =() =>{}) => {
    let a = 
        [
            {
                "_id": "5b15a6bdf8337e5fa8ea96e3",
                "testresult": "Pass",
                "testcasename": "sliderTest",
                "testClassName": "SliderTest1",
                "deviceinfo": {
                    "available": false,
                    "hostName": "127.0.0.1",
                    "chromeDriverPort": 0,
                    "localDevice": true,
                    "device": {
                        "deviceType": "iOS 11.0",
                        "osVersion": "11.0",
                        "os": "iOS",
                        "name": "iPhone X",
                        "isDevice": false,
                        "available": true,
                        "deviceModel": "Not Supported",
                        "state": "Booted",
                        "udid": "8409ACC6-584C-4903-A7D3-1C887E8A9EC8",
                        "brand": "Not Supported",
                        "apiLevel": "Not Supported"
                    },
                    "port": 60523
                },
                "status": "Started"
            },
            {
                "_id": "5b15a6bdf8337e5fa8ea96e3",
                "testresult": "Pass",
                "testcasename": "sliderTest2",
                "testClassName": "SliderTest",
                "deviceinfo": {
                    "available": false,
                    "hostName": "127.0.0.1",
                    "chromeDriverPort": 0,
                    "localDevice": true,
                    "device": {
                        "deviceType": "iOS 11.0",
                        "osVersion": "11.0",
                        "os": "iOS",
                        "name": "iPhone X",
                        "isDevice": false,
                        "available": true,
                        "deviceModel": "Not Supported",
                        "state": "Booted",
                        "udid": "8409ACC6-584C-4903-A7D3-1C887E8A9EC8",
                        "brand": "Not Supported",
                        "apiLevel": "Not Supported"
                    },
                    "port": 60523
                },
                "status": "Started"
            },
            {
                "_id": "5b15a6bdf8337e5fa8ea96e3",
                "testresult": "Pass",
                "testcasename": "sliderTest3",
                "testClassName": "SliderTest",
                "deviceinfo": {
                    "available": false,
                    "hostName": "127.0.0.1",
                    "chromeDriverPort": 0,
                    "localDevice": true,
                    "device": {
                        "deviceType": "iOS 11.0",
                        "osVersion": "11.0",
                        "os": "iOS",
                        "name": "iPhone X",
                        "isDevice": false,
                        "available": true,
                        "deviceModel": "Not Supported",
                        "state": "Booted",
                        "udid": "8409ACC6-584C-4903-A7D3-1C887E8A9EC8",
                        "brand": "Not Supported",
                        "apiLevel": "Not Supported"
                    },
                    "port": 60523
                },
                "status": "Started"
            },
            {
                "_id": "5b15a6bdf8337e5fa8ea96e3",
                "testresult": "Fail",
                "testcasename": "sliderTest4",
                "testClassName": "SliderTest",
                "deviceinfo": {
                    "available": false,
                    "hostName": "127.0.0.1",
                    "chromeDriverPort": 0,
                    "localDevice": true,
                    "device": {
                        "deviceType": "iOS 11.0",
                        "osVersion": "11.0",
                        "os": "iOS",
                        "name": "iPhone X",
                        "isDevice": false,
                        "available": true,
                        "deviceModel": "Not Supported",
                        "state": "Booted",
                        "udid": "8409ACC6-584C-4903-A7D3-1C887E8A9EC8",
                        "brand": "Not Supported",
                        "apiLevel": "Not Supported"
                    },
                    "port": 60523
                },
                "status": "Started"
            },
            {
                "_id": "5b15a6bdf8337e5fa8ea96e3",
                "testresult": "Skip",
                "testcasename": "sliderTest",
                "testClassName": "SliderTest",
                "deviceinfo": {
                    "available": false,
                    "hostName": "127.0.0.1",
                    "chromeDriverPort": 0,
                    "localDevice": true,
                    "device": {
                        "deviceType": "iOS 11.0",
                        "osVersion": "11.0",
                        "os": "iOS",
                        "name": "iPhone X",
                        "isDevice": false,
                        "available": true,
                        "deviceModel": "Not Supported",
                        "state": "Booted",
                        "udid": "8409ACC6-584C-4903-A7D3-1C887E8A9EC8",
                        "brand": "Not Supported",
                        "apiLevel": "Not Supported"
                    },
                    "port": 60523
                },
                "status": "Started"
            },
            {
                "_id": "5b15a6bdf8337e5fa8ea96e3",
                "testresult": "Skip",
                "testcasename": "sliderTest5",
                "testClassName": "SliderTest",
                "deviceinfo": {
                    "available": false,
                    "hostName": "127.0.0.1",
                    "chromeDriverPort": 0,
                    "localDevice": true,
                    "device": {
                        "deviceType": "iOS 11.0",
                        "osVersion": "11.0",
                        "os": "iOS",
                        "name": "iPhone X",
                        "isDevice": false,
                        "available": true,
                        "deviceModel": "Not Supported",
                        "state": "Booted",
                        "udid": "8409ACC6-584C-4903-A7D3-1C887E8A9EC8",
                        "brand": "Not Supported",
                        "apiLevel": "Not Supported"
                    },
                    "port": 60523
                },
                "status": "Started"
            },
            {
                "_id": "5b15a6bdf8337e5fa8ea96e3",
                "testresult": "UnKnown",
                "testcasename": "sliderTest",
                "testClassName": "SliderTest",
                "deviceinfo": {
                    "available": false,
                    "hostName": "127.0.0.1",
                    "chromeDriverPort": 0,
                    "localDevice": true,
                    "device": {
                        "deviceType": "iOS 11.0",
                        "osVersion": "11.0",
                        "os": "Android",
                        "name": "iPhone X",
                        "isDevice": false,
                        "available": true,
                        "deviceModel": "Not Supported",
                        "state": "Booted",
                        "udid": "8409ACC6-584C-4903-A7D3-1C887E8A9EC1",
                        "brand": "Not Supported",
                        "apiLevel": "Not Supported"
                    },
                    "port": 60523
                },
                "status": "Started"
            },
            {
                "_id": "5b15a6c8f8337e5fa8ea96e4",
                "testresult": "Fail",
                "testcasename": "sliderTest",
                "testClassName": "SliderTest",
                "deviceinfo": {
                    "available": false,
                    "hostName": "127.0.0.1",
                    "chromeDriverPort": 0,
                    "localDevice": true,
                    "device": {
                        "deviceType": "iOS 11.0",
                        "osVersion": "11.0",
                        "os": "iOS",
                        "name": "iPhone X",
                        "isDevice": false,
                        "available": true,
                        "deviceModel": "Not Supported",
                        "state": "Booted",
                        "udid": "8409ACC6-584C-4903-A7D3-1C887E8A9EC9",
                        "brand": "Not Supported",
                        "apiLevel": "Not Supported"
                    },
                    "port": 60523
                },
                "status": "Completed"
            }
        ];

        
 axios.get('http://localhost:3000/testresults')
   .then((response) => successCallback(response.data))
   .catch((err) => console.log(err))
        
}