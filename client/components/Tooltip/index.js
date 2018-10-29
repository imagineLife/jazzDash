import React from 'react';
import './index.css';

export default function Tooltip(props) {
	let { pgX, pgY, val, valTxt, count } = props.data;
	let thisStyle = {
		left: pgX - 150 > 0 ? `${pgX - 75}px` : `${0}px`,
		top: `${pgY - 150}px`,
		display: 'inline-block',
		color: 'white',
		backgroundColor: `rgba(0,0,0,.7)`,
		textAlign: 'left'
	}

	return(
		<div className='toolTip' style={thisStyle}>
			<p><b>{val}</b>{ valTxt || ' happens'}</p>
			<p><b>{count}</b> times</p>
		</div>
	);
}
