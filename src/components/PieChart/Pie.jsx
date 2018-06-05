import React ,{ Component }from 'react';

function getAnglePoint(startAngle, endAngle, radius, x, y) {
	var x1, y1, x2, y2;

	x1 = x + radius * Math.cos(Math.PI * startAngle / 180);
	y1 = y + radius * Math.sin(Math.PI * startAngle / 180);
	x2 = x + radius * Math.cos(Math.PI * endAngle / 180);
	y2 = y + radius * Math.sin(Math.PI * endAngle / 180);

	return { x1, y1, x2, y2 };
}

export default class Pie extends Component{
	
	render(){
		const {colors,labels,hole,radius,data,percent} = this.props;
		var colorsLength = colors.length,
			diameter = radius * 2,
			self = this,
			sum, startAngle, d = null;
		sum = data.reduce(function (carry, current) { return carry + current }, 0);
		startAngle = 0;
		return (
			<svg width={ diameter } height={ diameter } viewBox={ '0 0 ' + diameter + ' ' + diameter } xmlns="http://www.w3.org/2000/svg" version="1.1">
				{ data.map(function (slice, sliceIndex) {
					console.log('slice', slice)
					var angle, nextAngle, percent;
					nextAngle = startAngle;
					angle = (slice / sum) * 360;
					percent = (slice / sum) * 100;
					startAngle += angle;
					console.log(angle, nextAngle, percent, startAngle)
					if(slice ===0) return;
					return <Slice
						key={ sliceIndex }
						value={ slice }
						percent={ percent }
						percentValue={ percent.toFixed(1) }
						startAngle={ nextAngle }
						angle={ angle }
						radius={ radius }
						hole={ radius - hole }
						trueHole={ hole }
						showLabel= { labels }
						fill={ colors[sliceIndex % colorsLength] }
						stroke={ self.props.stroke }
						strokeWidth={ self.props.strokeWidth }
					/>
				}) }

			</svg>
		);
	}
};

class Slice extends Component{
    constructor(props){
        super(props)
        this.state= this.getInitialState();
    }
	getInitialState() {
		return {
			path: '',
			x: 0,
			y: 0
		};
	}
	componentWillReceiveProps () {
		this.setState({ path: '' });
		this.animate();
	}
	componentDidMount () {
		this.animate();
	}
	animate () {
		this.draw(0);
	}
	draw(s) {
		var p = this.props, path = [], a, b, c, self = this, step;
		step = p.angle / (37.5 / 2);
		if (s + step > p.angle) {
			s = p.angle;
		}

		// Get angle points
		a = getAnglePoint(p.startAngle, p.startAngle + s, p.radius, p.radius, p.radius);
		b = getAnglePoint(p.startAngle, p.startAngle + s, p.radius - p.hole, p.radius, p.radius);

		path.push('M' + a.x1 + ',' + a.y1);
		path.push('A'+ p.radius +','+ p.radius +' 0 '+ (s > 180 ? 1 : 0) +',1 '+ a.x2 + ',' + a.y2);
		path.push('L' + b.x2 + ',' + b.y2);
		path.push('A'+ (p.radius- p.hole) +','+ (p.radius- p.hole) +' 0 '+ (s > 180 ? 1 : 0) +',0 '+ b.x1 + ',' + b.y1);

		// Close
		path.push('Z');

		this.setState({ path: path.join(' ') });

		if (s < p.angle) {
			setTimeout(function () { self.draw(s + step) } , 16);
		} else if (p.showLabel) {
			c = getAnglePoint(p.startAngle, p.startAngle + (p.angle / 2), (p.radius / 2 + p.trueHole / 2), p.radius, p.radius);

			this.setState({
				x: c.x2,
				y: c.y2
			});
		}
	}
	render () {
		const {percent,percentValue,showLabel,fill,stroke,value,strokeWidth} = this.props;
		console.log('props',this.props);
		return (
			<g overflow="hidden">
				<path
					d={ this.state.path }
					fill={ fill }
					stroke={ stroke }
					strokeWidth={ strokeWidth ? strokeWidth : 3 }
					 />
				{ showLabel && percentValue > 5 ?
					<text x={ this.state.x } y={ this.state.y } fill="#fff" textAnchor="middle">
						{ percent ? percentValue + '%' : value }
					</text>
				: null }
			</g>
		);
	}
}