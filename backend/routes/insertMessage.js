import express from "express";
import { InsertMessage ,InsertMessageShare} from "../controllers/insertMessage.js";
const router = express.Router();

router.post("/insertmessage",InsertMessage);
router.post("/insertmessageshare",InsertMessageShare);


export default router;