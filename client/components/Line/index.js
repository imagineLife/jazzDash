import React from 'react';
import * as d3 from 'd3';
import 'd3-selection-multi';
import './index.css';

export default class LineComp extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			height: props.height
		}

		this.lineRef = React.createRef();
		this.prepToolTipObj = this.prepToolTipObj.bind(this)
	}

	componentDidUpdate(prevProps,prevState) {

		if(prevProps.x2 !== this.props.x2){
			let el = d3.select(this.lineRef.current);
		    el.attrs({
		    	'x1': prevProps.x1,
		    	'x2': prevProps.x2,
		    	'y1': prevProps.y1,
		    	'y2': prevProps.y2,
		    })

		    el.transition()
		      .duration(650)
		      .ease(d3.easeBounce)
		      .attrs({
		      	'x1': this.props.x1,
		    	'x2': this.props.x2,
		    	'y1': this.props.y1,
		    	'y2': this.props.y2,
		      })
		      .on("end", () =>
		        this.setState({
					'x1': this.props.x1,
					'x2': this.props.x2,
					'y1': this.props.y1,
					'y2': this.props.y2,
		        })
		      );
		}
	    
  	}

  	prepToolTipObj(e){
  		
  		let thisObj = {
  			val: e.target.attributes.getNamedItem('data-val').value,
  			valTxt: ' are played',
  			count: e.target.attributes.getNamedItem('data-count').value,
  			pgX: e.pageX,
  			pgY: e.pageY
  		}

  		this.props.tooltipFn(thisObj)
  	}

  	render(){
  		return(
			<line
				ref={this.lineRef}
				x1={this.props.x1}
				y1={this.props.y1}
				x2={this.props.x2}
				y2={this.props.y2}
				stroke={this.props.stroke}
				strokeWidth={this.props.strokeWidth}
				markerEnd={this.props.markerEnd}
				onMouseMove={this.prepToolTipObj}
	        	onMouseOut={this.props.hideTooltip}
	        	data-val={this.props.val}
	        	data-count={this.props.count}
			/>
		);
  	}
	
}
