import {db} from "../connect.js";

export const InsertMessage = (req,res)=>{
    const {sender_id, receiver_id,message_text,message_type} = req.body;
    const sql = "INSERT INTO messages (sender_id, receiver_id,message_text,message_type) VALUES (?,?,?,?)";

    db.query(sql,[sender_id,receiver_id,message_text,message_type],(err,result)=>{
        
        if(err) return res.json(err);
        return res.status(200).json("Insert message successfully");

    })
}