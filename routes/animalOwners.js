const express = require('express');
const router = express.Router();

const AnimalOwners = require('../models/AnimalOwners')

router.route('/')
  .get((req, res) => {
    AnimalOwners.findAllOwners()
    .then(animals => {
      res.send(animals)
    })
    .catch(err => {
      res.status(400).send(err)
    })
  })

module.exports = router;
