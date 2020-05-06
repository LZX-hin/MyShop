const mongoose = require('mongoose');

let goodsSchema = mongoose.Schema({
    name: String,
    number: String,
    price: String,
    count: String,
    cate: String,
    time: Date,
    img: String
})

module.exports = goodsModel = mongoose.model('goods',goodsSchema);