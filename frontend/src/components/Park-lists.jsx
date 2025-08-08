import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Park-lists.css";

export default function ParkList() {
  const elements = [];

  for (let i = 0; i < 20; i++) {
    let count = Math.floor(Math.random() * 10) + 1;
    elements.push(
      <Col md={3} sm={6} key={i}>
        <div
          className="parkListCard"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255,0,0,0) 0%, rgba(255,0,0,0) 60%, rgba(0, 0, 0, 1)), url(/view.jpg)`,
          }}
        >
          <div className="cardDetails">
            <div style={{ marginRight: "10px" }}>Park name testtest</div>
            <div style={{ whiteSpace: "nowrap" }}>
              {count} {count > 1 ? "Plans" : "Plan"}
            </div>
          </div>
        </div>
      </Col>
    );
  }

  return (
    <>
      <Container>
        <Row>{elements}</Row>
      </Container>
    </>
  );
}
