import React from 'react';
import './index.css';
import DashIcon from '../../imgs/dashboard.png';
import AboutIcon from '../../imgs/about.png';
import NavLink from '../NavLink';

export default function Nav(){
//MAYBE update this specific navLink text to change when signed-in-or-not :) 

//these are properties of each NavLink below	
	const navLinkArray = [
		{
			linkTo : "/",
			imgSrc : DashIcon,
			alt : "Dashboard"
		},
		{
			linkTo : "/about",
			imgSrc : AboutIcon,
			alt : "About"
		}
	];

//convert the array objects above into <NavLink />s
	const linkObjsToComponents = navLinkArray.map((navLink,ind) => {
		return <NavLink 
			key={ind} 
			linkTo={navLink.linkTo}
			imgSrc={navLink.imgSrc}
			linkTitle={navLink.alt}
		/>;
	})
	
    return (
		<nav className="nav">
			<ul>
				{linkObjsToComponents}
			</ul>
		</nav> 
    );
}
