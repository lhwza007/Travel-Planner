import express from "express";
import { InsertParkPlaces } from "../controllers/insertParkPlaces.js";

const router = express.Router();

router.post("/insertParkPlaces", InsertParkPlaces);


export default router;