const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile: String,
    mac_address: {
        type: String,
        required: true
    },
    prn: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    yearOfStudy: String,
    branch: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    entries: {
        type: [],
        default: []
    }
});

module.exports = Mongoose.model('User', UserSchema);