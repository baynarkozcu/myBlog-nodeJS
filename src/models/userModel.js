const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    }
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);


module.exports = User;