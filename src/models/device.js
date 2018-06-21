export class Device {
    
    constructor(name,udid,state, osVersion, os, hostName, testCases=[])
    {
        this.name =name;
        this.udid = udid;
        this.state = state;
        this.osVersion = osVersion;
        this.os =os;
        this.testCases =testCases;
        this.hostName = hostName
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

    getHostName(){
        return this.hostName;
    }

    getTestCases (){
        return this.testCases;
    }

    setTestCases(testCases){
        this.testCases = testCases;
    }

    

}
