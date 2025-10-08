import { db } from "../connect.js";

export const updateUserProfile = (req, res) => {
  const user_id = req.query.user_id;
  const fields = req.body;

  const keys = Object.keys(fields);
  const values = Object.values(fields);

  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const sql = `UPDATE users SET ${setClause} WHERE user_id = ?`;

  db.query(sql, [...values, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Your information has been updated!" });
  });
};

