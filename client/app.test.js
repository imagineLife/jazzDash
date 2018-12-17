import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

describe('App.js', () => {
	it('renders without crashing', () => {
	  shallow(<App />);
	});	
})

