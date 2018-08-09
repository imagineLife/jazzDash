const express = require('express');
const router = express.Router();
const { ChordStat } = require('./models');

router.get('/', (req, res) => {
	ChordStat.findOne()
	.exec()
	.then(stat => {
		console.log('chordStat res')
		console.log(stat)
		console.log('- - - -')
		return res.status(201).json(stat)
	})
	.catch(err => {
      console.error(err);
      res.status(500).json({error: 'ChordStat went Wrong... '});
    });
})

module.exports = router;