const express = require('express');
const router = express.Router();
const { NoteLength } = require('./models');
const { Musician } = require('../musicians/models');

//Get SOng with populated musicians ID array
router.get('/', (req, res) => {
    NoteLength
    .findOne()

    // .populate (THIS schema (song) key 'lowercase musicians')
    //similar to musicians.first
    //not to be confused with 'Musicians' first
    .populate('_song', 'title')
    .populate('_artist', 'first')
    .exec()
    .then(noteLengthRes => res.status(201).json(noteLengthRes))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
  }
);

module.exports = router;