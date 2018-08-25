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
		
		//use the action!
		if(!this.state.dashData){
			//fetch stats on dispatch fn as a 'pointer'
			//dispatch gets passed around till its needed
			fetchStats(this.props.dispatch)

		}

		console.log('CWM DONE - - - -')
	}

	componentDidMount(){
		console.log('CDM jazzDash CDM this.props')	
		console.log(this.props)
		console.log('CDM - - - - -')
	}

	render(){
		console.log('RENDERING!! JazzDash this.props.storeDashData')
		console.log(this.props.storeDashData)
		console.log('- - - - -')
		return (
		    <div className="dashWrapper">
		      <p> JazzDash Container Here :) </p>
			</div>
		);
	}

};

const mapStateToProps = state => ({ storeDashData: state._root.entries[0][1].jazzData })

export default connect(mapStateToProps)(JazzDash);
