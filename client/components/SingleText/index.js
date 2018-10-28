import React from 'react';
import * as d3 from 'd3';
import './index.css';

export default class SingleText extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			fs: props.fs
		}

		this.textRef = React.createRef();
		this.prepToolTipObj = this.prepToolTipObj.bind(this)
	}

	componentDidUpdate(prevProps) {
		if(prevProps.fs !== this.props.fs){
			let el = d3.select(this.textRef.current);
		    el.attr('font-size', prevProps.fs)

		    //1. D3 transition
		    el.transition()
		      .duration(200)
		      .ease(d3.easeQuad)
		      .attr("font-size", this.props.fs)
		      
		      //setThis component state after transition
		      .on("end", () =>
		        this.setState({fs: this.props.fs})
		      );
		}
	    
  	}

  	prepToolTipObj(e){
  		
  		let thisObj = {
  			val: e.target.attributes.getNamedItem('data-val').value, 
  			count: e.target.attributes.getNamedItem('data-count').value,
  			pgX: e.pageX,
  			pgY: e.pageY
  		}

  		this.props.tooltipFn(thisObj)
  	}

  	render(){
  		return(
			<text
				ref={this.textRef}
				className={this.props.cl}
				fontSize={this.state.fs} 
				transform={this.props.tf}
				data-val={this.props.textVal}
	        	data-count={this.props.count}
	        	onMouseMove={this.prepToolTipObj}
	        	onMouseOut={this.props.hideTooltip}
	      >{this.props.textVal}</text>
		);
  	}
	
}