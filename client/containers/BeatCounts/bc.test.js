import React from 'react';
import beatNumberFreqs from '../../../__mocks__/beatNumberFreqs.js';
import {BeatCounts} from './index'
import SingleText from '../../components/SingleText'
import ResponsiveWrapper from '../ResponsiveWrapper';
import { shallow, mount, render } from 'enzyme';

//jest.mock replacement
beatNumberFreqs.showTooltip = () => {};
beatNumberFreqs.hideTooltip =  () => {};

describe('CHART BeatCounts', () =>{

	it('RENDERS w dummy props & mock data without crashing', () => {
		shallow(<BeatCounts {...beatNumberFreqs}/>);
	})


	//I'd like to figure out how to check how many 
	//	react child COMPONENTS are rendered next ?!?!


	it('displays correct # of <text> elements from chart props', () => {

		//render the Chart Component
		let beatCount = render(<BeatCounts {...beatNumberFreqs}/>);

		//get number of expected bars from mock data
		let firstDataSet = beatNumberFreqs.data[0];

		let justRelevantBeats = Object.keys(firstDataSet).map(d => {
			if([.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5].includes(firstDataSet[d].beat)){
				return firstDataSet[d]
			}else{ return null }
		}).filter(d => d)
		
		//TEST
		expect(beatCount.find('Text').length).toEqual(justRelevantBeats.length) 
	})

	it('correctly updates the first text value onToggle', () => {
		
		//1. render the chart component
		let beatCountMount = mount(<BeatCounts {...beatNumberFreqs}/>);
		
		//2. get a bar val
		let firstTextVal = beatCountMount.find('text').first().props()['data-count'];
		
		//3.Find & toggle the toggle
		let toggle = beatCountMount.find('[type="checkbox"]').simulate('click')

		//4. get same bar val as before
		let barValAfterClick = beatCountMount.find('text').first().props()['data-count'];
		let matchingMockDataElement = beatNumberFreqs.data[1]
		
		//expect BEFORE & AFTER clicking toggle barVals
		expect(firstTextVal).toEqual(beatNumberFreqs.data[0][0].count)
		expect(barValAfterClick).toEqual(beatNumberFreqs.data[1][0].count)
	})
})
