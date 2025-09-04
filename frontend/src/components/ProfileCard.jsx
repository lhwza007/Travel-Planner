import "../components/ProfileCard.css";
import pfp from "../assets/testPfp.jpg";
import { Button } from "react-bootstrap";
import { FaRegCalendarAlt, FaClipboardList } from "react-icons/fa";
import { use, useEffect } from "react";

export default function ProfileCard(props) {

  const userData = props.propsData; // propsตัวหน้าคือparamiter, .propsตัวหลังคือค่าที่ส่งมา
  const count = props.propsCount;
  return (
    <>
      <div className="profileCardContainer">
        <div
          className="cover"
          style={{ backgroundImage: "url(/view.jpg)" }}
        ></div>
        <div className="profileImg">
          <img src={pfp} alt="" />
        </div>
        <div className="bottom">
          <div className="info">
            <h3>{userData.user_firstName} {userData.user_lastName}</h3>
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
              เข้าร่วมเมื่อ {userData.user_timeStamp.split("T")[0]}
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
          <div>
            <Button variant="success">แก้ไขโปรไฟล์</Button>
          </div>
        </div>
      </div>
    </>
  );
}
