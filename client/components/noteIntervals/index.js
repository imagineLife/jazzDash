import React from 'react';
import './index.css';
import ResponsiveWrapper from '../ResponsiveWrapper'
import * as d3 from 'd3'
import Circle from '../Circle'


class NoteIntervals extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			margins : { top: 20, right: 20, bottom: 100, left: 20 },
			curShowing: 0
		}

		this.colorScale = d3.scaleOrdinal(d3.schemeDark2)
		this.radiusScale = d3.scaleSqrt()
	}

	makeD3Simulation(){
		return d3.forceSimulation()
			.force("yforce", d3.forceY().strength(.03))
			.force("xforce", d3.forceX().strength(.03))
	}

	removeLessimportantData(data){
		let thisArr = []
		for(let prop in data){
			if(!['musician','song','grWidth'].includes(prop)){
				thisArr.push(data[prop])
			}
		}
		return thisArr
	}
	
	render(){

		//prep svgDimensions var
		const svgDimensions = {
	      width: Math.max(this.props.respWrapWidth, 300),
	      height: 450
	    }

		/*
			Make data workable with d3 scales
	    */

	    //1. Prep Data for working with d3
		let curMusicianStats = this.removeLessimportantData(this.props.data[this.state.curShowing]);
		let countExtent = d3.extent(curMusicianStats, d => d.count)
		let smallestCircleRad = Math.min(svgDimensions.width, svgDimensions.height)

		this.radiusScale.domain(countExtent).range([0, (smallestCircleRad/ 4)])

		//setup simulation
		let sim = this.makeD3Simulation();
		sim.force("myCollide", d3.forceCollide(d => radiusScale(d.count)));

		// console.log('radiusScale.range()')
		// console.log(this.radiusScale.range())

		// console.log('noteIntervals curMusicianStats')
		// console.log(curMusicianStats)
		// console.log('- - - - -')
		
		let circles = curMusicianStats.map(d => {
			return <Circle 
				key={d._id}
				r={this.radiusScale(d.count)}
				fill={this.colorScale(d.count)}
			/>
		})

		//make class string for svg element
		let thisClass = `NoteIntervals gr-${this.props.data[0].grWidth}`

		return(
			<svg className={thisClass}>
				{circles}
			</svg>
		);
	}
}

export default ResponsiveWrapper(NoteIntervals)