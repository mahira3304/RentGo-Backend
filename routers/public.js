const { viewCars, viewCarDetails } = require('../controllers/public')

const router = require('express').Router()

router
    .route('/cars')
    .get(viewCars)

router
    .route('/carDetails/:id')
    .get(viewCarDetails)

module.exports = router
   