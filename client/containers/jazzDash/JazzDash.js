import React, { Component } from "react";
import {connect} from 'react-redux';
import { fetchStats } from './state/actions';
import CountByNoteName from '../../components/CountByNoteName';
import './index.css';

class JazzDash extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	componentWillMount(){
		console.log('CWM jazzDash this.props')

		if(!this.state.dashData){
			fetchStats(this.props.dispatch)
		}
		
		console.log('CWM DONE - - - -')
	}

	render(){
		// console.log('RENDERING!! JazzDash this.props.storeDashData')
		// console.log(this.props.storeDashData)

		//<ChordStats data={this.props.store.data.chordStats} />
		//<NotesByType data={this.props.store.data.notesByType} />
		if(!this.props.storeDashData){
			//try img as class bg image for dummy loading image!!
			return (
			    <div className="dashWrapper">
			      <p>loading stats...</p>
				</div>
			);
		}else{
			return(
				<CountByNoteName data={this.props.storeDashData.totalsByNoteName}/>
			)
		}
		// }
	}

};

const mapStateToProps = state => ({ storeDashData: state._root.entries[0][1].jazzData })

export default connect(mapStateToProps)(JazzDash);
