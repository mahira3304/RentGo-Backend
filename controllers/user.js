import User from "../models/User.js";
// import User from"../models/User"
import { v2 as cloudinary } from "cloudinary";
// const User = require("../models/User");
// const cloudinary = require("cloudinary").v2;
// const Review = require('../models/review')
import Review from "../models/review.js";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js"


export const userAuth = (req, res) => { 
  res.json({ ok: true, role: "user" });
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false });
    return res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    if (req.files) {
      if (req.files.profilePhoto) updateData.profilePhoto = req.files.profilePhoto.tempFilePath;
      if (req.files.drivingLiscenceImg) updateData.drivingLiscenceImg = req.files.drivingLiscenceImg.tempFilePath;
      if (req.files.AadharImage) updateData.AadharImage = req.files.AadharImage.tempFilePath;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    console.log(updatedUser)
    return res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const submitreview = async(req,res)=>{
  console.log(req.body)

// exports.submitreview = async(req,res)=>{
  try {
    const {rating,review} = req.body
    const username = await User.findOne({email:req.user.email})
    await Review.create({
      id:Date.now(),
      name:username.name,
      email:username.email,
      review:review,
      ratings:rating,
      date:Date.now()
    })
    console.log('review created!!')
    return res.json({success:true})
  } catch (error) {
    console.log(error)
  }
  
}

export const getcardetailbooking = async (req,res)=>{
  try {
    const {id} = req.params
    console.log(id)
    const car = await Car.findOne({id:id})
    console.log(id)
    return res.json({success:true,car:car})
  } catch (error) {
    console.log(error)
  }
  
}


export const submitUserBooking = async (req,res)=>{
  try {
    const {id} = req.params
    const {pickupDate,pickupTime,returnDate,returnTime,payment,price} = req.body

    const car = await Car.findOne({id:id})
    const user = await User.findOne({email:req.user.email})

    const booking = await Booking.create({
      id:Date.now(),
      name:user?.name,
      phoneNumber:user?.phoneNumber,
      email:user?.email,
      carName:car?.name,
      Model:car?.modelName,
      Year:car?.modelYear,
      registrationNumber:car?.registrationNumber,
      pickupDate:pickupDate,
      pickupTime:pickupTime,
      returnDate:returnDate,
      returnTime:returnTime,
      license:user?.drivingLiscenceNumber,
      adhaar:user?.AadharNumber,
      adhaarImage:user?.AadharImage,
      payment:payment,
      totalPrice:price,
      licenseImg:user?.drivingLiscenceImg
    })

    return res.json({success: true,booking:booking});
  } catch (error) {
    console.log(error)
  }
  
}


export const viewuserBookings = async(req,res)=>{
    
    try {
        const user = req.user.email
        const bookings = await Booking.findOne({email:user})
        console.log(bookings)
        
        return res.json({bookings:bookings,success:true})
    } catch (error) {
        console.log(error)
    }
}

// export const deleteUser = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     await User.deleteOne({ _id: id });

//     return res.status(200).json({ success: true, message: "User deleted successfully", user });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     return res.status(500).json({ success: false, message: "Server error. Could not delete user." });
//   }
// };

