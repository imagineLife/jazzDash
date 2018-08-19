import App from "./App";
import "./main.css";
import ReactDOM from "react-dom";
import React from "react";
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>, 
	document.getElementById("app"));