import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;
const JWT_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "15m";
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "7d";

const userSchema = new mongoose.Schema(
  {
    phone_no: { type: String, required: true, unique: true },
    otp: { type: String },
    otp_expiry: { type: Date },
    type: { type: String, enum: ["user", "provider"], required: true },
    avatar: { type: String },
    full_name: { type: String },
    gender: { type: String, enum: ["male", "female", "other"] },
    address: { type: String },
    refresh_token: { type: String },
    is_logged_in: { type: Boolean, default: false },
    location: { type: String }
  },
  { timestamps: true }
);

// Generate OTP
userSchema.methods.generateOTP = async function () {
  const rawOtp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = await bcrypt.hash(rawOtp, SALT_ROUNDS);
  this.otp_expiry = new Date(Date.now() + 10 * 60 * 1000);
  console.log("OTP: ", rawOtp)
  return rawOtp;
};

// Verify OTP
userSchema.methods.verifyOTP = async function (enteredOtp) {
  if (!this.otp || this.otp_expiry < new Date()) {
    this.is_logged_in = false;
    await this.save();
    throw new Error("OTP has expired or is invalid.");
  }
  return await bcrypt.compare(enteredOtp, this.otp);
};

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id, phone_no: this.phone_no, type: this.type }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign({ id: this._id, phone_no: this.phone_no, type: this.type }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY });
  this.refresh_token = refreshToken;
  return refreshToken;
};

export const User = mongoose.model("User", userSchema);