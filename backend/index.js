import express from "express";
import authRoutes from "./routes/auth.js";
import cors from 'cors'

const app = express();

// middlewares (มันคือไรวะ)
app.use(express.json());

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Header","Origin,X-requested-With,Content-Type,Accept")
  next()
  
})




app.use("/api/auth", authRoutes);

app.listen(8800, () => {
  console.log("API is working...");
});
