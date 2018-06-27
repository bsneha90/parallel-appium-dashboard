import React from 'react';
import { PieChart, Pie, Legend, Cell } from 'recharts';
import Typography from '@material-ui/core/Typography';

export default ({ data }) => {
	const COLORS = ['#00C49F', '#C00', '#CCC', '#FF8042'];
  return (
		<section>
			<Typography variant="headline" gutterBottom align="left">
				Status
      </Typography>
			<PieChart width={380} height={250}>
				<Pie
					label
          data={data} 
					dataKey="value"
          innerRadius={40}
          outerRadius={80} 
          fill="#8884d8"
          paddingAngle={5}
        >{ data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>) }
        </Pie>	
				<Legend layout="vertical" align="right" verticalAlign="middle" iconType="square"/>
			</PieChart>
		</section>
	)
}
