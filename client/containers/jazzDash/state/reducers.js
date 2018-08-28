import * as jazzDashConst from './constants';

/*
	Writing in this manner allows reacts 'this'
writing function(data) would make 'this' reference this function
fat-arrow makes 'this' reference the place the fn was called from
	
	object for more random data-using, as oppoesd to array for linear  looping 

	key  = chart1

*/

const parseData = function(data){
	let readyData = data.map((d, i) => {
		// console.log('parseData MAPPING data i')
		// console.log(i)
		// console.log('d')
		// console.log(d)
		// console.log('- - - -')
		return {
			musician: d._musician,
			song: d._song,
			noteTypesByPercentage: {
				CTs: d.CTs,
				NCTs: d.NCTs,
				DNCTs: d.totalDiatonicNCTs,
				NDNCTs: d.totalNonDiatonicNCTs
			},
			perMeasure: {
				npm: ( d.noteCount / d.totalMeasuresPlayed),
				measures: d.totalMeasuresPlayed,
				nonEmptyMeasures: d.nonEmptyMeasures,
				CTpm: ( d.CTs / d.totalMeasuresPlayed),
				NCTpm: ( d.NCTs / d.totalMeasuresPlayed)
			},
			totalDirections:{
				ups: d.upsMoved,
				downs: d.downsTraveled,
				unis: d.unisonsTraveled
			},
			chordStats: d.chordStats,
			noteLengthCounts: d.noteLengths,
			totalsByNoteName: d.totalsByNoteName
		};
	})

	console.log('REDUCER readyData is')
	console.log(readyData)
	return readyData;

}

const dashDataReducer = (state={}, action) => {
	console.log('inside dashDataReducer')
	
	switch(action.type){
		case jazzDashConst.FETCH_DATA :
			// console.log('fetching dashboard data by reducer...')
			
			//call the fn
			const parsedData = parseData(action.payload)


/*
	static data in one-object
	editing data in unique object
		like updating socket weather app or something
*/
			return state = { ...state, jazzData: parsedData, unparsed: action.payload }
				//return alleviates 'break'
	}
	return state;
}

export default dashDataReducer;