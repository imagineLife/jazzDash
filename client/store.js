import { combineReducers, createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import { createLogger } from 'redux-logger';
import createReducer from './reducers';

//1. initialState
const initialState = { dashData : [] }

//2. logger middle-ware
const loggerMW = createLogger()

//3. applying middleware
const appliedLoggerMW = applyMiddleware(loggerMW);


//4. export default
export default function myStoreConfig(initialState){

	//5. enhancers
	const enhancers = [ applyMiddleware() ];

	//6. conditionally use the enhancers?
	const composeEnhancers =
			
			//validate IN production to use compose

		    // process.env.NODE_ENV !== 'production' &&
		    ~window.location.href.indexOf('http') &&

		    //validate NOT testing, testing doesn't use a window
		    typeof window === 'object' &&
		    

		   	// IF those are true, does this xtnxn xst?
		    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?

		      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;


	//7. put it all together with createStore
	const store = createStore(createReducer(), fromJS(initialState), composeEnhancers(...enhancers));
	return store;


	//8. added the myConfigStore fn to index.js...
	//9. added initial store to index.js
}

// module.exports = { store };