const express = require('express');
const router = express.Router();
const { Musician } = require('./models');
// const passport = require('passport');

router.get('/', (req, res) => {
	Musician.find()
	.exec()
	.then(musicians => {
		return res.status(201).json(musicians)
	})
	.catch(err => {
      console.error(err);
      res.status(500).json({error: 'Musician Get went wrong'});
    });
})

module.exports = router;