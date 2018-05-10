const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const { Schema } = mongoose;
 
const userSchema = new Schema(
    {
        _id: { type: String, default: uuidv4 },
        sessionId: String,
        userName: {type: String, required: true},
        hashedPassword: {type: String, required: true},
        petId: String,
        newUser: Boolean
});

var User = mongoose.model('User', userSchema);
 
module.exports = User;