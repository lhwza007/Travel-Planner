import express from "express";
import { addPlan } from "../controllers/addPlan.js";

const router = express.Router();

router.post("/addPlan", addPlan);

export default router;