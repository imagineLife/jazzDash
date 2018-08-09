const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const NoteLengthSchema = mongoose.Schema({
	_song: {type: Schema.Types.ObjectId, ref: 'Songs' },
	_artist : {type: Schema.Types.ObjectId, ref: 'Musicians' },
	length: Number,
	count: Number
})

const noteLength = mongoose.model('NoteLength', NoteLengthSchema);

module.exports = { noteLength };
