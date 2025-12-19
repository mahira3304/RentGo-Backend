const fileUploadToCloudinary=require('../config/fileUpload')
const Car = require('../models/Car')
const Booking=require('../models/Booking')
const Review = require('../models/review')


exports.adminAuth = (req, res) => {
    res.json({ ok: true ,role:"admin"})
}

exports.addCar =async (req,res)=>{
    try {
        const{name,seats,doors,luggage,transmission,brand,color,modelName,modelYear,manufactureYear,registrationNumber,pricePerDay,engine,type,mileage,fuelType,equipments,available,maintenance,description,damageNotes}=req.body
        const carImages = []
    if (Array.isArray(req.files.images)) {
        for (const file of req.files.images) {
            const uploaded = await fileUploadToCloudinary(file);
            carImages.push(uploaded.public_id);
        }
        } else if (req.files.images) {
        const uploaded = await fileUploadToCloudinary(req.files.images);
        carImages.push(uploaded.public_id);
        }

        console.log(carImages);

        await Car.create({
            id:Date.now(),
            name,
            brand,
            modelName,
            type,
            modelYear,
            manufactureYear,
            registrationNumber,
            pricePerDay,
            engine,
            mileage,
            seats,
            doors,
            luggage,
            transmission,
            fuelType,
            available,
            maintenance,
            description,
            damageNotes,
            equipments,
            color,
            images:carImages
        })
        console.log("car created!!")

        return res.json({success:true})
    } catch (error) {
        console.log("car creation failed!!")
        console.log(error)
    }
   

}


exports.editDetails = async (req,res)=>{
    try {
        const id = req.params.id
        const car = await Car.findById(id)
        return res.json({car:car,success:true})
    } catch (error) {
        console.log(error)
    }
}


exports.deleteCar = async(req,res)=>{
    try {
        const {id} = req.params
        await Car.deleteOne({id:id})
        console.log("deleted!!!!!!!!!")
        return res.json({success:true})
    } catch (error) {
        console.log(error)
    }
}


exports.viewReviews = async(req,res)=>{
    
    try {
        const reviews = await Review.find()
        
        return res.json({reviews:reviews,success:true})
    } catch (error) {
        console.log(error)
    }
}

exports.viewsingleReview = async(req,res)=>{
    
    try {
        const {id} = req.params
        const review = await Review.findOne({id:id})
        console.log(review)
        
        return res.json({review:review,success:true})
    } catch (error) {
        console.log(error)
    }
}


exports.deleteReview = async(req,res)=>{
    try {
        const {id} = req.params
        await Review.deleteOne({id:id})
        console.log("deleted!!!!!!!!!")
        return res.json({success:true})
    } catch (error) {
        console.log(error)
    }
}


exports.viewBookings = async(req,res)=>{
    try {
        const bookings = await Booking.find()
        return res.json({bookings:bookings,success:true})
    } catch (error) {
        console.log(error)
    }
}


exports.cancelBooking = async (req, res) => {
  try {
    const {bookingId} = req.params
    const booking = await Booking.findOne({id:bookingId})
    await Booking.updateOne({
        status:false
    })


    res.json({ success: true, booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};


exports.viewsingleBooking = async(req,res)=>{
    try {
        const {id} = req.params
        const booking = await Booking.findOne({id:id})
        console.log(booking)
        
        return res.json({booking:booking,success:true})
    } catch (error) {
        console.log(error)
    }
}



exports.adminDashboard = async(req,res)=>{
    try {
         const cars = await Car.find();
        const bookings = await Booking.find();

        return res.json({
        success: true,
        totalCars: cars.length,
        totalBookings: bookings.length,
        cars,
        bookings
        });
    } catch (error) {
        console.log(error)
    }
}