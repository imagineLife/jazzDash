const express = require('express');
const router = express.Router();
const { Song } = require('./models');
const { Musician } = require('../musicians/models');

//Get SOng with populated musicians ID array
router.get('/', (req, res) => {
    Song
    .findOne()

    //.populate (THIS schema (song) key 'lowercase musicians')
    //similar to musicians.first
    //not to be confused with 'Musicians' first
    .populate('musicians', 'first')
    .exec()
    .then(songRes => res.status(201).json(songRes))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
  }
);

module.exports = router;