const express = require('express')
const db =  require('../../db');
const Toy = require('../../db/models/toy');

const router = express.Router();

//sends an array of schools, to be put in a drop down select component
router.get('/', (req, res, next) => {
  Toy.findAll({})
  .then(toys => res.send(toys));
});

router.get('/:toyId', (req, res, next) => {
  Toy.findById(req.params.toyId)
  .then(toy => res.send(toy));
});

module.exports = router;
