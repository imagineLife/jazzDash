import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './index';
import NavLink from '../NavLink/index';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';


/*
	DOC about testing Links, routes, starting on specific route
	https://reacttraining.com/react-router/web/guides/testing/starting-at-specific-routes
*/


describe('Nav', () => {

	//smoke tests
	it('shallow renders without crashing', () => {
	  shallow(<Nav />);
	});	

	it('has correct class', () => {
        const nav = shallow(<Nav />);
        expect(nav.hasClass('nav')).toEqual(true);
    });

    it('has hard-coded children count of 2', () => {
    	const nav = shallow(<Nav />);
		expect(nav.find('ul').children().length).toEqual(2);    	
    })

    it('renders two NavLinks child components', () => {
    	const nav = mount(<Router><Nav /></Router>);
		expect(nav.find('ul').childAt(0).type()).toEqual(NavLink)
		expect(nav.find('ul').childAt(1).type()).toEqual(NavLink)
    })

    it('links first to "/"', () => {
	    const nav = mount(<Router><Nav /></Router>);
	    const button = nav.find(NavLink);
	    expect(nav.find(NavLink).first().props().linkTo).toBe('/');
	});

	it('links second to "/about"', () => {
	    const nav = mount(<Router><Nav /></Router>);
	    const button = nav.find(NavLink); //arr of NavLinks
	    // console.log(button.debug());
	    expect(nav.find(NavLink).at(1).props().linkTo).toBe('/about');

	});
})

