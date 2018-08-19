import React from 'react';
import {Link} from 'react-router-dom';
import './navLink.css';

export default function NavLink(props) {

	return(
		<li className='liWithIcon'>
			<Link to= {props.linkTo}>
				<img 
					src= {props.imgSrc} 
					className="icon" 
					alt= {props.linkTitle} 
				/>
				<span className="menuLabel"> {props.linkTitle} </span>
			</Link>
		</li>
	);
}
