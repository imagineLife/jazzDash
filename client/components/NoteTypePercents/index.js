import React from 'react';
import { scaleBand, scaleLinear } from 'd3-scale'
import * as d3 from 'd3-selection'
import Toggle from '../Toggle'
import AxesAndMath from '../Axes'
import AxisLabel from '../AxisLabel'
import Bars from '../Bars'

import ResponsiveWrapper from '../ResponsiveWrapper';
import './index.css';

class NoteTypePercents extends React.Component {
	constructor(props){
		super(props)
		this.xScale = scaleBand()
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
			margins : { top: 45, right: 20, bottom: 80, left: 60 },
			curShowing: 0
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
			thisObj['noteName'] = key
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

	render(){
		console.log('RENDERING!! NoteTypePercents props')
		console.log(this.props)

		//set svg dimensions
	    const svgDimensions = {
	      width: Math.max(this.props.respWrapWidth, 300),
	      height: 450
	    }

	    /*
			Make data workable for d3 scales
	    */
		let curMusicianStats = this.props.data[this.state.curShowing];
		let filteredKeys = this.getFilteredKeys(curMusicianStats);
		let curUsableData = this.convertToArray(curMusicianStats, filteredKeys);

		console.log('curMusicianStats')
		console.log(curMusicianStats)


		//make class string for svg element
		let thisClass = `CountByNoteName gr-${this.props.data[0].grWidth}`

		const maxDataValue = Math.max(...curUsableData.map(d => d.count))
	
		//update scales
	    const xScale = this.xScale
	      .domain(filteredKeys)
	      .range([this.state.margins.left, svgDimensions.width - this.state.margins.right])
	    
	     //yScale max hard-coded
	     //yScale max hard-coded
	    const yScale = this.yScale
	      .domain([0, 103])
	      .range([svgDimensions.height - this.state.margins.bottom, this.state.margins.top])

		return (
		    <React.Fragment>
			    <svg className={thisClass}>
				</svg>
				<Toggle cl='CountsByNoteName' opts={this.getNamesFromData(this.props.data)} onToggle={this.toggle}/>
			</React.Fragment>
		);
	}
}

export default ResponsiveWrapper(NoteTypePercents);