import express from "express";
import { Plans, PlansEachPark,PlansAndCounts, ParkData, ParkImg, PlansByUserId, UserInfo, AllUserInfo, PlansByParkId, ParkPlaces, test } from "../controllers/getData.js";

const router = express.Router();

router.get("/plans", Plans);
router.get("/plansEachPark", PlansEachPark); 
router.get("/plansAndCounts", PlansAndCounts);
router.get("/parkData", ParkData);
router.get("/parkImg", ParkImg);
router.get("/plansByUserId", PlansByUserId);
router.get("/userInfo", UserInfo);
router.get("/allUserInfo", AllUserInfo);
router.get("/plansByParkId", PlansByParkId);
router.get("/parkPlaces", ParkPlaces);
router.get("/test", test);


export default router;