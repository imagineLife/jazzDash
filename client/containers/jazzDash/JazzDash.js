import React, { Component } from "react";
import {connect} from 'react-redux';
import { fetchStats } from './state/actions';
import CountByNoteName from '../CountByNoteName';
import UpsAndDowns from '../UpsAndDowns';
import NoteLengthCounts from '../noteLengthCounts';
import NoteTypePercents from '../NoteTypePercents';
import NoteIntervals from '../NoteIntervals';
import BeatCounts from '../BeatCounts';
import DistanceByBeat from '../DistanceByBeat'
import Tooltip from '../../components/Tooltip'
import BigImg from '../../components/BigImg';
import './index.css';

class JazzDash extends Component {
	constructor(props){
		super(props)
		this.state = {
			tooltipActive : false
		}
		this.addToolTipDataToState = this.addToolTipDataToState.bind(this)
		this.removeTooltipFromState = this.removeTooltipFromState.bind(this)
	}

	componentWillMount(){
		if(!this.state.dashData){
			fetchStats(this.props.dispatch)
		}
	}

	addToolTipDataToState(obj){
		let newObj = { 
			tooltipData:{
				pgX: obj.pgX,
				pgY: obj.pgY,
				val: obj.val,
				count: obj.count
			},
			tooltipActive: true
		}
		this.setState(newObj)
	}

	removeTooltipFromState(){
		this.setState({tooltipActive: false, tooltipData: {}})
	}

	render(){
		
		if(!this.props.storeDashData){
			//try img as class bg image for dummy loading image!!
			return (
			    <div className="dashWrapper">
			      <p>loading stats...</p>
				</div>
			);
		}else{

			console.log('dash wrapper props')
			console.log(this.props)
			console.log('- - - - -')

			let musicians = this.props.storeDashData.musicians.map(m => {
				let imgStr = m.replace(/\s/g, '');
				return <BigImg key={imgStr} str={imgStr} fullName={m} type={'musician'} parentCol={'3'}/>
			})

			let albumNameStr = this.props.storeDashData.album;
			let albumImg = <BigImg key={albumNameStr} str={albumNameStr} fullName={albumNameStr} type={'album'} parentCol={'3'}/>
			let SongName = <BigImg key={'IF'} str={'IF'} fullName={'IF'} type={'album'} parentCol={'3'}/>

			return(
				<main className="dashWrapper">
					{this.state.tooltipActive && <Tooltip data={this.state.tooltipData}/>}
					<div className="row">
						{albumImg}
						{musicians}
						{SongName}
					</div>
					<div className="row">
						<CountByNoteName 
							showTooltip={this.addToolTipDataToState} 
							hideTooltip={this.removeTooltipFromState} 
							data={this.props.storeDashData.totalsByNoteName} 
							parentCol={'12'} />
					</div>
					<div className="row">
						<NoteLengthCounts 
							showTooltip={this.addToolTipDataToState} 
							hideTooltip={this.removeTooltipFromState} 
							data={this.props.storeDashData.noteLengthCounts} 
							parentCol={'6'} />
						<UpsAndDowns data={this.props.storeDashData.totalDirections} parentCol={'6'}/>
					</div>
					<div className="row">
						<BeatCounts
							showTooltip={this.addToolTipDataToState} 
							hideTooltip={this.removeTooltipFromState}
							data={this.props.storeDashData.beatCounts} 
							parentCol={'12'}/>
					</div>					
					<div className="row">
						<NoteTypePercents data={this.props.storeDashData.noteTypesByPercentage} parentCol={'6'}/>
						<NoteIntervals data={this.props.storeDashData.noteIntervalCounts} parentCol={'6'}/>
					</div>
					<div className="row">
						<DistanceByBeat parentCol={'12'}/>
					</div>	
					<div className="bottomSpacer" />
				</main>
			)
		}
		// }
	}

};

const mapStateToProps = state => ({ storeDashData: state._root.entries[0][1].jazzData })

export default connect(mapStateToProps)(JazzDash);
