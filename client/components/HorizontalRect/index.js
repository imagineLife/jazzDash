import React from 'react';
import * as d3 from 'd3';
import './index.css';

export default class HorizontalRect extends React.Component {
	constructor(props){
		super(props)
		
		//state keeps what-is-changing
		this.state = {
			width: props.width
		}

		this.rectRef = React.createRef();
	}

	componentDidUpdate(prevProps,prevState) {
		if(prevProps.width !== this.props.width){
			let el = d3.select(this.rectRef.current);
		    el.attr('width', prevProps.width)

		    //1. D3 transition
		    el.transition()
		      .duration(800)
		      .ease(d3.easeQuad)
		      .attr("width", this.props.width)
		      
		      //setThis component state after transition
		      .on("end", () =>
		        this.setState({
		          width: this.props.width,
		        })
		      );
		}
	    
  	}

  	render(){
  		// console.log('rect width on render')
  		// console.log(this.state.width)
  		return(
			<rect
				ref={this.rectRef}
		        key={this.props.thisKey}
		        x={this.props.x}
		        y={this.props.y}
		        height={this.props.height}
		        width={this.props.width}
		        fill={this.props.fill}
		        stroke={this.props.stroke}
		        strokeWidth={this.props.strokeWidth}
				transform={this.props.transform}
		        // onClick={() => props.showBarDetails(d)}
		        // onMouseOver={() => props.mousedOver(d)}
		        className={this.props.className}
		      />
		);
  	}
	
}
