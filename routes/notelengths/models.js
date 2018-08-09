const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const NoteLengthSchema = mongoose.Schema({
	_song: {type: Schema.Types.ObjectId, ref: 'Songs' },
	_artist : {type: Schema.Types.ObjectId, ref: 'Musicians' },
	length: Number,
	count: Number
})

const NoteLength = mongoose.model('notelength', NoteLengthSchema);

module.exports = { NoteLength };
