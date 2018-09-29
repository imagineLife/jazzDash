import React from 'react';
import * as d3 from 'd3';
import 'd3-selection-multi';
import './index.css';

export default class Circle extends React.Component {
	constructor(props){
		super(props)

		// this.state = {
		// 	height: props.height
		// }

		this.circleRef = React.createRef();
	}

	// componentDidUpdate(prevProps,prevState) {

	// 	if(prevProps.x2 !== this.props.x2){
	// 		let el = d3.select(this.lineRef.current);
	// 	    el.attrs({
	// 	    	'x1': prevProps.x1,
	// 	    	'x2': prevProps.x2,
	// 	    	'y1': prevProps.y1,
	// 	    	'y2': prevProps.y2,
	// 	    })

	// 	    el.transition()
	// 	      .duration(650)
	// 	      .ease(d3.easeBounce)
	// 	      .attrs({
	// 	      	'x1': this.props.x1,
	// 	    	'x2': this.props.x2,
	// 	    	'y1': this.props.y1,
	// 	    	'y2': this.props.y2,
	// 	      })
	// 	      .on("end", () =>
	// 	        this.setState({
	// 				'x1': this.props.x1,
	// 				'x2': this.props.x2,
	// 				'y1': this.props.y1,
	// 				'y2': this.props.y2,
	// 	        })
	// 	      );
	// 	}
	    
 //  	}

  	render(){
  		return(
			<circle
				ref={this.circleRef}
				r={this.props.r}
				fill={this.props.fill}
			/>
		);
  	}
	
}
