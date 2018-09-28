const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const NoteIntervalSchema = mongoose.Schema({
	count : Number,
	interval : String,
	chord: String,
	song: {type: Schema.Types.ObjectId, ref: 'Songs' },
	musician : {type: Schema.Types.ObjectId, ref: 'Musicians' },
})

const noteInterval = mongoose.model('NoteInterval', NoteIntervalSchema);

module.exports = { noteInterval };
