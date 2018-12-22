import React from 'react';
// import ReactDOM from 'react-dom';
import Rect from './index';
import { shallow, mount } from 'enzyme';

describe('SVG Rect', () => {
	let dummyProps = {
		// "ref" :
        "key" :'testKey',
        "x" :23,
        "y" :14,
        "height" :29,
        "width" :10,
        "fill" :'steelblue',
        "stroke" :'1px solid green',
        "strokeWidth" :'5px',
        "className" :'testRect',
        // "onMouseMove" :
        // "onMouseOut" :
        "data-val":12,
        "data-count":12
	}

	//smoke tests
	it('shallow renders without crashing', () => {
	  shallow(<Rect {...dummyProps}/>);
	});	

	it('has class from props', () => {
        const rect = shallow(<Rect {...dummyProps}/>);
        expect(rect.hasClass('testRect')).toEqual(true);
    });

    it('has height from props', () => {
        const rect = shallow(<Rect {...dummyProps}/>);
        expect(rect.prop('height')).toEqual(dummyProps.height);
    })

    it('has width from props', () => {
        const rect = shallow(<Rect {...dummyProps}/>);
        expect(rect.prop('width')).toEqual(dummyProps.width);
    })

    it('has fill from props', () => {
        const rect = shallow(<Rect {...dummyProps}/>);
        expect(rect.prop('fill')).toEqual(dummyProps.fill);
    })

	it('has x from props', () => {
        const rect = shallow(<Rect {...dummyProps}/>);
        expect(rect.prop('x')).toEqual(dummyProps.x);
    })

	it('has y from props', () => {
        const rect = shallow(<Rect {...dummyProps}/>);
        expect(rect.prop('y')).toEqual(dummyProps.y);
    })

	it('has stroke from props', () => {
        const rect = shallow(<Rect {...dummyProps}/>);
        expect(rect.prop('stroke')).toEqual('1px solid green');
    })

	it('has stroke from props', () => {
        const rect = shallow(<Rect {...dummyProps}/>);
        expect(rect.prop('stroke')).toEqual(dummyProps.stroke);
    })
})

