import { db } from '../connect.js';

export const addFavorite = (req, res) => {
  const q = 'INSERT INTO favorites (user_id, plan_id) VALUES (?, ?)';

    db.query(q, [req.body.user_id, req.body.plan_id], (err, data) => {
        if (err) return res.status(500).json({ success: false, message: "Error " }, err);
        return res.status(200).json({ success: true, message: "Favorite has been added" });
    });
};

export const removeFavorite = (req, res) => {
  const q = 'DELETE FROM favorites WHERE user_id = ? AND plan_id = ?';
    db.query(q, [req.body.user_id, req.body.plan_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Favorite has been removed.");
    });
};

export const getFavoriteStatus = (req, res) => {
    const q = 'SELECT * FROM favorites WHERE user_id = ? AND plan_id = ?';
    db.query(q, [req.query.user_id, req.query.plan_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.length > 0);
    });
};

export const getFavoritePlans = (req, res) => {
  const sql = `
    SELECT favorites.favorite_id , plans.*, activities.*, users.user_id, users.user_name, users.user_firstName, users.user_lastName, parks.park_name 
    FROM favorites 
    LEFT JOIN plans ON favorites.plan_id = plans.plan_id
    LEFT JOIN activities ON plans.plan_id = activities.plan_id 
    LEFT JOIN users ON plans.user_id = users.user_id 
    LEFT JOIN parks ON plans.park_id = parks.park_id
    WHERE plans.plan_isPrivate = 0 AND favorites.user_id = ?
    ORDER BY plans.plan_timeStamp DESC, activities.activity_id ASC;
  `;

  db.query(sql,[req.body.user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const plans = [];
    const planMap = {}; // ใช้ Object ในการตรวจสอบว่ามี plan_id นี้แล้วหรือยัง

    result.forEach((row) => {
      // ตรวจสอบว่า plan_id นี้ยังไม่ถูกเพิ่มเข้าไปในแผนที่ (map) หรือไม่
      if (!planMap[row.plan_id]) {
        // ถ้ายังไม่มี ให้สร้าง object สำหรับ plan นี้และเก็บไว้ในแผนที่
        const newPlan = {
          favorite_id: row.favorite_id,
          plan_id: row.plan_id,
          park_id: row.park_id,
          user_id: row.user_id,
          user_name: row.user_name, 
          user_firstName: row.user_firstName,
          user_lastName: row.user_lastName,
          park_name: row.park_name,
          plan_name: row.plan_name,
          plan_start: row.plan_start,
          plan_end: row.plan_end,
          plan_timeStamp: row.plan_timeStamp,
          activities: [],
        };
        planMap[row.plan_id] = newPlan;
        
        // **เพิ่ม object ใหม่นี้เข้าไปใน array ผลลัพธ์**
        plans.push(newPlan);
      }

      // ถ้ามี activity ให้เพิ่มเข้าไปใน array activities ของ plan นั้น
      if (row.activity_id) {
        planMap[row.plan_id].activities.push({
          activity_id: row.activity_id,
          activity_name: row.activity_name,
          parkplace_id: row.parkplace_id,
          parkplace_name: row.parkplace_name,
          activity_start: row.activity_start,
          activity_end: row.activity_end,
        });
      }
    });

    res.json(plans);
  });
};