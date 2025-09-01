import { db } from "../connect.js";

export const addPlan = async (req, res) => {
  const planName = req.body.planName;
  const planRange = req.body.planRange;
  const mainActivities = req.body.mainActivities;
  const isPrivate = req.body.isPrivate;
  const parkId = req.body.parkId;
  const userId = req.body.userId;

  let planId;
  const maxAttempts = 10; // จำกัดจำนวนครั้งในการสุ่มเพื่อป้องกัน infinite loop

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    planId = Math.floor(100000 + Math.random() * 900000);
    try {
      const [results] = await db
        .promise()
        .query("SELECT * FROM plans WHERE plan_id = ?", [planId]);
      if (results.length === 0) {
        break; // พบ planId ที่ไม่ซ้ำ
      }
    } catch (error) {
      return res.status(500).json({ error: "Database error", details: error.message });
    }
  }

  if (!planId) {
    return res.status(500).json({ error: "Unable to generate unique planId" });
  }

  try {
    // Insert into plans table
    const q =
      "INSERT INTO plans(plan_id, park_id, user_id, plan_name, plan_start, plan_end, plan_isPrivate) VALUES(?, ?, ?, ?, ?, ?, ?)";
    await db
      .promise()
      .query(q, [planId, parkId, userId, planName, planRange.startDate, planRange.endDate, isPrivate]);

    // Insert into activities table for each activity
    for (const activity of mainActivities) {
      const q =
        "INSERT INTO activities(plan_id, activity_name, activity_start, activity_end) VALUES(?, ?, ?, ?)";
      await db
        .promise()
        .query(q, [planId, activity.name, activity.startTime, activity.endTime]);
    }

    return res.status(200).json("Plan has been created.");
  } catch (error) {
    return res.status(500).json({ error: "Insertion error", details: error.message });
  }
};
