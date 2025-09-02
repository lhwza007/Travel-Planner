import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import addPlanRoutes from "./routes/addPlan.js";
import getDataRoutes from "./routes/getData.js";

const app = express();

app.use(cors({
  origin:"http://localhost:5173",
  credentials: true // อนุญาตให้ส่ง cookies
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", addPlanRoutes);
app.use("/api/getData", getDataRoutes);

app.listen(8800, () => {
  console.log("API is working on port 8800...");
});
