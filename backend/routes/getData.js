import express from "express";
import { Plans, PlansEachPark, test } from "../controllers/getData.js";

const router = express.Router();

router.get("/plans", Plans);
router.get("/plansEachPark", PlansEachPark); 
router.get("/test", test);


export default router;