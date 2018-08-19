import React from 'react';
import './Nav.css';
import NavLink from '../NavLink';

export default function Nav() {
	//Help update this specific navLink text to change when signed-in-or-not :) 

//array of Objects,
//these are properties of each NavLink below	
	const navLinkArray = [
		{
			linkTo : "/",
			imgSrc : "/imgs/dashboard.png",
			alt : "Dashboard Homepage"
		},
		{
			linkTo : "/about",
			imgSrc : "/imgs/about.png",
			alt : "About"
		}
	];

//convert the array objects above into <NavLink />s
	const linkObjsToComponents = navLinkArray.map((navLink,ind) => {
		return <NavLink key={ind} linkTo={navLink.linkTo}  imgSrc={navLink.imgSrc}  linkTitle={navLink.alt}/>;
	})
	
    return (
		<nav>
			<ul>
				{linkObjsToComponents}
			</ul>
		</nav> 
    );
}
