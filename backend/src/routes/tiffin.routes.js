import express from "express";
import {
  createTiffin,
  getAllTiffins,
  getTiffinById,
  updateTiffin,
  deleteTiffin,
} from "../controllers/tiffin.controller.js";

const router = express.Router();

router.post("/", createTiffin);
router.get("/", getAllTiffins);
router.get("/:id", getTiffinById);
router.put("/:id", updateTiffin);
router.delete("/:id", deleteTiffin);

export default router;