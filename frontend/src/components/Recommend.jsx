import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Recommend.css";
import ParkDetail from "../pages/Park-Detail";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


export default function Recommend() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user")); //ดึงข้อมูลจาก local storage เป็น object
  console.log(userData);
  console.log("user_level:", userData.user_level);
  console.log("user_age:", userData.user_age);

  const [parkData, setParkData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/getData/recommendByLLM",{ params: { user_level: userData.user_level ,user_age:userData.user_age} }
      );
      setParkData(response.data);
    } catch (error) {
      console.error("Error fetching park data:", error);
    }
  };

  useEffect(() => {
      fetchData();
    }, []);

  console.log(parkData);


  function handleCardClick(park_id) {
    // console.log("Card Clicked! Navigating with data:", park);
    navigate("/park-detail", { state: { park_id: park_id } });
  }

  return (
    <>
      <Container>
        <div className="head">Recommend for you by AI...</div>
        <Row>
          {parkData.map((park) => (
            // อยากให้คลิกที่การ์ดแล้วไปหน้า ParkDetail
            <Col md={3} sm={6} key={park.park_id}>
              <div
                className="recommendCard"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(255,0,0,0) 0%, rgba(255,0,0,0) 60%, rgba(0, 0, 0, 1)), url(${park.parkImg_src})`,
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick(park.park_id)}
              >
                <div className="cardDetails">
                  <div style={{ marginRight: "10px" }}>{park.park_name}</div>
                  <div style={{ whiteSpace: "nowrap" }}>
                    {park.plan_count} {park.plan_count > 1 ? "Plans" : "Plan"}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
