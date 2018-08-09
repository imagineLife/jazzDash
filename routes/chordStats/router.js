const express = require('express');
const router = express.Router();
const { chordStat } = require('./models');

router.get('/', (req, res) => {
	chordStat.find()
	.exec()
	.then(stat => res.status(201).json(stat) )
	.catch(err => {
      console.error(err);
      res.status(500).json({error: 'ChordStat went Wrong... '});
    });
})

module.exports = router;