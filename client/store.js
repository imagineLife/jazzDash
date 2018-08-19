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
	switch(action.type){
		case ("fetch_dashboard_data"):
			console.log('fetching data on CWM')		
			// state = Object.assign({}, state, {age: action.payload});
	}
	return state;
}

//4. reducing reducers... not sure I need this for now?
const reducedReducers = combineReducers({
	dashData: dashDataReducer,
})

//5. applying middleware
const appliedLoggerMW = applyMiddleware(loggerMW);

//6. CREATE the store
const store = createStore(reducedReducers, appliedLoggerMW)

//SUBSCRIBE to the store
//may not need this with the redux logger & the redux dev tools

store.subscribe(() => {
	console.log('store changed ->', store.getState())
}) 

module.exports = { store };