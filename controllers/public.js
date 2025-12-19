const Car = require('../models/Car')

exports.viewCars = async (req,res)=>{
    try {
       const car = await Car.find()
       return res.json({cars:car,success:true})     
    } catch (error) {
        console.log(error)
    }
}

exports.viewCarDetails = async (req,res)=>{
    try {
        const id = req.params.id
        const car = await Car.find({id:id})
        return res.json({car:car,success:true})
    } catch (error) {
        console.log(error)
    }
}