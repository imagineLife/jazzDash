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
		this.circleObjs;
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

	resizeTick(e){
		console.log('resizeTick called! E')
	  // resizeCirclesObj.attrs({
   //      "cx" : (d) => {return d.x},
   //      "cy" : (d) => {return d.y}
   //    })
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

		console.log('noteIntervals curMusicianStats')
		console.log(curMusicianStats)
		console.log('- - - - -')

		let countExtent = d3.extent(curMusicianStats, d => d.count)
		let smallestCircleRad = Math.min(svgDimensions.width, svgDimensions.height)

		this.radiusScale.domain(countExtent).range([0, (smallestCircleRad/ 4)])

		//setup simulation
		let sim = this.makeD3Simulation();
		sim.force("myCollide", d3.forceCollide(d => this.radiusScale(d.count)))
		.alpha(.5)
		.nodes(curMusicianStats)
      	// .on('tick', this.resizeTick);

		console.log('sim')
		console.log(sim)
		
		let circles = sim.nodes().map(d => {
			return <Circle 
				key={d._id}
				r={this.radiusScale(d.count)}
				fill={this.colorScale(d.count)}
				cl={`.interval-circle ${d.interval}`}
				x={this.state.cx || d.x}
				y={this.state.cy || d.x}
			/>
		})

		//make class string for svg element
		let thisClass = `noteIntervals gr-${this.props.data[0].grWidth}`
		let translateG = `translate(${svgDimensions.width /2},${svgDimensions.height /2})`;
		return(
			<svg className={thisClass}>
				<g className={'gWrapper'} transform={translateG}>
					{circles}
				</g>
			</svg>
		);
	}
}

export default ResponsiveWrapper(NoteIntervals)