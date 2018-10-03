import React from 'react';
import './index.css';
import ResponsiveWrapper from '../ResponsiveWrapper'


class BeatCounts extends React.Component {
	// console.log('placeholder props')
	// console.log(props)
	// console.log('- - - - -')
	constructor(props){
		super(props)
	
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
			fs = `${(beatW * .008)}rem`
		return {beatW, beatH, thisTrans, fs}
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

		console.log('svgDimensions')
		console.log(svgDimensions)
		
		//make svgDimensions for beatValues
		const singleBeatDims = this.makeBeatSVGDims(svgDimensions.width, 200)
		console.log('singleBeatDims')
		console.log(singleBeatDims)

		//make beat values, put in svg wrappers
		let numbers = curMusicianStats.sort((a, b) => a.beat - b.beat).map((obj, ind) => {
			return (<div key={obj.beat} className='beatNumber gr8-1-2'>
					<svg className='beatSVG' width={singleBeatDims.beatW} height={singleBeatDims.beatH}>
						<text 
							className='beatTextVal'
							fontSize={singleBeatDims.fs} 
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