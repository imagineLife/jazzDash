const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const SongChartSchema = mongoose.Schema({
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
	totalsByNoteName: [
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
	],
	totalsByNoteLength:[
		{
			length: Number,
			count: Number
		},
		{
			length: Number,
			count: Number
		},
		{
			length: Number,
			count: Number
		},
		{
			length: Number,
			count: Number
		},
		{
			length: Number,
			count: Number
		},
		{
			length: Number,
			count: Number
		},
		{
			length: Number,
			count: Number
		},
		{
			length: Number,
			count: Number
		},
		{
			length: Number,
			count: Number
		},
		{
			length: Number,
			count: Number
		},
		{
			length: Number,
			count: Number
		},
		{
			length: Number,
			count: Number
		},
		{
			length: Number,
			count: Number
		},			
		{
			length: Number,
			count: Number
		},		
		{
			length: Number,
			count: Number
		},		
	]
})

const SongChart = mongoose.model('SongChart', SongChartSchema);

module.exports = { SongChart };
