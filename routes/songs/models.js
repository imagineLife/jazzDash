const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const SongSchema = mongoose.Schema({
	title: String,
	musicians : [ {type: Schema.Types.ObjectId, ref: 'Musician' }],
	album: String,
	dateRecorded : Date
})

const Song = mongoose.model('Song', SongSchema);

module.exports = { Song };
