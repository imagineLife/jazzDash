import React from 'react';
import { scaleBand, scaleLinear, scaleSqrt } from 'd3-scale'
import * as d3 from 'd3'
import AxesAndMath from '../Axes'
import AxisLabel from '../AxisLabel'
import Path from '../Path'

import ResponsiveWrapper from '../ResponsiveWrapper';
import Toggle from '../Toggle'
import './index.css';

class NoteTypePercents extends React.Component {
	constructor(props){
		super(props)
		this.radiusScale = scaleSqrt()
		this.yScale = scaleLinear()
		this.calcXPos = this.calcXPos.bind(this)
		this.calcYPos = this.calcYPos.bind(this)
		this.toggle = this.toggle.bind(this)
		this.getFilteredKeys = this.getFilteredKeys.bind(this)
		this.state = {
			labels: [
				{
				  type: 'chartTitle',
				  text : '(Non)Chord-Tones',
				  textClass : 'chartTitle',
				  gWrapperClass : 'chartTitleG',
				  transformation: '',
				  fontSize: '1.5em'
				},
			],
			margins : { t: 45, r: 20, b: 0, l: 60 },
			curShowing: 0,
			radiusColumn: 'count',
			colorValue : d => d.noteType
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

	calcYPos(string, dims){
		if(string.indexOf('y') > -1){
			return 20
		}else if(string.indexOf('c') > -1){
			return (dims.height * .075)
		}else{
			return dims.height - 25
		}
	}

	toggle(){
		console.log('toggling')
	    let newVal = (this.state.curShowing === 0) ? 1 : 0;
	    this.setState({curShowing: newVal})
	}

	getNamesFromData(data){
		return {
			first : data[0].musician, 
			second : data[1].musician
		}
	}

	convertToArray(obj, usableKeysArr){
		let completedArr = [];
		usableKeysArr.forEach(key => {
			if(!['type','NCTs'].includes(key)){
				let thisObj = {}
				thisObj['noteType'] = key
				thisObj['count'] = obj[key]
				completedArr.push(thisObj)
			}
		})
		return completedArr
	}

	getFilteredKeys(obj){
		return Object.keys(obj).filter(key => {
			if(key !== 'musician' && key !== 'song' && key !== 'grWidth')
			return key
		})
	}

	makeD3PieFuncs(wedgeVal, w){
		let d3PieFunc = d3.pie().value(wedgeVal);
		let d3ArcFn = d3.arc()
			.innerRadius(0).outerRadius((d) => {
				return this.radiusScale(d.data[this.state.radiusColumn]);
			})

		return { d3PieFunc, d3ArcFn };
	}

	getLargestRadius(w,h, largestVal){
		const smallerHorW = (w < h) ? w : h;
		const largestRadiusCalculation = Math.floor( ( smallerHorW / 2) );
		return (largestRadiusCalculation < largestVal)? largestVal : largestRadiusCalculation; 
	}

	render(){
		console.log('RENDERING!! NoteTypePercents props')
		console.log(this.props)

		//set svg dimensions
	    const svgDimensions = {
	      width: Math.max(this.props.respWrapWidth, 300),
	      height: 450
	    }
	    const divWidthLessMargins = svgDimensions.width - this.state.margins.l - this.state.margins.r
	    const divHeightLessMargins = svgDimensions.height - this.state.margins.b - this.state.margins.t
	    
	    /*
			Make data workable with d3 & pie 
	    */
		let curMusicianStats = this.props.data[this.state.curShowing];
		let filteredKeys = this.getFilteredKeys(curMusicianStats);
		let curUsableData = this.convertToArray(curMusicianStats, filteredKeys);
		const maxDataValue = Math.max(...curUsableData.map(d => d.count))
		console.log('maxDataValue')
		console.log(maxDataValue)
		let largestPieSliceRadius = this.getLargestRadius(divWidthLessMargins, divHeightLessMargins, maxDataValue);
		//pie & arc functions
		const { d3PieFunc, d3ArcFn } = this.makeD3PieFuncs(this.state.radiusColumn, (divWidthLessMargins))		
		//center-ish spot for PieGWrapper

		this.radiusScale.domain([0, d3.max(curUsableData, d => d[this.state.radiusColumn]) ])
		.range([0,largestPieSliceRadius]);

		d3PieFunc.value(1);
		const arcs = d3PieFunc(curUsableData);

		let xCenter = (divWidthLessMargins / 2);
		let yCenter = (divHeightLessMargins / 1.5);

		const colorScale = d3.scaleOrdinal().range(d3.schemeCategory10).domain(curUsableData.map(this.state.colorValue))

		const theseSlices = arcs.map((arc, ind) => {
			
			let thisSliceColor = colorScale(this.state.colorValue(arc.data))
			let arcVal = d3ArcFn(arc)
			return <Path 
				key={ind}
				d={arcVal}
				fill={thisSliceColor}
				cl={'singlePath'}
			/>
		})

		//make class string for svg element
		let thisClass = `noteTypePercents gr-${this.props.data[0].grWidth}`

	
		//update scales
	    
	     //yScale max hard-coded
	     //yScale max hard-coded
	    const yScale = this.yScale
	      .domain([0, 103])
	      .range([svgDimensions.height - this.state.margins.bottom, this.state.margins.top])

	   	// console.log('theseSlices')
		// console.log(theseSlices)

		//Make data-driven axis labels
	    const axisLabels = this.state.labels.map((each) => {
	      return <AxisLabel
	        key={each.text}
	        xPos={this.calcXPos(each.type, svgDimensions)}
	        yPos={this.calcYPos(each.type, svgDimensions)}
	        labelClass={each.textClass}
	        groupClass={each.gWrapperClass}
	        textVal={each.text}
	        fontSize={'1.5em'}
	        transformation={each.transformation}
	      />
	    })

		return (
		    <React.Fragment>
			    <svg className={thisClass}>
			    	<g className='pieGWrapper' transform={`translate(${xCenter},${yCenter})`}>
			    		{theseSlices}
			    	</g>
			    	{axisLabels}	    	
				</svg>
				<Toggle cl={'NoteTypePercents'} opts={this.getNamesFromData(this.props.data)} onToggle={this.toggle}/>
			</React.Fragment>
		);
	}
}

export default ResponsiveWrapper(NoteTypePercents);