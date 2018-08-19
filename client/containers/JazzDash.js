import React, { Component } from "react";
import {connect} from 'react-redux';

class JazzDash extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	componentWillMount(){
		console.log('CWM this.props')
		console.log(this.props)
		if(!this.state.dashData){
			this.props.dispatch({type: "fetch_dashboard_data"})
		}
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
