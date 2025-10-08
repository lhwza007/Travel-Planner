import express from "express";
import { updateUserProfile } from "../controllers/updateData.js";

const router = express.Router();

router.patch("/updateUserProfile", updateUserProfile);

export default router;