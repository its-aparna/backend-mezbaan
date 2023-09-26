import express from "express";
import { confirm, cancel,history, historyRest, bookingCount, profit, monthlyProfit } from "../controllers/booking.controller.js";
import { cusTokenVerify, resTokenVerify } from "../middleware/tokenVerification.js";

const router = express.Router();

router.post("/save",confirm);
router.post("/cancel", cancel);
router.get("/history", history);
router.get("/history/:id", historyRest);
router.get("/count/:id",bookingCount);
router.get("/profit",profit);
router.get("/profit-monthly",monthlyProfit);

export default router;
