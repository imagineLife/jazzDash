//4. import the fetch string from constants
import { FETCH_DATA } from './constants'
import { serverURL } from '../../../config'

//build the fetch fn/action
//1. fn accepting dispatch as param
export const fetchStats = (dispatch) => {

	fetch(`${serverURL}/rawData/default`, {
		method: 'GET'
	})
	.then(res => { 
	//dispatch after json 
	//HOLY NESTED THEN THEN
		res.json()
		.then( res => dispatch({type:FETCH_DATA, payload:res}) )
	})
	.catch(err => {
		const {code} = err;
		if (code === 401) {
			console.log(code);
		}
	})

}