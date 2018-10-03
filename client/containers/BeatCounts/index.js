import React from 'react';
import './index.css';
import ResponsiveWrapper from '../ResponsiveWrapper'
import * as d3 from 'd3';

class BeatCounts extends React.Component {
	// console.log('placeholder props')
	// console.log(props)
	// console.log('- - - - -')
	constructor(props){
		super(props)
	
		this.beatSizeScale = d3.scaleLinear()
		this.state = {
			curShowing: 0
		}
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
		let beatSizeRange = [.5, 8]
		this.beatSizeScale.domain(beatCountExtent).range(beatSizeRange)

		console.log('beatCountExtent')
		console.log(beatCountExtent)
		
		//make svgDimensions for beatValues
		const singleBeatDims = this.makeBeatSVGDims(svgDimensions.width, 200)
		console.log('singleBeatDims')
		console.log(singleBeatDims)

		//make beat values, put in svg wrappers
		let numbers = curMusicianStats.sort((a, b) => a.beat - b.beat).map(obj => {
			let keyVal = obj.beat
			if(obj.beat % 1 != 0){
				obj.beat = '+'
			}

			let beatNumberSize = this.beatSizeScale(+obj.count)
			// console.log('beatNumberSize')
			// console.log(beatNumberSize)
			return (<div key={keyVal} className='beatNumber gr8-1-2'>
					<svg className='beatSVG' width={singleBeatDims.beatW} height={singleBeatDims.beatH}>
						<text 
							className='beatTextVal'
							fontSize={`${beatNumberSize}rem`} 
							transform={singleBeatDims.thisTrans}>{obj.beat}</text>
					</svg>
				</div>)
		})

		//make class string for svg element
		let thisClass = `BeatCounts gr8row`
		

		return(
			<div className={thisClass}>{numbers}</div>
		);
	}
}

export default ResponsiveWrapper(BeatCounts)