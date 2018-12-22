import React from 'react';
import Toggle from './index';
import { shallow, mount } from 'enzyme';

describe('Toggle', () => {
    let dummyProps = {
        opts: {
            first: 'firstProp',
            second: 'secondProp'
        },
        cl : 'dummyClass',
        onToggle: jest.mock()
    }

    dummyProps.firstSecond = dummyProps.opts.first.replace(/ .*/,'');
    dummyProps.firstFirst = dummyProps.opts.second.replace(/ .*/,'');
    dummyProps.switchCl = `${dummyProps.cl} switch`
    dummyProps.sliderCl = `${dummyProps.cl} slider`
    dummyProps.forName = `toggleMusician${dummyProps.cl}`

	//smoke test
	it('shallow renders without crashing', () => {
	  shallow(<Toggle {...dummyProps}/>);
	});

    it.only('gets class from props', () => {
        const toggle = mount(<Toggle {...dummyProps}/>);
        const togLabel = toggle.childAt(0)
        // console.log(togLabel.debug());
        expect(togLabel.hasClass(dummyProps.cl)).toEqual(true);
    })
})

