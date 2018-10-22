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

		this.theData = this.removeLessimportantData(this.props.data[this.state.curShowing]);
		this.seqClr = d3.scaleSequential().domain(this.makeSeqDom(this.theData)).interpolator(d3.interpolateRainbow);
		this.radiusScale = d3.scaleSqrt();
		this.colorScale = d3.scaleOrdinal(d3.schemeDark2);
		this.simulation;
		this.d3Circles;
	    this.myTickFn = this.myTickFn.bind(this)
	    this.makeSeqDom = this.makeSeqDom.bind(this)
		this.toggle = this.toggle.bind(this)
		this.drawChart = this.drawChart.bind(this)
		this.bubbleDataJoin;

	}

	getNamesFromData(data){
		return {
			first : data[0].musician, 
			second : data[1].musician
		}
	}

	toggle(){
		let curChosenNum = this.state.curShowing;
		let newMusicianNum = (curChosenNum == 0) ? 1 : 0;
		let newMusicianStats = this.removeLessimportantData(this.props.data[newMusicianNum]);

		this.drawChart(newMusicianStats)
	    this.setState({curShowing: newMusicianNum})
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

	myTickFn(){
		// console.log(this.d3Circles)
	  this.d3Circles
	  	.attr("cx", d => d.x)
      	.attr("cy",d => d.y)
	}

	componentDidMount(){

		let curMusicianStats = this.removeLessimportantData(this.props.data[this.state.curShowing]);
		this.drawChart(curMusicianStats)
	}
	
	drawChart(nodes, parent) {

	    // transition
	    var t = d3.transition().duration(500);
	    let bubbleGWrapper = d3.select('.bubbleGWrapper')

	    // Apply the general update pattern to the nodes.
	    this.bubbleDataJoin = bubbleGWrapper 
	        .selectAll('circle')
	        .data(nodes, d => d.interval)
	        .on('mouseover', d => {
	            console.log('bubbleDataJoin Hover')
	            console.log(d)
	          });
	    let bubbleDataJoinEnter = this.bubbleDataJoin.enter().append('circle');

	    // console.log('join')
	    // console.log(bubbleDataJoin)    
	    // console.log('enter')
	    // console.log(bubbleDataJoinEnter)        
	    //bubbleDataJoin.enter bubbleDataJoin.exit bubbleDataJoin
	    
	    this.bubbleDataJoin
	        .transition(t)
	          .style("fill", d => this.colorScale(d.interval))
	          .attr("r", d => d.count);

	    bubbleDataJoinEnter
	        .style("fill", d => this.colorScale(d.interval))
	        .merge(this.bubbleDataJoin)
	        .transition().duration(1200)
	          .attr("r", d => d.count)

	    this.simulation = d3.forceSimulation(nodes)
	    // .force("charge", d3.forceManyBody().strength(-150))
	    .force("yforce", d3.forceY().strength(.03))
			.force("xforce", d3.forceX().strength(.03))
	    .force("collide", d3.forceCollide().strength(.9).radius(d => d.count + 2))
	    .force("center", d3.forceCenter())
	    .alpha(.9)
	    .velocityDecay(.5)
	    .on("tick", () => {
	      this.bubbleDataJoin
	      .attrs({
	        "cx": d => d.x,
	        "cy": d => d.y
	      });
	      
	      bubbleDataJoinEnter
	      .attrs({
	        "cx": d => d.x,
	        "cy": d => d.y
	      });
	    });

	}

	render(){
		console.log('rendering, curChosenNum!')
		let curChosenNum = this.state.curShowing;
		console.log(curChosenNum)
		let curMusicianStats = this.removeLessimportantData(this.props.data[this.state.curShowing]);
		// console.log('rendering these stats...')
		// console.log(curMusicianStats)
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
		
		// let circles = this.sim.nodes().map((d,ind) => {
		// 	return <Circle 
		// 		key={d._id}
		// 		r={this.radiusScale(d.count)}
		// 		fill={this.seqClr(ind)}
		// 		cl={'intervalCircle'}
		// 		xPr={d.x}
		// 		yPr={d.y}
		// 		data={d.interval}
		// 	/>
		// })

		return(
			<React.Fragment>
				<svg className={thisClass}>
					<g className={'bubbleGWrapper'} transform={translateGWrapper} />
				</svg>
				<Toggle cl={'NoteIntervals'} opts={this.getNamesFromData(this.props.data)} onToggle={this.toggle}/>
			</React.Fragment>	
		);
	}
}

export default ResponsiveWrapper(NoteIntervals)