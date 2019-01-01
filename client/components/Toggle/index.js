import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';

export default class Toggle extends React.Component {

	render() {
		const { onToggle, opts, cl } = this.props
		const firstSecond = opts.first.replace(/ .*/,'');
		const firstFirst = opts.second.replace(/ .*/,'');
		const switchCl = `${cl} switch`
		const sliderCl = `${cl} slider`
		const forName = `toggleMusician${cl}`

		return (
			<label className={switchCl} htmlFor={forName}>
				<input 
					type="checkbox" 
					id={forName} 
					name={forName}
					className={forName}
					onClick={(e) => onToggle(e) }
				/>
				<div className={sliderCl}>
					<span className="off rightSpan">{firstFirst}</span>
					<span className="off leftSpan">{firstSecond}</span>
				</div>
			</label>
		)
	}
}
