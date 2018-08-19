import React, { Component } from "react";

class JazzDash extends Component {
	constructor(props){
		super(props)
		this.state = {
			dashData : []
		}
	}

	render(){
		return (
		    <div className="dashWrapper">
		      <p> JazzDash Container Here :) </p>
			</div>
		);
	}

};
export default JazzDash;
