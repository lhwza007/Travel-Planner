import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { db } from "../connect.js";
import e from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function toLLM(user_level, user_age) {
  return new Promise((resolve) => {
    const pythonCmd = process.platform.startsWith("win") ? "python" : "python3";

    // เรียกใช้ add.py ที่อยู่อีกโฟลเดอร์
    const py = spawn(pythonCmd, [
      join(__dirname, "../LLM/Recommend.py"),
      String(user_level),
      String(user_age),
    ]);

    let dataString = "";

    // รับค่าที่ python print กลับมา
    py.stdout.on("data", (data) => {
      dataString += data.toString();
    });

    // เมื่อ python รันเสร็จ
    py.on("close", () => {
      try {
        const obj = JSON.parse(dataString);

        const finalResult = obj.result !== undefined ? obj.result : obj;

        // ตรวจสอบความถูกต้องอีกครั้งก่อน resolve
        if (finalResult === undefined) {
          console.error("Error: Final result is undefined after parsing JSON.");
          console.error("Raw data string:", dataString);
          resolve({}); // resolve ด้วย Object ว่างแทน
        } else {
          resolve(finalResult);
        }
      } catch (e) {
        // กรณี JSON.parse ล้มเหลว (เผื่อมีข้อความ debug ปนมา)
        console.error("Error parsing JSON from Python:", e.message);
        console.error("Raw data received:", dataString);
        resolve({ error: "JSON_PARSE_FAILED" }); // ส่งค่า error กลับไป
      }
    });
  });
}

// ทดสอบ
// toLLM("Intermediate", 30).then((res) => {
//   console.log("ผลลัพธ์:", res);
//   const jsonData = res;
//   const list_park_id = jsonData.list_park_id.split(',').map(Number);
//   console.log("list_park_id:", list_park_id);



export const RecommendByLLM = async (req, res) => {
  const user_level = req.query.user_level;
  const user_age = req.query.user_age;

  try {
    const result = await toLLM(user_level, user_age);

    const list_park_id_string = result.list_park_id || result.list_park_id_err; // รับได้ทั้งกรณีปกติและกรณี Error จาก LLM

    if (result.list_park_id_err) {
      //ถ้า llm ส่ง id err มา
      console.error("id error from llm", list_park_id_string);
      return res.status(503).json({
        error: "LLM_SERVICE_UNAVAILABLE อาจจะ Overload",
        message:
          "Recommendation service is temporarily unavailable. Default IDs returned.",
      });
    }

    if (!list_park_id_string) {
      //ถ้า llm ไม่ส่งไรมาเลย
      console.error("no data form LLM", result);
      return res.status(503).json({ error: "no data form LLM" });
    }

    const list_park_id = list_park_id_string.split(",").map(Number); // แปลงสตริง ID เป็น Array ตัวเลข
    const placeholders = list_park_id.map(() => '?').join(','); 

    const sql = `SELECT 
                parks.park_id,
                parks.park_name,
                COUNT(plans.plan_id) AS plan_count,
                (
                  SELECT parkimg.parkImg_src 
                  FROM parkimg 
                  WHERE parkimg.park_id = parks.park_id 
                  LIMIT 1
                ) AS parkImg_src
                FROM parks 
                LEFT JOIN plans ON parks.park_id = plans.park_id
                WHERE parks.park_id IN (${placeholders})
                GROUP BY parks.park_id, parks.park_name, parkImg_src 
                ORDER BY FIELD(parks.park_id, ${list_park_id.join(",")})`;


    db.query(sql, list_park_id, (err, dbResult) => {
      if (err) {
        console.error("Database Query Error:", err);
        return res.status(500).json({ error: "DATABASE_QUERY_FAILED" });
      }
      res.json(dbResult);
    });
  } catch (error) {
    // Error ทั่วไป
    console.error("Uncaught Error in RecommendByLLM:", error);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
};


export const RecommendBylocalstorage = (req, res) => {
  try {
    let list_park_id = req.query.list_park_id; // อาจเป็น undefined, string, หรือ array
    console.log("raw list_park_id:", list_park_id);

    if (!list_park_id) {
      return res.status(400).json({ error: "MISSING_LIST_PARK_ID" });
    }

    // Normalize เป็น array ของตัวเลข
    if (typeof list_park_id === "string") {
      // ถ้าเป็น JSON array string -> parse
      if (list_park_id.startsWith("[") && list_park_id.endsWith("]")) {
        try {
          list_park_id = JSON.parse(list_park_id);
        } catch {
          // fallthrough to comma split
          list_park_id = list_park_id.slice(1, -1).split(",").map(s => s.trim());
        }
      
      } else if (list_park_id.includes(",")) {
        list_park_id = list_park_id.split(",").map(s => s.trim());
      } else {
        list_park_id = [list_park_id];
      }
    }

    const placeholders = list_park_id.map(() => "?").join(",");
    const sql = `SELECT 
                parks.park_id,
                parks.park_name,
                COUNT(plans.plan_id) AS plan_count,
                (
                  SELECT parkimg.parkImg_src 
                  FROM parkimg 
                  WHERE parkimg.park_id = parks.park_id 
                  LIMIT 1
                ) AS parkImg_src
                FROM parks 
                LEFT JOIN plans ON parks.park_id = plans.park_id
                WHERE parks.park_id IN (${placeholders})
                GROUP BY parks.park_id, parks.park_name, parkImg_src 
                ORDER BY FIELD(parks.park_id, ${list_park_id.join(",")})`;

    db.query(sql, list_park_id, (err, dbResult) => {
      if (err) {
        console.error("Database Query Error:", err);
        return res.status(500).json({ error: "DATABASE_QUERY_FAILED" });
      }
      res.json(dbResult);
    });
  } catch (err) {
    console.error("Uncaught Error in RecommendBylocalstorage:", err);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
};