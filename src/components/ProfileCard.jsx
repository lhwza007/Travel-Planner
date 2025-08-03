import "../components/ProfileCard.css";
import pfp from "../assets/testPfp.jpg";
import { Button } from "react-bootstrap";
import { FaRegCalendarAlt, FaClipboardList } from "react-icons/fa";

export default function ProfileCard() {
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
            <h3>UserFirstName UserLastName</h3>
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
              เข้าร่วมเมื่อ มกราคม 2025
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
              n Plans
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
