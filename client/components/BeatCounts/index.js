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

	render(){
		console.log(this.props)

		//prep svgDimensions var
		const svgDimensions = {
	      width: Math.max(this.props.respWrapWidth, 300),
	      height: 450
	    }

	    //1. Prep Data for working with d3
		let curMusicianStats = this.removeLessimportantData(this.props.data[this.state.curShowing]);
		console.log('curMusicianStats')
		console.log(curMusicianStats)
		let firstFourNumbers = curMusicianStats.sort((a, b) => a.beat - b.beat).map((obj, ind) => {
			if(ind < 4){
				return (<p key={obj.beat} className='beatNumber gr-3'>{obj.beat}</p>)
			}
		})
		let lastFourNumbers = curMusicianStats.sort((a, b) => a.beat - b.beat).map((obj, ind) => {
			if(ind > 3){
				return (<p key={obj.beat} className='beatNumber gr-1'>{obj.beat}</p>)
			}
		})
		

		return(
			<div className='beatNumbersGrid'>
			<div className='gr-6 gridRow'>MicCheck</div>
			<div className='gr-6 gridRow'>Row2</div>
			</div>	
		);
	}
}

export default ResponsiveWrapper(BeatCounts)