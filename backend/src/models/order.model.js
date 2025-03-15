import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tiffin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tiffin",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    size: {
      type: String,
      enum: ["half", "full"],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },
    deliveryMethod: {
      type: String,
      enum: ["Pickup", "Home Delivery"],
      required: true,
    },
    isPaymentDone: {
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);