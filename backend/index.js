import express from "express";
import authRoutes from "./routes/auth.js";
import cors from 'cors'

const app = express();

// middlewares (มันคือไรวะ)
app.use(express.json());


app.use(cors())


app.use("/api/auth", authRoutes);

app.listen(8800, () => {
  console.log("API is working...");
});
