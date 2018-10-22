import React from 'react';
import * as d3 from 'd3';
import 'd3-selection-multi';
import './index.css';

export default class Circle extends React.Component {
	constructor(props){
		super(props)
		this.circleRef = React.createRef();
	}

	componentDidUpdate(prevProps,prevState) {
		console.log('circle cdu!')

		if((prevProps.xPr !== this.props.xPr) || (prevProps.yPr !== this.props.yPr)){
			let el = d3.select(this.circleRef.current);
		    el.attrs({
		    	'cx': prevProps.xPr,
		    	'cy': prevProps.yPr,
		    	'r':prevProps.r,
				'fill':prevProps.fill,
				'className':prevProps.cl,
				'data':prevProps.data,
		    	'fillOpacity':prevProps.fillOpacity,
		    	'stroke':prevProps.stroke,
				'strokeOpacity':prevProps.strokeO
		    })

		    el.transition()
		      .duration(1750)
		      .ease(d3.easeLinear)
		      .attrs({
				'cx': this.props.xPr,
		    	'cy': this.props.yPr,
		    	'r':this.props.r,
				'fill':this.props.fill,
				'className':this.props.cl,
				'data':this.props.data,
		    	'fillOpacity':this.props.fillOpacity,
		    	'stroke':this.props.stroke,
				'strokeOpacity':this.props.strokeO
		      })
		}
	    
  	}

  	render(){
  		return(
			<circle
				ref={this.circleRef}
				r={this.props.r}
				fill={this.props.fill}
				cx={this.props.xPr}
				cy={this.props.yPr}
				className={this.props.cl}
				data={this.props.data}
		    	fillOpacity={this.props.fillOpacity}
		    	stroke={this.props.stroke}
				strokeOpacity={this.props.strokeO} 
			/>
		);
  	}
	
}
