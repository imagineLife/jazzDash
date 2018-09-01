import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';

export default class CountByNoteName extends React.Component {

	render(){
		console.log('RENDERING!! CountByNoteName props')
		console.log(this.props.data)

		return (
		    <div className="CountByNoteName">
		      <p>CountByNoteName Here!</p>
			</div>
		);
	}
}
