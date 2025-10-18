import { useState, useEffect } from "react";
import axios from "axios";
import { checkAuth } from "../../context/checkAuth.jsx";
import { useNavigate } from "react-router-dom";

export default function Comment({ planId, user }) {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    verify();
    fetchComments();
  }, [planId]); 

  async function verify() {
    const result = await checkAuth();
    setIsAuthenticated(result);
  }

  const fetchComments = () => {
    if (!planId) return;
    axios
      .get("http://localhost:8800/api/comments/getComment", 
        { params: { comment_plan_id: planId } }) 
      .then((res) => {
        console.log("Comments fetched:", res.data); 
        setComments(res.data);
      })
      .catch((err) => console.error("Fetch comments error:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated || !user) return;

    axios
      .post("http://localhost:8800/api/comments/insertComment", {
        comment_user_id: user.user_id,        
        comment_plan_id: planId,              
        comment_text: newComment,             
      })
      .then((res) => {
        console.log("Comment added:", res.data); 
        
        
        const newCommentObj = {
          comment_id: Date.now(), // temporary ID
          comment_text: newComment,
          comment_created_at: new Date().toISOString(),
          user_firstName: user.user_firstName,
          user_lastName: user.user_lastName,
          user_pfp: user.user_pfp,
        };
        
        setComments([newCommentObj, ...comments]); 
        setNewComment("");
      })
      .catch((err) => console.error("Add comment error:", err));
  };

  if (!isAuthenticated) {
    return (
      <div className="commentSection mt-3">
        
        {navigate("/login")}
      </div>
    );
  }

  return (
    <div className="commentSection mt-3">
      {/* Form ใส่คอมเมนต์ */}
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="แชร์ความคิดเห็นของคุณ..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="btn" type="submit" disabled={!newComment.trim()} style={{color:"white",backgroundColor:"#97b37fff" }} >
            ส่ง
          </button>
        </div>
      </form>

      {/* รายการคอมเมนต์ */}
      <div className="commentsList">
        {comments.length === 0 ? (
          <p className="text-muted">ยังไม่มีคอมเมนต์</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.comment_id} className="commentItem mb-2 p-2 border-bottom">
              <div className="d-flex align-items-start">
                {/* Profile Picture */}
                <img
                  src={
                    comment.user_pfp 
                      ? `http://localhost:8800/uploads/${comment.user_pfp}`
                      : "/placeholderPfp.jpg"
                  }
                  alt="Profile"
                  className="rounded-circle me-2"
                  style={{ width: "30px", height: "30px" }}
                />
                {/* Comment Content */}
                <div className="flex-grow-1">
                  <strong>
                    {comment.user_firstName} {comment.user_lastName}:
                  </strong>{" "}
                  {comment.comment_text}
                  <br />
                  <small className="text-muted">
                    {new Date(comment.comment_created_at).toLocaleString("th-TH")}
                  </small>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}