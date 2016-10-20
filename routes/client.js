const express = require('express');
const router = express.Router();

const Client = require('../models/Client')

router.route('/')
  .get((req, res) => {
    Client.findAll()
    .then(clients => {
      res.send(clients)
    })
    .catch(err => {
      res.status(400).send(err)
    })
  })

  .post((req, res) => {
    console.log('client in .post');
    console.log('client req.body: ', req.body)
    Client.create(req.body.client)
    // Passing fuction from model into .then Allows us to get all the data then send that instead of just the one.
    .then (Client.findAll)
    .then (clients => {
      console.log('client in .post after findAll');
      console.log('clients: ', clients)
      res.send(clients)
    })
    .catch(err => {
      res.status(400).send(err)
    })
  })

  router.route('/:id')
    .put((req,res) => {
      Client.update(req.params.id, req.body)
      .then (Client.findAll)
      .then (clients => {
        res.send(clients)
      })
      .catch(err => {
        res.status(400).send(err)
      })
      .catch(err => {
        res.status(400).send(err)
      })
    })

module.exports = router;
