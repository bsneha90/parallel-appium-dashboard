import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { SquareIcon } from 'mdi-react';

const COLORS = {
	success: '#00C49F', 
	failure: '#C00',
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 8,
  },
});

class TestSuite extends React.Component {
  state = { open: false };

  handleClick = () => {
    console.log('toggle');
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes, name, status, tests } = this.props;
    return (
      <div>
        <ListItem key="li-p" button  onClick={this.handleClick}>
          <SquareIcon color={status === 'pass' ? COLORS.success : COLORS.failure} size="16"/>
          <ListItemText primary={name} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse key="li-c" in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {tests.map((t, i) => {
              return [
              <ListItem key={`t${i}`} button className={classes.nested}>
                <SquareIcon color={t.status === 'pass' ? COLORS.success : COLORS.failure} size="16"/>
                <ListItemText inset primary={t.name} />
              </ListItem>,
              (i < tests.length - 1) && <Divider key={`sep${i}`} light />
              ]
            })}
            </List>
        </Collapse>
      </div>
    )
  }
}

export default withStyles(styles)(TestSuite);
