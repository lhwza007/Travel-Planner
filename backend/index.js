import express from "express";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middlewares (มันคือไรวะ)
app.use((req, res, next) => { // อนุญาต credentials
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors({
  origin:"http://localhost:5173"
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(8800, () => {
  console.log("API is working on port 8800...");
});
