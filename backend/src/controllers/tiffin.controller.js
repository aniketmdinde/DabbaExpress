import { Tiffin } from "../models/tiffin.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

// ✅ Create a Tiffin
export const createTiffin = async (req, res) => {
    try {
        const { menu, diet, price, type, max_order } = req.body;

        if (!menu || !diet || !price || !type || !max_order) {
            return res.status(400).json({ message: "All fields are required." });
        }

        let imageUrl = "";
        if (req.file) {
            const uploadResponse = await uploadOnCloudinary(req.file.path);
            if (!uploadResponse) return res.status(500).json({ message: "Image upload failed." });
            imageUrl = uploadResponse.secure_url;
        }

        const tiffin = await Tiffin.create({
            menu,
            diet,
            price,
            type,
            max_order,
            image: imageUrl,
            user: req.user._id
        });

        res.status(201).json({ message: "Tiffin created successfully", tiffin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get all Tiffins
export const getAllTiffins = async (req, res) => {
    try {
        const tiffins = await Tiffin.find().populate("user", "name email");
        res.status(200).json(tiffins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get a single Tiffin by ID
export const getTiffinById = async (req, res) => {
    try {
        const tiffin = await Tiffin.findById(req.params.id).populate("user", "name email");
        if (!tiffin) return res.status(404).json({ message: "Tiffin not found." });

        res.status(200).json(tiffin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Update a Tiffin
export const updateTiffin = async (req, res) => {
    try {
        const { menu, diet, price, type, max_order } = req.body;
        const tiffin = await Tiffin.findById(req.params.id);

        if (!tiffin) return res.status(404).json({ message: "Tiffin not found." });
        if (tiffin.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized action." });
        }

        let imageUrl = tiffin.image;
        if (req.file) {
            if (imageUrl) await deleteFromCloudinary(imageUrl);
            const uploadResponse = await uploadOnCloudinary(req.file.path);
            if (!uploadResponse) return res.status(500).json({ message: "Image upload failed." });
            imageUrl = uploadResponse.secure_url;
        }

        tiffin.menu = menu || tiffin.menu;
        tiffin.diet = diet || tiffin.diet;
        tiffin.price = price || tiffin.price;
        tiffin.type = type || tiffin.type;
        tiffin.max_order = max_order || tiffin.max_order;
        tiffin.image = imageUrl;

        await tiffin.save();
        res.status(200).json({ message: "Tiffin updated successfully", tiffin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Delete a Tiffin
export const deleteTiffin = async (req, res) => {
    try {
        const tiffin = await Tiffin.findById(req.params.id);
        if (!tiffin) return res.status(404).json({ message: "Tiffin not found." });

        if (tiffin.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized action." });
        }

        if (tiffin.image) await deleteFromCloudinary(tiffin.image);
        await Tiffin.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Tiffin deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
