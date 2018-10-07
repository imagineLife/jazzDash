import React from 'react';
import './index.css';
import ResponsiveWrapper from '../ResponsiveWrapper'
import * as d3 from 'd3'
import Circle from '../../components/Circle'
import Toggle from '../../components/Toggle'


class NoteIntervals extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			margins : { top: 20, right: 20, bottom: 100, left: 20 },
			curShowing: 0
		}

		this.theData = this.removeLessimportantData(this.props.data[this.state.curShowing])
		this.seqClr = d3.scaleSequential().domain(this.makeSeqDom(this.theData)).interpolator(d3.interpolateRainbow);
		this.radiusScale = d3.scaleSqrt()
		this.sim = this.makeD3Simulation();
		this.d3Circles;

		//setup d3 force on simulation
		this.sim.force("myCollide", d3.forceCollide(d => this.radiusScale(+d.count)))
	      .alpha(1)
	      .nodes(this.theData);

	    this.myTickFn = this.myTickFn.bind(this)
	    this.makeSeqDom = this.makeSeqDom.bind(this)
		this.toggle = this.toggle.bind(this)

	}

	getNamesFromData(data){
		return {
			first : data[0].musician, 
			second : data[1].musician
		}
	}

	toggle(){
		// console.log('toggling')
	    let newVal = (this.state.curShowing === 0) ? 1 : 0;
	    this.setState({curShowing: newVal})
	}

	makeSeqDom(data){
		let indexes = data.sort((a, b) => b.count - a.count ).map((d,ind) => ind)
		return d3.extent(indexes, d => d)
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

	makeD3Simulation(){
		return d3.forceSimulation()
			.force("yforce", d3.forceY().strength(.03))
			.force("xforce", d3.forceX().strength(.03))
	}

	myTickFn(){
		// console.log(this.d3Circles)
	  this.d3Circles
	  	.attr("cx", d => d.x)
      	.attr("cy",d => d.y)
	}

	updateNodes(){
		this.sim.nodes(this.theData).on('tick', this.myTickFn)
	}

	componentDidMount(){

		this.d3Circles = d3.selectAll('.intervalCircle')
			.data(this.theData);

		this.updateNodes();
		

		console.log('cdm this.d3Circles')
		console.log(this.d3Circles)
	}

	componentDidUpdate(){
		console.log('BUBBLE CHART!! cdu here!')
		this.updateNodes();

	}
	
	render(){
		let curMusicianStats = this.removeLessimportantData(this.props.data[this.state.curShowing]);
		console.log('rendering these stats...')
		console.log(curMusicianStats)
		//prep svgDimensions var
		const svgDimensions = {
	      width: Math.max(this.props.respWrapWidth, 300),
	      height: 450
	    }

	    //1. Prep Data for working with d3
		let countExtent = d3.extent(curMusicianStats, d => d.count)
		let smallestCircleRad = Math.min(svgDimensions.width, svgDimensions.height)
		this.radiusScale.domain(countExtent).range([0, (smallestCircleRad/ 5)])
		
		//make class string for svg element
		let thisClass = `noteIntervals gr-${this.props.data[0].grWidth}`
		
		//setup gWrapper translation
		let translateGWrapper = `translate(${svgDimensions.width /2},${svgDimensions.height /2})`;
		
		let circles = this.sim.nodes().map((d,ind) => {
			return <Circle 
				key={d._id}
				r={this.radiusScale(d.count)}
				fill={this.seqClr(ind)}
				cl={'intervalCircle'}
				xPr={d.x}
				yPr={d.y}
				data={d.interval}
			/>
		})

		return(
			<React.Fragment>
				<svg className={thisClass}>
					<g className={'gWrapper'} transform={translateGWrapper}>
						{circles}
					</g>
				</svg>
				<Toggle cl={'NoteIntervals'} opts={this.getNamesFromData(this.props.data)} onToggle={this.toggle}/>
			</React.Fragment>	
		);
	}
}

export default ResponsiveWrapper(NoteIntervals)