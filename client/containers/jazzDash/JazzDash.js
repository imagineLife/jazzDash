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
		
		if(!this.props.storeDashData){
			//try img as class bg image for dummy loading image!!
			return (
			    <div className="dashWrapper">
			      <p>loading stats...</p>
				</div>
			);
		}else{

			// console.log('dash wrapper props')
			// console.log(this.props.storeDashData)
			// console.log('- - - - -')

			return(
				<main className="dashWrapper">
					<div className="row">
						<CountByNoteName data={this.props.storeDashData.totalsByNoteName} parentCol={'12'}/>
					</div>
					<div className="row">
						<NoteLengthCounts data={this.props.storeDashData.noteLengthCounts} parentCol={'6'}/>
					</div>
				</main>
			)
		}
		// }
	}

};

const mapStateToProps = state => ({ storeDashData: state._root.entries[0][1].jazzData })

export default connect(mapStateToProps)(JazzDash);
