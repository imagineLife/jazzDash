import * as jazzDashConst from './constants';

const dashDataReducer = (state={}, action) => {
	console.log('inside dashDataReducer')
	
	switch(action.type){
		case jazzDashConst.FETCH_DATA :
			console.log('fetching dashboard data by reducer...')
			return state = { ...state, jazzData: action.payload }
			//return alleviates break
	}
	return state;
}

export default dashDataReducer;