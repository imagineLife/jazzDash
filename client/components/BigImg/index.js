import React from 'react';
import ResponsiveWrapper from '../../containers/ResponsiveWrapper';

import './index.css';

function BigImg(props) {
	if(props.fullName !== 'IF'){
		return(
			<section className='bigImgWrapper'>
			<img className='bigImg' src={`./imgs/${props.type}s/${props.str}.jpg`}/>
			<h3 className='bigImgName'>{props.fullName}</h3>
			</section>
		);
	}else{
		return(
			<section className='bigImgWrapper'>
			<h3 className='bigImgName songTitle'>{props.fullName}</h3>
			</section>
		);
	}
};


export default ResponsiveWrapper(BigImg);