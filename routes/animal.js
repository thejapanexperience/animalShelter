const express = require('express');
const router = express.Router();

const Animal = require('../models/Animal')

router.route('/')
  .get((req, res) => {
    Animal.findAll()
    .then(animals => {
      res.send(animals)
    })
    .catch(err => {
      res.status(400).send(err)
    })
  })

  .post((req, res) => {
    console.log('in .post');
    console.log('req.body: ', req.body)
    Animal.create(req.body.animal)
    // Passing fuction from model into .then Allows us to get all the data then send that instead of just the one.
    .then (Animal.findAll)
    .then (animals => {
      console.log('in .post after findAll');
      console.log('animals: ', animals)
      res.send(animals)
    })
    .catch(err => {
      res.status(400).send(err)
    })
  })

  router.route('/:id')
    .put((req,res) => {
      Animal.update(req.params.id, req.body)
      .then (Animal.findAll)
      .then (animals => {
        res.send(animals)
      })
      .catch(err => {
        res.status(400).send(err)
      })
      .catch(err => {
        res.status(400).send(err)
      })
    })

module.exports = router;
