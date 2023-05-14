const User = require('../models/user.model');

const createUser = async (req, res) => {
    const {email} = req.body;
    const findUser = await User.findOne({email: email});
    if(!findUser) {
        const newUser = await User.create(req.body);
        return res.status(201).send(newUser);
    }
    else {
        return res.send({ message: 'User already exists'});
    }
}

module.exports = {
    createUser
}