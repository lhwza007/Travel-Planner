import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Park-lists.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ParkList() {
  const [parkData, setParkData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/getData/plansAndCounts"
      );
      setParkData(response.data);
    } catch (error) {
      console.error("Error fetching park data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log("park data:", parkData);

  function handleCardClick(park_id) {
    // console.log("Card Clicked! Navigating with data:", park);
    navigate("/park-detail", { state: { park_id: park_id } });
  }

  return (
    <>
      <Container>
        <Row>
          {parkData.map((park) => (
            // อยากให้คลิกที่การ์ดแล้วไปหน้า ParkDetail
            <Col md={3} sm={6} key={park.park_id}>
              <div
                className="parkListCard"
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
