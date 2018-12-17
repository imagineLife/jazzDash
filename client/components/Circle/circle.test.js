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

	it('has class from props', () => {
        const circle = shallow(<Circle {...dummyProps}/>);
        expect(circle.hasClass('dummyCircleClass')).toEqual(true);
    });

    it('has radius from props', () => {
        const circle = shallow(<Circle {...dummyProps}/>);
        console.log(circle.debug());
        expect(circle.prop('r')).toEqual(dummyProps.r);
    })

    it('has fill from props', () => {
        const circle = shallow(<Circle {...dummyProps}/>);
        console.log(circle.debug());
        expect(circle.prop('fill')).toEqual(dummyProps.fill);
    })

	it('has cx from props', () => {
        const circle = shallow(<Circle {...dummyProps}/>);
        console.log(circle.debug());
        expect(circle.prop('cx')).toEqual(dummyProps.xPr);
    })

	it('has cy from props', () => {
        const circle = shallow(<Circle {...dummyProps}/>);
        console.log(circle.debug());
        expect(circle.prop('cy')).toEqual(dummyProps.yPr);
    })

	it('has data from props', () => {
        const circle = shallow(<Circle {...dummyProps}/>);
        console.log(circle.debug());
        expect(circle.prop('data')).toEqual(dummyProps.data);
    })

	it('has stroke from props', () => {
        const circle = shallow(<Circle {...dummyProps}/>);
        console.log(circle.debug());
        expect(circle.prop('stroke')).toEqual(dummyProps.stroke);
    })
})

