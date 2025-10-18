import { db } from "../connect.js";

// http://localhost:8800/api/comments/insertComment
export const InsertComment=(req,res)=>{
    const {comment_user_id,comment_plan_id,comment_text} = req.body
    const sql ="INSERT INTO comments (comment_user_id,comment_plan_id,comment_text) VALUE(?,?,?)"

    db.query(sql,[comment_user_id,comment_plan_id,comment_text],(error,result)=>{
        if(error) return res.json(error);
        return res.status(200).json("Insert Comment successfully");
    })


}

// http://localhost:8800/api/comments/getComment
export const GetComment=(req,res)=>{
    const comment_plan_id = req.query.comment_plan_id

    const sql =`SELECT comments.comment_id, comments.comment_text, comments.comment_created_at, users.user_firstName, users.user_lastName, users.user_pfp 
                FROM comments
                LEFT JOIN users ON comments.comment_user_id = users.user_id
                WHERE comments.comment_plan_id = ? ;`

    db.query(sql,[comment_plan_id],(error,result)=>{

        if(error) return res.json(error);
        return res.status(200).json(result);
    })


}