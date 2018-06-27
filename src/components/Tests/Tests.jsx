import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withState, lifecycle } from 'recompose';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import TestSuite from '../TestSuite/TestSuite';
import { from as obFrom } from 'rxjs';
import { map, groupBy, take } from 'rxjs/Operators';

const styles = {
  root: {
  }
};

let testSuites = [
	{
		name: 'Booking flow',
		id: 'booking_flow',
		tests: [
			{
				name: "Search",
				status: "pass",
			},
			{
				name: "Select ticket",
				status: "pass",
			},
			{
				name: "Review booking",
				status: "pass",
			},
			{
				name: "Checkout",
				status: "pass",
			},
		],
	},
	{
		name: "Guest booking flow",
		id: 'guest_booking_flow',
		tests: [
			{
				name: "Search",
				status: "pass",
			},
			{
				name: "Select ticket",
				status: "pass",
			},
			{
				name: "Review booking",
				status: "pass",
			},
			{
				name: "Checkout",
				status: "fail",
			},
		],
	},
	{
		name: "Refund flow",
		id: "refund_flow",
		tests: [
			{
				name: "Select ticket to refund",
				status: "pass",
			},
			{
				name: "Review refund price",
				status: "pass",
			},
			{
				name: "Confirm refund",
				status: "pass",
			},
		],
	},
	{
		name: "CoJ flow",
		id: "coj_flow",
		tests: [
			{
				name: "Select journey to change",
				status: "pass",
			},
			{
				name: "Change journey details",
				status: "pass",
			},
			{
				name: "Checkout",
				status: "pass",
			},
		],
	}
];

function* fetchTests() {
	while(true) {
		yield fetch('https://api.myjson.com/bins/k6p1a');
	}
}

let testGen = fetchTests();

let resOb = obFrom(testGen).pipe(take(1));

resOb.subscribe(o => {
	let jsOb = obFrom(o);
	jsOb.subscribe(o => o.json().then(o => {
		testSuites = o;
	}));
});

let Tests = (props) => {
  let { classes, testSuites, updateSuites } = props;
  return (
    <section className={classes.root}>
     	<List component="nav">
			{testSuites.map((ts, i) => [
				<TestSuite key={ts.id} name={ts.name} status={ts.tests.filter(t => t.status === 'fail' ).length ? 'fail' : 'pass'} tests={ts.tests}></TestSuite>,
        <Divider key={`sep${ts.id}`} />
			])}
      </List> 
    </section>
  )
}

export default withState('testSuites', 'updateSuites', testSuites)(lifecycle({componentWillReceiveProps(nextProps) {
	this.setState(nextProps)
}})(withStyles(styles)(Tests)))
