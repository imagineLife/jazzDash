import React from 'react';
import cbnn from '../../../__mocks__/dummyBarData.js';
import {CountByNoteName} from './index'
import ResponsiveWrapper from '../ResponsiveWrapper';
import { shallow, mount } from 'enzyme';

describe('CHART CountByNoteName', () =>{
	it('RENDERS w dummy props & mock data without crashing', () => {
		let dummyProps = {
			showTooltip: jest.mock(),
			hideTooltip: jest.mock(),
			data: cbnn,
			parentCol: '12',
			respWrapWidth: 502
		}
		shallow(<CountByNoteName {...dummyProps}/>);
	})

	it.only('displays correct # of bars from props', () => {
		let dummyProps = {
			showTooltip: jest.mock(),
			hideTooltip: jest.mock(),
			data: cbnn,
			parentCol: '12',
			respWrapWidth: 502
		}
		let parent = shallow(<CountByNoteName {...dummyProps}/>);
		console.log('parent')
		// console.log(parent.find('.singleBar').length) not correct right not
		console.log(parent.debug())
		
		// expect(parent.find(Rect).kength).to.equal(12)
	})
})
