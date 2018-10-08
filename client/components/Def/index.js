import React from 'react';
import * as d3 from 'd3';
import './index.css';

export default function Def(props){

	return(
		<defs>
			<marker
				id={props.id}
				viewBox={props.viewBox}
				refX={props.refX}
				refY={props.refY}
				markerWidth={props.markerWidth}
				markerHeight={props.markerHeight}
				orient={props.orient}
			>
				<path
					d={props.pathD}
					className={props.pathCl}
				/>
			</marker>
		</defs>
	);

}
