import React from 'react';
import { scaleBand, scaleLinear } from 'd3-scale'
import * as d3 from 'd3-selection'

import ResponsiveWrapper from '../ResponsiveWrapper';
import './index.css';

class CountByNoteName extends React.Component {
	constructor(props){
		super(props)
		this.xScale = scaleBand().padding(0.2)
		this.yScale = scaleLinear()
		this.calcXPos = this.calcXPos.bind(this)
		this.state = {
			labels: [
				{ 
				type:'x',
				text : 'Truck ID',
				textClass : 'xAxisLabelText',
				gWrapperClass : 'xAxisLabelG',
				transformation: ''
				}, 
				{
				type: 'y',
				text : 'Minutes In Facility',
				textClass : 'yAxisLabelText',
				gWrapperClass : 'yAxisLabelG',
				transformation: 'rotate(-90)'
				},
			// {
			//   type: 'chartTitle',
			//   text : 'Minutes In the Facility Per Truck',
			//   textClass : 'chartTitle',
			//   gWrapperClass : 'chartTitleG',
			//   transformation: ''
			// },
			],
			margins : { top: 75, right: 20, bottom: 100, left: 60 },
		}
	}


	calcXPos(string, dims){
		if(string.indexOf('y') > -1){
			return -(dims.height / 2)
		}else if(string.indexOf('c') > -1){
			return (dims.width / 2)
		}else{
			return ( dims.width / 2)
		}
	}

	render(){
		console.log('RENDERING!! CountByNoteName props')
		// console.log(this.props.data)
		console.log(this.props)
		let thisClass = `CountByNoteName gr-${this.props.data[0].grWidth}`
		return (
		    <svg className={thisClass}>
		      <text y='50'>CountByNoteName Here!</text>
			</svg>
		);
	}
}

export default ResponsiveWrapper(CountByNoteName);