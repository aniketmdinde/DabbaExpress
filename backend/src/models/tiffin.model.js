import mongoose from "mongoose";

const tiffinSchema = new mongoose.Schema(
  {
    menu: {
      type: Map,
      of: Number, // Object of food items with quantities
      required: true,
    },
    diet: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: [String], // Array to hold multiple selected types
      enum: ["full", "half", "custom"],
      required: true,
    },
    image: {
      type: String,
    },
    max_order: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Tiffin = mongoose.model("Tiffin", tiffinSchema);
