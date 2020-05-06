const mongoose = require('mongoose');

let turnoverSchema = mongoose.Schema({
    name: String,
    number: String,
    price: String,
    count: String,
    cartCount: Number,
    addTime: String,
})

module.exports = turnoverModel = mongoose.model('turnover',turnoverSchema);