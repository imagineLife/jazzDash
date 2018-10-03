import React from 'react';
import ResponsiveWrapper from '../../containers/ResponsiveWrapper';

import './index.css';

function BigImg(props) {
	return(
		<section className='bigImgWrapper'>
		<img className='bigImg' src={`client/imgs/${props.type}s/${props.str}.jpg`}/>
		<h3 className='bigImgName'>{props.fullName}</h3>
		</section>
	);
};


export default ResponsiveWrapper(BigImg);