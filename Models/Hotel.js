var mongoose = require('mongoose');

var hotelSchema = mongoose.Schema({
    name:String,
    rating:Number
})

module.exports = mongoose.model("hotels",hotelSchema)
