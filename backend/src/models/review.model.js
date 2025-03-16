import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    tiffin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tiffin",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stars: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    complaint: {
      type: String,
      default: "",
    },
    thankYouNote: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);