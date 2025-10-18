import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaComment, FaShare } from "react-icons/fa";
import axios from "axios";
import { checkAuth } from "../../context/checkAuth.jsx";
import ShareModal from "./ShareModal.jsx";
import Comment from "./Comment.jsx";
import "./PlanPost.css";
import { LuMapPin } from "react-icons/lu";

export default function PlanDetail({ plan_id }) {
  const [planData, setPlanData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // ตรวจสอบการยืนยันตัวตน
  const verify = async () => {
    const result = await checkAuth();
    setIsAuthenticated(result);
  };

  useEffect(() => {
    verify();
    fetchData();
  }, []);

  // ดึงข้อมูลแผนการเดินทาง
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/getData/planDetail",
        {
          params: { plan_id: plan_id },
        }
      );
      setPlanData(response.data[0]);
    } catch (error) {
      console.log("Error fetching plan details:", error);
    }
  };

  // ดึงสถานะ Favorite
  const getFavoriteStatus = () => {
    if (!user || isAuthenticated === false) return;
    axios
      .get("http://localhost:8800/api/favorite/getFavoriteStatus", {
        params: {
          user_id: user.user_id,
          plan_id: plan_id,
        },
      })
      .then((res) => setIsFavorite(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (planData) {
      getFavoriteStatus();
    }
  }, [planData]);

  // สลับสถานะ Favorite
  const toggleFavorite = (e) => {
    e.preventDefault();
    if (!user || isAuthenticated === false) {
      navigate("/login");
      return;
    }

    if (!isFavorite) {
      axios
        .post("http://localhost:8800/api/favorite/addFavorite", {
          user_id: user.user_id,
          plan_id: plan_id,
        })
        .then(() => setIsFavorite(true))
        .catch((err) => console.error(err));
    } else {
      axios
        .post("http://localhost:8800/api/favorite/removeFavorite", {
          user_id: user.user_id,
          plan_id: plan_id,
        })
        .then(() => setIsFavorite(false))
        .catch((err) => console.error(err));
    }
  };

  // ข้อมูลสำหรับ ShareModal
  const shareData = {
    sender_id: user?.user_id || null,
    share_plan_id: plan_id,
    share_plan_name: planData?.plan_name,
    share_park_name: planData?.park_name,
  };

  const handleOpenModal = () => {
    if (isAuthenticated) {
      setModalShow(true);
    } else {
      navigate("/login");
    }
  };

  const handleProfileClick = (user_id) => {
    navigate(`/profile?user_id=${user_id}`);
  };

  if (!planData) {
    return <div>Loading...</div>;
  }

  const isCurrentUser = false;

  return (
    <>
      <div className="container mb-4 planCard">
        <div className="planCardHeader">
          <div className="profile">
            <div className="profileimg">
              {planData.user_pfp ? (
                <img
                  src={`http://localhost:8800/uploads/${planData.user_pfp}`}
                  alt={`${planData.user_name} profile picture`}
                />
              ) : (
                <img
                  src={`/placeholderPfp.jpg`}
                  alt={`${planData.user_name} profile picture`}
                />
              )}
            </div>
            <div className="nameAndPvStatus">
              <h4
                className="user_name"
                onClick={() => handleProfileClick(planData.user_id)}
                style={{ margin: "0", padding: "0", marginLeft: "20px" }}
              >
                {planData.user_firstName} {planData.user_lastName}
              </h4>
              <p
                className="timeTag"
                style={{ margin: "0", padding: "0", marginLeft: "20px" }}
              >
                {new Date(planData.plan_timeStamp).toLocaleString("th-TH")}
              </p>
            </div>
          </div>
        </div>

        <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
          {planData.park_name}
        </div>
        <div className="plan_name">{planData.plan_name}</div>

        <div className="activities">
          <ul>
            {planData.activities.map((activity) => (
              <li key={activity.activity_id}>
                <div className="activityDetails">
                  <div>
                    {activity.activity_name}&nbsp;&nbsp;
                    {activity.parkplace_name ? (
                      <>
                        <LuMapPin />
                        {activity.parkplace_name}
                      </>
                    ) : null}
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
              style={{
                color: isFavorite ? "orange" : "grey",
                width: "25px",
                marginBottom: "1px",
              }}
            />
            ถูกใจ
          </div>
          <div className="group">
            <div className="commentButton">
              <FaComment
                alt="comment"
                style={{
                  cursor: "pointer",
                  color: "grey",
                }}
                onClick={() => setShowComments(!showComments)}
              />
            </div>

            {/* ปุ่มเปิด Modal */}

            <div className="shareButton">
              <FaShare
                alt="share"
                onClick={handleOpenModal}
                style={{
                  cursor: "pointer",
                  color: "grey",
                }}
              />
            </div>
          </div>
        </div>

        {/*Comment */}
        {showComments && <Comment planId={plan_id} user={user} />}
      </div>

      {/* ShareModal */}
      {isAuthenticated ? (
        <ShareModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          shareData={shareData}
        />
      ) : (
        <div></div>
      )}
    </>
  );
}
