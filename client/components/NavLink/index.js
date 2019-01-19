import React from 'react';
import {Link} from 'react-router-dom';
import './navLink.css';

export default function NavLink({linkTo, imgSrc, linkTitle}) {
	return(
		<Link to= {linkTo} className="reactLink">
			<li className='liWithIcon'>
				<img 
					src= {imgSrc} 
					className="icon" 
					alt= {linkTitle} 
				/>
				<span className="navSpan"> {linkTitle} </span>
			</li>
		</Link>		
	);
}