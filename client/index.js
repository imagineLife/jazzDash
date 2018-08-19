import App from "./App";
import "./main.css";
import ReactDOM from "react-dom";
import React from "react";
import { Provider } from 'react-redux';
import { devstore } from './store';

ReactDOM.render(
	<Provider store={devstore}>
		<App />
	</Provider>, 
	document.getElementById("app"));