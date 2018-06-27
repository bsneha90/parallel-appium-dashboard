import React from 'react';
import logo from '../../logo.svg';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
		display: "flex",
		justifyContent: "flex-end",
  },
	title: {
		marginLeft: "10px",
	},
};


export default withStyles(styles)(({ classes }) => {
		return (
			<div className={classes.root}>
				<AppBar position="sticky" color="default">
					<Toolbar className={classes.flex}>
						<img src={logo} className="App-logo"  alt="Parallel Appium Dashboard"/> 
						<Typography variant="title" color="inherit" className={classes.title}>
							appium test distributor
						</Typography>
						<form autoComplete="off" className={classes.flex}>
							<FormControl>
								<Select
									value="inttest"
									input={<Input name="env" id="env-helper" />}
								>
									<MenuItem value="inttest">External test</MenuItem>
									<MenuItem value="uat">UAT</MenuItem>
								</Select>
							</FormControl>
						</form>
					</Toolbar>
				</AppBar>	
			</div>
		)
/*
    return (<header className="App-header">
    <img src={logo} className="App-logo"  alt="Parallel Appium Dashboard"/> 
    <h1 className="App-title">appium test distributor</h1>

    </header>)*/
})
