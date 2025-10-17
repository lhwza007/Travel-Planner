import "./ProfileCard.css";
import pfp from "../assets/testPfp.jpg";
import { Button } from "react-bootstrap";
import { FaRegCalendarAlt, FaClipboardList } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router";
import InfoChangingModal from "./InfoChangingModal.jsx";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import UploadPfpModal from "./uploadPfpModal.jsx";

export default function ProfileCard(props) {
  const [modalShow, setModalShow] = useState(false);
  const [uploadPfpModal, setUploadPfpModal] = useState(false);
  const userData = props.propsData; // propsตัวหน้าคือparamiter, .propsตัวหลังคือค่าที่ส่งมา
  const count = props.propsCount;
  const userPfp = userData.user_pfp;
  const [isUser, setIsUser] = useState(false); //เช็คว่าเป็นเจ้าของโปรไฟล์ไหม
  const currentUser = JSON.parse(localStorage.getItem("user")).user_id;
  const navigate = useNavigate();

  console.log("userData in ProfileCard: ", userData);

  return (
    <>
      <div className="profileCardContainer">
        <div
          className="cover"
          style={{ backgroundImage: "url(/view.jpg)" }}
        ></div>
        <div className="pfpOverlay">
          <div className="profileImg">
            {
              userPfp ? (
                <img
                  src={`http://localhost:8800/uploads/${userData.user_pfp}`}
                  alt={`${userData.user_name} profile picture`}
                />
              ) : (
                <img
                  src={`/placeholderPfp.jpg`}
                  alt={`${userData.user_name} profile picture`}
                />
              )
            }
          </div>
          {userData?.user_id === currentUser && (
            <div
              className="pfpChangingIcon"
              onClick={() => setUploadPfpModal(true)}
            >
              <IoIosImages style={{ width: "100%", height: "100%" }} />
            </div>
          )}
        </div>
        <div className="bottom">
          <div className="info">
            <h3>
              {userData.user_firstName} {userData.user_lastName}
            </h3>
            <div
              className="joined"
              style={{
                marginLeft: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaRegCalendarAlt
                style={{
                  color: "grey",
                  width: "20px",
                  height: "20px",
                  marginRight: "5px",
                }}
              />
              เข้าร่วมเมื่อ {userData.user_timeStamp?.split("T")[0]}
            </div>
            <div
              className="planCount"
              style={{
                marginLeft: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaClipboardList
                style={{
                  color: "grey",
                  width: "20px",
                  height: "20px",
                  marginRight: "5px",
                }}
              />
              {count} Plans
            </div>
          </div>
          <div style={{ height: "fit-content" }}>
            {userData?.user_id === currentUser && (
              <Button
                style={{ backgroundColor: "#495A3A", border: "none" }}
                onClick={() => setModalShow(true)}
              >
                แก้ไขโปรไฟล์
              </Button>
            )}
            {userData?.user_id !== currentUser && (
              <Button
                style={{ backgroundColor: "#495A3A", border: "none" }}
                onClick={() =>
                  navigate("/messages", { state: { receiverData: userData } })
                }
              >
                <FaFacebookMessenger /> ข้อความ
              </Button>
            )}
          </div>
        </div>
      </div>
      <InfoChangingModal show={modalShow} onHide={() => setModalShow(false)} />
      <UploadPfpModal
        show={uploadPfpModal}
        onHide={() => setUploadPfpModal(false)}
      />
    </>
  );
}
