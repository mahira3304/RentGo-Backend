// import express from "express";

// import { adminAuth, addCar } from "../controllers/admin.js";
const { adminAuth, addCars, addCar, deleteCar, editDetails, viewReviews, viewsingleReview, deleteReview, viewCarDetails, viewBookings, cancelBooking, viewsingleBooking } = require('../controllers/admin')

const router = require('express').Router();

// router
//   .route("/check")
//   .get(adminAuth);

router
    .route('/addcar')
    .post(addCar)

router
    .route('/editdetails/:id')
    .get(editDetails)
    
router
    .route('/deletecar/:id')
    .post(deleteCar)

router
    .route('/reviews')
    .get(viewReviews)

router
    .route('/viewreviews/:id')
    .get(viewsingleReview)

router
    .route('/deletereview/:id')
    .post(deleteReview)

router
    .route('/bookings')
    .get(viewBookings)

router
    .route('/cancel-booking/:id')
    .post(cancelBooking)

router
    .route('/viewbooking/:id')
    .get(viewsingleBooking)

module.exports = router
