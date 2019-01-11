import React from 'react';
import mockComponentData from '../../../__mocks__/dummyBarData.js';
import {CountByNoteName} from './index'
import Rect from '../../components/Rect'
import ResponsiveWrapper from '../ResponsiveWrapper';
import { shallow, mount, render } from 'enzyme';

//jest.mock replacement
mockComponentData.showTooltip = () => {};
mockComponentData.hideTooltip =  () => {};

describe('CHART CountByNoteName', () =>{

	// let cbnnMount = null;
	//before 
	// beforeAll(() => {
	// 	cbnnMount = mount(<CountByNoteName {...mockComponentData}/>);
	// })

	//let cbnn = mount(<CountByNoteName {...mockComponentData}/>);

	it('RENDERS w dummy props & mock data without crashing', () => {
		shallow(<CountByNoteName {...mockComponentData}/>);
	})

	it('displays correct # of bars from props', () => {
		let cbnn = render(<CountByNoteName {...mockComponentData}/>);
		expect(cbnn.find('Rect').length).toEqual(12) 
	})

	it('correctly updates a bar value onToggle', () => {
		
		//1. render the chart component
		let cbnnMount = mount(<CountByNoteName {...mockComponentData}/>);
		
		//2. get a bar val
		let firstBarProps = cbnnMount.find('Rect').first().props().count

		//3.Find & toggle the toggle
		let toggle = cbnnMount.find('[type="checkbox"]').simulate('click')

		//4. get same bar val as before
		let barValAfterClick = cbnnMount.find('Rect').first().props().count
		
		//expect BEFORE & AFTER clicking toggle barVals
		expect(firstBarProps).toEqual(mockComponentData.data[0]["A"])
		expect(barValAfterClick).toEqual(mockComponentData.data[1]["A"])
	})
})
