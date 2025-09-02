import { db } from "../connect.js";

export const Plans = (req, res) => {
  const sql = `
    SELECT plans.*, activities.*, users.user_id, users.user_name 
    FROM plans 
    LEFT JOIN activities ON plans.plan_id = activities.plan_id 
    LEFT JOIN users ON plans.user_id = users.user_id 
    WHERE plans.plan_isPrivate = 0 
    ORDER BY plans.plan_timeStamp ASC, activities.activity_id ASC;
    `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const plans = {};
    result.forEach((row) => {
      // ถ้ายังไม่มีแผนนี้ใน plans ให้สร้างขึ้นมาใหม่
      if (!plans[row.plan_id]) {
        plans[row.plan_id] = {
          plan_id: row.plan_id,
          park_id: row.park_id,
          user_id: row.user_id,
          user_name: row.user_name,
          park_name: row.park_name,
          plan_name: row.plan_name,
          plan_start: row.plan_start,
          plan_end: row.plan_end,
          plan_timeStamp: row.plan_timeStamp,
          activities: [],
        };
      }
      // ถ้ามีกิจกรรมที่อยู่ในแผนนี้ ให้เพิ่มเข้าไปใน activities
      if (row.activity_id) {
        plans[row.plan_id].activities.push({
          activity_id: row.activity_id,
          activity_name: row.activity_name,
          activity_start: row.activity_start,
          activity_end: row.activity_end,
        });
      }
    });
    res.json(Object.values(plans));
  });
};
