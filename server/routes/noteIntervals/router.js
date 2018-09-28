const express = require('express');
const router = express.Router();
const { noteInterval } = require('./models');
const { Musician } = require('../musicians/models');

//Get SOng with populated musicians ID array
router.get('/', (req, res) => {
    noteInterval
    .find()
    .populate('song', 'title')
    .populate('musician', 'first')
    .exec()
    .then(noteIntRes => {
      return res.status(201).json(noteIntRes)
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
  }
);

module.exports = router;