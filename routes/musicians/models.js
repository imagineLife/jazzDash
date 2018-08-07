const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const MusicianSchema = mongoose.Schema({
	first: String,
	last: String,
	instrument: String,
	dob: String
})

//model is singular, 'collections' is plural HMM!!
const Musician = mongoose.model('musician', MusicianSchema);

module.exports = { Musician };
