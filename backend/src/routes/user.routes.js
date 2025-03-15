import { Router } from "express";
import { registerUser, verifyOTP, logoutUser, completeProfile, uploadAvatar, loginUser, updateLocation } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser)
router.post("/logout", verifyUserJWT, logoutUser);
router.post("/complete-profile", verifyUserJWT, completeProfile);
router.post("/upload-avatar", verifyUserJWT, upload.single("avatar"), uploadAvatar);

//location updated
router.post("/update-location", verifyUserJWT,updateLocation);

export default router;
