import mongoose from "mongoose";

const tiffinSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tiffin: {
      half: {
        menu: {
          chapatis: { type: Number, required: true },
          vegetable: { type: String, required: true },
          dal: { type: Number, required: true },
          rice: { type: Number, required: true },
        },
        price: {
          type: Number,
          required: true,
        },
      },
      full: {
        menu: {
          chapatis: { type: Number, required: true },
          vegetables: [{ type: String, required: true }],
          dal: { type: Number, required: true },
          rice: { type: Number, required: true },
        },
        price: {
          type: Number,
          required: true,
        },
      },
    },
    diet: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
    },
    max_order: {
      type: Number,
      required: true,
    },
    availableTime: {
      type: String,
      required: true,
    },
    allergenInfo: {
      type: String,
    },
    image: {
      type: String,
    },
    deliveryOptions: {
      type: [String],
      enum: ["pickup", "delivery"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Tiffin = mongoose.model("Tiffin", tiffinSchema);