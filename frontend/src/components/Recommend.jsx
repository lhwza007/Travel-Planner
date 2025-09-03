import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Recommend.css";
import ParkDetail from "../pages/Park-Detail";
import { useNavigate } from "react-router-dom";

export default function Recommend() {
  const navigate = useNavigate();
  const [recommend, setRecommend] = useState([
    {
      park_id: 1,
      name: "อุทยานแห่งชาติเขาใหญ่",
      count: 8,
      imgPath: "view.jpg",
      address: "อุทยานแห่งชาติเขาใหญ่, Thailand",
      tel: "044-297-133",
      email: "khaoyai@gmail.com",
    },
    {
      park_id: 2,
      name: "อุทยานแห่งชาติดอยอินทนนท์",
      count: 8,
      imgPath: "view.jpg",
      address: "อุทยานแห่งชาติดอยอินทนนท์, Thailand",
      tel: "055-297-134",
      email: "doi_intanon@gmail.com",
    },
    {
      park_id: 3,
      name: "อุทยานแห่งชาติภูกระดึง",
      count: 8,
      imgPath: "view.jpg",
      address: "อุทยานแห่งชาติภูกระดึง, Thailand",
      tel: "089-892-921",
      email: "phukradeung@gmail.com",
    },
    {
      park_id: 4,
      name: "อุทยานแห่งชาติหมู่เกาะสิมิลัน",
      count: 8,
      imgPath: "view.jpg",
      address: "อุทยานแห่งชาติหมู่เกาะสิมิลัน, Thailand",
      tel: "022-532-005",
      email: "simiran@gmail.com",
    },
  ]);

  function handleCardClick(item) {
    // console.log("Card Clicked! Navigating with data:", item);
    navigate("/park-detail", { state: { parkData: item } });
  }

  return (
    <>
      <Container>
        <div className="head">Recommend for you...</div>
        <Row>
          {recommend.map((item) => (
            // อยากให้คลิกที่การ์ดแล้วไปหน้า ParkDetail
            <Col md={3} sm={6} key={item.park_id}>
              <div
                className="recommendCard"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(255,0,0,0) 0%, rgba(255,0,0,0) 60%, rgba(0, 0, 0, 1)), url(/${item.imgPath})`,
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick(item)}
              >
                <div className="cardDetails">
                  <div style={{ marginRight: "10px" }}>{item.name}</div>
                  <div style={{ whiteSpace: "nowrap" }}>
                    {item.count} {item.count > 1 ? "Plans" : "Plan"}
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
