import React from 'react';
import * as d3 from 'd3';
import './index.css';

export default class Path extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			d: props.d
		}

		this.pathRef = React.createRef();
	}

	componentDidUpdate(prevProps,prevState) {
		if(prevProps.d !== this.props.d){
			let el = d3.select(this.pathRef.current);
		    el.attr('d', prevProps.d)

		    //1. D3 transition
		    el.transition()
		      .duration(400)
		      .ease(d3.easeQuad)
		      .attr("d", this.props.d)
		      
		      //setThis component state after transition
		      .on("end", () =>
		        this.setState({ d: this.props.d })
		      );
		}
	    
  	}

  	render(){
  		return(
			<path
			ref={this.pathRef}
			d={this.props.d}
			fill={this.props.fill}
			cursor={'pointer'}
	        className={this.props.cl}
	      />
		);
  	}
	
}
