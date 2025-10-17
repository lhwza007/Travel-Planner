import express from "express";
import { uploadImg } from "../controllers/upload.js";

const router = express.Router();

router.post("/uploadImg", uploadImg);

export default router;