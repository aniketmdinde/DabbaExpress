import { Router } from "express";
import { createTiffin, getAllTiffins, getTiffinById, updateTiffin, deleteTiffin } from "../controllers/tiffin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyUserJWT, upload.single("image"), createTiffin); // Create a tiffin
router.get("/", getAllTiffins); // Get all tiffins
router.get("/:id", getTiffinById); // Get a tiffin by ID
router.put("/:id", verifyUserJWT, upload.single("image"), updateTiffin); // Update a tiffin
router.delete("/:id", verifyUserJWT, deleteTiffin); // Delete a tiffin

export default router;