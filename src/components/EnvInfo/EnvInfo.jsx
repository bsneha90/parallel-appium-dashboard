import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    marginBottom: "8px",
		marginRight: "8px",
  },
  key: {
    fontWeight: "bold",
  }
}

export default withStyles(styles)(({ classes }) => {
	const data = [
    {
			id: 1,
    	paramName: "Runner",
			paramValue: "parallel",
		},
		{
			id: 2,
    	paramName: "Selenium",
			paramValue: "3.12.0",
		},
		{
			id: 3,
    	paramName: "Appium server",
			paramValue: "1.8.1",
		},
		{
			id: 4,
    	paramName: "Appium client",
			paramValue: "6.0.0",
		},
	];
  let result = [];
  data.map(d => {
    result.push(`<span className=${classes.key}>${d.paramName}:</span> ${d.paramValue}`)
  })
  return (
		<section className={classes.root} >
      <Typography variant="caption" gutterBottom align="right" dangerouslySetInnerHTML={{ __html: result.join(', ') }}></Typography>
		</section>
  )
});
