import React from 'react';
import * as d3 from 'd3';
import './index.css';

export default class Rect extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			height: props.height
		}

		this.rectRef = React.createRef();
	}

	componentDidUpdate(prevProps,prevState) {
		if(prevProps.height !== this.props.height){
			let el = d3.select(this.rectRef.current);
		    el.attr('height', prevProps.height)
		    el.attr('y', prevProps.y)

		    //1. D3 transition
		    el.transition()
		      .duration(400)
		      .ease(d3.easeQuad)
		      .attr("height", this.props.height)
		      .attr("y", this.props.y)
		      
		      //setThis component state after transition
		      .on("end", () =>
		        this.setState({
		          height: this.props.height,
		          y: this.props.y
		        })
		      );
		}
	    
  	}

  	render(){
  		return(
			<rect
			ref={this.rectRef}
	        key={this.props.thisKey}
	        x={this.props.x}
	        y={this.props.y}
	        height={this.state.height}
	        width={this.props.width}
	        fill={this.props.fill}
	        stroke={this.props.stroke}
	        strokeWidth={this.props.strokeWidth}
	        className={this.props.className}
	      />
		);
  	}
	
}
