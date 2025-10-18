import express from "express";
import { InsertComment,GetComment } from "../controllers/comments.js";

const router = express.Router();

router.post("/insertComment", InsertComment);
router.get("/getComment", GetComment);

export default router;