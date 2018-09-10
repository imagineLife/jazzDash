import React from 'react';
// import {Link} from 'react-router-dom';
import './index.css';
import { scaleBand, scaleLinear } from 'd3-scale'
import ResponsiveWrapper from '../ResponsiveWrapper'
import Bars from '../Bars'
import Toggle from '../Toggle'


class UpsAndDowns extends React.Component {
	constructor(props){
		super(props)

		this.xScale = scaleBand();
		this.yScale = scaleLinear();
		this.state = {
			margins : { top: 10, right: 10, bottom: 100, left: 10 },
			curShowing: 0
		}

		this.convertToArray = this.convertToArray.bind(this)
		this.getMaxVal = this.getMaxVal.bind(this)
	}

	getNamesFromData(data){
		return {
			first : data[0].musician, 
			second : data[1].musician
		}
	}

	convertToArray(obj, usableKeysArr){
		let cleanedData = [];
		usableKeysArr.forEach(key => {
			let thisObj = {};
			if(key in obj){
				thisObj['key'] = key;
				thisObj['val'] = obj[key];
				cleanedData.push(thisObj)
			}
		})
		return cleanedData;
	}

	getMaxVal(obj){
		let curMax = 0;
		for (var key in obj) {
		    if (obj.hasOwnProperty(key)) {
		        let thisAnonymousVal = obj[key].val
		        if (thisAnonymousVal > curMax){
		        	curMax = thisAnonymousVal;
		        }
		    }
		}
		return curMax;
	}

	/*
	To-Do
	1. make xAxis
		hide it, just use domain & range, no actual visible axis component
	
	2. Make 2 'rects'...?
		split width by 3
		put rects @ thirds

		Make HEIGHT 'length' resemble number of ups / downs traveled

		CURIOUS
		Make up arrow point stick to Top
		Make down arrow point stick to Bottom?

		make & append arrowHeads to both,
			up on top
			down on bottom
	

	3.


	*/

	render(){

		//prep svgDimensions var
		const svgDimensions = {
	      width: Math.max(this.props.respWrapWidth, 300),
	      height: 450
	    }

	    console.log('svgDimensions')
	    console.log(svgDimensions)

		/*
			Make data workable with d3 scales
	    */
		let curMusicianStats = this.props.data[this.state.curShowing];
		let dataKeys = ['downs','ups','unis'];
		let curUsableData = this.convertToArray(curMusicianStats, dataKeys);
		let maxDataValue = this.getMaxVal(curUsableData)
		console.log('maxDataValue')
		console.log(maxDataValue)

		//make class string for svg element
		let thisClass = `upsAndDowns gr-${this.props.data[0].grWidth}`
		
		//prep scales
		const xScale = this.xScale
	      .domain(dataKeys)
	      .range([this.state.margins.left, svgDimensions.width - this.state.margins.right])

	    const yScale = this.yScale
	      .domain([0, maxDataValue])
	      .range([svgDimensions.height - this.state.margins.bottom, this.state.margins.top])

	      console.log('this yScale.range')
	      console.log(yScale.range)

		return(
			<React.Fragment>
				<svg className={thisClass}>
					<Bars
			          scales={{ xScale, yScale }}
			          margins={this.state.margins}
			          data={curUsableData}
			          maxValue={maxDataValue}
			          svgDimensions={svgDimensions}
			          mousedOver={this.mousedOver}
			          barWidth={'10'}
			        />
		        </svg>
				<Toggle cl='UpsAndDowns' opts={this.getNamesFromData(this.props.data)} onToggle={this.toggle}/>	
			</React.Fragment>
	);
	}
}

export default ResponsiveWrapper(UpsAndDowns);