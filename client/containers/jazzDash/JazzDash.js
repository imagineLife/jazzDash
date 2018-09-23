import React, { Component } from "react";
import {connect} from 'react-redux';
import { fetchStats } from './state/actions';
import CountByNoteName from '../../components/CountByNoteName';
import UpsAndDowns from '../../components/UpsAndDowns';
import NoteLengthCounts from '../../components/noteLengthCounts';
import NoteTypePercents from '../../components/NoteTypePercents';

import BigImg from '../../components/BigImg';
import './index.css';

class JazzDash extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	componentWillMount(){
		if(!this.state.dashData){
			fetchStats(this.props.dispatch)
		}
	}

	render(){
		
		/*
		COULD I...?
			const responsiveSection = this.props.storeDashData.forEach((chartObj, ind) => {
				return <LayoutWrapper key={ind} {...chartObj}/>
			})

			here, the '<LayoutWrapper />' would return 
			ResonsiveWrapper(<ChartComponent />)
			Will this separate layout concern from chart-content-concern a little?


			OR could/should I this.props.storeDashdata.forEach((chartObj, ind) => {
				return REsponsiveWrapper(<ChartComponent />)

				
			})
		*/
		
		if(!this.props.storeDashData){
			//try img as class bg image for dummy loading image!!
			return (
			    <div className="dashWrapper">
			      <p>loading stats...</p>
				</div>
			);
		}else{

			console.log('dash wrapper props')
			console.log(this.props.storeDashData)
			console.log('- - - - -')

			let musicians = this.props.storeDashData.musicians.map(m => {
				let imgStr = m.replace(/\s/g, '');
				return <BigImg key={imgStr} str={imgStr} fullName={m} type={'musician'} parentCol={'4'}/>
			})

			let albumNameStr = this.props.storeDashData.album;
			let albumImg = <BigImg key={albumNameStr} str={albumNameStr} fullName={albumNameStr} type={'album'} parentCol={'4'}/>

			return(
				<main className="dashWrapper">
					<div className="row">
						{albumImg}
						{musicians}
					</div>
					<div className="row">
						<CountByNoteName data={this.props.storeDashData.totalsByNoteName} parentCol={'12'}/>
					</div>
					<div className="row">
						<NoteLengthCounts data={this.props.storeDashData.noteLengthCounts} parentCol={'6'}/>
						<UpsAndDowns data={this.props.storeDashData.totalDirections} parentCol={'6'}/>
					</div>
					<div className="row">
						<NoteTypePercents data={this.props.storeDashData.noteTypesByPercentage} parentCol={'6'}/>
						<div className={'gr-6'}/>
					</div>
				</main>
			)
		}
		// }
	}

};

const mapStateToProps = state => ({ storeDashData: state._root.entries[0][1].jazzData })

export default connect(mapStateToProps)(JazzDash);
