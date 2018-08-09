const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const RawDataScheme = mongoose.Schema({
	_musician: String,
	_song: String,
	totalDiatonicNCTs: Number,
	totalNondiatonicNCT: Number,
	CTs: Number,
	NCTs: Number,
	noteCount: Number,
	totalMeasuresPlayed: Number,
	nonEmptyMeasures: Number,
	upsMoved: Number,
	downsTraveled: Number,
	unisonsTraveled: Number,
	triadNotes: Number,
	totalsByNoteName: {
		A: Number,
		Bb: Number,
		B: Number,
		C: Number,
		Db: Number,
		D: Number,
		Eb: Number,
		E: Number,
		F: Number,
		Gb: Number,
		G: Number,
		Ab: Number
	},
	noteLengths: [ {type: Schema.Types.ObjectId, ref: 'NoteLength' } ]
})

const RawData = mongoose.model('rawdata', RawDataScheme);

module.exports = { RawData };
