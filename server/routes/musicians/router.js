const express = require('express');
const router = express.Router();
const { Musician } = require('./models');

//Get by ID
router.get('/:id', (req, res) => {
    Musician
    .findById(req.params.id)
    .exec()
    .then(MusicianRes => res.status(201).json(MusicianRes))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
  }
);

//Get Musician with populated musicians ID array
router.get('/', (req, res) => {
    Musician
    .find()
    .exec()
    .then(MusicianRes => res.status(201).json(MusicianRes))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
  }
);

module.exports = router;