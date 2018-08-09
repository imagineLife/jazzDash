const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const ChordStatSchema = mongoose.Schema({
	_song: {type: Schema.Types.ObjectId, ref: 'Songs'},
	_artist: {type: Schema.Types.ObjectId, ref: 'Musicians'},
	chordName: String,
	totalNotes: Number,
	chordTones: Number,
	diatonictNCTs: Number,
	nonDiatonictNCTs: Number
})

//model is singular, 'collections' is plural HMM!!
const chordStat = mongoose.model('ChordStat', ChordStatSchema);

module.exports = { chordStat };