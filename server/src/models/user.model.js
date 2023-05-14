const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Encrypt password
userSchema.pre('save', async function(next) {
    let salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// Comparing entered password
userSchema.methods.isPasswordMatched = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


const User = mongoose.model('User', userSchema);

module.exports = User;