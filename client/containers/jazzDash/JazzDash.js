import React, { Component } from "react";
import {connect} from 'react-redux';
import { fetchStats } from './state/actions';
import CountByNoteName from '../../components/CountByNoteName';
import NoteLengthCounts from '../../components/noteLengthCounts';
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
		
		//<ChordStats data={this.props.store.data.chordStats} />
		//<NotesByType data={this.props.store.data.notesByType} />
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

			return(
				<main className="dashWrapper">
					<CountByNoteName data={this.props.storeDashData.totalsByNoteName} />
					<NoteLengthCounts data={this.props.storeDashData.noteLengthCounts} />
				</main>
			)
		}
		// }
	}

};

const mapStateToProps = state => ({ storeDashData: state._root.entries[0][1].jazzData })

export default connect(mapStateToProps)(JazzDash);
