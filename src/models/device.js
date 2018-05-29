export class Device {
    
    constructor(name,udid,state, osVersion, os)
    {
        this.name =name;
        this.udid = udid;
        this.state = state;
        this.osVersion = osVersion;
        this.os =os;
    }

    getName(){
        return this.name;
    }

    getUdid(){
        return this.udid;
    }


    getState(){
        return this.state;
    }

    getOsVersion(){
        return this.osVersion;
    }

    getOS(){
        return this.os;
    }

}

// "device" : {
//     "udid" : "EFE6BCCE-B610-4FB2-A11A-861674BF6775",
//     "name" : "iPhone 7",
//     "state" : "Booted",
//     "osVersion" : "11.0",
//     "os" : "iOS",
//     "deviceType" : "iOS 11.0",
//     "brand" : "Not Supported",
//     "apiLevel" : "Not Supported",
//     "isDevice" : false,
//     "deviceModel" : "Not Supported",
//     "screenSize" : null,
//     "deviceManufacturer" : null,
//     "available" : true
//   }