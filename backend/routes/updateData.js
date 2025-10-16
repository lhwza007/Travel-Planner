import express from "express";
import { updateUserProfile, updatePlanPrivacy } from "../controllers/updateData.js";

const router = express.Router();

router.patch("/updateUserProfile", updateUserProfile);
router.patch("/updatePlanPrivacy", updatePlanPrivacy);

export default router;