import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';

export default class Toggle extends React.Component {

	render() {
		console.log('toggle props')
		console.log(this.props)
		const { onToggle } = this.props
		return (
			<label className="switch" htmlFor="toggleMusician">
				<input 
					type="checkbox" 
					id="toggleMusician" 
					name="toggleMusician" 
					onClick={ onToggle }
				/>
				<div className="slider">
					<span className="off rightSpan">Woody</span>
					<span className="off leftSpan">Joe</span>
				</div>
			</label>
		)
	}
}
