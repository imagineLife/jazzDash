const express = require('express');
const router = express.Router();
const { beatCount } = require('./models');
const { Musician } = require('../musicians/models');

//Get SOng with populated musicians ID array
router.get('/', (req, res) => {
    beatCount
    .find()

    // .populate (THIS schema (song) key 'lowercase musicians')
    //similar to musicians.first
    //not to be confused with 'Musicians' first
    .populate('song', 'title')
    .populate('musician', 'first')
    .exec()
    .then(beatCountRes => res.status(201).json(beatCountRes))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
  }
);

module.exports = router;