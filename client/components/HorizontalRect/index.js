import React from 'react';
import * as d3 from 'd3';
import './index.css';

export default class HorizontalRect extends React.Component {
	constructor(props){
		super(props)
		
		//state keeps track of animating values
		this.state = {
			width: props.width
		}

		this.rectRef = React.createRef();
		this.prepToolTipObj = this.prepToolTipObj.bind(this)
	}

	//updates pre-existing bars
	componentDidUpdate(prevProps,prevState) {

		if(prevProps.width !== this.props.width){
		
			let el = d3.select(this.rectRef.current);

			//1. set to 'prevProps' width
		    el.attr('width', prevProps.width || 0)

		    //2. D3 transition
		    el.transition()
		      .duration(1500)
		      .ease(d3.easeQuad)
		      .attr("width", this.props.width)
		      
		    //3. setThis component state after transition
		      .on("end", () =>
		        this.setState({
		          width: this.props.width,
		        })
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
  		console.log('hz bar this.props')
  		console.log(this.props)
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
		        fill={'steelblue'}
				transform={this.props.transform}
				onMouseMove={this.prepToolTipObj}
	        	onMouseOut={this.props.hideTooltip}
	        	data-val={this.props.val}
	        	data-count={this.props.count}
		        className={this.props.className}
		      />
		);
  	}
	
}
