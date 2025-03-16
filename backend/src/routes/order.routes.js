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
import { verifyUserJWT } from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post("/",verifyUserJWT , createOrder);
router.get("/",verifyUserJWT, getAllOrders);
router.get("/:id",verifyUserJWT, getOrderById);
router.get("/user/:userId",verifyUserJWT, getOrdersByUserId);
router.get("/tiffin/:tiffinId",verifyUserJWT, getOrdersByTiffinId);
router.put("/:id",verifyUserJWT, updateOrder);
router.delete("/:id",verifyUserJWT, deleteOrder);

export default router;