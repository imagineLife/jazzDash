import * as jazzDashConst from './constants';

/*
	Writing in this manner allows reacts 'this'
writing function(data) would make 'this' reference this function
fat-arrow makes 'this' reference the place the fn was called from
object for more random data-using, as opposed to array for linear  looping 

*/

const parseData = function(data){
	let readyData = data.map((d, i) => {
		return {
			musician: `${d._musician.first} ${d._musician.last}`,
			song: d._song,
			noteTypesByPercentage: {
				musician: `${d._musician.first} ${d._musician.last}`,
				song: d._song,
				CTs: d.CTs,
				NCTs: d.NCTs,
				DNCTs: d.totalDiatonicNCTs,
				NDNCTs: d.totalNonDiatonicNCTs,
				type: 'pie'
			},
			perMeasure: {
				musician: `${d._musician.first} ${d._musician.last}`,
				song: d._song,
				notes: d.noteCount,
				measures: d.totalMeasuresPlayed,
				nonEmptyMeasures: d.nonEmptyMeasures,
				CTs: d.CTs,
				NCTs: d.NCTs,
				type: 'line',
			},
			totalDirections:{
				musician: `${d._musician.first} ${d._musician.last}`,
				song: d._song,
				ups: d.upsMoved,
				downs: d.downsTraveled,
				unis: d.unisonsTraveled,
				type: 'line',
				grWidth: '6'
			},
			chordStats: {
				musician: `${d._musician.first} ${d._musician.last}`,
				song: d._song,
				...d.chordStats
			},
			noteLengthCounts: {
				musician: `${d._musician.first} ${d._musician.last}`,
				song: d._song,
				grWidth:'6',
				...d.noteLengths
			},
			totalsByNoteName: {
				musician: `${d._musician.first} ${d._musician.last}`,
				song: d._song,
				grWidth:'12',
				...d.totalsByNoteName,

			}	
		};
	})

	let reVampedObj = {};

	readyData.forEach((musicianData, ind) => {

		//get chart-name keys from previous object
		let charKeys = Object.keys(musicianData)

		//iterate through each chart by chart-name
		charKeys.map(chKey => {
			if(chKey !== 'musician' && chKey !== 'song'){
		
		//get chart-data by chart name
				let thisObj = {...musicianData[chKey] }
				
		//if this chart name/data is NOT present in reVamped Arr, add it
				if(!reVampedObj[chKey]){
					reVampedObj[chKey]= []
					reVampedObj[chKey].push(thisObj)
		//else add it to the already-present element,
		// as a 2nd object under the same chart-name keyy
				}else{
					reVampedObj[chKey].push(thisObj)
				}
			}
		})
		return reVampedObj;
	})

	let musicianOne = `${data[0]._musician.first} ${data[0]._musician.last}`
	let musicianTwo = `${data[1]._musician.first} ${data[1]._musician.last}`
	let thisAlbum = `${data[1]._song.album}`
	
	reVampedObj['musicians'] = [musicianOne, musicianTwo];
	reVampedObj['album'] = thisAlbum;
	// return readyData;
	return reVampedObj;
}

const dashDataReducer = (state={}, action) => {
	
	switch(action.type){
		case jazzDashConst.FETCH_DATA :
			//covert the data in chartable-objects
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