const express = require('express');
const router = express.Router();
const { Musician } = require('./models');

//Get Musician with populated musicians ID array
router.get('/', (req, res) => {
    Musician
    .findOne()
    .exec()
    .then(MusicianRes => res.status(201).json(MusicianRes))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
  }
);

module.exports = router;