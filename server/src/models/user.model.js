const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        first_name : {type: String, required: true},
        last_name : {type: String, required: true},
        email : {type: String, required: true, unique: true},
        mobile : {type: Number, required: true, unique: true},
        password : {type: String, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;