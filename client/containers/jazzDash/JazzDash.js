import React, { Component } from "react";
import {connect} from 'react-redux';
import { fetchStats } from './state/actions';

class JazzDash extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	componentWillMount(){
		console.log('CWM jazzDash this.props')

		if(!this.state.dashData){
			fetchStats(this.props.dispatch)
		}
		
		console.log('CWM DONE - - - -')
	}

	componentDidMount(){
		console.log('CDM jazzDash CDM this.props.storeDashData')	
		console.log(this.props.storeDashData)
		console.log('CDM DONE - - - - -')
	}

	render(){
		console.log('RENDERING!! JazzDash this.props.storeDashData')
		console.log(this.props.storeDashData)
		console.log('- - - - -')
		if(this.props.storeDashData){
			return (
			    <div className="dashWrapper">
			      <p> JazzDash Container Here :) </p>
				</div>
			);
		}else{
			return (
			    <div className="dashWrapper">
			      <p>loading stats...</p>
				</div>
			);
		}
	}

};

const mapStateToProps = state => ({ storeDashData: state._root.entries[0][1].jazzData })

export default connect(mapStateToProps)(JazzDash);
