import React from 'react';
import './index.css';
import ResponsiveWrapper from '../ResponsiveWrapper'
import Toggle from '../../components/Toggle'
import * as d3 from 'd3';

class BeatCounts extends React.Component {
	// console.log('placeholder props')
	// console.log(props)
	// console.log('- - - - -')
	constructor(props){
		super(props)
	
		this.beatSizeScale = d3.scaleLinear()
		this.toggle = this.toggle.bind(this)
		this.state = {
			curShowing: 0
		}
	}

	getNamesFromData(data){
		return {
			first : data[0].musician, 
			second : data[1].musician
		}
	}

	toggle(){
	    let newVal = (this.state.curShowing === 0) ? 1 : 0;
	    this.setState({curShowing: newVal})
	}

	removeLessimportantData(data){
		let thisArr = []
		for(let prop in data){
			if(!['musician','song','grWidth'].includes(prop)){
				thisArr.push(data[prop])
			}
		}
		return thisArr.filter(obj => [1,1.5,2,2.5,3,3.5,4,4.5].includes(+obj.beat))
	}

	makeBeatSVGDims(w,h){
		let beatW, beatH = h, thisTrans, fs;
			beatW = (w > 450) ? (w / 8) : (w / 4)
			thisTrans = `translate(${beatW/2},${h/2})`
		return {beatW, beatH, thisTrans}
	}

	render(){
		console.log('beatNumber props')
		console.log(this.props)

		//prep svgDimensions var
		const svgDimensions = {
	      width: Math.max(this.props.respWrapWidth, 300),
	      height: 450
	    }

	    //1. Prep Data for working with d3
		let curMusicianStats = this.removeLessimportantData(this.props.data[this.state.curShowing]);

		let beatCountExtent = d3.extent(curMusicianStats, d => d.count)
		let beatSizeRange = [.5, 7.5]
		this.beatSizeScale.domain(beatCountExtent).range(beatSizeRange)
		
		//make svgDimensions for beatValues
		const singleBeatDims = this.makeBeatSVGDims(svgDimensions.width, 200)

		//make beat values, put in svg wrappers
		let numbers = curMusicianStats.sort((a, b) => a.beat - b.beat).map(obj => {
			let friendlyBeat = obj.beat
			if(obj.beat % 1 != 0){
				friendlyBeat = '+'
			}
			let beatNumberSize = this.beatSizeScale(+obj.count)
			
			return (<div key={obj.beat} className='beatNumber gr8-1-2'>
					<svg className='beatSVG' width={singleBeatDims.beatW} height={singleBeatDims.beatH}>
						<text 
							className='beatTextVal'
							fontSize={`${beatNumberSize}rem`} 
							transform={singleBeatDims.thisTrans}>{friendlyBeat}
						</text>
					</svg>
				</div>)
		})

		//make class string for svg element
		let thisClass = `BeatCounts gr8row`
		

		return(
			<React.Fragment>
				<div className={thisClass}>{numbers}</div>
				<Toggle cl='BeatCounts' opts={this.getNamesFromData(this.props.data)} onToggle={this.toggle}/>
			</React.Fragment>				
		);
	}
}

export default ResponsiveWrapper(BeatCounts)