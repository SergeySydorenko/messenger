const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{ 
    versionKey: false 
})

module.exports = User = mongoose.model('user', UserSchema);