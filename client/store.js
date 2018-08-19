import {createStore, applyMiddleware, compose} from 'redux';
import { fromJS } from 'immutable';
import createReducer from './reducer';

export default function myConfigureStore(initialState){

	/* HERE applyMiddleware([!HERE!]) can go the imported middleware */
	const enhancers = [ applyMiddleware() ];

	const composeEnhancers =
		//validate NOT in production
	    process.env.NODE_ENV !== 'production' &&
	    //validate NOT testing, testing doesn't use a window
	    typeof window === 'object' &&
	    /*
	    	IF those are true, does this xtnxn xst?
		*/
	    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

	const store = createStore(createReducer(), fromJS(initialState), composeEnhancers(...enhancers));
	return store;
}