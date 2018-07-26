const express = require('express');
const router = express.Router();
const { Song } = require('./models');

//Get SOng with populated musicians ID array
router.get('/', (req, res) => {
    Song
    .findOne()
    .populate('musicians')
    .exec()
    .then(songRes => res.status(201).json(songRes))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
  }
);

module.exports = router;