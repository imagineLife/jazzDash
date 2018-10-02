const express = require('express');
const router = express.Router();
const { beatCount } = require('./models');
const { Musician } = require('../musicians/models');

router.get('/', (req, res) => {
    beatCount
    .find()
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