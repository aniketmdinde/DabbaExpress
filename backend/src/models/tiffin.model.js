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
          type: Map,
          of: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
      full: {
        menu: {
          type: Map,
          of: Number,
          required: true,
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
    image: {
      type: String,
    },
    deliveryOptions: {
      type: [String],
      enum: ["pickup", "providerDelivery", "partnerDelivery"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Tiffin = mongoose.model("Tiffin", tiffinSchema);