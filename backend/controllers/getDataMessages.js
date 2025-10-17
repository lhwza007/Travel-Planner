import { db } from "../connect.js";

export const ListName = (req,res) => {
    const user_id = req.query.user_id
    //เรียงตามเวลาข้อความล่าสุด MAX() 1 อัน
    const sql = `
        SELECT 
            users.user_id, 
            users.user_firstName, 
            users.user_lastName,
            users.user_pfp,
            MAX(messages.created_at) AS last_message_time
        FROM 
            users 
        JOIN 
            messages
        ON 
            (messages.sender_id = users.user_id AND messages.receiver_id = ?) OR 
            (messages.receiver_id = users.user_id AND messages.sender_id = ?)
        WHERE 
            users.user_id != ?
        GROUP BY
            users.user_id, users.user_firstName, users.user_lastName
        ORDER BY 
            last_message_time DESC;
    `;
    
    db.query(sql,[user_id,user_id,user_id],(err,result)=>{
        if(err) return res.json(err);
        return res.status(200).json(result);
    });

};


export const GetDetailMessage = (req,res)=>{

    const sender_id = req.query.sender_id;
    const receiver_id = req.query.receiver_id;

    const sql = `SELECT messages.*,plans.plan_isPrivate 
                    FROM messages
                    LEFT JOIN plans ON messages.share_plan_id = plans.plan_id
                    WHERE (sender_id = ? AND receiver_id = ?)
                    OR (sender_id = ? AND receiver_id = ?)
                    ORDER BY created_at ASC`;

    db.query(sql,[sender_id,receiver_id,receiver_id,sender_id],(err,result)=>{
        if(err) return res.json(err);
        return res.status(200).json(result);
    });



}
   