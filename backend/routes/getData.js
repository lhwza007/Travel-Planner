import express from "express";
import { Plans } from "../controllers/getData.js";

const router = express.Router();

router.get("/plans", Plans);


export default router;