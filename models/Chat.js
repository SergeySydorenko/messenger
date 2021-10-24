const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new mongoose.Schema({
    users: [Schema.Types.ObjectId],
    title: {
        type: String,
        required: true
    }
},
{ 
    versionKey: false
})

module.exports = Chat = mongoose.model('chat', ChatSchema);