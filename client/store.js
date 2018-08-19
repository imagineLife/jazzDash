import { combineReducers, createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';

//1. initialState
const initialState = {
	dashData : {}
}

//2. logger middle-ware
const loggerMW = createLogger()

//3. dummy reducer to start
const dashDataReducer = (state=initialState.dashData, action) => {
	console.log('inside dashDataReducer')
	// switch(action.type){
	// 	case ("CHANGE_NAME"):
	// 		state = Object.assign({}, state, {name: action.payload});
	// 		break;

	// 	case ("CHANGE_AGE"):
	// 		state = Object.assign({}, state, {age: action.payload});
	// }
	return state;
}

//4. reducing reducers... not sure I need this for now?
const reducedReducers = combineReducers({
	dashData: dashDataReducer,
})

const appliedLoggerMW = applyMiddleware(loggerMW);

const devstore = createStore(reducedReducers, appliedLoggerMW)

devstore.subscribe(() => {
	console.log('store changed ->', devstore.getState())
}) 

module.exports = { devstore };
/*
NOTES
Handling async actions w middleware

OVERVIEW: React is only a view rep of the state of the store
	view never changes unless store changes
	react is a view-layer-ONLY
	move ALL rep OUT of components,
		ONLY in store

1. install redux-logger
2. import redux-logger
3. update applyMiddleware parameter

HERE:
	many changes from video.
	redux-logger v3 is different syntax than previous




*/


