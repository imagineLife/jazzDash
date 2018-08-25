import App from "./App";
import "./main.css";
import ReactDOM from "react-dom";
import React from "react";
import { Provider } from 'react-redux';
import myConfigureStore from './store';


const rootState={};
ReactDOM.render(
	<Provider store={ myConfigureStore(rootState) }>
		<App />
	</Provider>, 
	document.getElementById("app"));