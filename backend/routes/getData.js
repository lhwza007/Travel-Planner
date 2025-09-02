import express from "express";
import { Plans, test } from "../controllers/getData.js";

const router = express.Router();

router.get("/plans", Plans);
router.get("/test", test);


export default router;