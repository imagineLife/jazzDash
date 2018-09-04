import React from 'react';
import ResponsiveWrapper from '../ResponsiveWrapper';
import './index.css';

class CountByNoteName extends React.Component {

	render(){
		console.log('RENDERING!! CountByNoteName props')
		// console.log(this.props.data)
		console.log(this.props.data)
		let thisClass = `CountByNoteName gr-${this.props.data[0].grWidth}`
		return (
		    <div className={thisClass}>
		      <p>CountByNoteName Here!</p>
			</div>
		);
	}
}

export default ResponsiveWrapper(CountByNoteName);