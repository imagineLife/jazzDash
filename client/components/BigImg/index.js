import React from 'react';
// import {Link} from 'react-router-dom';
import ResponsiveWrapper from '../ResponsiveWrapper';

import './index.css';

function BigImg(props) {
	//make class string for svg element

	console.log('BigImg props')
	console.log(props)
	console.log('- - - - -')
	return(
		<section className='bigImgWrapper'>
		<img className='bigImg' src={`client/imgs/musicians/${props.str}.jpg`}/>
		<h3 className='bigImgName'>{props.fullName}</h3>
		</section>
	);
};


export default ResponsiveWrapper(BigImg);