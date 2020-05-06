const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: String,
    password: String
})

module.exports = UserModel = mongoose.model('user',userSchema);
// module.exports = mongoose.model('user',userSchema);