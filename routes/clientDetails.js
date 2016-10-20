const express = require('express');
const router = express.Router();

const ClientDetails = require('../models/ClientDetails')

router.route('/:id')
  .get((req, res) => {
    console.log('req.params.id: ', req.params.id)
    ClientDetails.findDetails(req.params.id)
    .then(clients => {
      res.send(clients)
    })
    .catch(err => {
      res.status(400).send(err)
    })
  })
module.exports = router;
