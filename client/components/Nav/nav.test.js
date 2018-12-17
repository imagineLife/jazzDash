import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './index';
import { shallow } from 'enzyme';

describe('Nav', () => {
	it('shallow renders without crashing', () => {
	  shallow(<Nav />);
	});	
})

