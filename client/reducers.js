import { combineReducers } from 'redux-immutable'; 
import JazzDashReducer from './containers/state/reducers'

export default function createReducer(asyncReducers){
	return combineReducers({
		jazz: JazzDashReducer,
		...asyncReducers
	})
}