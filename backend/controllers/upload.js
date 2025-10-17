import multer from "multer";
import path from "path";
import fs from "fs";
import { db } from "../connect.js";

// สร้างโฟลเดอร์ uploads หากยังไม่มี
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// กำหนดการตั้งค่าเก็บไฟล์ด้วย multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `pfp_${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

// สร้างตัวอัพโหลดด้วยการตั้งค่า storage
const upload = multer({ storage });

export const uploadImg = (req, res) => {
  upload.single("pfp")(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ message: "File upload failed", success: false });
    }

    const userId = req.body.user_id;
    const fileName = req.file.filename;

    const sql = "UPDATE users SET user_pfp = ? WHERE user_id = ?";
    db.query(sql, [fileName, userId], (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database update failed", success: false });
      }

      res.json({
        message: "Upload success",
        fileName,
        imageUrl: `http://localhost:8800/uploads/${fileName}`,
        success: true,
      });
    });
  });
};

