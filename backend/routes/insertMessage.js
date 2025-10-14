import express from "express";
import { InsertMessage } from "../controllers/insertMessage.js";
const router = express.Router();

router.post("/insertmessage",InsertMessage);

export default router;