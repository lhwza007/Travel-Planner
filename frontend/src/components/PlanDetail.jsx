import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button } from 'react-bootstrap';
import personpfp from "../assets/personTest.svg";
import money from "../assets/money.svg";
import comment from "../assets/comment.svg";
import star from "../assets/star.svg";
import share from "../assets/share.svg";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { checkAuth } from "../../context/checkAuth.jsx";
import ShareModal from "./ShareModal.jsx";
import "./PlanPost.css"; // นำเข้า CSS เดียวกัน

export default function PlanDetail({ plan_id }) {
  const [planData, setPlanData] = useState(null); // เปลี่ยนจาก array เป็น null เพราะรับ object เดียว
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [modalShow, setModalShow] = useState(false);
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
      const response = await axios.get("http://localhost:8800/api/getData/planDetail", {
        params: { plan_id: plan_id },
      });
      setPlanData(response.data[0]); // สมมติว่า API ส่งกลับ array และเราต้องการ object แรก
    } catch (error) {
      console.log("Error fetching plan details:", error);
    }
  };
  console.log("plandata",planData)

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

  if (!planData) {
    return <div>Loading...</div>;
  }
  const isCurrentUser = false
   const handleProfileClick = (user_id) => {
    navigate(`/profile?user_id=${user_id}`);
  };
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
                {isCurrentUser && (
                  <p
                    className="privateTag"
                    style={{ margin: "0", padding: "0", marginLeft: "20px" }}
                  >
                    {showPlanPrivacy === 1 ? "ส่วนตัว" : "สาธารณะ"}
                  </p>
                )}
              </div>
            </div>
            {isCurrentUser && (
              <div className="dropdown">
                <Dropdown align="end">
                  <Dropdown.Toggle
                    bsPrefix="no-caret btn"
                    variant="light"
                    className="border-0 bg-transparent p-1"
                    id="dropdown-custom"
                  >
                    <BsThreeDotsVertical size={20} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="shadow rounded-3">
                    {showPlanPrivacy === 1 ? (
                      <Dropdown.Item
                        onClick={() =>
                          handleChangePrivacy(planData.plan_id, showPlanPrivacy)
                        }
                      >
                        แสดงโพสต์นี้
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item
                        onClick={() =>
                          handleChangePrivacy(planData.plan_id, showPlanPrivacy)
                        }
                      >
                        ซ่อนโพสต์นี้
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item
                      onClick={() => handleDeletePost(planData.plan_id)}
                    >
                      ลบโพสต์นี้
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </div>

          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
            {planData.park_name}
          </div>
          <div className="plan_name">{planData.plan_name}</div>

          {/* <div className="planBudget">
          <img
            src={money}
            alt="budget"
            style={{ width: "20px", marginRight: "10px" }}
          />
          test
        </div> */}

          <div className="activities">
            <ul>
              {planData.activities.map((activity) => (
                <li key={activity.activity_id}>
                  <div className="activityDetails">
                    <div>
                      {activity.activity_name} ({activity.parkplace_name})
                    </div>
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
                style={{
                  color: isFavorite ? "orange" : "grey",
                  width: "25px",
                  marginBottom: "1px",
                }}
              />
              Favorite
            </div>
            <div className="group">
              <img src={comment} alt="comment" />

              {/* ปุ่มเปิด Modal */}

              <img
                src={share}
                alt="share"
                onClick={handleOpenModal}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      

      {/* เรียกใช้ ShareModal */}
      {isAuthenticated ? (
        <ShareModal
          show={modalShow} //กำหนดสถานะการแสดงผล
          onHide={() => setModalShow(false)} //ฟังก์ชันที่จะทำงานเมื่อต้องการปิด Modal
          shareData={shareData} // ข้อมูลที่ส่งให้ Modal
        />
      ) : (
        <div></div>
      )}
    </>
  );
}