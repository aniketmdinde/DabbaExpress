import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  getOrdersByTiffinId,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.get("/user/:userId", getOrdersByUserId);
router.get("/tiffin/:tiffinId", getOrdersByTiffinId);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;