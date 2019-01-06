import React from 'react';
import Toggle from './index';
import { shallow, mount, render } from 'enzyme';

describe('Tests Toggle', () => {
    let dummyProps = {
        opts: {
            first: 'firstProp',
            second: 'secondProp'
        },
        cl : 'dummyClass',
        onToggle: jest.mock()
    }

    // dummyProps.firstSecond = dummyProps.opts.first.replace(/ .*/,'');
    // dummyProps.firstFirst = dummyProps.opts.second.replace(/ .*/,'');
    // dummyProps.switchCl = `${dummyProps.cl} switch`
    // dummyProps.sliderCl = `${dummyProps.cl} slider`
    // dummyProps.forName = `toggleMusician${dummyProps.cl}`

	//smoke test
	it('shallow renders without crashing', () => {
	  shallow(<Toggle {...dummyProps}/>);
	});

    it('gets class from props', () => {
        const toggle = mount(<Toggle {...dummyProps}/>);
        const togLabel = toggle.childAt(0)
        expect(togLabel.hasClass(dummyProps.cl)).toEqual(true);
    })

    it('sets class in input', () => {
      const toggle = render(<Toggle {...dummyProps}/>); 
      let inputElement = toggle.find(`.toggleMusician${dummyProps.cl}`).first();
      expect(inputElement).toBeTruthy();
    })

    it('sets ID in input', () => {
      const toggle = render(<Toggle {...dummyProps}/>); 
      let inputElement = toggle.find(`toggleMusician${dummyProps.cl}`).first();
      expect(inputElement).toBeTruthy();
    })

    it('sets name in input', () => {
      const toggle = render(<Toggle {...dummyProps}/>); 

      let inputElement = toggle.find(`[name="toggleMusician${dummyProps.cl}"]`).first();
      expect(inputElement).toBeTruthy();
    })

    //why doesnt this work either!?
    it('sets span texts from props', () => {
      const toggle = mount(<Toggle {...dummyProps} />);
      let sliderDiv = toggle.find('.slider')
      expect(sliderDiv.find('span').first().text()).toEqual(dummyProps.opts.second)
    })

    it('sets both span class from props', () => {
        const toggle = shallow(<Toggle {...dummyProps} />);
        console.log(toggle.debug());
        expect(toggle.find(`.${dummyProps.cl}`).length).toEqual(2)
    })

    //help test CLICKING / changing the toggle
    it.only('changes which span is highlighted onCheckboxToggle', () => {
        const toggle = shallow(<Toggle {...dummyProps} />);
        let rightSpan = toggle.find('.rightSpan')

        //seems to have only ONE span in debug output ...?
        console.log(slider.debug())
    })
})

