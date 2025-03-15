import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

dotenv.config();
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Register User & Auto Login
export const registerUser = async (req, res) => {
  try {
    const { phone_no, type } = req.body;
    let user = await User.findOne({ phone_no });

    if (user) return res.status(400).json({ message: "Phone number already registered." });

    user = new User({ phone_no, type });
    const otp = await user.generateOTP();
    await user.save();

    res.status(201).json({
      message: "User registered successfully. Please complete your profile.",
      user_id: user._id,
      needs_profile_completion: true,
      otp,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Complete User Profile
export const completeProfile = async (req, res) => {
    try {
      const token = req.cookies.access_token;
      if (!token) return res.status(401).json({ message: "Unauthorized. No token provided." });
  
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ message: "User not found." });
  
      if (user.full_name && user.gender && user.address) {
        return res.json({ message: "Profile is already complete." });
      }
  
      const { full_name, gender, address } = req.body;
      user.full_name = full_name || user.full_name;
      user.gender = gender || user.gender;
      user.address = address || user.address;
      await user.save();
  
      res.status(200).json({ message: "Profile updated successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Verify OTP & Login
export const verifyOTP = async (req, res) => {
  try {
    const { phone_no, otp } = req.body;
    const user = await User.findOne({ phone_no });

    if (!user) return res.status(400).json({ message: "User not found." });

    try {
      const isOtpValid = await user.verifyOTP(otp);
      if (!isOtpValid) return res.status(400).json({ message: "Invalid OTP." });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }

    // Clear OTP after successful login
    user.otp = null;
    user.otp_expiry = null;
    user.is_logged_in = true;
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    await user.save();

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Login successful.", user_id: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout User & Clear Cookies
export const logoutUser = async (req, res) => {
  try {
    const user = req.user;

    user.is_logged_in = false;
    user.refresh_token = null;
    await user.save();

    res.clearCookie("access_token", { httpOnly: true, secure: true });
    res.clearCookie("refresh_token", { httpOnly: true, secure: true });

    res.json({ message: "User logged out successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// upload avatar
export const uploadAvatar = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Unauthorized." });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (!req.file) return res.status(400).json({ message: "No file uploaded." });

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Cloudinary upload failed." });
    }

    // Delete old avatar from Cloudinary if it exists
    if (user.avatar) {
      await deleteFromCloudinary(user.avatar);
    }

    // Save new avatar URL
    user.avatar = cloudinaryResponse.secure_url;
    await user.save();

    res.json({ message: "Avatar uploaded successfully.", avatar: user.avatar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Login User
export const loginUser = async (req, res) => {
   try {
    const { phone_no, type } = req.body;
    let user = await User.findOne({ phone_no, type });

    if (!user) return res.status(400).json({ message: "Phone number is not registered." });

    const otp = await user.generateOTP();
    await user.save();

    res.status(201).json({
      message: "User found.",
      user_id: user._id,
      otp,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
