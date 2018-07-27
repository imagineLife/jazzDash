const express = require('express');
const router = express.Router();
const { NoteCountsByType } = require('./models');

//Get NoteCountsByTypes
router.get('/', (req, res) => {
    NoteCountsByType
    .findOne()
    .populate('_musician')
    .exec()
    .then(ncbt => res.status(201).json(ncbt))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
  }
);

module.exports = router;