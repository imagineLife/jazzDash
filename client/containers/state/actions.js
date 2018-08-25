//4. import the fetch string from constants
import { FETCH_DATA } from './constants'

//build the fetch fn/action
//1. fn accepting dispatch as param
export const fetchStats = (dispatch) => {

	fetch(`http://localhost:8080/api/rawData/default`, {
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