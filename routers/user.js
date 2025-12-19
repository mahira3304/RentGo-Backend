import express from "express";
import { userAuth, getUserProfile, updateUserProfile, submitreview, getcardetailbooking, submitUserBooking, viewuserBookings } from '../controllers/user.js';



const router = express.Router()

// router
//     .route('/check')
//     .get(userAuth)

router
    .route("/profile")
    .get(getUserProfile)

router
    .route("/profile")
    .post(updateUserProfile)
// router
//     .route("/delete/:id")
//     .post(deleteUser)


// module.exports = router;


router
    .route('/submitreview')
    .post(submitreview)

router
    .route('/booking/:id')
    .get(getcardetailbooking)
    .post(submitUserBooking)

router
    .route('/bookings')
    .get(viewuserBookings)


export default router

   