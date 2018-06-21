import { Device } from "../models/device";
export const getParsedDevices= (devices) =>{
    let parsedDevices =[]
    devices.forEach(d => {
        const {device, hostName} =d
        parsedDevices.push(
            getParsedDevice(device, hostName)
        ) 
    });
    return parsedDevices;
}

export const getParsedDevice = (device,hostName) =>{
    return new Device(
        device.name,
        device.udid,
        device.state,
        device.osVersion,
        device.os,
        hostName
    )
}