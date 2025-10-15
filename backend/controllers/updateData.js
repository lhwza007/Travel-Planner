import { db } from "../connect.js";

export const updateUserProfile = (req, res) => {
  const user_id = parseInt(req.query.user_id);
  const fields = req.body;

  const user_name = req.body.user_name;
  const sql1 = "SELECT * FROM users WHERE user_name = ?";
  
  db.query(sql1, [user_name], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    
    // ตรวจสอบว่ามี username ซ้ำหรือไม่ (ยกเว้นตัวเอง)
    if (result.length > 0 && result[0].user_id !== user_id) {
      return res.json({ message: "Username is already taken.", success: false });
    }

    // ดำเนินการอัปเดตข้อมูลเฉพาะเมื่อ username ไม่ซ้ำ
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const sql2 = `UPDATE users SET ${setClause} WHERE user_id = ?`;

    db.query(sql2, [...values, user_id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Your information has been updated!", success: true });
    });
  });
};