import { Device } from "../models/device";
export const getParsedDevices= (devices) =>{
    let parsedDevices =[]
    devices.forEach(d => {
        const {device} =d
        parsedDevices.push(
            getParsedDevice(device)
        ) 
    });
    return parsedDevices;
}

export const getParsedDevice = (device) =>{
    return new Device(
        device.name,
        device.udid,
        device.state,
        device.osVersion,
        device.os
    )
}