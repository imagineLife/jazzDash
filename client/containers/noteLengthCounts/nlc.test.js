import React from 'react';
import mockComponentData from '../../../__mocks__/NoteLengthCounts.js';
import {NoteLengthCounts} from './index'
import Rect from '../../components/Rect'
import { shallow, mount, render } from 'enzyme';

//jest.mock replacement
mockComponentData.showTooltip = () => {};
mockComponentData.hideTooltip =  () => {};

describe('CHART NoteLengthCounts', () =>{

	// let cbnnMount = null;
	//before 
	// beforeAll(() => {
	// 	cbnnMount = mount(<NoteLengthCounts {...mockComponentData}/>);
	// })

	//let cbnn = mount(<NoteLengthCounts {...mockComponentData}/>);

	it('RENDERS w dummy props & mock data without crashing', () => {
		shallow(<NoteLengthCounts {...mockComponentData}/>);
	})

	it('displays correct # of bars from props', () => {

		//render the component with mock data as props
		let cbnn = render(<NoteLengthCounts {...mockComponentData}/>);

		//get number of expected bars from mock data
		let mockBarsKeys = Object.keys(mockComponentData.data[0]).filter(d => !['musician','song','grWidth'].includes(d))
		let countOfInitialMockBars = mockBarsKeys.length

		//TEST
		expect(cbnn.find('Rect').length).toEqual(countOfInitialMockBars) 
	})

	// it('correctly updates a bar value onToggle', () => {
		
	// 	//1. render the chart component
	// 	let cbnnMount = mount(<NoteLengthCounts {...mockComponentData}/>);
		
	// 	//2. get a bar val
	// 	let firstBarProps = cbnnMount.find('Rect').first().props().count

	// 	//3.Find & toggle the toggle
	// 	let toggle = cbnnMount.find('[type="checkbox"]').simulate('click')

	// 	//4. get same bar val as before
	// 	let barValAfterClick = cbnnMount.find('Rect').first().props().count
		
	// 	//expect BEFORE & AFTER clicking toggle barVals
	// 	expect(firstBarProps).toEqual(mockComponentData.data[0]["A"])
	// 	expect(barValAfterClick).toEqual(mockComponentData.data[1]["A"])
	// })
})
