import express from "express";
import { RecommendByLLM,RecommendBylocalstorage } from "../controllers/recommend.js";

const router = express.Router();

router.get("/recommendByLLM", RecommendByLLM);
router.get("/recommendBylocalstorage", RecommendBylocalstorage);

export default router;
