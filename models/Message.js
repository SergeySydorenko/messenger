const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'chat'
    }
},
{ 
    versionKey: false 
})

module.exports = Message = mongoose.model('message', MessageSchema);