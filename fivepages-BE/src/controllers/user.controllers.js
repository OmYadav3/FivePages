import { validationResult } from "express-validator";
import User from "../models/user.models.js";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    await user.save({ validateBeforeSave: false }); //because we are not providing password which is a required field in user schema

    return accessToken;
  } catch (error) {
    return null;
  }
}

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name } = req.body;

  const existedUser = await User.findOne({
    email
  })

  if (existedUser) {
    return res.status(409).json({ "message": "User with email or username already exists" });
  }

  const newUser = await User.create({
    name,
    email,
    password
  });

  const user = await User.findById(newUser._id).select('-password');

  res.status(200).json({ message: 'User registered successfully', user });
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist!" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const accessToken = await generateAccessToken(user._id);

    if (!accessToken) {
      return res.status(500).json({ message: "Could not generate access token" });
    }

    const loggedInUser = await User.findById(user._id).select("-password");

    // Cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
    
    };

    console.log(accessToken)
    return res
      .status(200)
      .cookie("accessToken", accessToken, options) // ✅ cookie, not cookies
      .json({
        user: loggedInUser,
        accessToken,
        message: "User logged in successfully!"
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json({ "message": "User logged out!" });
}

//done and tested
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user._id;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ "message": "oldPassword and newPassword are required" });
  }
  if (oldPassword === newPassword) {
    return res.status(400).json({ "message": "New password should be different from current password" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ "message": "User not found" });
  }

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    return res.status(400).json({ "message": "Incorrect Password" });
  }

  try {
    user.password = newPassword;
    await user.save();

    return res.status(200).json({ "message": "Password updated successfully!"});
  } catch (error) {
    return res.status(500).json({ "message": error.message });
  }
}

export const updateUserBasicInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).json({ message: 'Name or email is required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
      message: 'User information updated successfully',
      user: {
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Failed to update user information' });
  }
};


// @desc    Get user profile
// @route   GET /api/getUser
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('name email profilePic');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
};

// forget Password 
// export const forgetPassword = async (req, res) => {

//   const { email } = req.body

//   if(!email){
//     return res.status(404).json({message: "Email is required"})
//   }

//    const user = await User.findOne({email});

//    if (!user) {
//     return res.status(404).json({ message: "User does not exist"})
//    } 




// }