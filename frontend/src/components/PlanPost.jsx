import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button } from 'react-bootstrap';
import personpfp from "../assets/personTest.svg";
import money from "../assets/money.svg";
import comment from "../assets/comment.svg";
import star from "../assets/star.svg";
import share from "../assets/share.svg";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";
import "./PlanPost.css";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { checkAuth } from "../../context/checkAuth.jsx";
import ShareModal from "./ShareModal.jsx";

export default function PlanPost({ planData }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = async () => await checkAuth();
  const navigate = useNavigate();

  // console.log(isAuthenticated);
  // console.log(user.user_id); // "123"

  
  const [modalShow, setModalShow] = useState(false);

  const handleOpenModal = () => setModalShow(true);
  const handleCloseModal = () => setModalShow(false);



  useEffect(() => {
    getFavoriteStatus();
  }, []);

  // ดึงสถานะ isFavorite ของแผนการเดินทางนั้นๆ
  const getFavoriteStatus = () => {
    if (!user || isAuthenticated === false ) return;
    axios
      .get("http://localhost:8800/api/favorite/getFavoriteStatus", {
        params: {
          user_id: user.user_id,
          plan_id: planData.plan_id
        }
      })
      .then((res) => setIsFavorite(res.data))
      .catch((err) => console.error(err));
  }

  const toggleFavorite = (e) => {
    e.preventDefault();

    if (!user || isAuthenticated === false ) {
      navigate("/login");
      return;
    }

    // ถ้าข้อมูลที่ fetch มา isFavorite status = false ให้เพิ่ม favorite
    if (!isFavorite) {
      axios
        .post("http://localhost:8800/api/favorite/addFavorite", {
          user_id: user.user_id,
          plan_id: planData.plan_id})
        .then((res) => //console.log("Success", res.data.success),
          setIsFavorite(!isFavorite)
        )
        .catch((err) => console.error(err));
    } else { // ถ้า isFavorite status = true ให้ลบ favorite
      axios
        .post("http://localhost:8800/api/favorite/removeFavorite", {
          user_id: user.user_id,
          plan_id: planData.plan_id})
        .then((res) => //console.log("Removed", res.data),
          setIsFavorite(!isFavorite)
        )
        .catch((err) => console.error(err));
    }

    

  }
  const [shareData, setShareData] = useState({
        sender_id: user.user_id,
        share_plan_id: planData.plan_id,
        share_plan_name: planData.plan_name,
        share_park_name: planData.park_name
    });
    

  return (
    <>
        <div className="container mb-4 planCard">
          <div className="planCardHeader">
            <div className="profile">
              <img src={personpfp} alt="pfp" style={{ width: "50px" }} />
              <p className="user_name">{planData.user_name}</p>
            </div>
          </div>

          <div style={{ fontWeight:"bold", marginBottom:"10px" }}>{planData.park_name}</div>
          <div className="plan_name">{planData.plan_name}</div>

          <div className="planBudget">
            <img
              src={money}
              alt="budget"
              style={{ width: "20px", marginRight: "10px" }}
            />
            test
          </div>

          <div className="activities">
            <ul>
              {planData.activities.map((activity) => (
                <li key={activity.activity_id}>
                  <div className="activityDetails">
                    <div>{activity.activity_name}</div>
                    <div>
                      {activity.activity_start} - {activity.activity_end}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <hr />

          <div className="actionBar">
            <div className="favoriteGroup" onClick={toggleFavorite}>
              <FaStar 
                style={{color:isFavorite? "orange": "grey", width:"25px", marginBottom:"1px"}}
              />
              Favorite
            </div>
            <div className="group">
              <img src={comment} alt="comment" />
              <img src={share} alt="share" onClick={handleOpenModal} /> {/* ปุ่มเปิด Modal */}
            </div>
          </div>
        </div>



      {/* เรียกใช้ ShareModal */}
      <ShareModal
        show={modalShow}          // Prop: กำหนดสถานะการแสดงผล
        onHide={() => setModalShow(false)} // Prop: ฟังก์ชันที่จะทำงานเมื่อต้องการปิด Modal
        shareData={shareData} // Prop: เนื้อหาภายใน Modal
      />

    </>
  );
}

