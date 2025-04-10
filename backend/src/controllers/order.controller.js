// Create a new order with optional image upload
import { Order } from "../models/order.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendOrderConfirmation } from "../utils/twilio.js"; // Import WhatsApp function

export const createOrder = async (req, res) => {
    try {
        const user = req.user; // Get user details from request
        const { tiffin, quantity, size, totalPrice, deliveryMethod, isPaymentDone } = req.body;

        let imageUrl = null;
        if (req.file) {
            const uploadResult = await uploadOnCloudinary(req.file.path);
            if (uploadResult) {
                imageUrl = uploadResult.secure_url;
            }
        }

        // Create new order
        const newOrder = new Order({
            user: user._id,
            tiffin,
            quantity,
            size,
            totalPrice,
            deliveryMethod,
            isPaymentDone,
            image: imageUrl,
        });

        await newOrder.save();

        // Send WhatsApp notification
        const whatsappResponse = await sendOrderConfirmation(user.phone_no, newOrder._id, totalPrice);

        res.status(201).json({ 
            success: true, 
            message: "Order placed successfully", 
            order: newOrder, 
            whatsappResponse 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("tiffin");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email").populate("tiffin");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders by user ID
export const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate("tiffin");

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found for this user" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders by tiffin ID
export const getOrdersByTiffinId = async (req, res) => {
  try {
    const orders = await Order.find({ tiffin: req.params.tiffinId }).populate("user", "name email");

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found for this tiffin" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an order (e.g., status, payment status)
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
