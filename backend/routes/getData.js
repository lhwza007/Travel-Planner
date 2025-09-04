import express from "express";
import { Plans, PlansEachPark,PlansAndCounts, ParkData, ParkImg, PlansByUserId, test } from "../controllers/getData.js";

const router = express.Router();

router.get("/plans", Plans);
router.get("/plansEachPark", PlansEachPark); 
router.get("/plansAndCounts", PlansAndCounts);
router.get("/parkData", ParkData);
router.get("/parkImg", ParkImg);
router.get("/plansByUserId", PlansByUserId);
router.get("/test", test);


export default router;