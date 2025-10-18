import { db } from "../connect.js";

export const Plans = (req, res) => {
  const sql = `
    SELECT plans.*, activities.*, users.user_id, users.user_name, parks.park_name, users.user_firstName, users.user_lastName, users.user_pfp 
    FROM plans 
    LEFT JOIN activities ON plans.plan_id = activities.plan_id 
    LEFT JOIN users ON plans.user_id = users.user_id 
    LEFT JOIN parks ON plans.park_id = parks.park_id
    WHERE plans.plan_isPrivate = 0 
    ORDER BY plans.plan_timeStamp DESC, activities.activity_id ASC;
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const plans = [];
    const planMap = {}; // ใช้ Object ในการตรวจสอบว่ามี plan_id นี้แล้วหรือยัง

    result.forEach((row) => {
      // ตรวจสอบว่า plan_id นี้ยังไม่ถูกเพิ่มเข้าไปในแผนที่ (map) หรือไม่
      if (!planMap[row.plan_id]) {
        // ถ้ายังไม่มี ให้สร้าง object สำหรับ plan นี้และเก็บไว้ในแผนที่
        const newPlan = {
          plan_id: row.plan_id,
          park_id: row.park_id,
          user_id: row.user_id,
          user_name: row.user_name,
          user_firstName: row.user_firstName,
          user_lastName: row.user_lastName,
          user_pfp: row.user_pfp,
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
          activity_start: row.activity_start,
          activity_end: row.activity_end,
          parkplace_id: row.parkplace_id,
          parkplace_name: row.parkplace_name,
        });
      }
    });

    res.json(plans);
  });
};

export const PlansEachPark = (req, res) => {
  const sql = `
    SELECT plans.*, activities.*, users.user_id, users.user_name, users.user_firstName, users.user_lastName, users.user_pfp 
    FROM plans 
    LEFT JOIN activities ON plans.plan_id = activities.plan_id 
    LEFT JOIN users ON plans.user_id = users.user_id 
    WHERE plans.plan_isPrivate = 0 AND plans.park_id = ?
    ORDER BY plans.plan_timeStamp DESC, activities.activity_id ASC;
  `;

  db.query(sql, [req.query.park_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const plans = [];
    const planMap = {}; // ใช้ Object ในการตรวจสอบว่ามี plan_id นี้แล้วหรือยัง

    result.forEach((row) => {
      // ตรวจสอบว่า plan_id นี้ยังไม่ถูกเพิ่มเข้าไปในแผนที่ (map) หรือไม่
      if (!planMap[row.plan_id]) {
        // ถ้ายังไม่มี ให้สร้าง object สำหรับ plan นี้และเก็บไว้ในแผนที่
        const newPlan = {
          plan_id: row.plan_id,
          park_id: row.park_id,
          user_id: row.user_id,
          user_name: row.user_name,
          user_firstName: row.user_firstName,
          user_lastName: row.user_lastName,
          user_pfp: row.user_pfp,
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
          activity_start: row.activity_start,
          activity_end: row.activity_end,
          parkplace_id: row.parkplace_id,
          parkplace_name: row.parkplace_name,
        });
      }
    });

    res.json(plans);
  });
};

export const PlansAndCounts = (req, res) => {
  const sql = `
    SELECT 
      p.park_id,
      p.park_name,
      COUNT(pl.plan_id) AS plan_count,
      (
        SELECT pi.parkImg_src 
        FROM parkimg pi 
        WHERE pi.park_id = p.park_id 
        LIMIT 1
      ) AS parkImg_src
    FROM parks p
    LEFT JOIN plans pl ON p.park_id = pl.park_id
    GROUP BY p.park_id, p.park_name
    ORDER BY plan_count DESC
    ;`;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

export const ParkData = (req, res) => {
  // restus(200).json({ message: "ParkData endpoint is working!" });
  const sql = `
    SELECT 
      * 
    FROM parks 
    WHERE park_id = ?;
  `;

  db.query(sql, [req.query.park_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

export const ParkImg = (req, res) => {
  const sql = `
    SELECT 
      * 
    FROM parkimg 
    WHERE park_id = ?;
  `;
  db.query(sql, [req.query.park_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

export const PlansByUserId = (req, res) => {
  const user_id = req.query.user_id; // รับ user_id จาก query parameters
  const sql = `
    SELECT plans.*, activities.*, users.user_id, users.user_name, users.user_firstName, users.user_lastName, parks.park_name, users.user_pfp 
    FROM plans
    LEFT JOIN activities ON plans.plan_id = activities.plan_id 
    LEFT JOIN users ON plans.user_id = users.user_id 
    LEFT JOIN parks ON plans.park_id = parks.park_id
    WHERE plans.user_id = ? 
    ORDER BY plans.plan_timeStamp DESC, activities.activity_id ASC`;
  db.query(sql, [user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const plans = [];
    const planMap = {}; // ใช้ Object ในการตรวจสอบว่ามี plan_id นี้แล้วหรือยัง
    result.forEach((row) => {
      // ตรวจสอบว่า plan_id นี้ยังไม่ถูกเพิ่มเข้าไปในแผนที่ (map) หรือไม่
      if (!planMap[row.plan_id]) {
        // ถ้ายังไม่มี ให้สร้าง object สำหรับ plan นี้และเก็บไว้ในแผนที่
        const newPlan = {
          plan_id: row.plan_id,
          park_id: row.park_id,
          user_id: row.user_id,
          user_name: row.user_name,
          user_firstName: row.user_firstName,
          user_lastName: row.user_lastName,
          user_pfp: row.user_pfp,
          park_name: row.park_name,
          plan_name: row.plan_name,
          plan_start: row.plan_start,
          plan_end: row.plan_end,
          plan_isPrivate: row.plan_isPrivate,
          plan_timeStamp: row.plan_timeStamp,
          activities: [],
        };
        planMap[row.plan_id] = newPlan;
        // เพิ่ม object ใหม่นี้เข้าไปใน array ผลลัพธ์
        plans.push(newPlan);
      }
      // ถ้ามี activity ให้เพิ่มเข้าไปใน array activities ของ plan นั้น
      if (row.activity_id) {
        planMap[row.plan_id].activities.push({
          activity_id: row.activity_id,
          activity_name: row.activity_name,
          activity_start: row.activity_start,
          activity_end: row.activity_end,
          parkplace_id: row.parkplace_id,
          parkplace_name: row.parkplace_name,
        });
      }
    });

    res.json(plans);
  });
};

export const PlansByAnotherUserId = (req, res) => {
  const user_id = req.query.user_id; // รับ user_id จาก query parameters
  const sql = `
    SELECT plans.*, activities.*, users.user_id, users.user_name, users.user_firstName, users.user_lastName, parks.park_name, users.user_pfp 
    FROM plans
    LEFT JOIN activities ON plans.plan_id = activities.plan_id 
    LEFT JOIN users ON plans.user_id = users.user_id 
    LEFT JOIN parks ON plans.park_id = parks.park_id
    WHERE plans.user_id = ? && plans.plan_isPrivate = 0 
    ORDER BY plans.plan_timeStamp DESC, activities.activity_id ASC`;
  db.query(sql, [user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const plans = [];
    const planMap = {}; // ใช้ Object ในการตรวจสอบว่ามี plan_id นี้แล้วหรือยัง
    result.forEach((row) => {
      // ตรวจสอบว่า plan_id นี้ยังไม่ถูกเพิ่มเข้าไปในแผนที่ (map) หรือไม่
      if (!planMap[row.plan_id]) {
        // ถ้ายังไม่มี ให้สร้าง object สำหรับ plan นี้และเก็บไว้ในแผนที่
        const newPlan = {
          plan_id: row.plan_id,
          park_id: row.park_id,
          user_id: row.user_id,
          user_name: row.user_name,
          user_firstName: row.user_firstName,
          user_lastName: row.user_lastName,
          user_pfp: row.user_pfp,
          park_name: row.park_name,
          plan_name: row.plan_name,
          plan_start: row.plan_start,
          plan_end: row.plan_end,
          plan_timeStamp: row.plan_timeStamp,
          activities: [],
        };
        planMap[row.plan_id] = newPlan;
        // เพิ่ม object ใหม่นี้เข้าไปใน array ผลลัพธ์
        plans.push(newPlan);
      }
      // ถ้ามี activity ให้เพิ่มเข้าไปใน array activities ของ plan นั้น
      if (row.activity_id) {
        planMap[row.plan_id].activities.push({
          activity_id: row.activity_id,
          activity_name: row.activity_name,
          activity_start: row.activity_start,
          activity_end: row.activity_end,
          parkplace_id: row.parkplace_id,
          parkplace_name: row.parkplace_name,
        });
      }
    });

    res.json(plans);
  });
};

export const PlansByParkId = (req, res) => {
  const park_id = req.query.park_id; // รับ park_id จาก query parameters
  const sql = `
    SELECT plans.*, activities.*, users.user_id, users.user_name, users.user_firstName, users.user_lastName, users.user_pfp 
    FROM plans
    LEFT JOIN activities ON plans.plan_id = activities.plan_id 
    LEFT JOIN users ON plans.user_id = users.user_id 
    WHERE plans.park_id = ? && plans.plan_isPrivate = 0 
    ORDER BY plans.plan_timeStamp DESC, activities.activity_id ASC`;
  db.query(sql, [park_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const plans = [];
    const planMap = {}; // Object ในการตรวจสอบว่ามี plan_id นี้แล้วหรือยัง
    result.forEach((row) => {
      // ตรวจสอบว่า plan_id นี้ยังไม่ถูกเพิ่มเข้าไปในแผนที่ (map) หรือไม่
      if (!planMap[row.plan_id]) {
        // ถ้ายังไม่มี ให้สร้าง object สำหรับ plan นี้และเก็บไว้ในแผนที่
        const newPlan = {
          plan_id: row.plan_id,
          park_id: row.park_id,
          user_id: row.user_id,
          user_name: row.user_name,
          user_firstName: row.user_firstName,
          user_lastName: row.user_lastName,
          user_pfp: row.user_pfp,
          park_name: row.park_name,
          plan_name: row.plan_name,
          plan_start: row.plan_start,
          plan_end: row.plan_end,
          plan_timeStamp: row.plan_timeStamp,
          activities: [],
        };
        planMap[row.plan_id] = newPlan;
        // เพิ่ม object ใหม่นี้เข้าไปใน array ผลลัพธ์
        plans.push(newPlan);
      }
      // ถ้ามี activity ให้เพิ่มเข้าไปใน array activities ของ plan นั้น
      if (row.activity_id) {
        planMap[row.plan_id].activities.push({
          activity_id: row.activity_id,
          activity_name: row.activity_name,
          activity_start: row.activity_start,
          activity_end: row.activity_end,
          parkplace_id: row.parkplace_id,
          parkplace_name: row.parkplace_name,
        });
      }
    });

    res.json(plans);
  });
};

export const UserInfo = (req, res) => {
  const user_id = req.query.user_id; // รับ user_id จาก query parameters
  const sql = `
    SELECT 
      user_name, user_firstName, user_lastName, user_level, user_gender, user_income, user_age, user_email, user_phone, user_pfp, user_weight, user_height 
    FROM users 
    WHERE user_id = ?;
  `;
  db.query(sql, [user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

export const AllUserInfo = (req, res) => {
  const user_id = req.query.user_id; // รับ user_id จาก query parameters
  const sql = `
    SELECT 
      * 
    FROM users 
    WHERE user_id = ?;
  `;
  db.query(sql, [user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

export const test = (req, res) => {
  const q = `SELECT plans.*, activities.*, users.user_id, users.user_name 
    FROM plans 
    LEFT JOIN activities ON plans.plan_id = activities.plan_id 
    LEFT JOIN users ON plans.user_id = users.user_id 
    WHERE plans.plan_isPrivate = 0 
    ORDER BY plans.plan_timeStamp DESC, activities.activity_id ASC;`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const ParkPlaces = (req, res) => {
  const park_id = req.query.park_id; // รับ user_id จาก query parameters
  const sql = `
    SELECT 
      * 
    FROM parkplaces 
    WHERE park_id = ?;
  `;
  db.query(sql, [park_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

export const PlanDetail = (req, res) => {
  const plan_id = req.query.plan_id; // รับ plan_id จาก query parameters

  const sql = `
    SELECT plans.*, activities.*, users.user_id, users.user_name, users.user_firstName, users.user_lastName, user_pfp, parks.park_name  
    FROM plans 
    LEFT JOIN activities ON plans.plan_id = activities.plan_id 
    LEFT JOIN users ON plans.user_id = users.user_id 
    LEFT JOIN parks ON plans.park_id = parks.park_id
    WHERE plans.plan_isPrivate = 0 AND plans.plan_id = ?
    ORDER BY plans.plan_timeStamp DESC, activities.activity_id ASC;
  `;

  db.query(sql, [plan_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const plans = [];
    const planMap = {}; // ใช้ Object ในการตรวจสอบว่ามี plan_id นี้แล้วหรือยัง

    result.forEach((row) => {
      // ตรวจสอบว่า plan_id นี้ยังไม่ถูกเพิ่มเข้าไปในแผนที่ (map) หรือไม่
      if (!planMap[row.plan_id]) {
        // ถ้ายังไม่มี ให้สร้าง object สำหรับ plan นี้และเก็บไว้ในแผนที่
        const newPlan = {
          plan_id: row.plan_id,
          park_id: row.park_id,
          user_id: row.user_id,
          user_name: row.user_name,
          user_firstName: row.user_firstName,
          user_lastName: row.user_lastName,
          user_pfp: row.user_pfp,
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
          parkplace_name: row.parkplace_name,
          activity_start: row.activity_start,
          activity_end: row.activity_end,
        });
      }
    });

    res.json(plans);
  });
};

export const ParkPlacesCount = (req, res) => {
  const park_id = req.query.park_id; // รับ park_id จาก query parameters
  const sql = `
    SELECT COUNT(*) AS "parkPlacesCount"
    FROM parkplaces
    WHERE park_id = ?;
    `;

  db.query(sql, [park_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};
