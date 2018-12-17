import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './index';
import NavLink from '../NavLink/index';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

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
	    const mockCallBack = jest.fn();
	    const nav = mount(<Router><Nav /></Router>);
	    const button = nav.find(NavLink);
	    expect(nav.find(NavLink).first().props().linkTo).toBe('/');
	});

	it('links second to "/about"', () => {
	    const mockCallBack = jest.fn();
	    const nav = mount(<Router><Nav /></Router>);
	    const button = nav.find(NavLink);
	    // console.log(button.debug());
	    expect(nav.find(NavLink).at(1).props().linkTo).toBe('/about');
	});


	
	/*
		testing Link in Nav
		// button.simulate('click');
		// expect(mockCallBack.mock.calls.length).toEqual(1);

		https://reacttraining.com/react-router/web/guides/testing
		// fixed!
		test("it expands when the button is clicked", () => {
		  render(
		    <MemoryRouter>
		      <Sidebar />
		    </MemoryRouter>
		  );
		  click(theButton);
		  expect(theThingToBeOpen);
		});
	*/
})

