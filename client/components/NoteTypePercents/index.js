import React from 'react';
import { scaleBand, scaleLinear, scaleSqrt } from 'd3-scale'
import * as d3 from 'd3'
import Toggle from '../Toggle'
import AxesAndMath from '../Axes'
import AxisLabel from '../AxisLabel'
import Bars from '../Bars'

import ResponsiveWrapper from '../ResponsiveWrapper';
import './index.css';

class NoteTypePercents extends React.Component {
	constructor(props){
		super(props)
		this.radiusScale = scaleSqrt()
		this.yScale = scaleLinear()
		this.toggle = this.toggle.bind(this)
		this.getFilteredKeys = this.getFilteredKeys.bind(this)
		this.state = {
			labels: [
				{
				  type: 'chartTitle',
				  text : 'Times-Played Per Note-Name',
				  textClass : 'chartTitle',
				  gWrapperClass : 'chartTitleG',
				  transformation: '',
				  fontSize: '1.5em'
				},
			],
			margins : { t: 45, r: 20, b: 80, l: 60 },
			curShowing: 0,
			radiusColumn: 'count'
		}
	}

	toggle(){
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
			let thisObj = {}
			thisObj['noteType'] = key
			thisObj['count'] = obj[key]
			completedArr.push(thisObj)

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
				return radiusScale(d.data[radiusColumn]);
			})

		return { d3PieFunc, d3ArcFn };
	}

	getLargestRadius(w,h, largestVal){
		const smallerHorW = (w < h) ? w : h;
		const largestRadiusCalculation = Math.floor( ( smallerHorW / 2) * .8 );
		return (largestRadiusCalculation < largestVal)? largestRadiusCalculation : largestVal; 
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
			Make data workable for d3 scales
	    */
		let curMusicianStats = this.props.data[this.state.curShowing];
		let filteredKeys = this.getFilteredKeys(curMusicianStats);
		let curUsableData = this.convertToArray(curMusicianStats, filteredKeys);
		const maxDataValue = Math.max(...curUsableData.map(d => d.count))
		let largestPieSliceRadius = this.getLargestRadius(divWidthLessMargins, divHeightLessMargins, 207);

		console.log('largestPieSliceRadius')
		console.log(largestPieSliceRadius)
		console.log('- - - - - -')


		//center-ish spot for PieGWrapper
		let xCenter = (this.props.respWrapWidth / 2.2);
		let yCenter = 225;
	
		console.log('curUsableData')
		console.log(curUsableData)

		//pie & arc functions
		const { d3PieFunc, d3ArcFn } = this.makeD3PieFuncs(this.state.radiusColumn, (this.props.respWrapWidth - this.state.margins.l - this.state.margins.r))


		//make class string for svg element
		let thisClass = `CountByNoteName gr-${this.props.data[0].grWidth}`

	
		//update scales
	    
	     //yScale max hard-coded
	     //yScale max hard-coded
	    const yScale = this.yScale
	      .domain([0, 103])
	      .range([svgDimensions.height - this.state.margins.bottom, this.state.margins.top])

		return (
		    <React.Fragment>
			    <svg className={thisClass}>
			    	<g className='pieGWrapper' transform={`translate(${xCenter},${yCenter})`} />
				</svg>
				<Toggle cl='CountsByNoteName' opts={this.getNamesFromData(this.props.data)} onToggle={this.toggle}/>
			</React.Fragment>
		);
	}
}

export default ResponsiveWrapper(NoteTypePercents);