import { db } from "../connect.js";

export const deletePost = async (req, res) => {
  const plan_id = parseInt(req.query.plan_id);
  console.log("Deleting plan with ID:", plan_id);

  const sql1 = "DELETE FROM plans WHERE plan_id = ?";
  const sql2 = "DELETE FROM activities WHERE plan_id = ?";

  try {
    // ลบ activities ก่อน (ถ้ามี foreign key)
    const [result2] = await db.promise().query(sql2, [plan_id]);
    console.log("Deleted activities:", result2.affectedRows);

    // ลบ plan หลังจากนั้น
    const [result1] = await db.promise().query(sql1, [plan_id]);
    console.log("Deleted plan:", result1.affectedRows);

    if (result1.affectedRows === 0) {
      return res.status(404).json({ message: "Plan not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Plan deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Database error", detail: err.message });
  }
};

