import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import ResponsiveWrapper from '../ResponsiveWrapper'
import Toggle from '../Toggle'


class UpsAndDowns extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			margins : { top: 45, right: 40, bottom: 100, left: 70 },
			curShowing: 0
		}

		this.convertToArray = this.convertToArray.bind(this)
	}

	getNamesFromData(data){
		return {
			first : data[0].musician, 
			second : data[1].musician
		}
	}

	convertToArray(obj, usableKeysArr){
		let cleanedData = [];
		usableKeysArr.forEach(key => {
			let thisObj = {};
			if(key in obj){
				thisObj[key] = obj[key];
				cleanedData.push(thisObj)
			}
		})
		return cleanedData;
	}

	/*
	To-Do
	1. make xAxis
		hide it, just use domain & range, no actual visible axis component
	
	2. Make 2 'rects'...?
		split width by 3
		put rects @ thirds

		Make HEIGHT 'length' resemble number of ups / downs traveled

		CURIOUS
		Make up arrow point stick to Top
		Make down arrow point stick to Bottom?

		make & append arrowHeads to both,
			up on top
			down on bottom
	

	3.


	*/

	render(){

		/*
			Make data workable with d3 scales
	    */
		let curMusicianStats = this.props.data[this.state.curShowing];
		let dataKeys = ['downs','ups','unis'];
		let curUsableData = this.convertToArray(curMusicianStats, dataKeys);


		return(
			<React.Fragment>
				<p>Dummy Recat Component here</p>
				<Toggle cl='UpsAndDowns' opts={this.getNamesFromData(this.props.data)} onToggle={this.toggle}/>	
			</React.Fragment>
	);
	}
}

export default ResponsiveWrapper(UpsAndDowns);