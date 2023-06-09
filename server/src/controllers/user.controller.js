const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const {generateToken} = require("../config/jwtToken");

const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    return res.status(201).send(newUser);
  } else {
   throw new Error('User already exists');
  }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user already exists
    let user = await User.findOne({ email: email}); 
    if(user && await user.isPasswordMatched(password)) {
        const {_id, first_name, last_name, email, mobile, role} = user;
        return res.status(200).send({
            first_name,
            last_name,
            email,
            mobile,
            role,
            token: generateToken(_id)
        });
    }
    else{
        throw new Error('Invalid Credentials');
    }
})

module.exports = {
  createUser,
  loginUser,
};
