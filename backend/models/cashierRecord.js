const mongoose = require('mongoose');

let cashierRecordSchema = mongoose.Schema({
    addTime: String,
    totalCount: Number,
    totalCashier: Number,
    goodsList: String,
    operator: String,
    payWay: String
})

module.exports = cashierRecordModel = mongoose.model('cashierRecord',cashierRecordSchema);