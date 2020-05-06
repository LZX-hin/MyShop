const mongoose = require('mongoose');

let timeDataSchema = mongoose.Schema({
    name: String,
    number: String,
    event: String,
    addTime: String,
    isShow: String
})
module.exports = timeDataModel = mongoose.model('timeData',timeDataSchema);