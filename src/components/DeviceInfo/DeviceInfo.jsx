import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  title: {
    color: theme.palette.primary.light,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default withStyles(styles)(({ classes }) => {
  return (
    <section>
			<Typography variant="headline" gutterBottom align="left" className={classes.header}>
        google Android SDK built for x86
      </Typography>
    </section>
  )
})
