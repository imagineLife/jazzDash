import React from 'react';
import './index.css';
import ResponsiveWrapper from '../ResponsiveWrapper'


class BeatCounts extends React.Component {
	// console.log('placeholder props')
	// console.log(props)
	// console.log('- - - - -')
	constructor(props){
		super(props)
	}

	render(){
		console.log(this.props)
		return(
			<p>Dummy Recat Component here</p>	
		);
	}
}

export default ResponsiveWrapper(BeatCounts)