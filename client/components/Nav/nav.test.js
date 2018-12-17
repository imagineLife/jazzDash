import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './index';
import { shallow } from 'enzyme';

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

  
	//how to test rendering children ie. nav with <NavLink />
})

