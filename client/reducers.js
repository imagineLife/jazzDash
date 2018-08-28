import { combineReducers } from 'redux-immutable'; 
import JazzDashReducer from './containers/jazzDash/state/reducers'

export default function createReducer(asyncReducers){
	return combineReducers({
		jazz: JazzDashReducer,
		...asyncReducers
	})
}