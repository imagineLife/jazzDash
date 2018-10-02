const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const BeatCountSchemaa = mongoose.Schema({
	song: {type: Schema.Types.ObjectId, ref: 'Songs' },
	musician : {type: Schema.Types.ObjectId, ref: 'Musicians' },
	length: Number,
	count: Number
})

const beatCount = mongoose.model('BeatCount', BeatCountSchemaa);

module.exports = { beatCount };
