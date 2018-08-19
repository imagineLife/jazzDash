import React, { Component } from "react";
import {connect} from 'react-redux';

class JazzDash extends Component {
	constructor(props){
		super(props)
		this.state = {
			dashData : []
		}
	}

	componentWillMount(){
		console.log('CWM jazzDash props')
		console.log(this.props)
		console.log('CWM - - - -')
	}

	render(){
		return (
		    <div className="dashWrapper">
		      <p> JazzDash Container Here :) </p>
			</div>
		);
	}

};

const mapStateToProps = state => ({ storeDashData: state.dashData })

export default connect(mapStateToProps)(JazzDash);
