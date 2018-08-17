const express = require('express');
const router = express.Router();
const { RawData } = require('./models');
// const passport = require('passport');

//find stats by musician ID
router.get('/mus/:id', (req, res) => {
	RawData.find({_musician: req.params.id})
	.populate('noteLengths', 'length count')
	.populate('chordStats', 'chordName chordTones diatonicNCTs nonDiatonicNCTs totalNotes')
	.exec()
	.then(rawData => res.status(201).json(rawData))
	.catch(err => {
      console.error(err);
      res.status(500).json({error: 'RawData Get went wrong'});
    });
})

//find stats by song ID
router.get('/song/:id', (req, res) => {
	RawData.find({_song: req.params.id})
	.populate('noteLengths', 'length count')
	.populate('chordStats', 'chordName chordTones diatonicNCTs nonDiatonicNCTs totalNotes')
	.exec()
	.then(rawData => res.status(201).json(rawData))
	.catch(err => {
      console.error(err);
      res.status(500).json({error: 'RawData Get went wrong'});
    });
})

//default, find where song is 'if'
router.get('/default', (req, res) => {
	RawData.find({_song: "5b59a3a4e8aaa194e036155a"})
	.populate('noteLengths', 'length count')
	.populate('chordStats', 'chordName chordTones diatonicNCTs nonDiatonicNCTs totalNotes')
	.exec()
	.then(rawData => res.status(201).json(rawData))
	.catch(err => {
      console.error(err);
      res.status(500).json({error: 'RawData Get went wrong'});
    });
})

module.exports = router;