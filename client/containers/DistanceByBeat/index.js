import React from 'react';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale'
import * as d3 from 'd3'
import Toggle from '../../components/Toggle'
import AxesAndMath from '../../components/Axes'
import AxisLabel from '../../components/AxisLabel'
import Bars from '../../components/Bars'
import Circle from '../../components/Circle'
import {notesData} from './AllNotesBoth'

import ResponsiveWrapper from '../ResponsiveWrapper';
import './index.css';

class DistanceByBeat extends React.Component {
	constructor(props){
		super(props)
		this.xScale = scaleLinear()
		this.yScale = scaleLinear()
		this.radiusScale = scaleLinear()
		this.calcXPos = this.calcXPos.bind(this)
		this.calcYPos = this.calcYPos.bind(this)
		this.colorScale = scaleOrdinal(d3.schemeDark2);
		this.toggle = this.toggle.bind(this)
		this.filterOutnotDataPoints = this.filterOutnotDataPoints.bind(this)
		this.state = {
			labels: [
				{ 
				type:'x',
				text : 'Beat Number',
				textClass : 'xAxisLabelText',
				gWrapperClass : 'xAxisLabelG',
				transformation: ''
				}, 
				{
				type: 'y',
				text : 'Interval Traveled',
				textClass : 'yAxisLabelText',
				gWrapperClass : 'yAxisLabelG',
				transformation: 'rotate(-90)'
				},
				{
				  type: 'chartTitle',
				  text : 'Traveled Integers By Beat',
				  textClass : 'chartTitle',
				  gWrapperClass : 'chartTitleG',
				  transformation: '',
				  fontSize: '1.5em'
				},
			],
			margins : { top: 45, right: 20, bottom: 80, left: 60 },
			curShowing: 0
		}
	}

	toggle(){
	    let newVal = (this.state.curShowing === 0) ? 1 : 0;
	    this.setState({curShowing: newVal})
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

	calcYPos(string, dims){
		if(string.indexOf('y') > -1){
			return 20
		}else if(string.indexOf('c') > -1){
			return (dims.height * .05)
		}else{
			return dims.height - 25
		}
	}

	getNamesFromData(data){
		return {
			first : data[0].musician, 
			second : data[1].musician
		}
	}

	filterOutnotDataPoints(obj){
		let res = []
		for(let prop in obj){
			if(!['musician','song'].includes(prop)){
				let thisObj = {}
				thisObj[prop] = obj[prop]
				res.push(thisObj)
			}
		}
		return res
	}

	componentDidMount(){
		if(!this.state.scatterData){
			this.setState({noteData:notesData})
		}
	}

	render(){
		// console.log('RENDERING!! DistanceByBeat notesData')
		// console.log(notesData)

		//set svg dimensions
	    const svgDimensions = {
	      width: Math.max(this.props.respWrapWidth, 300),
	      height: 550
	    }

	    if(this.state.noteData){
		    /*
				Make data workable for d3 scales
		    */
			let curMusicianStats = this.state.noteData[this.state.curShowing];
			let justDataPoints = this.filterOutnotDataPoints(curMusicianStats);
			// console.log('justDataPoints')
			// console.log(justDataPoints)

			//make class string for svg element
			let thisClass = `distanceByBeat gr-12`
		
			//update scales
		    this.xScale
		      .domain([1,4.99])
		      .range([this.state.margins.left, svgDimensions.width - this.state.margins.right])

		     //yScale max hard-coded
		     //yScale max hard-coded
		    this.yScale
		      .domain([0, 12])
		      .range([svgDimensions.height - this.state.margins.bottom, this.state.margins.top])

		    this.radiusScale.domain([0, 4.5]).range([0,50])


		    // Make data-driven axis labels
		    const axisLabels = this.state.labels.map((each) => {
		      return <AxisLabel
		        key={each.text}
		        xPos={this.calcXPos(each.type, svgDimensions)}
		        yPos={this.calcYPos(each.type, svgDimensions)}
		        labelClass={each.textClass}
		        groupClass={each.gWrapperClass}
		        textVal={each.text}
		        fontSize={each.fontSize}
		        transformation={each.transformation}
		      />
		    })

		    const circles = justDataPoints.map((c, ind) => {
		    	// console.log('mapping circles')
		    	for(let prop in c){
		    		return <Circle 
		    			key={ind}
		    			r={this.radiusScale(+c[prop].noteDuration)}
		    			xPr={this.xScale(c[prop].startedBeat)}
				    	yPr={this.yScale(c[prop].halfStepsMoved)}
				    	fill={this.colorScale(c[prop].chordTone)}
				    	fillOpacity={0.1}
				    	stroke={this.colorScale(c[prop].chordTone)}
	    				strokeO={.7} 
		    		/>
		    	}
		    })

	    	return (
			    <React.Fragment>
				    <svg className={thisClass}>
				    {axisLabels}
				    {circles}
					</svg>
					<Toggle cl='DistanceByBeat' opts={this.getNamesFromData(this.state.noteData)} onToggle={this.toggle}/>
				</React.Fragment>
			);
	    }else{
	    	return(<p>Loading data...</p>)
	    }
	}
}

export default ResponsiveWrapper(DistanceByBeat);