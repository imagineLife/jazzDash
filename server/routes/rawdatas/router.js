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
	.then(rawData => res.status(200).json(rawData))
	.catch(err => {
      console.error(err);
      res.status(500).json({error: 'RawData Get went wrong'});
    });
})

//find stats by song ID
router.get('/song/:id', (req, res) => {

	//will need to.. 
	//get songID.then()
	//get RawDataIDs where songID = songID.then()
	//get RawDatas by those IDs.then()

	RawData.find({_song: req.params.id})
	.populate('noteLengths', 'length count')
	.populate('chordStats', 'chordName chordTones diatonicNCTs nonDiatonicNCTs totalNotes')
	.exec()
	.then(rawData => res.status(200).json(rawData))
	.catch(err => {
      console.error(err);
      res.status(500).json({error: 'RawData Get went wrong'});
    });
})

//default, find where song is 'if'
router.get('/default', (req, res) => {
	RawData.find({
    	'_id': { $in: ['5b69712ebecd53905d3ee1f5','5b70868f687ffb3971a867fb']}
	})
	.populate('noteLengths', 'length count')
	.populate('noteIntervals', 'chord count interval')
	.populate('beatCounts', 'count beat')
	.populate('_musician', 'first last')
	.populate('chordStats', 'chordName chordTones diatonicNCTs nonDiatonicNCTs totalNotes')
	.populate('_song', 'title album')
	.exec()
	.then(rawData => res.status(200).json(rawData))
	.catch(err => {
      console.error(err);
      res.status(500).json({error: 'RawData Get went wrong'});
    });
})

module.exports = router;