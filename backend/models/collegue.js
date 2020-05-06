const mongoose = require('mongoose');

let collegueSchema = mongoose.Schema({
    name: String,
    position: String,
    number: String,
    phoneNumber: String,
    address: String,
    isShow: String
})

module.exports = CollegueModel = mongoose.model('collegue',collegueSchema);
// module.exports = mongoose.model('user',userSchema);