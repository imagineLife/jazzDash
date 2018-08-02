const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const SongChartSchema = mongoose.Schema({
	_song: String,
	noteTypesByPercentage: ,
	notesPerMeasure: ,
	chordTonesPerMeasure: ,
	nonChordTonesPerMeasure: ,
	totalUpsAndDowns: ,	
	totalNotesPlayed: ,
	totalCTsPlayed: ,
	totalNCTsPlayed: ,			
	totalDiatonicNCTsPlayed: ,
	totalNonDiatonicNCTsPlayed: ,
	totalsByNoteName: ,
	totalTriadicNotes: ,
	totalEights: ,
	totalQuarters: ,
	totalTriplets: ,
	totalHalfs: ,
	totalLongerThanHalf: ,
	totalLongerThanHalf: ,
	totalLongerThanHalf: ,
	totalLongerThanHalf: ,
	totalLongerThanHalf: ,
	totalLongerThanHalf: ,





})

const SongChart = mongoose.model('SongChart', SongChartSchema);

module.exports = { SongChart };
