import { db } from "../connect.js";
import bcrypt from "bcryptjs";
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
      "INSERT INTO users(user_name, user_password) VALUES(?, ?)";

    db.query(q, [req.body.username, hashedPassword], (err, data) => {
      if (err) return res.status(500).json(err);

      // ส่ง status ว่า query สำเร็จ
      return res.status(200).json("Account has been created.");
    });
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
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  // เคลียร์ cookie
  res
    .clearCookie("accessToken", {
      secure: true,
      sameStie: "none",
    })
    .status(200)
    .json("User has been logged out.");
};
