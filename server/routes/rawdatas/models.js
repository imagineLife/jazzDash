const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const RawDataScheme = mongoose.Schema({
	_musician: {type: Schema.Types.ObjectId, ref: 'Musicians' },
	_song: {type: Schema.Types.ObjectId, ref: 'Songs' },
	// _song: String,
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
	noteLengths: [ {type: Schema.Types.ObjectId, ref: 'NoteLength' } ],
	noteIntervals: [ {type: Schema.Types.ObjectId, ref: 'NoteInterval' } ],
	beatCounts: [ {type: Schema.Types.ObjectId, ref: 'BeatCount' } ],
	chordStats: [ {type: Schema.Types.ObjectId, ref: 'ChordStat' } ]
})

const RawData = mongoose.model('rawdata', RawDataScheme);

module.exports = { RawData };
