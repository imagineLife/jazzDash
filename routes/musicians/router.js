const express = require('express');
const router = express.Router();
const { Musician } = require('./models');
// const passport = require('passport');

const musiciansRouter = require('./routes/musicians/router');

router.get('/musicians', (req, res) => {
	Musician.find()
	.exec()
	.then(res => res.status(201).json(res))
	.catch(err => {
      console.error(err);
      res.status(500).json({error: 'Musician Get went wrong'});
    });
})

module.exports = router;