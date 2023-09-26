import express from "express";
import { changePassword, editProfile, saveAdmin, signIn, signOut, verifyPass, viewProfile } from "../controllers/admin.controller.js";
import { adminTokenVerify } from "../middleware/tokenVerification.js";
import { body } from "express-validator";
import { sendOTP } from "../middleware/email.js";

const router = express.Router();
router.post("/save",saveAdmin);
router.post("/signin",signIn);
router.get("/signout",signOut);
router.post("/profile",viewProfile);
router.post("/editprofile",
body("email","Email cannot be null").notEmpty(),
body("email","Incorrect email pattern").isEmail()
,editProfile);
router.post("/changepass",changePassword);
router.post("/verify-pass",verifyPass);
router.post("/send-otp",sendOTP);

export default router;

