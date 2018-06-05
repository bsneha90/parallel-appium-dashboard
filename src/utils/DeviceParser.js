import { Device } from "../models/device";
export const getParsedDevices= (devices) =>{
    let parsedDevices =[]
    devices.forEach(d => {
        const {device} =d
        parsedDevices.push(
            new Device(
                device.name,
                device.udid,
                device.state,
                device.osVersion,
                device.os
            )
        ) 
    });
    return parsedDevices;
}