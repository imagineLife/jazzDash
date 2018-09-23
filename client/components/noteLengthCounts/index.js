import React from 'react';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale'
import * as d3 from 'd3-selection'
import Toggle from '../Toggle'
import AxesAndMath from '../Axes'
import AxisLabel from '../AxisLabel'
import HorizontalRect from '../HorizontalRect'

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
		this.toggleThis = this.toggleThis.bind(this)
		this.getUsableData = this.getUsableData.bind(this)
		this.makeMergedDurationDataSet = this.makeMergedDurationDataSet.bind(this)
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
			{
			  type: 'chartTitle',
			  text : 'Times-Played Per Note-Duration',
			  textClass : 'chartTitle',
			  gWrapperClass : 'chartTitleG',
			  transformation: ''
			},
			],
			margins : { top: 45, right: 40, bottom: 100, left: 70 },
			curShowing: 0
		}
	}

	toggleThis(){
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
			return (dims.height * .075)
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

	getUsableData(arr, curMusData){
		let recompiled = arr.map(durVal => {
			let thisObj;
			let indOfThisVal = curMusData.findIndex(data => data['duration'] === durVal)
			if(indOfThisVal >= 0){
				return curMusData[indOfThisVal]
			}else{
				return {duration: durVal, count: 0}
			}
		})
		return recompiled.filter((it, ind) => recompiled.indexOf(it) >= ind );
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

	makeMergedDurationDataSet(dataSet,curMusicianVal, otherMusicianVal, curMusStats, othersStats){
		let curMusicianKeys = Object.keys(dataSet[curMusicianVal]).filter(key => !['musician', 'song', 'grWidth'].includes(key))
		let curMusicianDurations = curMusicianKeys.map(key => curMusStats[key]['length'])
		let otherMusicianKeys = Object.keys(dataSet[otherMusicianVal]).filter(key => !['musician', 'song', 'grWidth'].includes(key))
		let otherMusicianDurations = otherMusicianKeys.map(key => othersStats[key]['length'])
		return [...curMusicianDurations, ...otherMusicianDurations]
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

	    //1. get cur & other musician ind value from state
	    let otherMusicianVal = (this.state.curShowing === 1) ? 0 : 1;

	    //2. Get cur & other stats from props
		let curMusicianStats = this.props.data[this.state.curShowing];
		let otherMusicianStats = this.props.data[otherMusicianVal];

		//3. combine cur & other duration keys
		const mergedDurArr = this.makeMergedDurationDataSet(this.props.data, this.state.curShowing, otherMusicianVal, curMusicianStats, otherMusicianStats)

		//4. make usable data filled with 0s
		//	 where curMusician did not play given duration & then sort
		let dataKeys = Object.keys(curMusicianStats);
		let curMusicianData = this.convertToArray(curMusicianStats, dataKeys);
		let newUsableData = this.getUsableData(mergedDurArr, curMusicianData).sort((a,b) => +a.duration - +b.duration);
		const maxDataValue = Math.max(...newUsableData.map(d => +d.count))
		const durArr = newUsableData.map(d => +d.duration);
		durArr.sort((a,b) => a - b)

		//make class string for svg element
		let thisClass = `noteLengthCounts gr-${this.props.data[0].grWidth}`

		//update scales
	    const xScale = this.xScale
	      .domain([0, 275])
	      .range([this.state.margins.left, (svgDimensions.width - this.state.margins.right)])
	      // .nice()
	    
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
	        fontSize={'1.5em'}
	        transformation={each.transformation}
	      />
	    })


	    
		//Prep for the bars
	    let colorArr = ['cadetblue', 'green']
	    let colorScale = scaleOrdinal().range(colorArr);
	    let trans = `translate(${this.state.margins.left},0)`

        //Preps Data-Driven Horizontal Rect Components
	    const bars = (
	      newUsableData.map((barData, ind) => {

	      	//Use mongo ID as the key!
	      	if (+barData.count > 0){
	      		return ( 
		          <HorizontalRect
		            key={barData.duration}
		            thisKey={barData.duration}
		            y={yScale(barData.duration)}
		            width={xScale(+barData.count) - this.state.margins.left}
		            height={yScale.bandwidth()}
		            fill={colorScale(barData.count)}
		            stroke={'green'}
		            strokeWidth={'2px'}
		            transform={trans}
		            className="singleBar"
		          />
		        )
	      	}
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
				<Toggle cl={'NoteLengthCounts'} opts={this.getNamesFromData(this.props.data)} onToggle={this.toggleThis}/>
			</React.Fragment>
		);
	}
}

export default ResponsiveWrapper(NoteLengthCounts);