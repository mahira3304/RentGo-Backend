const { default: mongoose } = require('mongoose')

const bookingSchema = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    carName: {
        type: String
    },
    Model: {
        type: String
    },
    Year: {
        type: String
    },
    registrationNumber: {
        type: String
    },
    pickupDate: {
        type: String
    },
    pickupTime: {
        type: String
    },
    returnDate: {
        type: String
    },
    returnTime: {
        type: String
    },
    license: {
        type: String
    },
    licenseImg: {
        type: String
    },
    adhaar: {
        type: String
    },
    adhaarImage: {
        type: String
    },
    payment: {
        type: String,
        default: 'pending'
    },
    totalPrice : {
        type:Number
    },
    status:{
        type:Boolean,
        default:true
    }

}
)
module.exports = mongoose.model('Booking', bookingSchema)