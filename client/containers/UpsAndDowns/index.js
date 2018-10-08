import React from 'react';
// import {Link} from 'react-router-dom';
import './index.css';
import { scaleBand, scaleLinear } from 'd3-scale'
import ResponsiveWrapper from '../ResponsiveWrapper'
import Bars from '../../components/Bars'
import Line from '../../components/Line'
import Def from '../../components/Def'
import Toggle from '../../components/Toggle'


class UpsAndDowns extends React.Component {
	constructor(props){
		super(props)

		this.xScale = scaleBand();
		this.yScale = scaleLinear();
		this.state = {
			margins : { top: 20, right: 20, bottom: 100, left: 20 },
			curShowing: 0
		}

		this.convertToArray = this.convertToArray.bind(this)
		this.getMaxVal = this.getMaxVal.bind(this)
		this.toggleThis = this.toggleThis.bind(this)
	}

	toggleThis(){
	    let newVal = (this.state.curShowing === 0) ? 1 : 0;
	    this.setState({curShowing: newVal})
	}

	getNamesFromData(data){
		return {
			first : data[0].musician, 
			second : data[1].musician
		}
	}

	//converts object row to array of objects per original-object-key/valu pair
	convertToArray(musObj){
		let cleanedData = [
			{
				direction: 'ups',
				count: musObj.ups
			},
			{
				direction: 'downs',
				count: musObj.downs
			},
			{
				direction: 'unis',
				count: musObj.unis
			},
		]
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

	makeLinearScale(data, str, rangeMin, rangeMax){
		let thisVal = data[str]
		let thisScale = scaleLinear().domain([0, 205]).range([rangeMin,rangeMax])
		return thisScale;
	}

	makeLinesFromDataAndScales(data, upX, upY, downX, downY, dims){
		return data.map(d => {
			let dirStr = d.direction.toString();
			let thisXScale = downX;
			let thisYScale;
			if(['unis','ups'].includes(dirStr)){
				thisYScale = upY;
			}
			if(dirStr == 'downs'){
				thisYScale = downY;
			}

			return <Line
				key={d.direction}
				x1={downX(0)}
				y1={(!['unis'].includes(d.direction)) ? thisYScale(0) : (dims.height / 2)}
				x2={downX(d.count)}
				y2={(!['unis'].includes(d.direction)) ? thisYScale(d.count): (dims.height / 2)}
				stroke={(d.direction == 'ups') ? 'green' : (d.direction == 'downs') ? 'darkblue' : 'black'}
				strokeWidth={'3px'}
				markerEnd={'url(#arrowHead)'}
			/>
		})
	}

	makeArrowHeadDefs(thisName){
		return <Def 
			id={thisName}
			viewBox={'0 -5 10 10'}
			refX={5}
			refY={0}
			markerWidth={4}
			markerHeight={4}
			orient={'auto'}
			pathD={'M0,-5L10,0L0,5'}
			pathCl={'arrowHead'}
		/>
	}

	render(){
		// console.log('RENDERING UPS & DOWNS')
		// console.log('- - - - -')

		//prep svgDimensions var
		const svgDimensions = {
	      width: Math.max(this.props.respWrapWidth, 300),
	      height: 450
	    }

		/*
			Make data workable with d3 scales
	    */

	    //1. Select JUST the selected musician stats
		let curMusicianStats = this.props.data[this.state.curShowing];

		//2. vars for easier reading of range vals below
		let leftSide = this.state.margins.left;
		let rightSide = svgDimensions.width - this.state.margins.right;

		//3b. Build the arrow-specific scales scale using curStats, the 'ups' keyword, and the svg extremeties Dimensions Left & Right
		let upsXScale = this.makeLinearScale(curMusicianStats, 'ups', leftSide, rightSide)
		let upsYScale = this.makeLinearScale(curMusicianStats, 'downs', (svgDimensions.height - this.state.margins.bottom), this.state.margins.top)
		let downsXScale = this.makeLinearScale(curMusicianStats, 'downs', leftSide, rightSide)
		let downsYScale = this.makeLinearScale(curMusicianStats, 'downs', this.state.margins.top, (svgDimensions.height - this.state.margins.bottom))
		let arrows = this.makeLinesFromDataAndScales(this.convertToArray(curMusicianStats), upsXScale, upsYScale, downsXScale, downsYScale, svgDimensions)
		let arrowHeadDefs = this.makeArrowHeadDefs('arrowHead')

		//make class string for svg element
		let thisClass = `upsAndDowns gr-${this.props.data[0].grWidth}`

		return(
			<React.Fragment>
				<svg className={thisClass}>
					{arrows}
					{arrowHeadDefs}
		        </svg>
				<Toggle cl='UpsAndDowns' opts={this.getNamesFromData(this.props.data)} onToggle={this.toggleThis}/>	
			</React.Fragment>
	);
	}
}

export default ResponsiveWrapper(UpsAndDowns);