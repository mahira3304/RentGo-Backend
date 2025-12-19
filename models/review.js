const { default: mongoose } = require("mongoose");

const reviewSchema = mongoose.Schema({
    id:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    ratings:{
        type:String
    },
    review:{
        type:String
    },
    date:{
        type:String
    }
})
module.exports = mongoose.model('Review',reviewSchema)