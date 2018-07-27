const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const NCBTSchema = mongoose.Schema({
	chartTitle: String,
	_song: { type: Schema.Types.ObjectId, ref: 'Song' },
	Values: []
})

const NoteCountsByType = mongoose.model('NoteCountsByType', NCBTSchema);

module.exports = { NoteCountsByType };
