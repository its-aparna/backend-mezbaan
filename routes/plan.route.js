import express from "express";
import { addPlan, countOfSubscription, planList, removePlan , subscribePlan, updatePlan } from "../controllers/plan.controller.js";
import { adminTokenVerify, resTokenVerify } from "../middleware/tokenVerification.js";

const router = express.Router();
router.post("/save",addPlan);
router.post("/update",updatePlan);  
router.post("/remove",removePlan);  
router.post("/subscribe",subscribePlan);
router.get("/plans-list",planList);
router.post("/plan-subscription-count",countOfSubscription);

export default router;