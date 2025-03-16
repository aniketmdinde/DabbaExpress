import { Tiffin } from "../models/tiffin.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createTiffin = async (req, res) => {
  try {
    const user = req.user._id;
    const { tiffin, diet, max_order, availableTime, allergenInfo, deliveryOptions } = req.body;

    // Handle image upload if file is provided
    let imageUrl = null;
    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path, "tiffins");
      if (uploadResult && uploadResult.secure_url) {
        imageUrl = uploadResult.secure_url;
      } else {
        return res.status(500).json({ success: false, message: "Image upload failed" });
      }
    }

    // Create new Tiffin entry
    const newTiffin = new Tiffin({
      user,
      tiffin: JSON.parse(tiffin), // Ensure the tiffin object is properly parsed
      diet,
      max_order: parseInt(max_order),
      availableTime,
      allergenInfo,
      image: imageUrl,
      deliveryOptions: JSON.parse(deliveryOptions), // Convert deliveryOptions to object if needed
    });

    await newTiffin.save();
    res.status(201).json({ success: true, message: "Tiffin created successfully", tiffin: newTiffin });
  } catch (error) {
    console.error("Error creating Tiffin:", error);
    res.status(500).json({ success: false, message: "Server error. Could not create Tiffin." });
  }
};


// Get all Tiffins
export const getAllTiffins = async (req, res) => {
  try {
    const tiffins = await Tiffin.find().populate("user", "full_name"); // Populate user details
    res.status(200).json({ success: true, tiffins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single Tiffin by ID
export const getTiffinById = async (req, res) => {
  try {
    const tiffin = await Tiffin.findById(req.params.id).populate("user", "full_name");

    if (!tiffin) {
      return res.status(404).json({ success: false, message: "Tiffin not found" });
    }

    res.status(200).json({ success: true, tiffin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a Tiffin
export const updateTiffin = async (req, res) => {
  try {
    const { tiffin, ...updateData } = req.body;

    // Ensure nested tiffin menu is updated correctly
    if (tiffin) {
      updateData.tiffin = {
        half: { ...tiffin.half },
        full: { ...tiffin.full },
      };
    }

    const updatedTiffin = await Tiffin.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedTiffin) {
      return res.status(404).json({ success: false, message: "Tiffin not found" });
    }

    res.status(200).json({ success: true, message: "Tiffin updated successfully", tiffin: updatedTiffin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a Tiffin
export const deleteTiffin = async (req, res) => {
  try {
    const deletedTiffin = await Tiffin.findByIdAndDelete(req.params.id);

    if (!deletedTiffin) {
      return res.status(404).json({ success: false, message: "Tiffin not found" });
    }

    res.status(200).json({ success: true, message: "Tiffin deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};