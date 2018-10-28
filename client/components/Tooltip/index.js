import React from 'react';
import './index.css';

export default function Tooltip(props) {
	console.log('tooltip props')
	console.log(props.data)
	let { pgX, pgY, val, count } = props.data;
	let thisStyle = {
		left: pgX - 150 > 0 ? `${pgX - 75}px` : `${0}px`,
		top: `${pgY - 150}px`,
		display: 'inline-block',
		color: 'white',
		backgroundColor: `rgba(0,0,0,.7)`,
		textAlign: 'left'
	}

	console.log('- - - - -')
	return(
		<div className='toolTip' style={thisStyle}>
			<p><b>{val}</b> happens</p>
			<p><b>{count}</b> times</p>
		</div>
	);
}
