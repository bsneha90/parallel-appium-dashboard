import { getParsedDevices } from "../utils/DeviceParser";

export const getDevices = () => {
    let devices = [
        { "device": { "udid": "8409ACC6-584C-4903-A7D3-1C887E8A9EC9", "name": "iPhone X", "state": "Booted", "isAvailable": true, "osVersion": "11.0", "os": "iOS", "deviceType": "iOS 11.0", "brand": "Not Supported", "apiLevel": "Not Supported", "isDevice": false, "deviceModel": "Not Supported" }, "port": 62600, "chromeDriverPort": 0, "deviceState": "AVAILABLE", "ipAddress": "127.0.0.1" },
        { "device": { "udid": "FA694F6C-6CBC-4F74-8947-F9993F5242C1", "name": "iPhone 6", "state": "Shutdown", "isAvailable": true, "osVersion": "11.0", "os": "Android", "deviceType": "iOS 11.0", "brand": "Not Supported", "apiLevel": "Not Supported", "isDevice": false, "deviceModel": "Not Supported" }, "port": 62601, "chromeDriverPort": 0, "deviceState": "AVAILABLE", "ipAddress": "127.0.0.1" },
        {  "device": { "udid": "8409ACC6-584C-4903-A7D3-1C887E8A9EC8", "name": "iPhone 7", "state": "Shutdown", "isAvailable": true, "osVersion": "11.0", "os": "iOS", "deviceType": "iOS 11.0", "brand": "Not Supported", "apiLevel": "Not Supported", "isDevice": false, "deviceModel": "Not Supported" }, "port": 62602, "chromeDriverPort": 0, "deviceState": "AVAILABLE", "ipAddress": "127.0.0.1" },
    ]
    return getParsedDevices(devices);
}