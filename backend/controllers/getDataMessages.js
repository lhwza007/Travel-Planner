import { db } from "../connect.js";

export const ListName = (req,res) => {
    const user_id = req.query.user_id
    
    const sql = `SELECT users.user_id, user_firstName, user_lastName
    FROM users 
    WHERE user_id IN (SELECT    DISTINCT CASE WHEN sender_id = ? THEN receiver_id 
                                ELSE sender_id END 
                        
                                FROM messages 
                                WHERE sender_id = ? OR receiver_id = ?)`;
    
    db.query(sql,[user_id,user_id,user_id],(err,result)=>{
        if(err) return res.json(err);
        return res.status(200).json(result);
    });

};


export const GetDetailMessage = (req,res)=>{

    const sender_id = req.query.sender_id;
    const receiver_id = req.query.receiver_id;

    const sql = `SELECT * FROM messages
    WHERE (sender_id = ? AND receiver_id = ?)
    OR (sender_id = ? AND receiver_id = ?)
    ORDER BY created_at ASC`;

    db.query(sql,[sender_id,receiver_id,receiver_id,sender_id],(err,result)=>{
        if(err) return res.json(err);
        return res.status(200).json(result);
    });



}
   