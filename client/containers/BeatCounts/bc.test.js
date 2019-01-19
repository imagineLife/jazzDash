import React from 'react';
import beatNumberFreqs from '../../../__mocks__/beatNumberFreqs.js';
import {BeatCounts} from './index'
import Rect from '../../components/Rect'
import ResponsiveWrapper from '../ResponsiveWrapper';
import { shallow, mount, render } from 'enzyme';

//jest.mock replacement
beatNumberFreqs.showTooltip = () => {};
beatNumberFreqs.hideTooltip =  () => {};

describe('CHART BeatCounts', () =>{

	// let cbnnMount = null;
	//before 
	// beforeAll(() => {
	// 	cbnnMount = mount(<BeatCounts {...beatNumberFreqs}/>);
	// })

	//let cbnn = mount(<BeatCounts {...beatNumberFreqs}/>);

	it('RENDERS w dummy props & mock data without crashing', () => {
		shallow(<BeatCounts {...beatNumberFreqs}/>);
	})

	//check how many COMPONENTS are rendered next
	//not just how many svg elements there are


	it('displays correct # of SingleText elements from props', () => {

		//render the Chart Component
		let cbnn = render(<BeatCounts {...beatNumberFreqs}/>);

		//get number of expected bars from mock data
		let firstDataSet = beatNumberFreqs.data[0];

		let justRelevantBeats = Object.keys(firstDataSet).map(d => {
			if([.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5].includes(firstDataSet[d].beat)){
				return firstDataSet[d]
			}else{ return null }
		}).filter(d => d)

		//TEST
		expect(cbnn.find('Text').length).toEqual(justRelevantBeats.length) 
	})

	// it('correctly updates a bar value onToggle', () => {
		
	// 	//1. render the chart component
	// 	let cbnnMount = mount(<BeatCounts {...beatNumberFreqs}/>);
		
	// 	//2. get a bar val
	// 	let firstBarProps = cbnnMount.find('Rect').first().props().count

	// 	//3.Find & toggle the toggle
	// 	let toggle = cbnnMount.find('[type="checkbox"]').simulate('click')

	// 	//4. get same bar val as before
	// 	let barValAfterClick = cbnnMount.find('Rect').first().props().count
		
	// 	//expect BEFORE & AFTER clicking toggle barVals
	// 	expect(firstBarProps).toEqual(beatNumberFreqs.data[0]["A"])
	// 	expect(barValAfterClick).toEqual(beatNumberFreqs.data[1]["A"])
	// })
})
