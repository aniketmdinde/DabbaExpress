import { Tiffin } from "../models/tiffin.model.js";

// Create a new Tiffin
export const createTiffin = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const { tiffin, diet, max_order, availableTime, allergenInfo, image, deliveryOptions } = req.body;
    console.log(`h5`);

    const newTiffin = new Tiffin({
      user,
      tiffin,
      diet,
      max_order,
      availableTime,
      allergenInfo,
      image,
      deliveryOptions,
    });

    await newTiffin.save();
    res.status(201).json({ success: true, message: "Tiffin created successfully", tiffin: newTiffin });
  } catch (error) {
    console.log(`sdsd`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all Tiffins
export const getAllTiffins = async (req, res) => {
  try {
    const tiffins = await Tiffin.find().populate("user", "name email"); // Populate user details
    res.status(200).json({ success: true, tiffins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single Tiffin by ID
export const getTiffinById = async (req, res) => {
  try {
    const tiffin = await Tiffin.findById(req.params.id).populate("user", "name email");

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