import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import personpfp from "../assets/personTest.svg";
import comment from "../assets/comment.svg";
import share from "../assets/share.svg";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { checkAuth } from "../../context/checkAuth.jsx";
import ShareModal from "./ShareModal.jsx";
import { Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import Comment from "./Comment.jsx";
import {SweetalertSuccNoReload,SweetalertErrNoReload,} from "./Sweetalert.jsx";
import { LuMapPin } from "react-icons/lu";

export default function PlanPost({ planData, isCurrentUser }) {
  const [showComments, setShowComments] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [showPlanPrivacy, setShowPlanPrivacy] = useState(
    planData.plan_isPrivate === 1 ? 1 : 0
  );
  const [isDeleted, setIsDeleted] = useState(false);
  const user_pfp = planData.user_pfp;

  async function verify() {
    const result = await checkAuth();
    setIsAuthenticated(result);
  }
  verify();

  // console.log(user.user_id); // "123"
  // const handleOpenModal = () => setModalShow(true);

  const handleOpenModal = () => {
    if (isAuthenticated) {
      return setModalShow(true);
    } else {
      return navigate("/login");
    }
  };

  const handleCloseModal = () => setModalShow(false);

  useEffect(() => {
    getFavoriteStatus();
  }, []);

  // ดึงสถานะ isFavorite ของแผนการเดินทางนั้นๆ
  const getFavoriteStatus = () => {
    if (!user || isAuthenticated === false) return;
    axios
      .get("http://localhost:8800/api/favorite/getFavoriteStatus", {
        params: {
          user_id: user.user_id,
          plan_id: planData.plan_id,
        },
      })
      .then((res) => setIsFavorite(res.data))
      .catch((err) => console.error(err));
  };

  const toggleFavorite = (e) => {
    e.preventDefault();

    if (!user || isAuthenticated === false) {
      navigate("/login");
      return;
    }

    // ถ้าข้อมูลที่ fetch มา isFavorite status = false ให้เพิ่ม favorite
    if (!isFavorite) {
      axios
        .post("http://localhost:8800/api/favorite/addFavorite", {
          user_id: user.user_id,
          plan_id: planData.plan_id,
        })
        .then(
          (
            res //console.log("Success", res.data.success),
          ) => setIsFavorite(!isFavorite)
        )
        .catch((err) => console.error(err));
    } else {
      // ถ้า isFavorite status = true ให้ลบ favorite
      axios
        .post("http://localhost:8800/api/favorite/removeFavorite", {
          user_id: user.user_id,
          plan_id: planData.plan_id,
        })
        .then(
          (
            res //console.log("Removed", res.data),
          ) => setIsFavorite(!isFavorite)
        )
        .catch((err) => console.error(err));
    }
  };

  const [shareData, setShareData] = useState({
    sender_id: user?.user_id || null,
    share_plan_id: planData.plan_id,
    share_plan_name: planData.plan_name,
    share_park_name: planData.park_name,
  });

  // console.log(planData);

  const handleProfileClick = (user_id) => {
    navigate(`/profile?user_id=${user_id}`);
  };

  const handleChangePrivacy = (plan_id, plan_isPrivate) => {
    // console.log("change privacy for plan id: ", plan_id);
    // console.log("plan privacy: ", plan_isPrivate);

    axios
      .patch(`http://localhost:8800/api/updateData/updatePlanPrivacy`, {
        plan_id: plan_id,
        plan_isPrivate: plan_isPrivate,
      })
      .then((res) => {
        if (res.data.success) {
          if (showPlanPrivacy === 1) {
            setShowPlanPrivacy(0);
          } else {
            setShowPlanPrivacy(1);
          }
          SweetalertSuccNoReload(res.data.message);
        } else {
          SweetalertErrNoReload(res.data.message);
          return;
        }
      })
      .catch((err) => {
        console.error(err);
        SweetalertErr(err);
      });
  };

  const handleDeletePost = (plan_id) => {
    console.log("delete plan id: ", plan_id);
    axios
      .delete(`http://localhost:8800/api/deleteData/deletePost`, {
        params: {
          plan_id: plan_id,
        },
      })
      .then((res) => {
        if (res.data.success) {
          SweetalertSuccNoReload(res.data.message);
          setIsDeleted(true);
        } else {
          SweetalertErrNoReload(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        SweetalertErrNoReload("ผิดที่ axios");
      });
  };

  // console.log("plandata ", planData);

  return (
    <>
      {isDeleted ? (
        <div className="container mb-4 planCard d-flex align-items-center">
          Post was deleted
        </div>
      ) : (
        <div className="container mb-4 planCard">
          <div className="planCardHeader">
            <div className="profile">
              <div className="profileimg">
                {user_pfp ? (
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

                      {activity.activity_name}&nbsp;&nbsp;
                      {activity.parkplace_name?(
                        <>
                          <LuMapPin/>{activity.parkplace_name}
                        </>

                      ):(
                        null
                      )
                      }
                      
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
              <img 
                src={comment} 
                alt="comment" 
                style={{ cursor: "pointer" }}
                onClick={() => setShowComments(!showComments)} // ← เพิ่ม
              />

              {/* ปุ่มเปิด Modal */}

              <img
                src={share}
                alt="share"
                onClick={handleOpenModal}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          {showComments && (
            <Comment  planId={planData.plan_id}  user={user} />
          )}
        </div>
      )}

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
