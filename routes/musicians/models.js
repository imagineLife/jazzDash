cont mongoos = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const MusicianSchema = mongoose.Schema({
	first: String,
	last: String,
	instrument: String,
	dob: String
})

const Musician = mongoose.model('Musician', MusicianSchema);

module.exports = { Musician };
