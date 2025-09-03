import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import e, { response } from "express"; 
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // check acc if exists
  const q = "SELECT * FROM users WHERE user_name = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    // เช็คว่ามีข้อมูลหรือยัง แล้วส่ง status
    if (data.length) return res.status(409).json("User is already exists");

    // ใช้ salt ในการ hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users(user_name, user_password,user_firstName,user_lastName,user_level,user_gender,user_income,user_age,user_email) VALUES(?, ?,?, ?,?, ?,?, ?,?)";

    db.query(
      q,
      [
        req.body.username,
        hashedPassword,
        req.body.first_name,
        req.body.last_name,
        req.body.skill_level,
        req.body.gender,
        req.body.income,
        req.body.age,
        req.body.email,
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);

        // ส่ง status ว่า query สำเร็จ
        return res.status(200).json("Account has been created.");
      }
    );
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE user_name = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    // หาไม่เจอ ส่ง status 404
    if (data.length === 0) return res.status(404).json("User not found.");

    // เปรียบเทียบ password ที่ส่งมาจาก body กับข้อมูล password ที่ถูก query ออกมา
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].user_password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username.");

    // สร้าง token บันทึกข้อมูลผู้ใช้
    const token = jwt.sign({ user_id: data[0].user_id }, "secretkey");

    // อันนี้คืออะไรไม่ทราบ
    const { password, ...others } = data[0];

    // เก็บ accessToken ในรูปแบบ cookie จะสามารถนำไปถอดรหัสเพื่อดึง id ผู้ใช้มาได้
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: false, // ถ้าใช้ http ให้เป็น false, ถ้า https ให้เป็น true
        sameSite: "lax", // หรือ "none" ถ้า cross-origin
        path: "/", // (ถ้าไม่ได้ระบุ จะใช้ /)
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  // เคลียร์ cookie
  res
    .clearCookie("accessToken", {
      secure: false,
      sameSite: "lax",
      path: "/",
    })
    .status(200)
    .json("User has been logged out.");
  
};

export const checkAuth = (req, res) => {
  // console.log("hello from checkAuth");
  // console.log("cookies:", req.cookies);
  const token = req.cookies.accessToken;
  // console.log("accessToken from cookie:", token);

  if (!token) return res.status(200).json({ isAuthenticated: false });

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) {
      // console.log("JWT verify error:", err);
      return res.status(200).json({ isAuthenticated: false });
    }
    // console.log("JWT user:", user);
    return res
      .status(200)
      .json({ isAuthenticated: true, user_id: user.user_id });
  });
};
