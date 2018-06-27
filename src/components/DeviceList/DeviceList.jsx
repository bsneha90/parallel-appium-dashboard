import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Android from '@material-ui/icons/Android';
import Apple from '../../apple.svg';
import { PieChart, Pie, Legend, Cell } from 'recharts';

const COLORS = ['#00C49F', '#C00', '#CCC', '#FF8042'];

const data = [
  {
    "name": "passed",
    "value": 90,
  },
  {
    "name": "failed",
    "value": 10,
  },
  {
    "name": "skipped",
    "value": 0,
  },
];

const devices = [
  {
    "device": {
      "udid": "emulator-5554",
      "name": "google Android SDK built for x86\n",
      "state": "Not Supported",
      "osVersion": "8.0.0",
      "os": "android",
      "deviceType": "Not Supported",
      "brand": "google",
      "apiLevel": "26",
      "isDevice": true,
      "deviceModel": "Android SDK built for x86\n",
      "screenSize": " 1080x1920",
      "deviceManufacturer": null,
      "available": false
    },
    "port": 63838,
    "chromeDriverPort": 0,
    "webkitProcessID": null,
    "hostName": "127.0.0.1",
    "localDevice": true,
    "available": true
  },
  {
    "device": {
      "udid": "011871B2-46FA-4ECB-A058-B3D0C16B6853",
      "name": "iPhone 8",
      "state": "Shutdown",
      "osVersion": "11.3",
      "os": "iOS",
      "deviceType": "iOS 11.3",
      "brand": "apple",
      "apiLevel": "Not Supported",
      "isDevice": false,
      "deviceModel": "iPhone10,1",
      "screenSize": null,
      "deviceManufacturer": null,
      "available": true
    },
    "port": 63839,
    "chromeDriverPort": 0,
    "webkitProcessID": null,
    "hostName": "127.0.0.1",
    "localDevice": true,
    "available": true
  },
  {
    "device": {
      "udid": "19C22AFD-8144-4C95-9871-3A149A0023A5",
      "name": "iPhone X",
      "state": "Shutdown",
      "osVersion": "11.3",
      "os": "iOS",
      "deviceType": "iOS 11.3",
      "brand": "apple",
      "apiLevel": "Not Supported",
      "isDevice": false,
      "deviceModel": "iPhone10,3",
      "screenSize": null,
      "deviceManufacturer": null,
      "available": true
    },
    "port": 63840,
    "chromeDriverPort": 0,
    "webkitProcessID": null,
    "hostName": "127.0.0.1",
    "localDevice": true,
    "available": true
  }
] 

const renderDevice = (d) => {
	return(
		<TableRow key={d.device.udid}>
			<TableCell>
			{ d.device.brand === 'google' && <Android/>}
			{ d.device.brand === 'apple' && <SvgIcon viewBox="5 11 11 22">
					<g id="Mac">
						<g id="Apple_2_">
							<path d="M18.1,24.23c-0.11,0.31-0.22,0.6-0.33,0.88c-0.29,0.66-0.63,1.27-1.02,1.84
								c-0.54,0.77-0.98,1.3-1.32,1.59c-0.52,0.48-1.09,0.73-1.69,0.74c-0.43,0-0.95-0.12-1.56-0.37c-0.61-0.25-1.17-0.37-1.68-0.37
								c-0.54,0-1.11,0.12-1.73,0.37c-0.62,0.25-1.11,0.38-1.49,0.39c-0.58,0.02-1.15-0.23-1.73-0.76c-0.37-0.32-0.83-0.87-1.38-1.65
								C3.58,26.06,3.09,25.1,2.71,24C2.3,22.81,2.1,21.66,2.1,20.55c0-1.27,0.28-2.37,0.83-3.29c0.43-0.74,1.01-1.32,1.73-1.75
								c0.72-0.43,1.5-0.65,2.34-0.66c0.46,0,1.06,0.14,1.81,0.42c0.75,0.28,1.23,0.42,1.44,0.42c0.16,0,0.69-0.17,1.59-0.5
								c0.85-0.31,1.57-0.43,2.16-0.38c1.6,0.13,2.8,0.76,3.6,1.89c-1.43,0.87-2.14,2.08-2.12,3.64c0.01,1.21,0.45,2.22,1.32,3.02
								C17.18,23.74,17.61,24.02,18.1,24.23z M14.08,10.31c0.01,0.13,0.02,0.25,0.02,0.38c0,0.95-0.35,1.84-1.04,2.66
								c-0.84,0.98-1.85,1.54-2.94,1.45c-0.01-0.11-0.02-0.23-0.02-0.36c0-0.91,0.4-1.89,1.1-2.69c0.35-0.4,0.8-0.74,1.34-1.01
								C13.09,10.48,13.6,10.33,14.08,10.31z"/>
						</g>
					</g>
				</SvgIcon> }
			</TableCell>
      <TableCell>
			  <PieChart width={40} height={40}>
          <Pie
            data={data} 
            dataKey="value"
            fill="#8884d8"
            paddingAngle={0}
          >{ data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>) }
          </Pie>	
        </PieChart>
      </TableCell>
			<TableCell>{d.device.name}</TableCell>
			<TableCell>{d.device.deviceModel}</TableCell>
			<TableCell>{d.hostName}</TableCell>
			<TableCell><ArrowDropUp viewBox="0 0 20 20" nativeColor="#00C49F"/></TableCell>
		</TableRow>
	)
}

const styles = {
  root: {
  }
}

export default withStyles(styles)(({ classes }) => {
	return (
		<section className={classes.root}>
			<Typography variant="headline" gutterBottom align="left">
				Devices
			</Typography>
			<Table>
				<TableBody>
					{ devices && devices.map(renderDevice.bind(this)) }
				</TableBody>
			</Table>
		</section>
	)
})
