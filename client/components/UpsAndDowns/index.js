import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import ResponsiveWrapper from '../ResponsiveWrapper'
import Toggle from '../Toggle'


class UpsAndDowns extends React.Component {

	getNamesFromData(data){
		return {
			first : data[0].musician, 
			second : data[1].musician
		}
	}
	render(){
		return(
			<React.Fragment>
				<p>Dummy Recat Component here</p>
				<Toggle cl='UpsAndDowns' opts={this.getNamesFromData(this.props.data)} onToggle={this.toggle}/>	
			</React.Fragment>
	);
	}
}

export default ResponsiveWrapper(UpsAndDowns);