import React from 'react';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale'
import * as d3 from 'd3-selection'
import Toggle from '../../components/Toggle'
import AxesAndMath from '../../components/Axes'
import AxisLabel from '../../components/AxisLabel'
import Rect from '../../components/Rect'

import ResponsiveWrapper from '../ResponsiveWrapper';
import './index.css';

class CountByNoteName extends React.Component {
	constructor(props){
		super(props)
		this.xScale = scaleBand()
		this.yScale = scaleLinear()
		this.calcXPos = this.calcXPos.bind(this)
		this.calcYPos = this.calcYPos.bind(this)
		this.toggle = this.toggle.bind(this)
		this.getFilteredKeys = this.getFilteredKeys.bind(this)
		this.state = {
			labels: [
				{ 
				type:'x',
				text : 'Note Name',
				textClass : 'xAxisLabelText',
				gWrapperClass : 'xAxisLabelG',
				transformation: ''
				}, 
				{
				type: 'y',
				text : 'Number Of Plays',
				textClass : 'yAxisLabelText',
				gWrapperClass : 'yAxisLabelG',
				transformation: 'rotate(-90)'
				},
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

	buildToolTip(obj){
		console.log('building tooltip obj')
		console.log(obj)
	}

	render(){
		// console.log('RENDERING!! CountByNoteName props')
		// console.log(this.props)

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

	    const colorArr = ['cadetblue', 'green']

	    const colorScale = scaleOrdinal()
	      .range(colorArr);

	    //Make data-driven axis labels
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

	    const bars = (
	      curUsableData.map(d => {
	        return ( 
	          <Rect
	            key={d.noteName}
	            x={xScale(d.noteName)}
	            y={yScale(d.count)}
	            height={svgDimensions.height - this.state.margins.bottom - yScale(d.count)}
	            width={xScale.bandwidth()}
	            fill={colorScale(d.commodity)}
	            stroke={'green'}
	            strokeWidth={'2px'}
	            count={d.count}
	            val={d.noteName}
	            className="singleBar"
	            tooltipFn={this.props.showTooltip}
	          />
	        )
	      })
	    )

		return (
		    <React.Fragment>
			    <svg className={thisClass}>
			        
			        <AxesAndMath
			          scales={{ xScale, yScale }}
			          margins={this.state.margins}
			          svgDimensions={svgDimensions}
			        />

			        {bars}

			        {axisLabels}

				</svg>
				<Toggle cl='CountsByNoteName' opts={this.getNamesFromData(this.props.data)} onToggle={this.toggle}/>
			</React.Fragment>
		);
	}
}

export default ResponsiveWrapper(CountByNoteName);