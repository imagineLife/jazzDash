const express = require('express');
const router = express.Router();
const { RawData } = require('./models');
// const passport = require('passport');

router.get('/', (req, res) => {
	RawData.find()
	.populate('noteLengths', 'length count')
	.populate('chordStats', 'chordName chordTones diatonicNCTs nonDiatonicNCTs totalNotes')
	.exec()
	.then(rawData => {
		return res.status(201).json(rawData)
	})
	.catch(err => {
      console.error(err);
      res.status(500).json({error: 'RawData Get went wrong'});
    });
})

module.exports = router;