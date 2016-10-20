const express = require ('express')
const router = express.Router()

router.use('/animal', require('./animal'))
router.use('/animalowners', require('./animalOwners'))
router.use('/client', require('./client'))
router.use('/clientdetails', require('./clientDetails'))

module.exports = router
