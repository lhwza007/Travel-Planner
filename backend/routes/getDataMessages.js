import express from "express";
import { ListName , GetDetailMessage } from "../controllers/getDataMessages.js";

const router = express.Router();
router.get("/listName",ListName)
router.get("/getDetailMessage",GetDetailMessage)
export default router;