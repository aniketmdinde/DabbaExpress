import express from "express";
import {
  createTiffin,
  getAllTiffins,
  getTiffinById,
  updateTiffin,
  deleteTiffin,
} from "../controllers/tiffin.controller.js";
import {verifyUserJWT} from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/",verifyUserJWT,upload.single("image"), createTiffin);
router.get("/",verifyUserJWT, getAllTiffins);
router.get("/:id",verifyUserJWT, getTiffinById);
router.put("/:id",verifyUserJWT, updateTiffin);
router.delete("/:id",verifyUserJWT, deleteTiffin);

export default router;