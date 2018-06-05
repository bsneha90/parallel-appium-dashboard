import { Device } from "../models/device";
export const getParsedDevices= (devices) =>{
    let parsedDevices =[]
    devices.forEach(device => {
        parsedDevices.push(
            new Device(
                device.device.name,
                device.device.udid,
                device.device.state,
                device.device.osVersion,
                device.device.os
            )
        ) 
    });
    return parsedDevices;
}