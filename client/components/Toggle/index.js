import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';

export default class Toggle extends React.Component {

	render() {
		const { onToggle, opts } = this.props
		const firstFirst = opts.first.replace(/ .*/,'');
		const firstSecond = opts.second.replace(/ .*/,'');

		return (
			<label className="switch" htmlFor="toggleMusician">
				<input 
					type="checkbox" 
					id="toggleMusician" 
					name="toggleMusician" 
					onClick={ onToggle }
				/>
				<div className="slider">
					<span className="off rightSpan">{firstFirst}</span>
					<span className="off leftSpan">{firstSecond}</span>
				</div>
			</label>
		)
	}
}
