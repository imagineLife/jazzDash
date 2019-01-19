import React from 'react';
import mockNoteLengthData from '../../../__mocks__/NoteLengthCounts.js';
import {NoteLengthCounts} from './index'
import HorizontalRect from '../../components/HorizontalRect'
import { shallow, mount, render } from 'enzyme';

//jest.mock replacement
mockNoteLengthData.showTooltip = () => {};
mockNoteLengthData.hideTooltip =  () => {};

describe('CHART NoteLengthCounts', () =>{

	// let cbnnMount = null;
	//before 
	// beforeAll(() => {
	// 	cbnnMount = mount(<NoteLengthCounts {...mockNoteLengthData}/>);
	// })

	//let cbnn = mount(<NoteLengthCounts {...mockNoteLengthData}/>);

	it('RENDERS w dummy props & mock data without crashing', () => {
		shallow(<NoteLengthCounts {...mockNoteLengthData}/>);
	})

	it('displays correct # of bars from props', () => {

		//render the component with mock data as props
		let noteLengthCounts = render(<NoteLengthCounts {...mockNoteLengthData}/>);

		//get number of expected bars from mock data
		let mockBarsKeys = Object.keys(mockNoteLengthData.data[0]).filter(d => !['musician','song','grWidth'].includes(d))
		let countOfInitialMockBars = mockBarsKeys.length

		//TEST
		expect(noteLengthCounts.find('Rect').length).toEqual(countOfInitialMockBars) 
	})

	//HOW TEST RENDERING WITH ANIMATION -> CDM in chart
	// it.only('correctly updates first bar value onToggle', () => {
		
		//1. render the chart component
		// let nlcMount = mount(<NoteLengthCounts {...mockNoteLengthData}/>);
		
		//2. get a bar val
		// console.log('nlcMount')
		// console.log(nlcMount.find('Rect').first())
		
		// let firstBarProps = nlcMount.find('Rect').first()//.props().count;

		//3.Find & toggle the toggle
		// let toggle = nlcMount.find('[type="checkbox"]').simulate('click')

		//4. get same bar val as before
		// let barValAfterClick = nlcMount.find('Rect').first().props().count
		
		// expect(nlcMount.find('Rect').first())
		//expect BEFORE & AFTER clicking toggle barVals
		// expect(firstBarProps).toEqual(mockNoteLengthData.data[0]["A"])
		// expect(barValAfterClick).toEqual(mockNoteLengthData.data[1]["A"])
	// })

})
