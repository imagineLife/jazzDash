import React from 'react';
import ReactDOM from 'react-dom';
import Circle from './index';
import { shallow, mount } from 'enzyme';

describe('SVG Circle', () => {
	let dummyProps = {
		"r": 10,
		"fill": 'steelblue',
		"xPr": 25,
		"yPr": 45,
		"cl": 'dummyCircleClass',
		"data": 39,
		"fillOpacity": .5,
		"stroke": '1px solid green',
		"strokeO": .37,
	}

	//smoke tests
	it('shallow renders without crashing', () => {
	  shallow(<Circle {...dummyProps}/>);
	});	

	it('has correct class from props', () => {
        const circle = shallow(<Circle {...dummyProps}/>);
        expect(circle.hasClass('dummyCircleClass')).toEqual(true);
    });

    it('has correct radius from props', () => {
        const circle = shallow(<Circle {...dummyProps}/>);
        console.log(circle.debug());
        expect(circle.prop('r')).toEqual(dummyProps.r);
    })

    it('has correct fill from props', () => {
        const circle = shallow(<Circle {...dummyProps}/>);
        console.log(circle.debug());
        expect(circle.prop('fill')).toEqual(dummyProps.fill);
    })
})

