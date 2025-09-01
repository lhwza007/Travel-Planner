import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import addPlanRoutes from "./routes/addPlan.js";

const app = express();

// middlewares (มันคือไรวะ)
// app.use((req, res, next) => { // อนุญาต credentials
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true // อนุญาตให้ส่ง cookies
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", addPlanRoutes);

app.listen(8800, () => {
  console.log("API is working on port 8800...");
});
