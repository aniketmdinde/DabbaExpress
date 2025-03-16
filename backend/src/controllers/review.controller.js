import { Review } from "../models/review.model.js";
import { Order } from "../models/order.model.js";

/**
 * Create a new review for an order.
 */
export const createReview = async (req, res) => {
  try {
    const { order, stars, complaint, thankYouNote } = req.body;

    // Ensure the order exists
    const existingOrder = await Order.findById(order).populate("tiffin user");
    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure at least one field is provided
    if (stars === undefined && !complaint && !thankYouNote) {
      return res.status(400).json({ message: "Provide at least one field: stars, complaint, or thankYouNote." });
    }

    // Create the review
    const review = new Review({
      order,
      tiffin: existingOrder.tiffin,
      user: existingOrder.user,
      stars,
      complaint,
      thankYouNote,
    });

    await review.save();
    return res.status(201).json({ message: "Review submitted successfully", review });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get all reviews
 */
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("order tiffin user", "phone_no full_name");
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get a single review by ID
 */
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id).populate("order tiffin user", "phone_no full_name");
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update a review (only provided fields)
 */
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { stars, complaint, thankYouNote } = req.body;

    // Ensure at least one field is provided for update
    if (stars === undefined && !complaint && !thankYouNote) {
      return res.status(400).json({ message: "Provide at least one field: stars, complaint, or thankYouNote to update." });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Update only provided fields
    if (stars !== undefined) review.stars = stars;
    if (complaint !== undefined) review.complaint = complaint;
    if (thankYouNote !== undefined) review.thankYouNote = thankYouNote;

    await review.save();
    return res.status(200).json({ message: "Review updated successfully", review });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Delete a review
 */
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
