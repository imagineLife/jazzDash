const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const MusicianSchema = mongoose.Schema({
	first: String,
	last: String,
	instrument: String,
	dob: String
})

MusicianSchema.virtual('fullName').get(function() {
  return `${this.first} ${this.last}`.trim();
});

const Musician = mongoose.model('Musician', MusicianSchema);

module.exports = { Musician };
