import React from 'react';
import {Link} from 'react-router-dom';
import './navLink.css';

export default function NavLink(props) {

	return(
		<Link to= {props.linkTo} className="reactLink">
			<li className='liWithIcon'>
				<img 
					src= {props.imgSrc} 
					className="icon" 
					alt= {props.linkTitle} 
				/>
				<span className="menuLabel"> {props.linkTitle} </span>
			</li>
		</Link>		
	);
}
