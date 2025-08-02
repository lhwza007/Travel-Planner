import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Recommend.css";

export default function Recommend() {
  const [recommend, setRecommend] = useState([
    {
      id: 1,
      name: "อุทยานแห่งชาติเขาใหญ่",
      count: 8,
      imgPath: "view.jpg",
    },
    {
      id: 2,
      name: "อุทยานแห่งชาติดอยอินทนนท์",
      count: 8,
      imgPath: "view.jpg",
    },
    {
      id: 3,
      name: "อุทยานแห่งชาติภูกระดึง",
      count: 8,
      imgPath: "view.jpg",
    },
    {
      id: 4,
      name: "อุทยานแห่งชาติหมู่เกาะสิมิลัน",
      count: 8,
      imgPath: "view.jpg",
    },
  ]);

  return (
    <>
      <Container>
        <div className="head">Recommend for you...</div>
        <Row>
          {recommend.map((item) => (
            <Col md={3} sm={6} key={item.id}>
              <div
                className="recommendCard"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(255,0,0,0) 0%, rgba(255,0,0,0) 60%, rgba(0, 0, 0, 1)), url(/${item.imgPath})` }}
              >
                <div className="cardDetails">
                  <div style={{marginRight: "10px"}}>{item.name}</div>
                  <div style={{whiteSpace: "nowrap"}}>{item.count} {item.count > 1 ? "Plans" : "Plan"}</div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
