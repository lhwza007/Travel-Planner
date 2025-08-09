import { db } from "../connect.js"
import bcrypt from 'bcryptjs'

export const register = (req, res) => {
    
    // check acc if exists
    const q = "SELECT * FROM accounts WHERE account_name = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);

        // เช็คว่ามีข้อมูลหรือยัง แล้วส่ง status
        if (data.length) return res.status(409).json("User is already exists");
        
        // ใช้ salt ในการ hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO accounts(account_name, account_password) VALUES(?, ?)"

        db.query(q, [req.body.username, hashedPassword], (err, data) => {
            if (err) return res.status(500).json(err);

            // ส่ง status ว่า query สำเร็จ
            return res.status(200).json("Account has been created.")
        });

    })




}

export const login = (req, res) => {

}

export const logout = (req, res) => {
    
}