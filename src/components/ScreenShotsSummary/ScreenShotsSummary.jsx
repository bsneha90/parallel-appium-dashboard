import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ss1 from '../../1.jpeg';
import ss2 from '../../2.jpeg';
import ss3 from '../../3.jpeg';

const styles = theme => ({
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  button: {
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
        Screenshots
        <Button size="small" color="primary" className={classes.button}>
          SEE ALL
        </Button>
      </Typography>
			<GridList className={classes.gridList} cols={2.5} cellHeight="270">
				<GridListTile key="tile-1">
      		<img src={ss1}/>
				</GridListTile>
				<GridListTile key="tile-1">
      		<img src={ss2}/>
				</GridListTile>
				<GridListTile key="tile-1">
      		<img src={ss3}/>
				</GridListTile>
			</GridList>
		</section>
	)
})
