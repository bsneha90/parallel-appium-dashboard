import React from "react";
import axios from 'axios'
class TextFileReader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ""
		};
	}

	componentDidMount() {
		this.getFileDataFromUrl(this.props.url, this.readTextFile)
	}

	getFileDataFromUrl = (url, successCallback) => {
		axios.get(url)
        .then((response) => successCallback(response.data))
        .catch((err) => {})
	}

	readTextFile = file => {
		this.setState({
			text: file
		});
	};

	render() {
		return (
			<div style= {{marginTop: '1vh' ,marginBottom: '1vh'}}>
				{this.state.text.split("\n").map((item, key) => {
					return <span key={key}>{item}<br /></span>;
				})}
			</div>
		);
	}
}

export default TextFileReader;