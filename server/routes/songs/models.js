const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const SongSchema = mongoose.Schema({
	title: String,
	musicians : [ {type: Schema.Types.ObjectId, ref: 'Musicians' }],
	album: String
})

const Song = mongoose.model('Songs', SongSchema);

module.exports = { Song };
