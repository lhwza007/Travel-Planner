import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { LuMapPin } from "react-icons/lu";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MultiRouteMap from "./Map.jsx";

export default function ParkDetailCard({ park_id }) {
  const navigate = useNavigate();
  const [parkData, setParkData] = useState([]);
  const [parkImg, setParkImg] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/getData/parkData",
        { params: { park_id: park_id } }
      );
      setParkData(response.data);
    } catch (error) {
      console.error("Error fetching park data:", error);
    }
  };

  const fetchImg = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/getData/parkImg",
        { params: { park_id: park_id } }
      );
      setParkImg(response.data);
    } catch (error) {
      console.error("Error fetching park data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchImg();
  }, []);

  function handleClick(parkData) {
    navigate("/planning", { state: { parkData: parkData } });
  }

  // console.log("park data:", parkData);
  // console.log("park img:", parkImg);

  return (
    <Card className="container  mt-4 planCard shadow p-3 mb-3  ">
      <Card.Body>
        <div className="park-detail-card">
          <h1>{parkData.park_name}</h1>
          <Row className="mb-3 mt-3">
            {parkImg.map((img) => (
              <Col md={4} sm={12} key={img.parkImg_id}>
                <div
                  className="rounded"
                  style={{
                    width: "auto",
                    height: "200px",
                    marginBottom: "10px",
                    backgroundImage: `url(${img.parkImg_src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </Col>
            ))}
          </Row>
          <p>
            <LuMapPin /> ที่อยู่:{" "}
            {parkData.park_location ? parkData.park_location : "ไม่มีข้อมูล"}
          </p>
          <p>
            <BsTelephone /> เบอร์โทร:{" "}
            {parkData.park_phone ? parkData.park_phone : "ไม่มีข้อมูล"}
          </p>
          <p>
            <MdOutlineMailOutline /> อีเมล:{" "}
            {parkData.park_email ? parkData.park_email : "ไม่มีข้อมูล"}
          </p>
          <p>
            <MdOutlineMailOutline /> กิจกรรม:{" "}
            {parkData.park_activity ? parkData.park_activity : "ไม่มีข้อมูล"}
          </p>
          <p>
            <MdOutlineMailOutline /> ลักษณะชีวนิเวศน์:{" "}
            {parkData.park_biome ? parkData.park_biome : "ไม่มีข้อมูล"}
          </p>
          <p>
            <MdOutlineMailOutline /> สัตว์ป่า:{" "}
            {parkData.park_animal ? parkData.park_animal : "ไม่มีข้อมูล"}
          </p>
          <p>
            <MdOutlineMailOutline /> ค่าธรรมเนียม:{" "}
            {parkData.park_fee ? parkData.park_fee : "ไม่มีข้อมูล"}
          </p>

          <MultiRouteMap />

          <div className="d-flex justify-content-end">
            <button
              className="btn"
              style={{ backgroundColor: "#495A3A", color: "white" }}
              onClick={() => handleClick(parkData)}
            >
              เริ่มวางแผน
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
