import express from "express";
import authRoutes from "./routes/auth.js";

const app = express();

// middlewares (มันคือไรวะ)
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(8800, () => {
  console.log("API is working...");
});
