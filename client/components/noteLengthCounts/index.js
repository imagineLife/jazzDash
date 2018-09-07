import React from 'react';
import { scaleBand, scaleLinear } from 'd3-scale'
import * as d3 from 'd3-selection'
import Toggle from '../Toggle'
import AxesAndMath from '../Axes'
import AxisLabel from '../AxisLabel'
import HorizontalBars from '../HorizontalBars'

import ResponsiveWrapper from '../ResponsiveWrapper';
import './index.css';

class NoteLengthCounts extends React.Component {
	constructor(props){
		super(props)
		this.xScale = scaleLinear()
		this.yScale = scaleBand()
			.paddingInner(0.3)
        	.paddingOuter(0.2)
		this.calcXPos = this.calcXPos.bind(this)
		this.calcYPos = this.calcYPos.bind(this)
		this.toggle = this.toggle.bind(this)
		this.state = {
			labels: [
				{ 
				type:'x',
				text : 'Times Played',
				textClass : 'xAxisLabelText',
				gWrapperClass : 'xAxisLabelG',
				transformation: ''
				}, 
				{
				type: 'y',
				text : 'Duration (Beats)',
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
			margins : { top: 45, right: 50, bottom: 100, left: 70 },
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
		let cleanedData = [];
		usableKeysArr.forEach(key => {
			let thisObj = {};
			if(['0','1','2','3','4','5','6','7','8'].includes(key)){
				let length = obj[key].length
				let count = obj[key].count
				thisObj['duration'] = length;
				thisObj['count'] = count;
				cleanedData.push(thisObj)
			}
		})
		return cleanedData;
	}

	render(){
		// console.log('RENDERING!! NoteLengthCounts props')
		// console.log(this.props)

		//set svg dimensions
	    const svgDimensions = {
	      width: Math.max(this.props.respWrapWidth, 300),
	      height: 450
	    }

	    /*
			Make data workable with d3 scales
	    */
		let curMusicianStats = this.props.data[this.state.curShowing];
		let dataKeys = Object.keys(curMusicianStats);
		let curUsableData = this.convertToArray(curMusicianStats, dataKeys);

		//make class string for svg element
		let thisClass = `noteLengthCounts gr-${this.props.data[0].grWidth}`

		const maxDataValue = Math.max(...curUsableData.map(d => +d.count))
		const durArr = curUsableData.map(d => +d.duration);
		durArr.sort((a,b) => a - b)

		//update scales
	    const xScale = this.xScale
	      .domain([0, maxDataValue])
	      .range([0, (svgDimensions.width - this.state.margins.right - this.state.margins.left)])
	      .nice()
	    
	     //yScale max hard-coded
	    const yScale = this.yScale
	      .domain(durArr)
	      .range([svgDimensions.height - this.state.margins.bottom, this.state.margins.top])

	    //Make data-driven axis labels
	    const axisLabels = this.state.labels.map((each) => {
	      return <AxisLabel
	        key={each.text}
	        xPos={this.calcXPos(each.type, svgDimensions)}
	        yPos={this.calcYPos(each.type, svgDimensions)}
	        labelClass={each.textClass}
	        groupClass={each.gWrapperClass}
	        textVal={each.text}
	        transformation={each.transformation}
	      />
	    })

		return (
			<React.Fragment>
				<svg className={thisClass}>

				<AxesAndMath
		          scales={{ xScale, yScale }}
		          margins={this.state.margins}
		          svgDimensions={svgDimensions}
		        />

				<HorizontalBars
		          scales={{ xScale, yScale }}
		          margins={this.state.margins}
		          data={curUsableData}
		          maxValue={maxDataValue}
		          svgDimensions={svgDimensions}
		          mousedOver={this.mousedOver}
		          alertLevel={this.state.alertLevel}
		          showBarDetails={this.showingBarDetails}
		        />

				{axisLabels}
				</svg>
			</React.Fragment>
		);
	}
}

export default ResponsiveWrapper(NoteLengthCounts);