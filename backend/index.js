import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import addPlanRoutes from "./routes/addPlan.js";
import getDataRoutes from "./routes/getData.js";
import favoriteRoutes from "./routes/favorite.js";
import updateDataRoutes from "./routes/updateData.js";
import insertParkplacesRoutes from "./routes/insertParkPlaces.js";
import recommendRoutes from "./routes/recommend.js";
import getDataMessagesRoutes from "./routes/getDataMessages.js";
import insertMessageRoutes from "./routes/insertMessage.js";
import deleteDataRoutes from "./routes/deleteData.js";
import uploadImgRoutes from "./routes/upload.js";

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
app.use("/api/getDataMessages", getDataMessagesRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/updateData", updateDataRoutes);
app.use("/api/insertParkplaces", insertParkplacesRoutes); 
app.use("/api/recommend", recommendRoutes);
app.use("/api/insertmessage",insertMessageRoutes);
app.use("/api/deleteData", deleteDataRoutes);
app.use("/api/upload", uploadImgRoutes);

app.use("/uploads", express.static("uploads"));

app.listen(8800, () => {
  console.log("API is working on port 8800...");
});

