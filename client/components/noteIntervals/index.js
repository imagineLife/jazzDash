import React from 'react';
import './index.css';
import ResponsiveWrapper from '../ResponsiveWrapper'

class NoteIntervals extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			margins : { top: 20, right: 20, bottom: 100, left: 20 },
			curShowing: 0
		}
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

	    //1. Select JUST the selected musician stats
		let curMusicianStats = this.props.data[this.state.curShowing];

		console.log('placeholder props')
		console.log(this.props)
		console.log('- - - - -')
		
		return(
			<p>Dummy React Component here</p>	
		);
	}
}

export default ResponsiveWrapper(NoteIntervals)